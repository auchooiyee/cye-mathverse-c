import { grade, encode, targetValue } from '../math/bases.js';

export function createRun(questions, version, profile = {}, mode = 'guided', id = globalThis.crypto.randomUUID()) {
  return {
    schema: 1, version, runId: id, startedAt: new Date().toISOString(), completedAt: null,
    profile: { alias: String(profile.alias || '').slice(0, 24), classCode: String(profile.classCode || '').slice(0, 24) },
    mode: mode === 'independent' ? 'independent' : 'guided', selected: questions[0].id,
    accent: '#6ee7e0', reducedMotion: false,
    entries: Object.fromEntries(questions.map(q => [q.id, { draft: '0'.repeat(q.width), attempts: 0, hints: 0, guided: false, done: false, independentFirst: false, events: [] }]))
  };
}
export function currentStage(run, questions) { return questions.find(q => !run.entries[q.id].done)?.stage ?? 6; }
export function currentQuestion(run, questions) {
  const stage = currentStage(run, questions);
  return questions.find(q => q.id === run.selected && q.stage === stage) || questions.find(q => q.stage === stage) || questions.at(-1);
}
export function summary(run, questions) {
  const entries = questions.map(q => run.entries[q.id]);
  return { solved: entries.filter(e => e.done).length, xp: entries.filter(e => e.done).length * 100,
    independentFirst: entries.filter(e => e.independentFirst).length,
    attempts: entries.reduce((n, e) => n + e.attempts, 0), hints: entries.reduce((n, e) => n + e.hints, 0),
    guided: entries.filter(e => e.guided).length };
}
export function attempt(run, q, raw, questions, now = new Date().toISOString()) {
  const entry = run.entries[q.id];
  if (entry.done || q.stage !== currentStage(run, questions)) return { correct: false, tag: 'locked', message: 'This lock is already solved or is not open yet.' };
  const result = grade(q, raw);
  entry.draft = String(raw).slice(0, 16);
  entry.attempts++;
  entry.guided ||= run.mode === 'guided';
  entry.events.push({ answer: entry.draft, correct: result.correct, tag: result.tag, at: now, mode: run.mode, hints: entry.hints });
  entry.events = entry.events.slice(-100);
  if (result.correct) {
    entry.done = true;
    entry.independentFirst = entry.attempts === 1 && entry.hints === 0 && !entry.guided;
    if (questions.every(item => run.entries[item.id].done)) run.completedAt = now;
  }
  return result;
}
export function markGuided(run, q) { if (!run.entries[q.id].done) run.entries[q.id].guided = true; }
export function hint(run, q) { if (!run.entries[q.id].done) run.entries[q.id].hints++; }
export function nextQuestion(run, questions) {
  const next = questions.find(q => !run.entries[q.id].done);
  if (next) run.selected = next.id;
}
export function validateRun(value, questions, version) {
  const fail = () => { throw new Error('Unreadable or incompatible save. Export the original before starting again.'); };
  if (!value || value.schema !== 1 || value.version !== version || typeof value.runId !== 'string' || value.runId.length > 100 || !Number.isFinite(Date.parse(value.startedAt)) || !value.entries || !['guided', 'independent'].includes(value.mode)) fail();
  if (!value.profile || !['alias', 'classCode'].every(k => typeof value.profile[k] === 'string' && value.profile[k].length <= 24)) fail();
  if (!/^#[a-f0-9]{6}$/i.test(value.accent) || typeof value.reducedMotion !== 'boolean' || !questions.some(q => q.id === value.selected)) fail();
  for (const q of questions) {
    const e = value.entries[q.id];
    if (!e || typeof e.draft !== 'string' || e.draft.length > 16 || !['done', 'guided', 'independentFirst'].every(k => typeof e[k] === 'boolean') || !['attempts', 'hints'].every(k => Number.isSafeInteger(e[k]) && e[k] >= 0) || !Array.isArray(e.events) || e.events.length > 100) fail();
    if (e.events.some(ev => !ev || typeof ev.answer !== 'string' || ev.answer.length > 16 || typeof ev.correct !== 'boolean' || typeof ev.tag !== 'string' || !Number.isFinite(Date.parse(ev.at)) || !['guided', 'independent'].includes(ev.mode) || !Number.isInteger(ev.hints) || ev.hints < 0)) fail();
    if (e.done && (!grade(q, e.draft).correct || !e.attempts || !e.events.at(-1)?.correct)) fail();
    if (e.independentFirst && (!e.done || e.attempts !== 1 || e.guided || e.hints !== 0)) fail();
    if (q.stage > currentStage(value, questions) && e.done) fail();
  }
  const complete = questions.every(q => value.entries[q.id].done);
  if (complete !== (value.completedAt !== null) || (complete && !Number.isFinite(Date.parse(value.completedAt)))) fail();
  return value;
}
export function answerKey(q) { return encode(targetValue(q), q.targetBase); }
