import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const server=spawn(process.execPath,['scripts/server.mjs',...(process.argv.includes('--variation')?['--variation']:process.argv.includes('--graphquest')?['--graphquest']:[])],{cwd:root,stdio:['inherit','pipe','inherit']});
let opened=false;
server.stdout.on('data',chunk=>{
  const text=chunk.toString();process.stdout.write(text);
  const match=text.match(/CYE_READY (http:\/\/127\.0\.0\.1:\d+\/\S*)/);
  if(match&&!opened&&process.platform==='darwin'){
    opened=true;const opener=spawn('open',[match[1]],{stdio:'ignore'});opener.on('error',()=>console.log('Open the local address above in your browser.'));
  }
});
server.on('exit',code=>{process.exitCode=code||0;});
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.kill(signal));
