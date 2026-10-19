import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createServer} from 'node:http';
import {startLobby} from '../scripts/play-lobby.mjs';
import {gameServer} from '../scripts/server.mjs';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const root=fileURLToPath(new URL('../dist/',import.meta.url)),out=fileURLToPath(new URL('../artifacts/lobby/',import.meta.url));await mkdir(out,{recursive:true});
const lobby=await startLobby({root}),checks=[],errors=[],externalRequests=[];
let browser,preview,conflict;
const slugs=['cyber-code-breaker','graphquest','variation-factory'];
const ports=[4186,4187,4188];
const key=slug=>`cye-mathverse.${slug}.v1`;
const nav=p=>p.locator('#mathverse-lobby-nav').getByRole('link',{name:'← Game lobby · 游戏大厅'});
const listen=server=>new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',()=>resolve(server.address().port));});
const close=server=>new Promise(resolve=>{server.close(resolve);server.closeIdleConnections();});
try{
  browser=await chromium.launch({headless:true,channel:'chrome'});
  const context=await browser.newContext({viewport:{width:1440,height:1050},reducedMotion:'reduce'}),page=await context.newPage();
  context.on('page',observe);observe(page);
  function observe(p){p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:'))externalRequests.push(r.url());});p.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});}
  await page.goto('http://127.0.0.1:4186/');await page.getByRole('heading',{name:'Three worlds. Your choice.'}).waitFor();assert.equal(new URL(page.url()).pathname,'/apps/lobby/');
  assert.equal(await page.locator('[data-game]').count(),3);assert.equal((await fetch(lobby.url)).headers.get('x-cye-lobby'),'1');assert.equal((await fetch('http://127.0.0.1:4186/docs/lobby/PLAN.md')).status,404);
  for(let i=0;i<3;i++)assert.equal(new URL(await page.locator(`[data-game="${slugs[i]}"]`).getAttribute('href')).port,String(ports[i]));
  await page.screenshot({path:out+'/desktop.png',fullPage:true});checks.push('Root opens the built lobby; three original local game origins retained; private files inaccessible');
  await page.locator('[data-filter="5"]').click();assert.equal(await page.locator('.game-card:visible').count(),1);assert.equal(await page.locator('.game-card:visible h3').innerText(),'Variation Factory');assert.match(await page.locator('#filter-status').innerText(),/1 game/);
  await page.locator('[data-filter="4"]').click();assert.equal(await page.locator('.game-card:visible').count(),2);await page.locator('[data-filter="all"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.game-card:visible').count(),3);assert.equal(await page.locator('[data-filter="all"]').getAttribute('aria-pressed'),'true');checks.push('Form filters, accessible pressed state and live result count; keyboard activation');
  // Establish real saves on each legacy origin, as an existing player would have.
  const snapshots=[];
  for(let i=0;i<3;i++){
    const slug=slugs[i];await page.goto(`http://127.0.0.1:${ports[i]}/apps/games/${slug}/`);
    const welcome=page.locator(i===0?'#briefing':'#welcome');await welcome.waitFor();
    await welcome.getByRole('link',{name:'← Game lobby · 游戏大厅'}).click();await page.locator('[data-game]').first().waitFor();
    await page.locator(`[data-game="${slug}"]`).click();await page.locator(i===0?'#connect':i===1?'#dispatch':'#produce').waitFor();if(await welcome.isVisible()){await page.locator('[name=alias]').fill('Lobby test');await page.locator(i===0?'#start-form button[type=submit]':'#welcome-form button[type=submit]').click();}
    if(i===0){await page.locator('.type-code summary').click();await page.locator('#raw-code').fill('101');await page.locator('#connect').click();await page.waitForFunction(()=>document.querySelector('#xp').textContent.includes('100'));}
    if(i===1){for(const id of ['B','C','D'])await page.locator(`[data-next-stop="${id}"]`).click();await page.locator('#dispatch').click();await page.waitForFunction(()=>document.querySelector('#travel-controls').hidden);}
    if(i===2){await page.locator('#constant').fill('4');await page.locator('#input-x').selectOption('6');await page.locator('#produce').click();await page.waitForFunction(()=>document.querySelector('#travel').hidden);}
    const value=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key(slug));assert.equal(value.entries[['C01','G01','V01'][i]].done,true);snapshots.push(value);
    await nav(page).click();await page.locator('[data-game]').first().waitFor();await page.locator(`[data-game="${slug}"]`).click();assert.equal(new URL(page.url()).port,String(ports[i]));assert.equal(await welcome.isVisible(),false);
    const restored=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key(slug));assert.equal(restored.runId,value.runId);assert.deepEqual(restored.entries,value.entries);
    await page.reload();assert.equal((await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key(slug))).runId,value.runId);
    await nav(page).click();
  }
  checks.push('All three real legacy origins: first-visit modal return, first task completion, lobby return, re-entry and reload preserve run IDs and completed progress');
  for(let i=0;i<3;i++){await page.locator(`[data-game="${slugs[i]}"]`).click();assert.equal((await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key(slugs[i]))).runId,snapshots[i].runId);await nav(page).click();}
  assert.equal(await page.evaluate(()=>Object.keys(localStorage).some(k=>k.includes('lobby'))),false);checks.push('Switching across all three games keeps each save independent; lobby stores no student/profile data');
  const mobileContext=await browser.newContext({viewport:{width:360,height:800},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),mobile=await mobileContext.newPage();observe(mobile);await mobile.goto(lobby.url);
  assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const targets=await mobile.locator('button,.play-link,.primary,.guide-link').evaluateAll(es=>es.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));assert.ok(targets.every(t=>t.w>=44&&t.h>=44));
  assert.equal(await mobile.locator('.satellite').first().evaluate(e=>getComputedStyle(e).animationName),'none');
  await mobile.locator('[data-filter="5"]').tap();await mobile.screenshot({path:out+'/mobile-form5.png',fullPage:true});await mobile.locator('[data-filter="all"]').tap();await mobile.screenshot({path:out+'/mobile.png',fullPage:true});await mobile.setViewportSize({width:800,height:360});assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.setViewportSize({width:768,height:1024});await page.screenshot({path:out+'/tablet.png',fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.setViewportSize({width:1280,height:900});await page.evaluate(()=>document.documentElement.style.zoom='2');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.evaluate(()=>document.documentElement.style.zoom='1');checks.push('360px touch and 44px targets, tablet/landscape/200% zoom fit; reduced motion disables decorative animation');
  const repeated=await startLobby({root});assert.equal(repeated.owned.length,0);assert.deepEqual(repeated.reused,ports);await repeated.close();assert.equal((await fetch(lobby.url)).status,200);checks.push('Repeated unified launch reuses compatible servers; closing reused launcher does not stop them');
  conflict=createServer((req,res)=>{res.end('another app');});const conflictPort=await listen(conflict);
  const reserve=createServer();const freePort=await listen(reserve);await close(reserve);
  await assert.rejects(startLobby({ports:[freePort,conflictPort],root}),/No existing process was stopped/);
  assert.equal(await(await fetch(`http://127.0.0.1:${conflictPort}/`)).text(),'another app');
  const reclaim=createServer();await new Promise((resolve,reject)=>{reclaim.once('error',reject);reclaim.listen(freePort,'127.0.0.1',resolve);});await close(reclaim);await close(conflict);conflict=null;checks.push('Occupied incompatible port reports a clear error; existing app untouched and partially started servers cleaned up');
  preview=gameServer(root);const previewPort=await listen(preview);await page.goto(`http://127.0.0.1:${previewPort}/`);
  for(const slug of slugs){await page.locator(`[data-game="${slug}"]`).click();assert.equal(new URL(page.url()).port,String(previewPort));await page.locator(slug==='cyber-code-breaker'?'#briefing':'#welcome').getByRole('link',{name:'← Game lobby · 游戏大厅'}).click();}
  checks.push('Arbitrary preview/static origin uses relative game links and relative return paths');
  const noJS=await browser.newContext({javaScriptEnabled:false}),plain=await noJS.newPage();await plain.goto(`http://127.0.0.1:${previewPort}/apps/lobby/`);assert.equal(await plain.locator('[data-game]').count(),3);await plain.locator('[data-game="graphquest"]').click();assert.match(plain.url(),/graphquest\/$/);await noJS.close();
  const file=await browser.newPage();await file.goto(new URL('../dist/apps/lobby/index.html',import.meta.url).href);await file.getByRole('heading',{name:'Open your game port.'}).waitFor();checks.push('No-JavaScript menu links remain usable; direct file opening explains the unified launcher');
  assert.deepEqual(errors,[]);assert.deepEqual(externalRequests,[]);
  const report={date:'2026-10-19',checks,errors,externalRequests,scope:'Built app in installed Chrome with isolated test profiles; existing personal browser saves never read or changed',limits:['Physical Android/iPad, Safari and screen reader not tested','Finder double-click not automated; launcher itself and shell syntax tested','Local computer only; no student network or hosting deployment']};await writeFile(out+'/browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser?.close();if(preview)await close(preview);if(conflict)await close(conflict);await lobby.close();}
