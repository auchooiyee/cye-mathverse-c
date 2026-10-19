import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {gameServer} from '../scripts/server.mjs';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const output=fileURLToPath(new URL('../artifacts/hosting/',import.meta.url));await mkdir(output,{recursive:true});
const live=process.env.GAME_TEST_URL;
let server,browser;
const checks=[],errors=[],externalRequests=[];
try{
  let local;
  if(!live){server=gameServer(fileURLToPath(new URL('../dist/',import.meta.url)));await new Promise((r,j)=>{server.once('error',j);server.listen(0,'127.0.0.1',r);});local=`http://127.0.0.1:${server.address().port}`;}
  const origin=new URL(live||'https://cye-mathverse-c.pages.dev').origin;
  browser=await chromium.launch({headless:true,channel:'chrome'});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  if(!live)await context.route(origin+'/**',async route=>{const path=new URL(route.request().url()).pathname;const response=await context.request.get(local+path,{maxRedirects:0});await route.fulfill({response});});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(new URL(r.url()).origin!==origin)externalRequests.push(r.url());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(origin+(live?'/':'/apps/lobby/'));await page.locator('[data-game]').first().waitFor();await page.waitForFunction(()=>document.querySelector('#access-note')?.textContent.includes('当前设备'));
  assert.match(await page.locator('#access-note').innerText(),/当前设备/);assert.ok(!(await page.locator('#access-note').innerText()).includes('.command'));
  for(const slug of ['cyber-code-breaker','graphquest','variation-factory']){const href=await page.locator(`[data-game="${slug}"]`).getAttribute('href');assert.equal(new URL(href,page.url()).origin,origin);assert.ok(!href.includes('127.0.0.1'));}
  if(live){const response=await context.request.get(origin+'/apps/lobby/');assert.ok(response.headers()['content-security-policy']?.includes("connect-src 'none'"));}
  checks.push(live?'HTTPS root and all three relative game links; hosted student instructions and restrictive headers':'Simulated HTTPS lobby and all three relative game links; hosted student instructions');
  await page.locator('[data-filter="5"]').click();assert.equal(await page.locator('.game-card:visible').count(),1);await page.locator('[data-filter="all"]').click();
  for(const [i,slug] of ['cyber-code-breaker','graphquest','variation-factory'].entries()){
    await page.locator(`[data-game="${slug}"]`).click();assert.equal(new URL(page.url()).origin,origin);
    const welcome=page.locator(i===0?'#briefing':'#welcome');await welcome.waitFor();await page.locator(i===0?'#start-form button[type=submit]':'#welcome-form button[type=submit]').click();
    if(i===0){await page.locator('.type-code summary').click();await page.locator('#raw-code').fill('101');await page.locator('#connect').click();}
    if(i===1){for(const id of ['B','C','D'])await page.locator(`[data-next-stop="${id}"]`).click();await page.locator('#dispatch').click();await page.waitForFunction(()=>document.querySelector('#travel-controls').hidden);}
    if(i===2){await page.locator('#constant').fill('4');await page.locator('#input-x').selectOption('6');await page.locator('#produce').click();await page.waitForFunction(()=>document.querySelector('#travel').hidden);}
    const saveKey=`cye-mathverse.${slug}.v1`,value=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),saveKey);assert.equal(value.entries[['C01','G01','V01'][i]].done,true);
    await page.locator('#mathverse-lobby-nav').getByRole('link').click();await page.locator(`[data-game="${slug}"]`).click();const after=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),saveKey);assert.equal(after.runId,value.runId);assert.equal(after.entries[['C01','G01','V01'][i]].done,true);await page.reload();assert.equal((await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),saveKey)).runId,value.runId);await page.locator('#mathverse-lobby-nav').getByRole('link').click();
  }
  checks.push('All three games complete a real task, return to lobby, reload and preserve independent saves on one hosted origin');
  await page.waitForLoadState('load');await page.waitForFunction(()=>document.querySelector('#access-note')?.textContent.includes('当前设备'));await page.screenshot({path:output+(live?'/live-desktop.png':'/prepared-desktop.png'),fullPage:true});await page.setViewportSize({width:360,height:800});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:output+(live?'/live-mobile.png':'/prepared-mobile.png'),fullPage:true});checks.push('Hosted filters and mobile lobby layout');
  assert.deepEqual(errors,[]);assert.deepEqual(externalRequests,[]);
  const report={date:'2026-10-19',mode:live?'live-production':'simulated-production-host-with-local-build',origin,checks,errors,externalRequests};await writeFile(output+(live?'/live-report.json':'/prepared-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser?.close();if(server)await new Promise(r=>server.close(r));}
