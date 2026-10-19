import {originalGameBytes} from './preservation.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {parseNumber,rational,format,equal,output,gradeOrder,constant} from '../packages/math/variation.js';
import {orders} from '../apps/games/variation-factory/orders.js';
import {newRun,submit,totals,validateSave} from '../apps/games/variation-factory/state.js';
import {factoryReport,factoryHTML,factoryCSV} from '../packages/reports/factory.js';
const keys=[['4',6,1],['3',10,1],['48',6,1],['72',8,1],['2',4,6],['3',4,5],['2',5,1],['3',6,1],['4',49,1],['6',64,1],['8',5,4],['6',3,2]];
const draft=i=>({k:keys[i][0],x:keys[i][1],z:keys[i][2]});
// Independent literal cross-product conditions: no production evaluator used.
const qualifies=[x=>4*x===24,x=>3*x===30,x=>48===8*x,x=>72===9*x,(x,z)=>2*x*z===48,(x,z)=>3*x*z===60,x=>2*x*x===50,x=>3*x*x===108,x=>16*x===28*28,x=>36*x===48*48,(x,z)=>8*x===10*z,(x,z)=>6*x===9*z];
test('rational parser preserves exact decimals/fractions and rejects malformed or zero denominator',()=>{
  for(const [s,want]of [['.5','1/2'],['1.20','6/5'],['6/4','3/2'],['-2/-4','1/2'],['0','0'],['+4.0','4']])assert.equal(format(parseNumber(s)),want);
  for(const s of ['', '1/0','NaN','Infinity','1e2','1+2','1/2/3','<script>'])assert.throws(()=>parseNumber(s));
});
test('twelve independent answer keys match calibration and exact targets',()=>{
  orders.forEach((o,i)=>{assert.equal(format(constant(o)),keys[i][0]);assert.equal(gradeOrder(o,draft(i)).correct,true);assert.equal(format(output(o.kind,keys[i][0],keys[i][1],keys[i][2])),String(o.target));});
});
test('every offered input configuration matches independent feasibility equations',()=>{
  let count=0;orders.forEach((o,i)=>{let accepted=0;for(const x of o.x.values)for(const z of o.z?.values||[1]){const actual=gradeOrder(o,{k:keys[i][0],x,z}).correct;assert.equal(actual,qualifies[i](x,z),`${o.id} ${x} ${z}`);accepted+=actual;count++;}assert.ok(accepted>0);});assert.equal(count,228);
});
test('variation scaling laws hold exactly for 500 input combinations',()=>{
  for(let k=1;k<=5;k++)for(let x=1;x<=10;x++)for(let z=1;z<=10;z++){
    assert.ok(equal(output('direct',k,2*x),output('direct',2*k,x)));
    assert.ok(equal(output('inverse',k,2*x),output('inverse',`${k}/2`,x)));
    assert.ok(equal(output('joint',k,x,z),output('joint',k,z,x)));
    assert.ok(equal(output('square',k,2*x),output('square',4*k,x)));
    assert.ok(equal(output('root',k,4*x*x),output('root',2*k,x*x)));
    assert.ok(equal(output('combined',k,2*x,2*z),output('combined',k,x,z)));
  }
});
test('calibration cannot be bypassed by a target-matching wrong constant',()=>{
  assert.equal(gradeOrder(orders[0],{k:'8',x:3,z:1}).tag,'calibration');
  assert.equal(gradeOrder(orders[0],{k:'8/2',x:6,z:1}).correct,true);
  for(const k of ['0','-4','1001','abc'])assert.equal(gradeOrder(orders[0],{k,x:6,z:1}).correct,false);
});
test('joint and combined orders accept multiple valid arrangements',()=>{
  assert.equal(gradeOrder(orders[5],{k:'3',x:5,z:4}).correct,true);assert.equal(gradeOrder(orders[11],{k:'6',x:6,z:4}).correct,true);
});
test('invalid denominators and out-of-machine inputs do not pass',()=>{
  assert.throws(()=>output('inverse','3',0));assert.throws(()=>output('root','3',2));assert.throws(()=>output('combined','3',2,0));
  for(const d of [{k:'4',x:0,z:1},{k:'4',x:6.5,z:1},{k:'4',x:6,z:2},{k:4,x:6,z:1}])assert.equal(gradeOrder(orders[0],d).tag,'input');
});
test('all orders unlock sequentially; replays never duplicate completion XP',()=>{
  const r=newRun();assert.throws(()=>submit(r,1));orders.forEach((o,i)=>{r.selected=i;r.entries[o.id].draft=draft(i);submit(r);validateSave(structuredClone(r));});assert.equal(totals(r).xp,1200);assert.equal(totals(r).firstTry,12);submit(r);assert.equal(totals(r).xp,1200);assert.ok(r.completedAt);
});
test('hints and retries keep full rewards but honest first-try evidence',()=>{
  const r=newRun();submit(r);r.entries.V01.hints++;r.entries.V01.draft=draft(0);submit(r);assert.equal(totals(r).xp,100);assert.equal(r.entries.V01.firstTry,false);assert.equal(r.entries.V01.completion.attemptNumber,2);
});
test('first completion survives history cap and import after 110 replays',()=>{
  const r=newRun();r.entries.V01.draft=draft(0);submit(r);r.entries.V01.draft.x=1;for(let i=0;i<110;i++)submit(r);validateSave(structuredClone(r));assert.equal(r.entries.V01.events.length,100);assert.equal(r.entries.V01.attempts,111);assert.equal(r.entries.V01.completion.draft.x,6);
});
test('corrupt and forged saves reject without mutating a valid run',()=>{
  const r=newRun();r.entries.V01.draft=draft(0);submit(r);const original=JSON.stringify(r);
  for(const mutate of [r=>r.version='old',r=>r.selected=11,r=>r.entries.V01.completion.actual='999',r=>r.entries.V01.completion.draft.k='999',r=>r.entries.V01.events[0].correct=false,r=>r.entries.V01.events=[],r=>r.entries.V02.done=true,r=>r.completedAt='invalid',r=>r.entries.V01.draft.x=999,r=>r.profile.alias='a'.repeat(25)]){const bad=structuredClone(r);mutate(bad);assert.throws(()=>validateSave(bad));}assert.equal(JSON.stringify(r),original);
});
test('reports preserve calculations and escape names, attempted constants and spreadsheet formulas',()=>{
  const r=newRun({alias:'<img src=x>',classCode:'=SUM(1,1)'});r.entries.V01.draft.k='<img src=x>';submit(r);r.entries.V01.draft=draft(0);submit(r);const report=factoryReport(r,orders);assert.equal(report.verification,'local/unverified');assert.match(report.orders[0].completedWorking,/y = 24 labels/);assert.ok(factoryHTML(report).includes('&lt;img src=x&gt;'));assert.ok(!factoryHTML(report).includes('<img src=x>'));assert.ok(factoryCSV(report).includes("'=SUM"));
});
test('both accepted games, their launchers and master plan remain unchanged apart from the exact shared lobby include',async()=>{
  const files=JSON.parse(await readFile(new URL('../docs/variation-factory/preserved-files.json',import.meta.url)));for(const f of files)assert.equal(createHash('sha256').update(originalGameBytes(await readFile(new URL('../'+f.path,import.meta.url)))).digest('hex'),f.sha256,f.path);
});
