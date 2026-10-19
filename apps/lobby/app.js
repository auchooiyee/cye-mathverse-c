const ports={'cyber-code-breaker':'4186',graphquest:'4187','variation-factory':'4188'};
if(location.protocol==='file:'){
  document.querySelector('main').innerHTML='<section class="hero"><div><p class="eyebrow">CYE-MATHVERSE</p><h1>Open your game port.</h1><p>Double-click <strong>Play CYE-MathVerse.command</strong> in the project folder, then keep its window open.</p><p lang="zh-Hans">请双击项目文件夹中的「Play CYE-MathVerse.command」，从统一入口开始游戏。</p></div></section>';
}else{
  if(!['127.0.0.1','localhost','[::1]'].includes(location.hostname)){
    document.querySelector('#access-note p').innerHTML='<strong>Your own little game universe.</strong> Open a world and start exploring. Progress stays in this browser on this device.<br><span lang="zh-Hans">选择一个游戏即可开始。进度保存在当前设备的浏览器里；更换设备前，请在游戏设置中下载进度备份。</span>';
  }
  if(location.hostname==='127.0.0.1'&&Object.values(ports).includes(location.port)){
    document.querySelectorAll('[data-game]').forEach(a=>{a.href=`http://127.0.0.1:${ports[a.dataset.game]}/apps/games/${a.dataset.game}/`;});
  }
  const buttons=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-form]')];
  buttons.forEach(button=>button.addEventListener('click',()=>{
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    cards.forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.form!==button.dataset.filter;});
    const count=cards.filter(c=>!c.hidden).length;
    document.querySelector('#filter-status').textContent=`${count} ${count===1?'game':'games'} available / ${count} 个游戏`;
  }));
}
