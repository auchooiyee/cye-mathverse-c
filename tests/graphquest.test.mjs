import {originalGameBytes} from './preservation.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {missions} from '../apps/games/graphquest/missions.js';
import {newRun,validateSave,dispatch,totals,unlocked} from '../apps/games/graphquest/state.js';
import {validateNetwork,inspectRoute,gradeRoute,optimalRoute,neighbours} from '../packages/math/network.js';
import {deliveryReport,deliveryHTML,deliveryCSV} from '../packages/reports/delivery.js';
const routes=[['A','B','C','D'],['A','C','B','D'],['A','C','E','F'],['C','E','D'],['A','B','C','E','F'],['A','B','D','F','E','C','A']];
const expected=[9,4,10,5,7,15];

// Independent exhaustive oracle: enumerate all directed legal walks up to the
// known feasible cost. Positive integer weights make this a finite search.
function exhaustive(m,limit){
  const key=m.goal==='distance'?'km':'cost';let best=Infinity,count=0,walks=0;
  function visit(route,sum){
    walks++;const current=route.at(-1);
    if(route.length>1&&current===m.end&&m.required.every(id=>route.includes(id))){best=Math.min(best,sum);count++;}
    for(const e of m.edges){
      if(e.closed)continue;
      const to=e.a===current?e.b:!e.directed&&e.b===current?e.a:null;
      if(to&&sum+e[key]<=limit)visit([...route,to],sum+e[key]);
    }
  }
  visit([m.start],0);return {best,count,walks};
}
test('six mission keys match exhaustive legal-walk minima and accept their routes',()=>{
  missions.forEach((m,i)=>{validateNetwork(m);const oracle=exhaustive(m,expected[i]);assert.equal(oracle.best,expected[i]);assert.ok(oracle.count>0);assert.equal(optimalRoute(m).value,oracle.best);assert.equal(gradeRoute(m,routes[i]).correct,true);});
});
test('distance and cost are distinct; fewest edges is not shortest',()=>{
  assert.equal(inspectRoute(missions[0],routes[0]).km,9);
  assert.equal(inspectRoute(missions[1],routes[1]).cost,4);
  assert.equal(inspectRoute(missions[1],routes[1]).km,17);
  assert.equal(gradeRoute(missions[0],['A','B','D']).tag,'not-optimal');
  assert.equal(gradeRoute(missions[1],routes[0]).tag,'not-optimal');
});
test('reject disconnected, reverse one-way and closed roads in both directions',()=>{
  assert.equal(inspectRoute(missions[0],['A','D']).tag,'not-connected');
  assert.equal(inspectRoute(missions[2],['A','B','D']).tag,'closed-road');
  assert.equal(inspectRoute(missions[2],['A','C','D','B']).tag,'closed-road');
  assert.equal(inspectRoute(missions[3],['C','B']).tag,'one-way');
  assert.deepEqual(neighbours(missions[3],'C').map(n=>n.id),['E']);
});
test('budget accepts multiple valid routes including nonoptimal routes at the exact limit',()=>{
  const m=missions[4];assert.equal(gradeRoute(m,routes[4]).correct,true);
  const boundary=gradeRoute(m,['A','B','D','E','F']);assert.equal(boundary.correct,true);assert.equal(boundary.cost,9);
  assert.equal(gradeRoute(m,['A','B','D','E','D','F']).tag,'over-budget');
  assert.equal(gradeRoute(m,['A','C','E','F']).tag,'missing-stop');
});
test('optimal tour accepts both directions; intermediate stop visits can repeat',()=>{
  const m=missions[5];assert.equal(gradeRoute(m,routes[5].toReversed()).correct,true);
  assert.equal(inspectRoute(m,['A','B','A','C']).valid,true);
  assert.equal(gradeRoute(m,['A','B','D','F']).tag,'wrong-destination');
});
test('unknown, empty, overly long and wrong-start routes cannot pass',()=>{
  const m=missions[0];for(const r of [null,[],['Z'],['A',{}],Array(66).fill('A')])assert.equal(inspectRoute(m,r).valid,false);
  assert.equal(inspectRoute(m,['B','D']).tag,'wrong-start');assert.equal(gradeRoute(m,['A']).tag,'empty');
});
test('unreachable and malformed graphs are rejected safely',()=>{
  const disconnected={...missions[0],edges:[]};assert.equal(optimalRoute(disconnected),null);
  for(const value of [0,-1,1.5,Infinity]){const m=structuredClone(missions[0]);m.edges[0].km=value;assert.throws(()=>validateNetwork(m));}
  const duplicate=structuredClone(missions[0]);duplicate.edges.push({...duplicate.edges[0]});assert.throws(()=>validateNetwork(duplicate));
});
test('all six missions unlock sequentially; replay never duplicates XP',()=>{
  const run=newRun();assert.throws(()=>dispatch(run,1));
  missions.forEach((m,i)=>{run.selected=i;run.entries[m.id].route=routes[i];dispatch(run);validateSave(JSON.parse(JSON.stringify(run)));});
  assert.equal(totals(run).xp,900);assert.equal(totals(run).firstDispatch,6);assert.ok(run.completedAt);
  dispatch(run);assert.equal(totals(run).xp,900);assert.equal(unlocked(run),5);
});
test('hints and retries retain rewards while first-dispatch evidence stays honest',()=>{
  const run=newRun();run.entries.G01.route=['A','B','D'];assert.equal(dispatch(run).correct,false);
  run.entries.G01.hints++;run.entries.G01.route=routes[0];dispatch(run);
  assert.equal(totals(run).xp,150);assert.equal(run.entries.G01.firstDispatch,false);assert.equal(run.entries.G01.completion.attemptNumber,2);
});
test('first completion survives bounded event history and refresh after repeated practice',()=>{
  const run=newRun();run.entries.G01.route=routes[0];dispatch(run);
  run.entries.G01.route=['A','B','D'];for(let i=0;i<110;i++)dispatch(run);
  assert.equal(run.entries.G01.events.length,100);assert.equal(run.entries.G01.attempts,111);
  validateSave(JSON.parse(JSON.stringify(run)));assert.equal(run.entries.G01.completion.correct,true);assert.equal(run.entries.G01.firstDispatch,true);
});
test('damaged or incompatible save cannot overwrite a valid run',()=>{
  for(const mutate of [r=>r.version='old',r=>r.selected=5,r=>delete r.entries.G01,r=>r.entries.G01.route=['A','D'],r=>r.entries.G01.attempts=-1,r=>r.entries.G01.done=true,r=>r.entries.G01.events=[{}],r=>r.profile.alias='X'.repeat(25)]){
    const run=newRun();mutate(run);assert.throws(()=>validateSave(run));
  }
});
test('delivery reports retain leg calculations and escape HTML/formula injection',()=>{
  const run=newRun({alias:'<img src=x>',classCode:'=SUM(1,1)'});run.entries.G01.route=routes[0];dispatch(run);
  const report=deliveryReport(run,missions);assert.equal(report.verification,'local/unverified');assert.equal(report.missions[0].events[0].legs.reduce((s,l)=>s+l.km,0),9);
  const html=deliveryHTML(report);assert.ok(html.includes('&lt;img src=x&gt;'));assert.ok(!html.includes('<img src=x>'));
  const csv=deliveryCSV(report);assert.ok(csv.includes("'=SUM"));assert.ok(csv.includes('A-B:4km/RM3'));
});
test('accepted Cyber Code Breaker and original master plan remain unchanged apart from the exact shared lobby include',async()=>{
  const saved=JSON.parse(await readFile(new URL('../docs/graphquest/preserved-files.json',import.meta.url)));
  for(const f of saved){const bytes=await readFile(new URL('../'+f.path,import.meta.url));assert.equal(createHash('sha256').update(originalGameBytes(bytes)).digest('hex'),f.sha256,f.path);}
});
