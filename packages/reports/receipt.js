import { summary } from '../session/run.js';
import { working } from '../math/bases.js';
export const escapeHTML = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function receipt(run, questions) {
  return { schema: 1, receiptId: `LOCAL-${run.runId}`, verification: 'local/unverified',
    game: 'Cyber Code Breaker', gameId: 'M4-02', chapter: 'Form 4 Mathematics · Number Bases',
    version: run.version, runId: run.runId, startedAt: run.startedAt, completedAt: run.completedAt,
    profile: { ...run.profile }, summary: summary(run, questions),
    scope: 'Formative exploration; not SPM marks or a complete mastery assessment.',
    review: 'Teacher content review pending. Guided/retried completion is separate from independent first attempts.',
    questions: questions.map(q => ({ id: q.id, title: q.title, sp: q.sp, questionVersion: q.version, prompt: q.prompt,
      ...structuredClone(run.entries[q.id]), workedSolution: working(q) })) };
}
function csvCell(value) {
  let s = String(value ?? '');
  if (/^[\s]*[=+\-@]/.test(s)) s = "'" + s;
  return '"' + s.replaceAll('"', '""') + '"';
}
export function receiptCSV(report) {
  const rows = [['verification', 'receipt_id', 'alias', 'class', 'question', 'SP', 'solved', 'attempts', 'hints', 'guided_exposure', 'independent_first', 'answer', 'error_tags', 'completed_at', 'worked_solution']];
  for (const q of report.questions) rows.push([report.verification, report.receiptId, report.profile.alias, report.profile.classCode, q.id, q.sp, q.done, q.attempts, q.hints, q.guided, q.independentFirst, q.draft, q.events.filter(e => !e.correct).map(e => e.tag).join(';'), report.completedAt, q.workedSolution]);
  return '\uFEFF' + rows.map(row => row.map(csvCell).join(',')).join('\r\n');
}
export function receiptHTML(report) {
  const h = escapeHTML;
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Cyber Code Breaker · Local learning receipt</title><style>body{font:16px/1.6 system-ui,sans-serif;color:#172438;max-width:920px;margin:40px auto;padding:20px}h1{line-height:1.1}aside{padding:16px;border:2px solid #9a6300;background:#fff5dc}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #9aa8b7;padding:8px;text-align:left}small{overflow-wrap:anywhere}details{margin:12px 0} @media print{body{margin:0;padding:0}details{break-inside:avoid}thead{display:table-header-group}}</style><body><p>CYE-MATHVERSE / LEARNING RECEIPT</p><h1>Cyber Code Breaker</h1><aside><strong>LOCAL / UNVERIFIED</strong> — Editable, device-only formative evidence. No server verification or school submission has occurred.</aside><p>Learner alias: ${h(report.profile.alias || 'Not supplied')} · Class: ${h(report.profile.classCode || 'Not supplied')}</p><p>${h(report.chapter)}<br>Started: ${h(report.startedAt)}<br>Completed: ${h(report.completedAt || 'In progress')}</p><p><strong>${report.summary.solved}/12 locks restored · ${report.summary.xp} XP</strong><br>${report.summary.independentFirst} independent first-attempt answers; ${report.summary.guided} locks with guided exposure; ${report.summary.hints} hints.</p><p>${h(report.scope)} ${h(report.review)}</p><table><thead><tr><th>Lock / SP</th><th>Solved</th><th>Attempts</th><th>Hints</th><th>Guided</th><th>Independent first</th></tr></thead><tbody>${report.questions.map(q => `<tr><td>${h(q.id)} / ${h(q.sp)}</td><td>${q.done ? 'Yes' : 'No'}</td><td>${q.attempts}</td><td>${q.hints}</td><td>${q.guided ? 'Yes' : 'No'}</td><td>${q.independentFirst ? 'Yes' : 'No'}</td></tr>`).join('')}</tbody></table><h2>Question evidence and workings</h2>${report.questions.map(q => `<details open><summary>${h(q.id)} — ${h(q.title)}</summary><p>${h(q.prompt)}</p><p>Last code: ${h(q.draft)}. ${h(q.workedSolution)}</p><p>Attempts: ${h(q.events.map(e => `${e.answer}: ${e.correct ? 'correct' : e.tag} (${e.mode}, ${e.hints} hints)`).join(' → ') || 'None')}</p></details>`).join('')}<small>Receipt ${h(report.receiptId)} · Pack ${h(report.version)}. Browser Print → Save as PDF creates a printable copy, not a verified certificate.</small></body></html>`;
}
