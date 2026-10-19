import { questions, stages, PACK_VERSION } from './questions.js';
import { decode, contributions, targetValue, working } from '../../../packages/math/bases.js';
import { createRun, currentStage, currentQuestion, summary, attempt, markGuided, hint, nextQuestion, validateRun } from '../../../packages/session/run.js';
import { escapeHTML as h, receipt, receiptCSV, receiptHTML } from '../../../packages/reports/receipt.js';

const KEY = 'cye-mathverse.cyber-code-breaker.v1';
const $ = selector => document.querySelector(selector);
let run, protectedSave = false, originalSave = '', saveAvailable = true, feedback = null;
let displayId, showHint = false, finalVisible = false;
try {
  originalSave = localStorage.getItem(KEY) || '';
  if (originalSave) run = validateRun(JSON.parse(originalSave), questions, PACK_VERSION);
} catch (error) {
  if (originalSave) protectedSave = true;
  else saveAvailable = false;
}
const fresh = !run;
run ||= createRun(questions, PACK_VERSION);
displayId = currentQuestion(run, questions).id;
finalVisible = !!run.completedAt;

function download(name, data, type) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = name; document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}
function save() {
  if (!protectedSave) {
    try { localStorage.setItem(KEY, JSON.stringify(run)); saveAvailable = true; }
    catch { saveAvailable = false; }
  }
  $('#save-status').textContent = protectedSave ? 'Original save protected · new play is temporary' : saveAvailable ? 'Autosaved · this browser only' : 'Saving unavailable · download a backup';
  const warning = $('#storage-warning');
  warning.hidden = saveAvailable && !protectedSave;
  if (protectedSave) {
    warning.innerHTML = 'An unreadable or older save is protected. New play stays in memory. <button id="raw-backup">Download original save</button><button id="use-new-save">Use this new save</button>';
    $('#raw-backup').onclick = () => download('cyber-original-save.json', originalSave, 'application/json');
    $('#use-new-save').onclick = () => { if (confirm('Replace the unreadable save with your current run? Download the original first if you need it.')) { protectedSave = false; save(); } };
  } else if (!saveAvailable) warning.textContent = 'Browser storage is unavailable. You can keep playing, but progress may disappear on refresh. Use Settings → Download save backup.';
}
function activeQ() { return questions.find(q => q.id === displayId); }
function baseHTML(code, base) { return `${h(code)}<sub>${base}</sub>`; }
function showDialog(id) { const dialog = document.getElementById(id); if (!dialog.open) dialog.showModal(); }

function sceneSVG(q) {
  const stage = q.stage, entry = run.entries[q.id], sectorSolved = questions.filter(x => x.stage === stage && run.entries[x.id].done).length;
  const parsed = decode(entry.draft, q.targetBase);
  const reveal = run.mode === 'guided' || entry.done || feedback;
  const value = parsed.ok && reveal ? parsed.value : 0;
  const power = Math.max(0, Math.min(1, value / Math.max(1, targetValue(q))));
  const col = stages[stage].color, gateOpen = sectorSolved === 2, x = gateOpen ? 438 : entry.done ? 283 : 174;
  const buildings = [[12,145,50],[70,105,34],[108,125,53],[172,72,41],[230,128,49],[290,97,29],[327,134,49],[390,85,45],[452,123,55],[524,95,58]];
  return `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#0b1728"/><stop offset="1" stop-color="#1b3346"/></linearGradient><linearGradient id="floor" x2="0" y2="1"><stop stop-color="#1c3042"/><stop offset="1" stop-color="#0b1827"/></linearGradient><radialGradient id="aura"><stop stop-color="${col}" stop-opacity=".16"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs><rect width="600" height="360" fill="url(#sky)"/><circle cx="390" cy="150" r="200" fill="url(#aura)"/>
  ${Array.from({length:27},(_,i)=>`<circle cx="${(i*97+31)%600}" cy="${(i*43+20)%170}" r="${i%3===0?1.5:.7}" fill="#9db9d5" opacity=".5"/>`).join('')}
  ${buildings.map(([bx,bh,bw],i)=>`<rect x="${bx}" y="${220-bh}" width="${bw}" height="${bh}" fill="${i%2?'#132a3c':'#102332'}" stroke="#284052"/><path d="M${bx+8} ${230-bh}h${bw-16}" stroke="${col}" opacity=".35"/>${Array.from({length:4},(_,j)=>`<rect x="${bx+8}" y="${245-bh+j*18}" width="4" height="7" fill="#526d7d" opacity=".4"/>`).join('')}`).join('')}
  <path d="M0 223H600V360H0Z" fill="url(#floor)"/><g stroke="#315069" stroke-width=".7" opacity=".5">${[0,90,180,270,360,450,540,630].map(a=>`<path d="M300 215L${a} 360"/>`).join('')}${[235,258,291,335].map(y=>`<path d="M0 ${y}H600"/>`).join('')}</g>
  <path d="M50 269L190 238H437L556 267L419 307H182Z" fill="#162b3a" stroke="#49667a" stroke-width="2"/><path d="M58 280L184 320H424L555 281V268L419 307H182L58 269Z" fill="#0e1b2b" stroke="#263b50"/>
  <path d="M106 274H260L291 250H435" fill="none" stroke="#2d4354" stroke-width="7"/><path d="M106 274H${106+154*power}${power===1?'L291 250H435':''}" fill="none" stroke="${col}" stroke-width="4"/><path d="M210 292H420" stroke="${col}" opacity="${gateOpen?.8:.12}" stroke-width="2"/>
  <g transform="translate(82 193)"><path d="M0 18l32-13 28 16-32 16Z" fill="#284758" stroke="#5b8595"/><path d="M0 18v50l28 15V37Z" fill="#183442" stroke="#456175"/><path d="M28 37l32-16v49L28 83Z" fill="#122c3e" stroke="#456175"/><path d="M6 29l16 8v28L6 57Z" fill="#091c29"/><path d="M8 ${57-power*23}l12 6v${power*23}l-12-6Z" fill="${col}"/><circle cx="44" cy="48" r="5" fill="${entry.done?col:'#425463'}"/></g>
  <g transform="translate(354 117)"><path d="M0 13L70 0 104 18v132l-33 16L0 147Z" fill="#122537" stroke="#426075" stroke-width="2"/><path d="M9 24L66 13V148L9 136Z" fill="#081622" stroke="${col}" opacity=".8"/><path d="M76 14L95 24V142L76 151Z" fill="#243c4b"/><path d="M16 32L59 23V133L16 124Z" fill="${gateOpen?'#c4ffb5':'#1d4055'}" opacity="${gateOpen?.5:.8}"/>
  ${gateOpen?'<path d="M28 76l10 10 19-27" fill="none" stroke="#e1ffd0" stroke-width="4"/>':`<g stroke="${col}" stroke-width="2" opacity=".65">${[45,64,83,102].map(y=>`<path d="M16 ${y}l43-9"/>`).join('')}</g><rect x="29" y="67" width="20" height="22" rx="4" fill="#0d2232" stroke="${col}"/><path d="M34 67v-6a5 5 0 0110 0v6" fill="none" stroke="${col}"/>`}
  <circle cx="85" cy="56" r="3" fill="${sectorSolved>=1?col:'#526171'}"/><circle cx="85" cy="72" r="3" fill="${sectorSolved>=2?col:'#526171'}"/></g>
  ${stage===1?`<path d="M230 261h105v20H230Z" fill="${gateOpen?col:'#1b2b38'}" opacity=".55" stroke="${col}" stroke-dasharray="${gateOpen?'0':'6 5'}"/>`:''}
  ${stage===2?`<path d="M240 190V128m55 62V110" stroke="#6b80a0" stroke-width="5"/><circle class="pulse" cx="240" cy="128" r="10" fill="${col}" opacity=".7"/><circle cx="295" cy="110" r="10" fill="${sectorSolved?col:'#385266'}"/><path d="M240 128L295 110" stroke="${col}" stroke-dasharray="4 5"/>`:''}
  ${stage===4?'<path d="M230 270l23-50h51l-12 38h35" fill="none" stroke="#ff9bd0" stroke-width="3" opacity=".6"/>':''}
  <g class="float-pip" transform="translate(${x} 207)"><ellipse cx="0" cy="60" rx="26" ry="7" fill="#070e18" opacity=".65"/><path d="M-11 44l-6 10m28-10l6 10" stroke="${run.accent}" stroke-width="7" stroke-linecap="round"/><rect x="-26" y="-2" width="52" height="42" rx="13" fill="${run.accent}"/><rect x="-18" y="6" width="36" height="22" rx="8" fill="#123045"/><rect x="-11" y="12" width="6" height="10" rx="3" fill="#e5fff6"/><rect x="5" y="12" width="6" height="10" rx="3" fill="#e5fff6"/><path d="M0-2v-10" stroke="${run.accent}" stroke-width="3"/><circle cx="0" cy="-15" r="4" fill="#d7ff94"/><path d="M-27 18l-8 9m62-9l8-5" stroke="${run.accent}" stroke-width="6" stroke-linecap="round"/></g>
  <g font-family="monospace" font-size="9" fill="#a4bdcf"><text x="24" y="28">CYBER-LAB // SECTOR 0${stage+1}</text><text x="24" y="44" fill="${col}">${gateOpen?'ACCESS GRANTED':'RESTORE THE SIGNAL'}</text><text x="24" y="341">${reveal && parsed.ok?`POWER ${value} / ${targetValue(q)}`:'POWER PREVIEW HIDDEN'}</text><text x="465" y="341">${sectorSolved}/2 CIRCUITS</text></g></svg>`;
}

function renderWorld(q) {
  const stage = stages[q.stage], solved = questions.filter(x => x.stage === q.stage && run.entries[x.id].done).length;
  document.documentElement.style.setProperty('--accent', stage.color);
  document.documentElement.style.setProperty('--pip', run.accent);
  document.body.classList.toggle('reduce-motion', run.reducedMotion);
  $('#sector-label').textContent = `SECTOR 0${q.stage+1} / 06`;
  $('#sector-title').textContent = stage.title;
  $('#world-status').textContent = solved === 2 ? '✓ ACCESS GRANTED' : `${solved}/2 CIRCUITS ONLINE`;
  $('#scene').innerHTML = sceneSVG(q);
  $('#scene').setAttribute('aria-label', `${stage.title}: ${solved} of 2 circuits restored. ${solved===2?'The gate is open.':'Pip waits beside the locked gate.'}`);
  $('#pip-message').textContent = solved === 2 ? stage.effect : stage.story;
  $('#mission-effect').textContent = solved === 2 ? `Badge earned: ${stage.badge}` : stage.subtitle;
}
function refreshPreview(q) {
  const entry = run.entries[q.id], parts = contributions(entry.draft, q.targetBase), parsed = decode(entry.draft, q.targetBase);
  const reveal = run.mode === 'guided' || entry.done;
  if (run.mode === 'guided' && !entry.done) markGuided(run, q);
  const total = $('#power-total');
  if (total) total.textContent = reveal && parsed.ok ? `${parsed.value} units` : reveal ? 'Invalid code' : 'Hidden until check';
  const eq = $('#equation');
  if (eq) eq.textContent = reveal && parsed.ok ? parts.map(p => `${p.digit} × ${p.weight}`).join(' + ') + ` = ${parsed.value}` : 'Read places from right to left: 1, base, base²…';
  renderWorld(q); save();
}
function hintText(q) {
  const extras = q.operation ? 'Decode each supply first, then apply the operation. ' : '';
  return `${extras}In base ${q.targetBase}, each digit is 0–${q.targetBase-1}. The rightmost place is 1; multiply by ${q.targetBase} each step to the left. Divide the required value by the largest place, then work with the remainder. A leading zero adds no value.`;
}
function renderPuzzle() {
  const q = activeQ(), entry = run.entries[q.id], stage = stages[q.stage];
  const safeDigits = /^\d+$/.test(entry.draft) && entry.draft.length <= q.width ? entry.draft.padStart(q.width, '0') : '0'.repeat(q.width);
  $('#lock-counter').textContent = `LOCK ${q.id.slice(1)} / 12 · ${q.difficulty.toUpperCase()}`;
  $('#mode-tag').textContent = run.mode === 'guided' ? 'GUIDED EXPLORATION' : 'INDEPENDENT';
  $('#challenge').innerHTML = `<div class="challenge-body">
    ${q.stage===4?`<div class="choices" aria-label="Choose a maze lock">${questions.filter(x=>x.stage===4).map(x=>`<button data-lock="${x.id}" aria-pressed="${x.id===q.id}">${run.entries[x.id].done?'✓ ':''}${h(x.title)}</button>`).join('')}</div>`:''}
    <h3 id="puzzle-title">${h(q.title)}</h3><p class="prompt">${h(q.prompt)}</p>
    <div class="signal"><div><span>INCOMING SIGNAL</span><br><strong>${baseHTML(q.source,q.sourceBase)}${q.operation?` ${q.operation} ${baseHTML(q.operand,q.operandBase)}`:''}</strong></div><span class="arrow">→</span><div><span>OUTPUT</span><br><strong>BASE ${q.targetBase}</strong></div></div>
    <div class="board-label"><span>ASSEMBLE YOUR CODE</span><span>DIGITS 0–${q.targetBase-1}</span></div>
    <div class="chips" aria-label="Place-value chips">${safeDigits.split('').map((digit,i)=>{const power=q.width-i-1,weight=q.targetBase**power;return `<div class="chip"><span class="weight">${q.targetBase}<sup>${power}</sup> = ${weight}</span><button id="plus-${i}" data-chip="${i}" data-delta="1" aria-label="Increase ${weight}s place" ${entry.done?'disabled':''}>+</button><span class="digit" id="digit-${i}">${digit}</span><button id="minus-${i}" data-chip="${i}" data-delta="-1" aria-label="Decrease ${weight}s place" ${entry.done?'disabled':''}>−</button><span class="contribution">× ${weight}</span></div>`;}).join('')}</div>
    <div class="power-preview"><span>${run.mode==='guided'?'LIVE POWER':'INDEPENDENT CHECK'}</span><strong id="power-total"></strong></div><p class="equation" id="equation"></p>
    <details class="type-code"><summary>Prefer typing? Enter the whole code</summary><label>Base ${q.targetBase} code<input id="raw-code" type="text" inputmode="numeric" autocomplete="off" maxlength="16" value="${h(entry.draft)}" ${entry.done?'disabled':''}></label><small>Leading zeros are accepted. The whole code is checked exactly as typed.</small></details>
    <div class="actions"><button id="connect" class="primary" ${entry.done?'disabled':''}>${entry.done?'✓ Circuit restored':'Connect circuit'} <span>↗</span></button><button id="hint" class="quiet" ${entry.done?'disabled':''}>Hint ?</button></div>
    <div id="feedback" role="status" aria-live="polite" ${feedback?'':'hidden'} class="feedback ${feedback?.correct?'correct':''}">${feedback?h(feedback.message):''}</div>
    ${showHint?`<div class="hint-box"><strong>Pip’s field note</strong><br>${h(hintText(q))}<br><span lang="zh-Hans">最右边的位值是 1，每往左一位就乘以进制。先算每一位的贡献，再相加。</span></div>`:''}
    ${entry.done?`<p class="fine">${h(working(q))}</p><button id="next" class="primary wide next">${run.completedAt?'Bring Pip home →':questions.filter(x=>x.stage===q.stage&&!run.entries[x.id].done).length?'Next circuit →':`Sector restored · Continue →`}</button>`:''}
    <p class="fine">${entry.done?'+100 XP · ':'No timer. No lost lives. '}SK 2.1 · SP ${q.sp} · ${entry.guided?'Guided exposure recorded':'Hints remain available'}</p>
  </div>`;
  $('[data-lock]') && document.querySelectorAll('[data-lock]').forEach(button=>button.onclick=()=>{
    displayId=button.dataset.lock;run.selected=displayId;feedback=null;showHint=false;render();
  });
  document.querySelectorAll('[data-chip]').forEach(button=>button.onclick=()=>{
    const currentDigits=/^\d+$/.test(entry.draft)&&entry.draft.length<=q.width?entry.draft.padStart(q.width,'0'):'0'.repeat(q.width);
    const digits=currentDigits.split(''); const i=Number(button.dataset.chip);
    digits[i]=String((Number(digits[i])+Number(button.dataset.delta)+q.targetBase)%q.targetBase);
    entry.draft=digits.join(''); feedback=null; const id=button.id;renderPuzzle();document.getElementById(id)?.focus({preventScroll:true});
  });
  $('#raw-code').oninput=event=>{
    entry.draft=event.target.value;feedback=null;$('#feedback').hidden=true;
    const normalized=entry.draft.padStart(q.width,'0');
    for(let i=0;i<q.width;i++) $('#digit-'+i).textContent=normalized.length<=q.width?normalized[i]:'·';
    refreshPreview(q);
  };
  $('#raw-code').onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();$('#connect').click();}};
  $('#connect').onclick=()=>{
    feedback=attempt(run,q,entry.draft,questions);render();
    if(feedback.correct) $('#next')?.focus({preventScroll:true});
  };
  $('#hint').onclick=()=>{if(!showHint)hint(run,q);showHint=true;renderPuzzle();$('#hint')?.focus({preventScroll:true});};
  if($('#next')) $('#next').onclick=()=>{
    if(run.completedAt){finalVisible=true;render();$('#completion').scrollIntoView({behavior:run.reducedMotion?'auto':'smooth'});}
    else{nextQuestion(run,questions);displayId=run.selected;feedback=null;showHint=false;render();$('#puzzle').focus({preventScroll:true});if(innerWidth<700)$('#puzzle').scrollIntoView({behavior:run.reducedMotion?'auto':'smooth'});}
  };
  refreshPreview(q);
}
function render() {
  const s=summary(run,questions), current=currentStage(run,questions);
  $('#xp').innerHTML=`${s.xp.toLocaleString()} <small>XP</small>`;
  $('#progress-label').textContent=`${s.solved} / 12 locks`;$('#progress').value=s.solved;
  $('#stage-map').innerHTML=stages.map((stage,i)=>`<li class="${i<current?'done':i===current?'active':''}" ${i===current?'aria-current="step"':''}><b>${i<current?'✓':String(i+1).padStart(2,'0')}</b><span>${h(stage.short)}<small>${i<current?'RESTORED':i===current?'IN PROGRESS':'LOCKED'}</small></span></li>`).join('');
  renderPuzzle();
  $('#completion').hidden=!finalVisible;
  if(finalVisible){$('#completion').innerHTML=`<p class="eyebrow">MISSION COMPLETE / PIP IS HOME</p><h2>You cracked the code.</h2><p>Six sectors restored. Twelve signals decoded.<br>A very happy robot — thanks to you.</p><div class="badges">${stages.map(x=>`<span>✓ ${h(x.badge)}</span>`).join('')}</div><p><strong>${s.xp} XP</strong> · ${s.independentFirst} independent first answers · ${s.hints} hints<br><small>Rewards celebrate completion. Your report keeps the learning details.</small></p><button id="victory-report" class="primary">Get my learning receipt ↗</button>`;$('#victory-report').onclick=openReport;}
}
function openReport() {
  const s=summary(run,questions);
  $('#report-content').innerHTML=`<p class="eyebrow">CYE-MATHVERSE / TEACHER & LEARNER VIEW</p><h2>Your mission log.</h2><div class="notice">LOCAL / UNVERIFIED · ${run.completedAt?'Completed':'In progress'} · No data has been submitted online.</div><p>${h(run.profile.alias||'Anonymous agent')} · ${h(run.profile.classCode||'No class supplied')}<br><strong>${s.solved}/12 restored · ${s.xp} XP</strong><br>${s.independentFirst} independent first answers · ${s.guided} guided locks · ${s.hints} hints</p><div class="table-wrap"><table><thead><tr><th>Lock / SP</th><th>Restored</th><th>Tries</th><th>Hints</th><th>Guided</th><th>Independent first</th></tr></thead><tbody>${questions.map(q=>{const e=run.entries[q.id];return `<tr><td>${q.id} / ${q.sp}</td><td>${e.done?'✓':'—'}</td><td>${e.attempts}</td><td>${e.hints}</td><td>${e.guided?'Yes':'No'}</td><td>${e.independentFirst?'Yes':'No'}</td></tr>`;}).join('')}</tbody></table></div><p class="fine">Content awaiting teacher review. Intended KSSM links are based on the KPM/BPK 2018 document. This is a small formative slice, not an SPM score or full-chapter mastery certificate.</p>`;
  $('#question-review').innerHTML='';showDialog('report-dialog');
}

$('#start-form').onsubmit=event=>{
  event.preventDefault();const data=new FormData(event.target);
  run=createRun(questions,PACK_VERSION,{alias:data.get('alias'),classCode:data.get('classCode')},data.get('mode'));
  displayId=questions[0].id;feedback=null;showHint=false;finalVisible=false;$('#briefing').close();render();
};
$('#help-button').onclick=()=>showDialog('help');
$('#teacher-button').onclick=openReport;
$('#settings-button').onclick=()=>{
  $('#mode-select').value=run.mode;$('#motion-toggle').checked=run.reducedMotion;$('#accent-select').value=run.accent;showDialog('settings');
};
document.querySelectorAll('[data-close]').forEach(button=>button.onclick=()=>document.getElementById(button.dataset.close).close());
$('#mode-select').onchange=event=>{run.mode=event.target.value;feedback=null;render();};
$('#motion-toggle').onchange=event=>{run.reducedMotion=event.target.checked;render();};
$('#accent-select').onchange=event=>{run.accent=event.target.value;render();};
$('#backup-button').onclick=()=>download('cyber-save-backup.json',JSON.stringify(run,null,2),'application/json');
$('#import-file').onchange=async event=>{
  const file=event.target.files[0];if(!file)return;
  try{
    if(file.size>2000000)throw new Error('This backup is too large.');
    const imported=validateRun(JSON.parse(await file.text()),questions,PACK_VERSION);
    if(confirm('Replace this game’s current run with this backup? Download your current backup first if needed.')){
      run=imported;protectedSave=false;displayId=currentQuestion(run,questions).id;feedback=null;showHint=false;finalVisible=!!run.completedAt;$('#settings').close();render();
    }
  }catch(error){alert(`Could not restore: ${error.message}`);}finally{event.target.value='';}
};
$('#forget-button').onclick=()=>{
  if(!confirm('Delete this game’s local progress and alias from this browser? Export first to keep your evidence.'))return;
  try{localStorage.removeItem(KEY);}catch{}
  protectedSave=false;run=createRun(questions,PACK_VERSION);displayId=questions[0].id;feedback=null;showHint=false;finalVisible=false;
  $('#settings').close();render();showDialog('briefing');
};
$('#new-run-button').onclick=()=>{
  if(confirm('Start a new mission? Download your current receipt or backup first to keep it.'))showDialog('briefing');
};
function exportReport(kind) {
  // Exported receipts contain answer workings, so future attempts are no longer independent.
  for(const q of questions)if(!run.entries[q.id].done)markGuided(run,q);
  save();const report=receipt(run,questions),name=`cyber-receipt-${run.runId.slice(0,8)}`;
  if(kind==='html')download(name+'.html',receiptHTML(report),'text/html;charset=utf-8');
  if(kind==='json')download(name+'.json',JSON.stringify(report,null,2),'application/json');
  if(kind==='csv')download(name+'.csv',receiptCSV(report),'text/csv;charset=utf-8');
  openReport();
}
$('#html-report').onclick=()=>exportReport('html');$('#json-report').onclick=()=>exportReport('json');$('#csv-report').onclick=()=>exportReport('csv');
$('#review-questions').onclick=()=>{
  for(const q of questions)if(!run.entries[q.id].done)markGuided(run,q);save();
  $('#question-review').innerHTML=questions.map(q=>`<details><summary>${q.id} · ${h(q.title)} · SP ${q.sp}</summary><p>${h(q.prompt)}</p><p>${h(working(q))}</p><p class="fine">Original authored item · exact answer checked by automated tests · teacher review pending.</p></details>`).join('');
};
render();
if(fresh)showDialog('briefing');
