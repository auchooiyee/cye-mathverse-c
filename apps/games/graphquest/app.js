import {missions} from './missions.js';
import {inspectRoute,roadBetween,neighbours} from '../../../packages/math/network.js';
import {newRun,validateSave,dispatch,totals,unlocked,SAVE_KEY} from './state.js';
import {escapeHTML as h,deliveryReport,deliveryHTML,deliveryCSV} from '../../../packages/reports/delivery.js';
const $=s=>document.querySelector(s);
let run,rawSave='',protectedSave=false,storageOK=true,feedback=null,busy=false,paused=false,finishTravel=null;
try{rawSave=localStorage.getItem(SAVE_KEY)||'';if(rawSave)run=validateSave(JSON.parse(rawSave));}
catch{if(rawSave)protectedSave=true;else storageOK=false;}
const firstVisit=!run;run ||= newRun();
const mission=()=>missions[run.selected],entry=()=>run.entries[mission().id];
const reduced=()=>run.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches;
function download(name,data,type){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);}
function save(){
  if(!protectedSave){try{localStorage.setItem(SAVE_KEY,JSON.stringify(run));storageOK=true;}catch{storageOK=false;}}
  $('#save-status').textContent=protectedSave?'Original save protected · new play is temporary':storageOK?'● Autosaved · this browser only':'Saving unavailable · export a backup';
  const warning=$('#storage-warning');warning.hidden=storageOK&&!protectedSave;
  if(protectedSave){warning.innerHTML='An unreadable or older GraphQuest save is protected. New play stays in memory. <button id="raw-backup">Download original</button><button id="replace-save">Use this new save</button>';
    $('#raw-backup').onclick=()=>download('graphquest-original-save.json',rawSave,'application/json');
    $('#replace-save').onclick=()=>{if(confirm('Replace the protected GraphQuest save? Download the original first if you need it.')){protectedSave=false;save();}};
  }else if(!storageOK)warning.textContent='Browser storage is unavailable. You can keep playing. Download a backup in Settings before closing or refreshing.';
}
function show(id){if(busy){paused=true;$('#pause').textContent='Resume van';}const d=document.getElementById(id);if(!d.open)d.showModal();}
function building(n){
  const x=n.x-28,y=n.y-74;
  if(n.kind==='park')return `<g transform="translate(${x} ${y})"><ellipse cx="29" cy="41" rx="38" ry="19" fill="#c5d9ad"/><path d="M13 16v31m27-35v32" stroke="#8b8760" stroke-width="5"/><circle cx="13" cy="14" r="17" fill="#8dbb8a"/><circle cx="40" cy="9" r="20" fill="#719f73"/><circle cx="36" cy="5" r="8" fill="#9ec38e"/></g>`;
  if(n.kind==='festival')return `<g transform="translate(${x} ${y})"><path d="M-4 22L29-7 62 22Z" fill="#dd9d6c"/><path d="M8 22v30h42V22" fill="#fff0ce"/><path d="M19 22v30m19-30v30" stroke="#e4b978" stroke-width="8"/><path d="M-8 4h76" stroke="#6e8a6a"/><path d="M-4 4l7 10L10 4m8 0l7 10 7-10m8 0l7 10 7-10" fill="#e6bd56"/></g>`;
  const color=n.kind==='clinic'?'#dfaf9b':n.kind==='school'?'#c2b2cb':n.kind==='station'?'#a8b9c2':n.kind==='depot'?'#afc7b0':'#e4c39b';
  return `<g transform="translate(${x} ${y})"><ellipse cx="29" cy="53" rx="38" ry="8" fill="#b6c6a3" opacity=".5"/><path d="M0 9l28-12 31 14-28 13Z" fill="#fff4d5"/><path d="M0 9v38l31 12V24Z" fill="${color}"/><path d="M31 24l28-13v36L31 59Z" fill="#8ea68e"/><path d="M6 19l8 3v9l-8-3Zm14 5l6 2v9l-6-3Z" fill="#fbf6df"/><path d="M9 36l12 4v15L9 51Z" fill="#41665a"/><path d="M38 30l7-3v10l-7 3Zm12-5l5-2v10l-5 3Z" fill="#d7e4cb"/>${n.kind==='clinic'?'<path d="M17 8v13m-6-7h12" stroke="#bf5d46" stroke-width="4"/>':n.kind==='bakery'||n.kind==='cafe'?'<path d="M-3 27l33 13" stroke="#fff2c3" stroke-width="8"/><path d="M1 29l25 10" stroke="#c87956" stroke-width="4" stroke-dasharray="5 4"/>':''}</g>`;
}
function mapMarkup(){
  const m=mission(),e=entry(),r=inspectRoute(m,e.route),current=e.route.at(-1),metric=m.goal==='distance'?'km':'cost';
  const chosen=new Set(r.legs.map(l=>[l.from,l.to].sort().join('')));
  const weightLabels=[];
  const edgeSVG=m.edges.map(edge=>{
    const a=m.nodes.find(n=>n.id===edge.a),b=m.nodes.find(n=>n.id===edge.b),selected=chosen.has([a.id,b.id].sort().join(''));
    const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy),mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
    const color=edge.closed?'#b27d6c':selected?'#c4862a':'#719584';
    const arrow=edge.directed?`<path d="M${a.x+dx*.62} ${a.y+dy*.62}L${a.x+dx*.73} ${a.y+dy*.73}" stroke="${color}" stroke-width="3" marker-end="url(#arrow)"/>`:'';
    // Weights stay on their road; direction arrows sit farther along the edge.
    const lx=mx,ly=my;
    weightLabels.push(`<span class="road-weight ${edge.closed?'closed':''}" style="left:${lx/760*100}%;top:${ly/480*100}%" aria-hidden="true">${edge.closed?'×':edge[metric]}</span>`);
    return `<g><path d="M${a.x} ${a.y}L${b.x} ${b.y}" stroke="#fafaf0" stroke-width="17"/><path d="M${a.x} ${a.y}L${b.x} ${b.y}" stroke="${color}" stroke-width="${selected?8:5}" ${edge.closed?'stroke-dasharray="8 6"':''}/>${arrow}</g>`;
  }).join('');
  const start=m.nodes.find(n=>n.id===(feedback?.legs?e.route.at(-1):m.start));
  return `<svg viewBox="0 0 760 480" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#a4b88b" opacity=".2"/></pattern><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5 0 7Z" fill="#315e4f"/></marker></defs><rect width="760" height="480" fill="#e8eedb"/><rect width="760" height="480" fill="url(#dots)"/><path d="M-20 105Q140 30 185 85T370 55T570 70T800 10" fill="none" stroke="#d4dfbd" stroke-width="55"/><path d="M-30 402Q180 440 355 425T800 450" fill="none" stroke="#c2dbd4" stroke-width="39"/><path d="M-30 402Q180 440 355 425T800 450" fill="none" stroke="#e1f0e5" stroke-width="2" stroke-dasharray="25 20"/>
  <g opacity=".7">${[[45,115],[170,405],[360,45],[550,62],[710,365],[610,405],[45,365]].map(([x,y])=>`<ellipse cx="${x}" cy="${y+9}" rx="16" ry="7" fill="#c3d6aa"/><path d="M${x} ${y}v13" stroke="#85966c" stroke-width="3"/><circle cx="${x}" cy="${y-6}" r="13" fill="#9cbe89"/>`).join('')}</g>
  ${edgeSVG}${m.nodes.map(building).join('')}
  <g id="van" transform="translate(${start.x} ${start.y-34})"><ellipse cy="15" rx="23" ry="6" fill="#416850" opacity=".2"/><path d="M-24-9h30v8h10l10 9v10h-50Z" fill="#efb950" stroke="#b98733"/><path d="M8 1h7l7 7H8Z" fill="#e9f4dd"/><path d="M-18-3h16" stroke="#fff2bd" stroke-width="3"/><circle cx="-14" cy="18" r="6" fill="#244c40"/><circle cx="16" cy="18" r="6" fill="#244c40"/><circle cx="-14" cy="18" r="2" fill="#bfcfb8"/><circle cx="16" cy="18" r="2" fill="#bfcfb8"/></g>
  <text x="20" y="463" font-size="9" font-family="monospace" fill="#607c65">GRAPHQUEST / ${h(m.district.toUpperCase())}</text></svg>
  ${weightLabels.join('')}
  ${m.nodes.map(n=>`<button class="map-stop ${n.id===current?'current':''} ${m.required.includes(n.id)?'required-stop':''}" data-stop="${n.id}" style="left:${n.x/760*100}%;top:${n.y/480*100}%" aria-label="${n.id}: ${h(n.name)}${n.id===m.start?', start':''}${n.id===m.end?', finish':''}${m.required.includes(n.id)?', required parcel stop':''}" ${busy?'disabled':''}>${n.id}<span class="stop-name">${h(n.name)}</span>${m.required.includes(n.id)?`<span class="parcel" aria-hidden="true">${e.route.includes(n.id)?'✓':'□'}</span>`:''}</button>`).join('')}`;
}
function render(){
  const m=mission(),e=entry(),r=inspectRoute(m,e.route),s=totals(run),metric=m.goal==='distance'?'km':'cost';
  document.body.classList.toggle('reduce-motion',run.reducedMotion);
  $('#xp').innerHTML=`${s.xp} <small>XP</small>`;$('#overall').textContent=`${s.completed} of 6 deliveries complete`;$('#progress').value=s.completed;
  $('#missions').innerHTML=missions.map((item,i)=>`<button class="mission-button" data-mission="${i}" ${i===run.selected?'aria-current="step"':''} ${i>unlocked(run)||busy?'disabled':''}><b>${run.entries[item.id].done?'✓':String(i+1).padStart(2,'0')}</b><span>${h(item.title)}<small>${h(item.district)} · ${i>unlocked(run)?'Locked':run.entries[item.id].done?'Delivered':'Ready'}</small></span></button>`).join('');
  $('#district-number').textContent=m.chapter;$('#district').textContent=m.district;$('#map-status').textContent=busy?'ON THE ROAD':e.done?'DELIVERY EARNED':'PLANNING';
  $('#map').innerHTML=mapMarkup();$('#map').setAttribute('aria-label',`${m.district} network. Start ${m.start}, finish ${m.end}. Road weights in ${metric==='km'?'kilometres':'ringgit'}.`);
  $('#special-key').textContent=m.edges.some(e=>e.closed)?'× Closed road':m.edges.some(e=>e.directed)?'→ One-way only':'';
  $('#weight-caption').textContent=`ROAD LABELS = ${metric==='km'?'DISTANCE (km)':'CHARGES (RM)'}`;
  $('#story').textContent=m.story;$('#mission-number').textContent=`DELIVERY ${String(run.selected+1).padStart(2,'0')} / 06 · ${m.parcel.toUpperCase()}`;
  $('#mission-title').textContent=m.title;$('#mission-prompt').textContent=m.prompt;
  $('#goal').innerHTML=`<strong>${m.goal==='budget'?`Stay within RM${m.budget}`:m.goal==='cost'?'Find a lowest-cost route':'Find a shortest route'}</strong>${m.start} → ${m.end}${m.required.length?` · Visit ${m.required.join(', ')}`:''}`;
  $('#route-length').textContent=`${r.legs.length} ROAD${r.legs.length===1?'':'S'}`;
  $('#route-trace').innerHTML=e.route.map((id,i)=>`${i?'<span>→</span>':''}<b>${id}</b>`).join('');
  const options=neighbours(m,e.route.at(-1));
  $('#choose-label').textContent=`FROM ${e.route.at(-1)} · CHOOSE A CONNECTED STOP`;
  $('#neighbours').innerHTML=options.map(n=>{const edge=roadBetween(m,e.route.at(-1),n.id);return `<button data-next-stop="${n.id}" ${busy?'disabled':''}>${n.id}<small>${metric==='km'?`${edge.km} km`:`RM${edge.cost}`}</small></button>`;}).join('')||'<p class="fine">No outgoing roads here. Undo a stop to replan.</p>';
  $('#distance').innerHTML=`${r.km} <small>km</small>`;$('#cost').innerHTML=`<small>RM</small> ${r.cost}`;
  $('#calculation').textContent=r.legs.length?`${r.legs.map(l=>l[metric]).join(' + ')} = ${metric==='km'?`${r.km} km`:`RM${r.cost}`}`:'Every road adds to your total.';
  $('#required').innerHTML=m.required.map(id=>`<span class="${e.route.includes(id)?'visited':''}">${e.route.includes(id)?'✓':'□'} Parcel stop ${id}</span>`).join('');
  $('#undo').disabled=$('#clear').disabled=busy||e.route.length<=1;$('#dispatch').disabled=busy||e.route.length<=1;$('#hint').disabled=busy;
  $('#settings').disabled=$('#new-run').disabled=busy;
  $('#dispatch').innerHTML=busy?'Van on the road…':e.done?'Test this route again <span>→</span>':'Send the van <span>→</span>';
  $('#feedback').hidden=!feedback||busy;$('#feedback').className=`feedback ${feedback?.correct?'success':''}`;$('#feedback').textContent=feedback?.message||'';
  $('#hint-content').hidden=!e.hints;$('#hint-content').textContent=`Route tip: ${m.hint}`;
  $('#next').hidden=!e.done||busy;$('#next').textContent=run.selected===5?'Open your courier passport →':'Next delivery →';
  $('#history-count').textContent=`(${e.attempts})`;
  $('#history-content').innerHTML=e.events.slice(-5).reverse().map(ev=>`<p><strong>${h(ev.route.join(' → '))}</strong><br>${ev.km} km · RM${ev.cost} · ${h(ev.tag.replaceAll('-',' '))}</p>`).join('')||'<p>No dispatches yet. Your last five routes will appear here; exports retain up to 100 per mission.</p>';
  $('#standards').textContent=`SK 5.1 · SP ${m.sp.join(', ')} · 150 XP per completed mission. Hints and retries are free.`;
  $('#travel-controls').hidden=!busy;
  document.querySelectorAll('[data-mission]').forEach(b=>b.onclick=()=>{run.selected=Number(b.dataset.mission);feedback=null;render();});
  document.querySelectorAll('[data-stop]').forEach(b=>b.onclick=()=>addStop(b.dataset.stop,`[data-stop="${b.dataset.stop}"]`));
  document.querySelectorAll('[data-next-stop]').forEach(b=>b.onclick=()=>addStop(b.dataset.nextStop));
  save();
}
function addStop(id,focusSelector){
  if(busy)return;const m=mission(),e=entry();
  const r=inspectRoute(m,[...e.route,id]);
  if(!r.valid){feedback={correct:false,message:r.message};render();return;}
  e.route.push(id);feedback=null;render();
  $(focusSelector||`[data-stop="${id}"]`)?.focus({preventScroll:true});
}
function animateRoute(result){
  const m=mission(),route=[...entry().route],legs=inspectRoute(m,route).legs;
  let frame,leg=0,elapsed=0,last=performance.now(),finished=false;
  const finish=()=>{if(finished)return;finished=true;cancelAnimationFrame(frame);busy=false;paused=false;finishTravel=null;feedback=result;render();$('#feedback').focus?.({preventScroll:true});};
  finishTravel=finish;
  if(reduced()||!legs.length){finish();return;}
  function tick(now){
    const dt=Math.min(now-last,100);last=now;if(!paused)elapsed+=dt;
    const l=legs[leg],duration=l.km*180;
    const a=m.nodes.find(n=>n.id===l.from),b=m.nodes.find(n=>n.id===l.to),t=Math.min(1,elapsed/duration);
    $('#van')?.setAttribute('transform',`translate(${a.x+(b.x-a.x)*t} ${a.y+(b.y-a.y)*t-34})`);
    $('#travel-status').textContent=`${paused?'Paused · ':''}${l.from} → ${l.to} · ${l.km} km`;
    if(t>=1){leg++;elapsed=0;if(leg===legs.length){finish();return;}}
    frame=requestAnimationFrame(tick);
  }
  frame=requestAnimationFrame(tick);
}
$('#dispatch').onclick=()=>{if(busy)return;const result=dispatch(run);busy=true;paused=false;feedback=null;render();$('#pause').textContent='Pause van';animateRoute(result);};
$('#pause').onclick=()=>{paused=!paused;$('#pause').textContent=paused?'Resume van':'Pause van';};
$('#finish-animation').onclick=()=>finishTravel?.();
document.addEventListener('visibilitychange',()=>{if(document.hidden&&busy){paused=true;$('#pause').textContent='Resume van';}});
$('#undo').onclick=()=>{if(!busy&&entry().route.length>1){entry().route.pop();feedback=null;render();}};
$('#clear').onclick=()=>{if(!busy){entry().route=[mission().start];feedback=null;render();}};
$('#hint').onclick=()=>{entry().hints++;render();$('#hint').focus({preventScroll:true});};
$('#next').onclick=()=>{
  if(busy)return;
  if(run.selected<missions.length-1){run.selected++;feedback=null;render();if(innerWidth<700)$('#map').scrollIntoView({behavior:reduced()?'auto':'smooth'});}
  else{showCompletion();$('#completion').scrollIntoView({behavior:reduced()?'auto':'smooth'});}
};
function showCompletion(){
  if(!run.completedAt)return;const s=totals(run);$('#completion').hidden=false;
  $('#completion').innerHTML=`<p class="eyebrow">ALL DELIVERIES COMPLETE</p><h2>You brought the town together.</h2><p>Six missions. A van full of good decisions.<br>${s.xp} XP · ${s.firstDispatch} first-dispatch successes · ${s.hints} hints</p><div class="badges">${missions.map(m=>`<span>✓ ${h(m.badge)}</span>`).join('')}</div><button id="final-report">Get my courier receipt ↗</button><p>Try a completed mission again to compare another route.</p>`;
  $('#final-report').onclick=openReport;
}
function openReport(){
  const report=deliveryReport(run,missions);
  $('#report-content').innerHTML=`<p class="eyebrow">COURIER PASSPORT / LEARNING EVIDENCE</p><h2>Your routes, your progress.</h2><div class="notice">LOCAL / UNVERIFIED · ${run.completedAt?'Completed':'In progress'}. No information has been submitted online.</div><p>${h(run.profile.alias||'Anonymous courier')} · ${h(run.profile.classCode||'No class')}<br><strong>${report.completed}/6 missions · ${report.xp} XP</strong></p><div class="table-wrap"><table><thead><tr><th>Mission</th><th>Delivered</th><th>Dispatches</th><th>Hints</th><th>First dispatch</th></tr></thead><tbody>${report.missions.map(m=>`<tr><td>${m.id} · ${h(m.title)}</td><td>${m.done?'Yes':'—'}</td><td>${m.attempts}</td><td>${m.hints}</td><td>${m.firstDispatch?'Yes':'No'}</td></tr>`).join('')}</tbody></table></div>`;show('report-dialog');
}
$('#welcome-form').onsubmit=event=>{event.preventDefault();const values=new FormData(event.target);run=newRun({alias:values.get('alias'),classCode:values.get('classCode')});feedback=null;$('#completion').hidden=true;$('#welcome').close();render();};
$('#help').onclick=()=>show('help-dialog');$('#report').onclick=openReport;
$('#settings').onclick=()=>{$('#reduce-motion').checked=run.reducedMotion;show('settings-dialog');};
$('#reduce-motion').onchange=event=>{run.reducedMotion=event.target.checked;render();};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());
$('#backup').onclick=()=>download('graphquest-save.json',JSON.stringify(run,null,2),'application/json');
$('#import').onchange=async event=>{
  const file=event.target.files[0];if(!file)return;
  try{if(file.size>2000000)throw new Error('File exceeds the 2 MB backup limit.');const restored=validateSave(JSON.parse(await file.text()));
    if(confirm('Replace the current GraphQuest run with this backup? Export your current save first if needed.')){run=restored;protectedSave=false;feedback=null;$('#completion').hidden=true;$('#settings-dialog').close();render();showCompletion();}
  }catch(error){alert(`Cannot restore: ${error.message}`);}finally{event.target.value='';}
};
$('#delete-save').onclick=()=>{if(confirm('Delete only GraphQuest progress from this browser? Download a backup first if needed.')){try{localStorage.removeItem(SAVE_KEY);}catch{}protectedSave=false;run=newRun();feedback=null;$('#completion').hidden=true;$('#settings-dialog').close();$('#welcome-form').reset();render();show('welcome');}};
$('#new-run').onclick=()=>{if(confirm('Start a new delivery day? Export your receipt or save first to keep the current run.'))show('welcome');};
for(const type of ['html','csv','json'])$('#export-'+type).onclick=()=>{const report=deliveryReport(run,missions),name=`graphquest-receipt-${run.runId.slice(0,8)}`;download(name+'.'+type,type==='html'?deliveryHTML(report):type==='csv'?deliveryCSV(report):JSON.stringify(report,null,2),type==='html'?'text/html;charset=utf-8':type==='csv'?'text/csv;charset=utf-8':'application/json');};
render();showCompletion();if(firstVisit)show('welcome');
