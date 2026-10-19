import { mkdir, copyFile, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { publicFiles } from './public-files.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const files=[];
for(const relative of publicFiles){
  const source=join(root,relative),target=join(root,'dist',relative);
  await mkdir(dirname(target),{recursive:true});await copyFile(source,target);
  const bytes=await readFile(target);
  files.push({path:relative,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile(join(root,'dist/index.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="0;url=./apps/lobby/"><title>CYE-MathVerse</title><a href="./apps/lobby/">Open game lobby</a></html>');
await copyFile(join(root,'deploy/cloudflare/_headers'),join(root,'dist/_headers'));
await writeFile(join(root,'dist/build-manifest.json'),JSON.stringify({version:'0.1.0',files,totalBytes:files.reduce((n,x)=>n+x.bytes,0)},null,2));
console.log(`Static build ready: ${files.length} app files; ${files.reduce((n,x)=>n+x.bytes,0).toLocaleString()} bytes. Ready for local preview or static hosting.`);
