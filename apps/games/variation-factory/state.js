import {orders,VERSION,initialDraft} from './orders.js';
import {gradeOrder,validInputs} from '../../../packages/math/variation.js';
export const SAVE_KEY='cye-mathverse.variation-factory.v1';
export function newRun(profile={}){return {schema:1,version:VERSION,runId:crypto.randomUUID(),startedAt:new Date().toISOString(),completedAt:null,profile:{alias:String(profile.alias||'').slice(0,24),classCode:String(profile.classCode||'').slice(0,24)},selected:0,reducedMotion:false,entries:Object.fromEntries(orders.map(o=>[o.id,{draft:initialDraft(o),done:false,attempts:0,hints:0,firstTry:false,completion:null,events:[]}]))};}
export function unlocked(r){const i=orders.findIndex(o=>!r.entries[o.id].done);return i<0?orders.length-1:i;}
export function totals(r){const es=orders.map(o=>r.entries[o.id]);return {completed:es.filter(e=>e.done).length,xp:es.filter(e=>e.done).length*100,hints:es.reduce((n,e)=>n+e.hints,0),attempts:es.reduce((n,e)=>n+e.attempts,0),firstTry:es.filter(e=>e.firstTry).length};}
export function submit(r,index=r.selected){
  if(!Number.isInteger(index)||index<0||index>unlocked(r))throw Error('Order is locked.');
  const o=orders[index],e=r.entries[o.id],result=gradeOrder(o,e.draft);e.attempts++;
  const ev={draft:{...e.draft},correct:result.correct,tag:result.tag,actual:result.actual,hints:e.hints,at:new Date().toISOString()};e.events.push(ev);e.events=e.events.slice(-100);
  if(result.correct&&!e.done){e.done=true;e.firstTry=e.attempts===1&&e.hints===0;e.completion={...structuredClone(ev),attemptNumber:e.attempts};}
  if(!r.completedAt&&orders.every(o=>r.entries[o.id].done))r.completedAt=new Date().toISOString();return result;
}
export function validateSave(r){
  const fail=()=>{throw Error('This is not a compatible Variation Factory save.');};
  const count=n=>Number.isSafeInteger(n)&&n>=0;
  const date=s=>typeof s==='string'&&Number.isFinite(Date.parse(s));
  if(!r||r.schema!==1||r.version!==VERSION||typeof r.runId!=='string'||r.runId.length<1||r.runId.length>100||!date(r.startedAt)||typeof r.reducedMotion!=='boolean'||!r.entries||!r.profile||!['alias','classCode'].every(k=>typeof r.profile[k]==='string'&&r.profile[k].length<=24))fail();
  for(const o of orders){const e=r.entries[o.id];if(!e||!validInputs(o,e.draft)||!count(e.attempts)||!count(e.hints)||typeof e.done!=='boolean'||typeof e.firstTry!=='boolean'||!Array.isArray(e.events)||e.events.length!==Math.min(e.attempts,100))fail();
    const check=ev=>{if(!ev||!validInputs(o,ev.draft)||!count(ev.hints)||ev.hints>e.hints||!date(ev.at))fail();const result=gradeOrder(o,ev.draft);if(result.correct!==ev.correct||result.tag!==ev.tag||result.actual!==ev.actual)fail();};
    e.events.forEach(check);
    if(e.done){const c=e.completion;check(c);if(!c.correct||!Number.isInteger(c.attemptNumber)||c.attemptNumber<1||c.attemptNumber>e.attempts||e.firstTry!==(c.attemptNumber===1&&c.hints===0))fail();}
    else if(e.completion!==null||e.firstTry||e.events.some(ev=>ev.correct))fail();
  }
  let gap=false;for(const o of orders){if(!r.entries[o.id].done)gap=true;else if(gap)fail();}
  if(!Number.isInteger(r.selected)||r.selected<0||r.selected>unlocked(r))fail();
  const complete=totals(r).completed===orders.length;if(complete?!date(r.completedAt):r.completedAt!==null)fail();return r;
}
