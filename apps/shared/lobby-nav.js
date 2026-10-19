// Navigation is separate from every game's save, scoring and event handling.
if(location.protocol!=='file:'){
  const home=new URL('../../lobby/',location.href).href;
  const host=document.createElement('div');host.id='mathverse-lobby-nav';
  const shadow=host.attachShadow({mode:'open'});
  const style=document.createElement('style');style.textContent=':host{display:block;width:100%;position:relative;z-index:1}nav{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px max(20px,calc((100% - 1392px)/2));background:#101523;color:#c7d0e2;font:11px/1.5 system-ui,sans-serif;border-bottom:1px solid #ffffff20}a{display:inline-flex;align-items:center;min-height:44px;color:#f5ce8e;text-decoration:none;font-weight:650}a:focus-visible{outline:3px solid #f5ce8e;outline-offset:3px}span{font-size:10px}@media(max-width:520px){span{display:none}}';
  const nav=document.createElement('nav');nav.setAttribute('aria-label','Game lobby');const a=document.createElement('a');a.href=home;a.textContent='← Game lobby · 游戏大厅';const note=document.createElement('span');note.textContent='CYE-MATHVERSE · PICK ANOTHER ADVENTURE';nav.append(a,note);shadow.append(style,nav);document.body.prepend(host);
  // A first-visit modal traps focus; provide a return path inside it too.
  for(const id of ['briefing','welcome']){const dialog=document.getElementById(id);if(dialog){const link=document.createElement('a');link.href=home;link.textContent='← Game lobby · 游戏大厅';link.style.cssText='display:inline-flex;align-items:center;min-height:44px;color:inherit;text-decoration:underline;font:12px system-ui;margin-top:12px';dialog.append(link);}}
}
