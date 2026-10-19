import test from 'node:test';
import assert from 'node:assert/strict';
import { decode, encode, contributions, grade, targetValue, working } from '../packages/math/bases.js';
import { questions } from '../apps/games/cyber-code-breaker/questions.js';

test('zero, surrounding whitespace and leading zeros are exact equivalents',()=>{
  assert.equal(decode('0',2).value,0);assert.equal(decode(' 000101 ',2).value,5);
  assert.equal(encode(0,8),'0');assert.equal(grade(questions[0],'00000101').correct,true);
});
test('reject malformed notation and invalid digits instead of partial parsing',()=>{
  for(const value of ['', ' ', '-1', '+2', '1.0', '1e2', '1 0', 'NaN', 'Infinity','0x10','１２'])assert.equal(decode(value,2).ok,false,value);
  assert.equal(decode('102',2).tag,'invalid-digit');assert.equal(decode('8',8).tag,'invalid-digit');
  assert.equal(decode('9007199254740992',10).tag,'overflow');assert.equal(decode('0'.repeat(17),2).tag,'length');
});
test('unsupported bases and invalid values are rejected',()=>{
  for(const base of [0,1,11,2.5,NaN])assert.throws(()=>encode(1,base));
  for(const value of [-1,1.5,Infinity,Number.MAX_SAFE_INTEGER+1])assert.throws(()=>encode(value,2));
});
test('round trip and independent weighted-place oracle for 36,864 representations',()=>{
  for(let base=2;base<=10;base++)for(let value=0;value<4096;value++){
    const code=encode(value,base);assert.equal(decode(code,base).value,value);
    const independent=[...code].reverse().reduce((n,d,i)=>n+Number(d)*base**i,0);assert.equal(independent,value);
  }
});
test('place contributions preserve zero positions',()=>{
  assert.deepEqual(contributions('102',3).map(x=>[x.weight,x.value]),[[9,9],[3,0],[1,2]]);
  assert.deepEqual(contributions('2',2),[]);
});
test('12 curated answer keys independently checked, with fitting chips and correct mappings',()=>{
  const keys=['101','102','1101','22','102','10011','1000','13','1101','30','100','113'];
  const decimals=[5,11,13,22,11,19,8,8,13,12,36,33];
  assert.equal(questions.length,12);assert.equal(new Set(questions.map(q=>q.id)).size,12);
  questions.forEach((q,i)=>{
    assert.equal(targetValue(q),decimals[i]);assert.equal(encode(decimals[i],q.targetBase),keys[i]);
    assert.ok(keys[i].length<=q.width);assert.equal(grade(q,keys[i]).correct,true);
    assert.equal(grade(q,encode(decimals[i]+1,q.targetBase)).correct,false);
    assert.ok(['2.1.1','2.1.2','2.1.3','2.1.4'].includes(q.sp));
    assert.match(working(q),new RegExp(`Output: ${keys[i]} `));assert.equal(q.reviewerStatus,'teacher-review-pending');
  });
});
test('misconceptions explain bad digits and wrong place value',()=>{
  assert.match(grade(questions[0],'2').message,/0–1/);
  assert.match(grade(questions[0],'001').message,/4s place/);
  assert.match(grade(questions[0],'111').message,/too much/);
});
