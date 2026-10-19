import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, PACK_VERSION } from '../apps/games/cyber-code-breaker/questions.js';
import { createRun, attempt, summary, currentStage, nextQuestion, validateRun, hint, markGuided, answerKey } from '../packages/session/run.js';
import { receipt, receiptCSV, receiptHTML } from '../packages/reports/receipt.js';
const fresh=(mode='independent')=>createRun(questions,PACK_VERSION,{},mode,'test-run');

test('complete all six stages; score once; recover same completion receipt',()=>{
  const run=fresh();
  for(const q of questions){
    assert.equal(currentStage(run,questions),q.stage);
    assert.equal(attempt(run,q,answerKey(q),questions).correct,true);
    assert.equal(attempt(run,q,answerKey(q),questions).tag,'locked');nextQuestion(run,questions);
    validateRun(JSON.parse(JSON.stringify(run)),questions,PACK_VERSION);
  }
  assert.deepEqual(summary(run,questions),{solved:12,xp:1200,independentFirst:12,attempts:12,hints:0,guided:0});
  assert.equal(currentStage(run,questions),6);assert.ok(run.completedAt);
  assert.equal(receipt(run,questions).receiptId,'LOCAL-test-run');
});
test('future stage cannot bypass progression',()=>{
  const run=fresh();assert.equal(attempt(run,questions[2],answerKey(questions[2]),questions).tag,'locked');assert.equal(summary(run,questions).xp,0);
});
test('retry and hint keep full completion XP but not independent-first credit',()=>{
  const run=fresh(),q=questions[0];attempt(run,q,'2',questions);hint(run,q);attempt(run,q,'101',questions);
  assert.equal(summary(run,questions).xp,100);assert.equal(summary(run,questions).independentFirst,0);
  assert.equal(run.entries.C01.events[0].tag,'invalid-digit');assert.equal(run.entries.C01.hints,1);
});
test('guided exposure remains recorded after switching to independent',()=>{
  const run=fresh('guided');markGuided(run,questions[0]);run.mode='independent';attempt(run,questions[0],'101',questions);
  assert.equal(run.entries.C01.independentFirst,false);assert.equal(summary(run,questions).xp,100);
});
test('either security maze lock can be completed first',()=>{
  const run=fresh();for(const q of questions.slice(0,8))attempt(run,q,answerKey(q),questions);
  attempt(run,questions[9],answerKey(questions[9]),questions);assert.equal(currentStage(run,questions),4);
  attempt(run,questions[8],answerKey(questions[8]),questions);assert.equal(currentStage(run,questions),5);
});
test('unfinished typed draft, hints, and profile survive serialisation',()=>{
  const run=fresh();run.entries.C01.draft='20';hint(run,questions[0]);run.profile.alias='Comet';
  const restored=validateRun(JSON.parse(JSON.stringify(run)),questions,PACK_VERSION);
  assert.equal(restored.entries.C01.draft,'20');assert.equal(restored.entries.C01.hints,1);assert.equal(restored.profile.alias,'Comet');
});
test('incompatible and damaged saves fail closed',()=>{
  for(const mutate of [r=>r.schema=7,r=>r.version='other',r=>delete r.entries.C01,r=>r.entries.C01.done=true,r=>r.entries.C01.attempts=-1,r=>r.entries.C01.events=[{}],r=>r.completedAt='now',r=>r.profile.alias='a'.repeat(50),r=>r.accent='url(evil)']){
    const run=fresh();mutate(run);assert.throws(()=>validateRun(run,questions,PACK_VERSION));
  }
});
test('bounded event history does not prevent purposeful retries',()=>{
  const run=fresh();for(let i=0;i<120;i++)attempt(run,questions[0],'0',questions);
  assert.equal(run.entries.C01.events.length,100);assert.equal(run.entries.C01.attempts,120);
  attempt(run,questions[0],'101',questions);assert.equal(summary(run,questions).xp,100);validateRun(run,questions,PACK_VERSION);
});
test('reports escape HTML and spreadsheet formula injection; mark incomplete and unverified',()=>{
  const run=fresh();run.profile.alias='<script>alert(1)</script>';run.profile.classCode='=HYPERLINK("x")';
  const report=receipt(run,questions);const html=receiptHTML(report),csv=receiptCSV(report);
  assert.equal(report.verification,'local/unverified');assert.equal(report.completedAt,null);
  assert.ok(html.includes('&lt;script&gt;'));assert.ok(!html.includes('<script>'));assert.ok(html.includes('In progress'));
  assert.ok(csv.includes("'=HYPERLINK"));assert.ok(csv.includes('local/unverified'));assert.equal(report.questions.length,12);
});
