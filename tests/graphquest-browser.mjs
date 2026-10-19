import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {gameServer,GRAPHQUEST_PATH} from '../scripts/server.mjs';
import {SAVE_KEY} from '../apps/games/graphquest/state.js';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const root=fileURLToPath(new URL('../dist/',import.meta.url)),artifacts=fileURLToPath(new URL('../artifacts/graphquest/',import.meta.url));await mkdir(artifacts,{recursive:true});
const server=gameServer(root);await new Promise((resolve,reject)=>{server.on('error',reject);server.listen(0,'127.0.0.1',resolve);});
const origin=`http://127.0.0.1:${server.address().port}`,url=origin+GRAPHQUEST_PATH;
const browser=await chromium.launch({headless:true,channel:'chrome'});const errors=[],externalRequests=[],checks=[];
const routes=[['B','C','D'],['C','B','D'],['C','E','F'],['E','D'],['B','D','E','F'],['C','E','F','D','B','A']];
async function fresh(options={}){const context=await browser.newContext(options),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(origin))externalRequests.push(r.url());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});return page;}
async function start(page){await page.goto(url);await page.locator('#welcome').waitFor();await page.locator('[name=alias]').fill('Comet');await page.locator('#welcome-form button[type=submit]').click();}
async function plan(page,nodes,method='click'){for(const id of nodes)await page.locator(`[data-next-stop="${id}"]`)[method]();}
async function send(page){await page.locator('#dispatch').click();await page.waitForFunction(()=>document.querySelector('#travel-controls').hidden);}
const saved=page=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY);
try{
  assert.equal((await fetch(url)).status,200);assert.equal((await fetch(origin+'/docs/graphquest/preserved-files.json')).status,404);checks.push('Built game served locally; private documents denied');
  const page=await fresh({viewport:{width:1500,height:1100}});await start(page);
  await page.screenshot({path:artifacts+'/desktop.png',fullPage:true});
  assert.equal(await page.locator('[data-mission="1"]').isDisabled(),true);
  await page.locator('[data-stop="D"]').click();assert.match(await page.locator('#feedback').innerText(),/no road/);assert.deepEqual((await saved(page)).entries.G01.route,['A']);
  await plan(page,['B','D']);await page.locator('#dispatch').click();
  const initial=await page.locator('#van').getAttribute('transform');await page.waitForTimeout(160);const moved=await page.locator('#van').getAttribute('transform');assert.notEqual(moved,initial);
  assert.equal(await page.locator('#clear').isDisabled(),true);await page.locator('#pause').click();const paused=await page.locator('#van').getAttribute('transform');await page.waitForTimeout(200);assert.equal(await page.locator('#van').getAttribute('transform'),paused);
  await page.locator('#finish-animation').click();assert.match(await page.locator('#feedback').innerText(),/shorter route/);assert.equal((await saved(page)).entries.G01.attempts,1);
  checks.push('Invalid connections; actual van movement; animation input lock; pause/skip; nonoptimal feedback');
  await page.locator('#hint').click();await page.locator('#clear').click();await plan(page,routes[0]);await page.reload();
  assert.deepEqual((await saved(page)).entries.G01.route,['A',...routes[0]]);assert.equal((await saved(page)).entries.G01.hints,1);
  await page.locator('#settings').click();await page.locator('#reduce-motion').check();await page.locator('[data-close="settings-dialog"]').click();await send(page);
  assert.equal((await saved(page)).entries.G01.firstDispatch,false);assert.match(await page.locator('#xp').innerText(),/150/);checks.push('Autosaved routes/hints after refresh; reduced motion; full retry reward');
  for(let i=1;i<6;i++){
    await page.locator('#next').click();
    if(i===2){await plan(page,['B']);await page.locator('[data-stop="D"]').click();assert.match(await page.locator('#feedback').innerText(),/closed/);await page.locator('#clear').click();}
    if(i===3){await page.locator('[data-stop="B"]').click();assert.match(await page.locator('#feedback').innerText(),/one-way/);}
    await plan(page,routes[i]);await send(page);assert.match(await page.locator('#feedback').innerText(),/Delivery complete|All parcels delivered/);
    if(i===3)await page.screenshot({path:artifacts+'/one-way.png',fullPage:true});
  }
  await page.locator('#next').click();await page.locator('#completion').waitFor();assert.equal((await saved(page)).completedAt!==null,true);assert.match(await page.locator('#xp').innerText(),/900/);
  await page.screenshot({path:artifacts+'/complete.png',fullPage:true});checks.push('All six missions; closure and one-way rejection; exact RM9 budget; reverse optimal tour accepted');
  await page.locator('#final-report').click();
  for(const type of ['html','csv','json']){const promise=page.waitForEvent('download');await page.locator('#export-'+type).click();await(await promise).saveAs(`${artifacts}/receipt.${type}`);}
  const receipt=JSON.parse(await readFile(artifacts+'/receipt.json','utf8'));assert.equal(receipt.xp,900);assert.equal(receipt.verification,'local/unverified');assert.equal(receipt.missions[4].completion.cost,9);assert.equal(receipt.missions[5].events[0].legs.length,6);
  await page.locator('[data-close="report-dialog"]').click();await page.reload();await page.locator('#completion').waitFor();const restored=await saved(page);assert.equal('LOCAL-'+restored.runId,receipt.receiptId);
  await page.locator('[data-mission="0"]').click();await page.locator('#clear').click();await plan(page,routes[0]);await send(page);assert.equal((await saved(page)).entries.G01.attempts,3);assert.match(await page.locator('#xp').innerText(),/900/);
  checks.push('Downloaded HTML/CSV/JSON with route legs; stable recovered receipt; replay without duplicate XP');
  const mobile=await fresh({viewport:{width:360,height:800},isMobile:true,hasTouch:true,reducedMotion:'reduce'});await start(mobile);
  assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const targets=await mobile.locator('.map-stop').evaluateAll(buttons=>buttons.map(b=>({w:b.getBoundingClientRect().width,h:b.getBoundingClientRect().height})));assert.ok(targets.every(t=>t.w>=44&&t.h>=44));
  await mobile.locator('[data-stop="B"]').tap();await mobile.locator('#undo').tap();await plan(mobile,routes[0],'tap');await mobile.locator('#dispatch').tap();await mobile.locator('#next').waitFor();
  await mobile.screenshot({path:artifacts+'/mobile.png',fullPage:true});
  await mobile.setViewportSize({width:800,height:360});assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);checks.push('360px mobile tap/undo/routes; 44px map targets; landscape without overflow');
  const keyboard=await fresh({reducedMotion:'reduce'});await start(keyboard);for(const id of routes[0]){await keyboard.locator(`[data-next-stop="${id}"]`).focus();await keyboard.keyboard.press('Enter');}await keyboard.locator('#dispatch').focus();await keyboard.keyboard.press('Space');await keyboard.locator('#next').waitFor();assert.equal((await saved(keyboard)).entries.G01.done,true);checks.push('Keyboard route planning and dispatch');
  const recovery=await fresh({reducedMotion:'reduce'});await start(recovery);await recovery.locator('#settings').click();recovery.once('dialog',d=>d.accept());await recovery.locator('#import').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(restored))});await recovery.locator('#completion').waitFor();assert.equal((await saved(recovery)).runId,restored.runId);
  await recovery.locator('#settings').click();recovery.once('dialog',d=>d.accept());await recovery.locator('#import').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{}')});assert.equal((await saved(recovery)).runId,restored.runId);checks.push('Compatible backup restore; invalid import preserves saved progress');
  const corrupt=await fresh();await corrupt.addInitScript(key=>localStorage.setItem(key,'{broken'),SAVE_KEY);await start(corrupt);assert.match(await corrupt.locator('#storage-warning').innerText(),/protected/);assert.equal(await corrupt.evaluate(key=>localStorage.getItem(key),SAVE_KEY),'{broken');const raw=corrupt.waitForEvent('download');await corrupt.locator('#raw-backup').click();await(await raw).saveAs(artifacts+'/original-save.json');assert.equal(await readFile(artifacts+'/original-save.json','utf8'),'{broken');checks.push('Unreadable original save remains protected and downloadable');
  const blocked=await fresh({reducedMotion:'reduce'});await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw Error('blocked');}}));await start(blocked);assert.match(await blocked.locator('#storage-warning').innerText(),/unavailable/);await plan(blocked,routes[0]);await send(blocked);assert.match(await blocked.locator('#xp').innerText(),/150/);checks.push('Storage-disabled play remains functional');
  const mobileNetwork=await fresh({viewport:{width:360,height:800},isMobile:true,hasTouch:true,reducedMotion:'reduce'});await mobileNetwork.addInitScript(({key,run})=>{run.selected=3;localStorage.setItem(key,JSON.stringify(run));},{key:SAVE_KEY,run:restored});await mobileNetwork.goto(url);await mobileNetwork.locator('[data-stop="E"]').waitFor();assert.equal(await mobileNetwork.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await mobileNetwork.screenshot({path:artifacts+'/mobile-one-way.png',fullPage:true});
  const fileContext=await browser.newContext();const filePage=await fileContext.newPage();await filePage.goto(new URL('../dist/apps/games/graphquest/index.html',import.meta.url).href);await filePage.getByRole('heading',{name:'Start GraphQuest with its local launcher'}).waitFor();assert.equal(await filePage.locator('main').isHidden(),true);checks.push('Direct HTML opening provides local launcher guidance; mobile one-way map layout');
  const refresh=await fresh();await start(refresh);await plan(refresh,routes[0]);await refresh.locator('#dispatch').click();await refresh.reload();assert.equal((await saved(refresh)).entries.G01.attempts,1);assert.equal((await saved(refresh)).entries.G01.done,true);assert.equal(await refresh.locator('#next').isVisible(),true);checks.push('Refresh during animation retains exactly one recorded delivery');
  assert.deepEqual(errors,[]);assert.deepEqual(externalRequests,[]);
  const result={date:'2026-10-18',checks,errors,externalRequests,scope:'Built static app in headless Google Chrome; desktop and mobile emulation',limits:['Physical Android/iPad and Safari untested','Teacher content review and real student playtest pending']};await writeFile(artifacts+'/browser-report.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
