// Classic script deliberately supports direct file opening when ES modules cannot.
if(location.protocol==='file:'){
  document.addEventListener('DOMContentLoaded',()=>{
    const message=document.createElement('section');message.className='notice';
    message.style.cssText='max-width:720px;margin:35px auto;padding:28px;font-size:16px;line-height:1.8';
    const title=document.createElement('h2');title.textContent='Start GraphQuest with its local launcher';
    const text=document.createElement('p');text.textContent='In Finder, open the CYE-MathVerse  GPT folder and double-click “Play GraphQuest.command”. Keep the Terminal window open. The game will open at http://127.0.0.1:4187/apps/games/graphquest/.';
    const chinese=document.createElement('p');chinese.lang='zh-Hans';chinese.textContent='请在 Finder 中双击 Play GraphQuest.command 启动游戏。直接打开 index.html 无法加载完整游戏；游戏仍然在你的电脑本地运行。';
    message.append(title,text,chinese);document.querySelector('main').hidden=true;document.querySelector('nav').hidden=true;document.querySelector('header').after(message);
  });
}
