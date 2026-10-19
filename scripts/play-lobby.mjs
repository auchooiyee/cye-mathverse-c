import {spawn} from 'node:child_process';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {gameServer,LOBBY_PATH} from './server.mjs';
export async function startLobby({ports=[4186,4187,4188],root}={}){
  const owned=[],reused=[];
  const close=async()=>{await Promise.all(owned.map(server=>new Promise(resolve=>{server.close(resolve);server.closeIdleConnections();})));};
  try{
    for(const port of ports){
      const server=gameServer(root);
      try{await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',()=>{server.removeListener('error',reject);resolve();});});owned.push(server);}
      catch(error){
        if(error.code!=='EADDRINUSE')throw error;
        let compatible=false;
        try{const response=await fetch(`http://127.0.0.1:${port}${LOBBY_PATH}`,{signal:AbortSignal.timeout(1500)});compatible=response.ok&&response.headers.get('x-cye-lobby')==='1'&&(await response.text()).includes('Game Lobby · CYE-MathVerse');}catch{}
        if(!compatible)throw new Error(`Port ${port} is in use by an older game window or another app. Close that earlier game launcher, then open Play CYE-MathVerse.command again. No existing process was stopped.\n端口 ${port} 正在使用。请先关闭之前的游戏启动窗口，再重新打开统一大厅。`);
        reused.push(port);
      }
    }
    return {url:`http://127.0.0.1:${ports[0]}${LOBBY_PATH}`,owned,reused,close};
  }catch(error){await close();throw error;}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const root=process.argv.includes('--dist')?fileURLToPath(new URL('../dist/',import.meta.url)):undefined;
    const lobby=await startLobby({root});
    console.log(`CYE_READY ${lobby.url}\n游戏大厅已准备好。保留这个窗口，三个游戏就能随时切换。\nKeep this window open. Control-C stops only servers started by this window.`);
    if(lobby.reused.length)console.log('Existing compatible game windows reused; keep those windows open too.');
    if(!process.argv.includes('--no-open')&&process.platform==='darwin'){const opener=spawn('open',[lobby.url],{stdio:'ignore'});opener.on('error',()=>console.log('Open the local address above in your browser.'));}
    for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{await lobby.close();process.exit(0);});
  }catch(error){console.error(error.message);process.exitCode=1;}
}
