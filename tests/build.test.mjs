import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { publicFiles } from '../scripts/public-files.mjs';
test('production build contains only intended public app files and current source hashes',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../dist/build-manifest.json',import.meta.url)));
  assert.equal(manifest.files.length,publicFiles.length);assert.ok(manifest.files.filter(f=>!f.path.endsWith('.jpg')).reduce((n,f)=>n+f.bytes,0)<300000);
  assert.ok(manifest.files.filter(f=>f.path.endsWith('.jpg')).reduce((n,f)=>n+f.bytes,0)<1000000);
  for(const file of manifest.files){
    assert.ok(publicFiles.includes(file.path));
    const source=await readFile(new URL('../'+file.path,import.meta.url)),built=await readFile(new URL('../dist/'+file.path,import.meta.url));
    assert.deepEqual(built,source);assert.equal(createHash('sha256').update(built).digest('hex'),file.sha256);
  }
});
