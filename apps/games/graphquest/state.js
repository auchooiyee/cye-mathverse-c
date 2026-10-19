import {inspectRoute,gradeRoute} from '../../../packages/math/network.js';
import {missions,VERSION} from './missions.js';
export const SAVE_KEY='cye-mathverse.graphquest.v1';
export function newRun(profile={}){
  return {schema:1,version:VERSION,runId:crypto.randomUUID(),startedAt:new Date().toISOString(),completedAt:null,
    profile:{alias:String(profile.alias||'').slice(0,24),classCode:String(profile.classCode||'').slice(0,24)},selected:0,reducedMotion:false,
    entries:Object.fromEntries(missions.map(m=>[m.id,{route:[m.start],attempts:0,hints:0,done:false,firstDispatch:false,completion:null,events:[]}]))};
}
export function unlocked(run){const i=missions.findIndex(m=>!run.entries[m.id].done);return i<0?missions.length-1:i;}
export function totals(run){const entries=Object.values(run.entries);return {completed:entries.filter(e=>e.done).length,xp:entries.filter(e=>e.done).length*150,attempts:entries.reduce((n,e)=>n+e.attempts,0),hints:entries.reduce((n,e)=>n+e.hints,0),firstDispatch:entries.filter(e=>e.firstDispatch).length};}
export function dispatch(run,index=run.selected){
  if(index>unlocked(run))throw new Error('Mission is locked');
  const m=missions[index],e=run.entries[m.id],result=gradeRoute(m,e.route);e.attempts++;
  e.events.push({route:[...e.route],correct:result.correct,tag:result.tag,km:result.km,cost:result.cost,hints:e.hints,at:new Date().toISOString()});
  e.events=e.events.slice(-100);
  if(result.correct&&!e.done){e.done=true;e.firstDispatch=e.attempts===1&&e.hints===0;e.completion={...structuredClone(e.events.at(-1)),attemptNumber:e.attempts};}
  if(!run.completedAt&&missions.every(m=>run.entries[m.id].done))run.completedAt=new Date().toISOString();
  return result;
}
export function validateSave(run){
  const fail=()=>{throw new Error('This is not a compatible GraphQuest save.');};
  if(!run||run.schema!==1||run.version!==VERSION||typeof run.runId!=='string'||!run.runId||run.runId.length>100||!Number.isFinite(Date.parse(run.startedAt))||!run.entries||typeof run.reducedMotion!=='boolean')fail();
  if(!run.profile||!['alias','classCode'].every(k=>typeof run.profile[k]==='string'&&run.profile[k].length<=24))fail();
  for(const m of missions){
    const e=run.entries[m.id];
    if(!e||!inspectRoute(m,e.route).valid||!['attempts','hints'].every(k=>Number.isSafeInteger(e[k])&&e[k]>=0)||!['done','firstDispatch'].every(k=>typeof e[k]==='boolean')||!Array.isArray(e.events)||e.events.length>100||e.events.length>e.attempts)fail();
    for(const ev of e.events){
      if(!ev||typeof ev.correct!=='boolean'||typeof ev.tag!=='string'||!Number.isFinite(Date.parse(ev.at))||!Number.isSafeInteger(ev.hints)||ev.hints<0)fail();
      const r=gradeRoute(m,ev.route);if(r.correct!==ev.correct||r.tag!==ev.tag||r.km!==ev.km||r.cost!==ev.cost)fail();
    }
    if(e.done){const c=e.completion;if(!c)fail();const checked=gradeRoute(m,c.route);if(!checked.correct||c.correct!==true||c.km!==checked.km||c.cost!==checked.cost||c.tag!==checked.tag||!Number.isInteger(c.attemptNumber)||c.attemptNumber<1||c.attemptNumber>e.attempts||!Number.isInteger(c.hints)||c.hints<0||!Number.isFinite(Date.parse(c.at)))fail();if(e.firstDispatch!==(c.attemptNumber===1&&c.hints===0))fail();}
    else if(e.completion!==null||e.firstDispatch)fail();
  }
  let gap=false;for(const m of missions){if(!run.entries[m.id].done)gap=true;else if(gap)fail();}
  if(!Number.isInteger(run.selected)||run.selected<0||run.selected>unlocked(run))fail();
  const complete=missions.every(m=>run.entries[m.id].done);
  if(complete!==(run.completedAt!==null)||(complete&&!Number.isFinite(Date.parse(run.completedAt))))fail();
  return run;
}
