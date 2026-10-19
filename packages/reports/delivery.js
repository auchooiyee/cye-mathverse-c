import {escapeHTML as h} from './receipt.js';
import {inspectRoute} from '../math/network.js';
export {escapeHTML} from './receipt.js';
export function deliveryReport(run,missions){
  const completed=missions.filter(m=>run.entries[m.id].done).length;
  return {schema:1,gameId:'M4-05',game:'GraphQuest: Delivery Club',version:run.version,receiptId:`LOCAL-${run.runId}`,verification:'local/unverified',
    profile:{...run.profile},startedAt:run.startedAt,completedAt:run.completedAt,completed,xp:completed*150,
    note:'Formative route-planning evidence. Live totals are provided. First-dispatch success is not an exam grade or proof of unaided arithmetic mastery. Content awaits teacher review.',
    missions:missions.map(m=>({id:m.id,title:m.title,sp:m.sp,goal:m.goal,budget:m.budget??null,start:m.start,end:m.end,required:[...m.required],
      ...structuredClone(run.entries[m.id]),currentRoute:inspectRoute(m,run.entries[m.id].route),
      events:run.entries[m.id].events.map(ev=>({...structuredClone(ev),legs:inspectRoute(m,ev.route).legs}))}))};
}
const cell=value=>{let s=String(value??'');if(/^\s*[=+\-@]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
export function deliveryCSV(report){
  const rows=[['verification','receipt_id','alias','class','mission','SP','goal','completed','total_attempts','hints','first_dispatch_success','event_time','route','km','cost_RM','correct','feedback_tag','edge_weights']];
  for(const m of report.missions){
    const events=m.events.length?m.events:[null];
    for(const ev of events)rows.push([report.verification,report.receiptId,report.profile.alias,report.profile.classCode,m.id,m.sp.join(';'),m.goal,m.done,m.attempts,m.hints,m.firstDispatch,ev?.at,ev?.route.join(' → '),ev?.km,ev?.cost,ev?.correct,ev?.tag,ev?.legs.map(l=>`${l.from}-${l.to}:${l.km}km/RM${l.cost}`).join(';')]);
  }
  return '\uFEFF'+rows.map(r=>r.map(cell).join(',')).join('\r\n');
}
export function deliveryHTML(report){
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>GraphQuest learning receipt</title><style>body{font:15px/1.6 system-ui,sans-serif;color:#183b39;max-width:960px;margin:35px auto;padding:20px}aside{border:2px solid #aa762a;padding:14px;background:#fff7dc}table{border-collapse:collapse;width:100%;font-size:12px}td,th{border:1px solid #9eaaa8;padding:7px;text-align:left}section{margin:25px 0;break-inside:avoid}small{overflow-wrap:anywhere}@media print{body{margin:0;padding:0}thead{display:table-header-group}}</style><body><p>CYE-MATHVERSE / LEARNING RECEIPT</p><h1>GraphQuest: Delivery Club</h1><aside><strong>LOCAL / UNVERIFIED</strong> — Editable evidence from this browser. No school submission or server verification.</aside><p>${h(report.profile.alias||'Anonymous courier')} · ${h(report.profile.classCode||'No class')}<br>${report.completed}/6 missions · ${report.xp} XP<br>Started: ${h(report.startedAt)}<br>Completed: ${h(report.completedAt||'In progress')}</p><p>${h(report.note)}</p>${report.missions.map(m=>`<section><h2>${h(m.id)} · ${h(m.title)}</h2><p>SP ${h(m.sp.join(', '))} · ${h(m.goal)}${m.budget?` · RM${m.budget} budget`:''}<br>Start ${h(m.start)} → finish ${h(m.end)}; required stops ${h(m.required.join(', ')||'none')}<br>${m.done?'Completed':'In progress'}; ${m.attempts} dispatches; ${m.hints} hints; first-dispatch success: ${m.firstDispatch?'yes':'no'}</p>${m.completion?`<p>First successful route: <strong>${h(m.completion.route.join(' → '))}</strong> (${m.completion.km} km, RM${m.completion.cost}).</p>`:''}<table><thead><tr><th>Route</th><th>km</th><th>RM</th><th>Outcome</th><th>Edge calculations</th></tr></thead><tbody>${m.events.map(ev=>`<tr><td>${h(ev.route.join(' → '))}</td><td>${ev.km}</td><td>${ev.cost}</td><td>${h(ev.tag)}</td><td>${h(ev.legs.map(l=>`${l.from}–${l.to}: ${l.km} km / RM${l.cost}`).join('; '))}</td></tr>`).join('')||'<tr><td colspan="5">No dispatch yet</td></tr>'}</tbody></table></section>`).join('')}<small>Receipt ${h(report.receiptId)} · Pack ${h(report.version)}. Latest 100 events per mission retained; total counts and first successful routes are preserved. Browser Print → Save as PDF produces a local copy.</small></body></html>`;
}
