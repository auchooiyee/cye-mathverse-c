// Exact rational arithmetic for authored, bounded factory inputs. No eval or rounding in grading.
const gcd=(a,b)=>b?gcd(b,a%b):a;
export function rational(n,d=1n){n=BigInt(n);d=BigInt(d);if(!d)throw Error('A denominator cannot be zero.');if(d<0n){n=-n;d=-d;}const g=gcd(n<0n?-n:n,d);return {n:n/g,d:d/g};}
export function parseNumber(value){
  const s=String(value).trim();if(s.length>30)throw Error('Use a short number or fraction.');
  if(/^[+-]?\d+\s*\/\s*[+-]?\d+$/.test(s)){const [n,d]=s.split('/');return rational(n.trim(),d.trim());}
  if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))throw Error('Enter a number, decimal or fraction such as 1/2.');
  const neg=s.startsWith('-'),u=s.replace(/^[+-]/,''),[a,b='']=u.split('.');return rational((neg?-1n:1n)*BigInt((a||'0')+b),10n**BigInt(b.length));
}
export const multiply=(a,b)=>rational(a.n*b.n,a.d*b.d);
export const divide=(a,b)=>rational(a.n*b.d,a.d*b.n);
export const equal=(a,b)=>a.n===b.n&&a.d===b.d;
export const format=a=>a.d===1n?String(a.n):`${a.n}/${a.d}`;
export const numeric=a=>Number(a.n)/Number(a.d);
export const formulas={direct:'y = kx',inverse:'y = k/x',joint:'y = kxz',square:'y = kx²',root:'y = k√x',combined:'y = kx/z'};
export function factor(kind,x,z=1){
  if(!Number.isSafeInteger(x)||x<=0||!Number.isSafeInteger(z)||z<=0)throw Error('Use positive whole-number inputs.');
  if(kind==='direct')return rational(x);
  if(kind==='inverse')return rational(1,x);
  if(kind==='joint')return rational(BigInt(x)*BigInt(z));
  if(kind==='square')return rational(BigInt(x)*BigInt(x));
  if(kind==='root'){const r=Math.sqrt(x);if(!Number.isInteger(r))throw Error('Choose a square area from the controls.');return rational(r);}
  if(kind==='combined')return rational(x,z);
  throw Error('Unknown variation model.');
}
export const output=(kind,k,x,z=1)=>multiply(typeof k==='object'?k:parseNumber(k),factor(kind,x,z));
export const constant=o=>divide(parseNumber(o.sample.y),factor(o.kind,o.sample.x,o.sample.z||1));
export function validInputs(o,d){return !!d&&typeof d.k==='string'&&d.k.length<=30&&o.x.values.includes(d.x)&&(!o.z?d.z===1:o.z.values.includes(d.z));}
export function working(o,d){return `${formulas[o.kind]}; k = ${d.k}; x = ${d.x}${o.z?`; z = ${d.z}`:''}; y = ${format(output(o.kind,d.k,d.x,d.z))} ${o.unit}`;}
export function gradeOrder(o,d){
  const fail=(tag,message,actual=null)=>({correct:false,tag,message,actual});
  if(!validInputs(o,d))return fail('input','Choose inputs within the machine controls.');
  let k;try{k=parseNumber(d.k);}catch(e){return fail('number',e.message);}
  if(k.n<=0n||numeric(k)>1000)return fail('constant-range','This machine needs a positive constant k no greater than 1000.');
  const calibration=output(o.kind,k,o.sample.x,o.sample.z||1);
  const actual=format(output(o.kind,k,d.x,d.z));
  if(!equal(k,constant(o)))return fail('calibration',`Your k predicts ${format(calibration)} ${o.unit} for the calibration sample, but the sample gives ${o.sample.y}. Use ${formulas[o.kind]} to find k first.`,actual);
  if(!equal(parseNumber(actual),parseNumber(o.target)))return fail('target',`Machine calibrated! Your setting gives ${actual} ${o.unit}; this order needs ${o.target}. ${o.tip}`,actual);
  return {correct:true,tag:'packed',actual,message:`Order ready! ${actual} ${o.unit}, exactly as requested. ${o.insight}`};
}
