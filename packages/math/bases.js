export function assertBase(base) {
  if (!Number.isInteger(base) || base < 2 || base > 10) throw new RangeError('Base must be an integer from 2 to 10.');
}

export function decode(raw, base) {
  assertBase(base);
  const text = String(raw).trim();
  if (!text) return { ok: false, tag: 'empty', message: 'Build or enter a code first. Zero is a valid number.' };
  if (!/^\d+$/.test(text)) return { ok: false, tag: 'notation', message: 'Use whole-number digits only, without signs, spaces inside the code or a decimal point.' };
  if (text.length > 16) return { ok: false, tag: 'length', message: 'Use at most 16 digits.' };
  let value = 0;
  for (let i = 0; i < text.length; i++) {
    const digit = Number(text[i]);
    if (digit >= base) return { ok: false, tag: 'invalid-digit', position: i, message: `Digit ${digit} cannot appear in base ${base}. Use 0–${base - 1}.` };
    value = value * base + digit;
    if (!Number.isSafeInteger(value)) return { ok: false, tag: 'overflow', message: 'This number is too large for the exact integer checker.' };
  }
  return { ok: true, value, normalized: text.replace(/^0+(?=\d)/, '') };
}

export function encode(value, base) {
  assertBase(base);
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError('Use a nonnegative safe integer.');
  if (value === 0) return '0';
  let result = '';
  while (value > 0) {
    result = (value % base) + result;
    value = Math.floor(value / base);
  }
  return result;
}

export function contributions(raw, base) {
  const parsed = decode(raw, base);
  if (!parsed.ok) return [];
  return String(raw).trim().split('').map((digit, i, digits) => ({
    digit: Number(digit), power: digits.length - i - 1,
    weight: base ** (digits.length - i - 1), value: Number(digit) * base ** (digits.length - i - 1)
  }));
}

export function targetValue(q) {
  const left = decode(q.source, q.sourceBase);
  if (!left.ok) throw new Error(`Invalid source for ${q.id}`);
  if (!q.operation) return left.value;
  const right = decode(q.operand, q.operandBase);
  if (!right.ok) throw new Error(`Invalid operand for ${q.id}`);
  if (!['+', '-'].includes(q.operation)) throw new Error('Unsupported operation');
  const value = q.operation === '+' ? left.value + right.value : left.value - right.value;
  if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid target');
  return value;
}

export function grade(q, raw) {
  const parsed = decode(raw, q.targetBase);
  if (!parsed.ok) return { ...parsed, correct: false };
  const target = targetValue(q);
  if (parsed.value === target) return { ...parsed, correct: true, tag: 'correct', message: 'Signal matched. Your code restored this circuit!' };
  const code = encode(target, q.targetBase).padStart(q.width, '0');
  const entered = parsed.normalized.padStart(q.width, '0');
  const wrong = code.split('').findIndex((digit, i) => digit !== entered[i]);
  const weight = q.targetBase ** (q.width - 1 - Math.max(0, wrong));
  return { ...parsed, correct: false, tag: 'place-value', message: `Your code carries ${parsed.value} units: ${parsed.value < target ? 'too little' : 'too much'} power. Recheck the ${weight}s place and multiply each digit by its place value. No XP lost — adjust and retry.` };
}

export function working(q) {
  const expand = (digits, base) => contributions(digits, base).map(p => `${p.digit} × ${base}^${p.power}`).join(' + ');
  const source = `${q.source} (base ${q.sourceBase}) = ${expand(q.source, q.sourceBase)} = ${decode(q.source, q.sourceBase).value}`;
  const operation = q.operation ? `; ${q.operand} (base ${q.operandBase}) = ${decode(q.operand, q.operandBase).value}; ${decode(q.source, q.sourceBase).value} ${q.operation} ${decode(q.operand, q.operandBase).value} = ${targetValue(q)}` : '';
  const answer = encode(targetValue(q), q.targetBase);
  return `${source}${operation}. Output: ${answer} (base ${q.targetBase}); ${expand(answer, q.targetBase)} = ${targetValue(q)}.`;
}
