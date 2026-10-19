import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {originalGameBytes,lobbyInclude} from './preservation.mjs';
test('lobby preserves all previously accepted game files except the exact navigation include',async()=>{
  const baseline=JSON.parse(await readFile(new URL('../docs/lobby/preserved-files.json',import.meta.url)));
  for(const file of baseline){const bytes=await readFile(new URL('../'+file.path,import.meta.url));
    const original=file.path.endsWith('/index.html')?originalGameBytes(bytes):bytes;
    assert.equal(createHash('sha256').update(original).digest('hex'),file.sha256,file.path);
    if(file.path.endsWith('/index.html'))assert.equal(bytes.toString().split(lobbyInclude).length,2);
  }
});
test('source and built lobby expose exactly the three existing games and static entry points',async()=>{
  const html=await readFile(new URL('../dist/apps/lobby/index.html',import.meta.url),'utf8');
  for(const slug of ['cyber-code-breaker','graphquest','variation-factory'])assert.ok(html.includes(`href="../games/${slug}/"`));
  assert.equal((html.match(/data-game=/g)||[]).length,3);
  assert.match(await readFile(new URL('../dist/index.html',import.meta.url),'utf8'),/url=.\/apps\/lobby\//);
  assert.ok(!html.includes('http'));
});
