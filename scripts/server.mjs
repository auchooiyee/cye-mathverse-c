import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, extname, resolve } from 'node:path';
import { publicFiles } from './public-files.mjs';
const workspace = fileURLToPath(new URL('../', import.meta.url));
export const LOBBY_PATH = '/apps/lobby/';
export const GAME_PATH = '/apps/games/cyber-code-breaker/';
export const GRAPHQUEST_PATH = '/apps/games/graphquest/';
export const VARIATION_PATH = '/apps/games/variation-factory/';
export function gameServer(root = workspace) {
  return createServer(async (req, res) => {
    const headers = {
      'X-CYE-Lobby': '1', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
    };
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, headers); res.end('Method not allowed'); return; }
    let path;
    try { path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400, headers); res.end('Bad request'); return; }
    if(path === '/'){res.writeHead(302,{...headers,Location:LOBBY_PATH});res.end();return;}
    if([LOBBY_PATH,GAME_PATH,GRAPHQUEST_PATH,VARIATION_PATH].includes(path))path += 'index.html';
    const relative = path.slice(1);
    if(!publicFiles.includes(relative)){res.writeHead(404,headers);res.end('Not found');return;}
    try {
      const data=await readFile(join(root,relative));
      const type={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg'}[extname(relative)];
      res.writeHead(200,{...headers,'Content-Type':type,'Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);
    }catch{res.writeHead(404,headers);res.end('Build file missing. Run npm run build.');}
  });
}
if(process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root=process.argv.includes('--dist')?join(workspace,'dist'):workspace;
  const selectedPath=process.argv.includes('--variation')?VARIATION_PATH:process.argv.includes('--graphquest')?GRAPHQUEST_PATH:GAME_PATH;
  const port=Number(process.env.PORT||(selectedPath===VARIATION_PATH?4188:selectedPath===GRAPHQUEST_PATH?4187:4186));
  if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('Choose a PORT from 1024 to 65535.');
  const server=gameServer(root);
  server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} is busy. Close the earlier game server or choose another PORT.`:error.message);process.exitCode=1;});
  server.listen(port,'127.0.0.1',()=>console.log(`CYE_READY http://127.0.0.1:${port}${selectedPath}\nLocal computer only. Keep this window open; Control-C stops the game server.`));
  for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
}
