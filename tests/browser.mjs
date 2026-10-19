import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { gameServer, GAME_PATH } from '../scripts/server.mjs';
import { questions } from '../apps/games/cyber-code-breaker/questions.js';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const artifacts=fileURLToPath(new URL('../artifacts/',import.meta.url));await mkdir(artifacts,{recursive:true});
const server=gameServer(fileURLToPath(new URL('../dist/',import.meta.url)));
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
const origin=`http://127.0.0.1:${server.address().port}`,url=origin+GAME_PATH;
const browser=await chromium.launch({headless:true,channel:'chrome'});
const checks=[],errors=[],network=[];const KEY='cye-mathverse.cyber-code-breaker.v1';
const keys=['101','102','1101','22','102','10011','1000','13','1101','30','100','113'];
async function pageFor(options={}){const context=await browser.newContext(options),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(origin))network.push(r.url());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});return page;}
async function start(page,mode='independent'){await page.goto(url);await page.locator('#briefing').waitFor();await page.locator('[name=mode]').selectOption(mode);await page.locator('[name=alias]').fill('Comet');await page.locator('#start-form button[type=submit]').click();}
async function typeCode(page,value){const details=page.locator('.type-code');if(!await details.evaluate(e=>e.open))await details.locator('summary').click();await page.locator('#raw-code').fill(value);}
const saved=page=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);
try{
  const res=await fetch(origin);assert.equal(res.status,200);
  assert.equal((await fetch(origin+'/IMPLEMENTATION_STATUS.md')).status,404);
  assert.equal((await fetch(origin+'/package.json')).status,404);
  assert.equal((await fetch(url,{method:'POST'})).status,405);
  assert.ok(res.headers.get('content-security-policy').includes("connect-src 'none'"));checks.push('Local production server; private files denied; network policy');
  const page=await pageFor({viewport:{width:1440,height:1000}});await start(page);
  await page.screenshot({path:artifacts+'/cyber-desktop.png',fullPage:true});
  await typeCode(page,'2');await page.locator('#connect').click();assert.match(await page.locator('#feedback').innerText(),/cannot appear/);
  await page.locator('#hint').click();await typeCode(page,'101');await page.reload();
  assert.equal((await saved(page)).entries.C01.draft,'101');assert.equal((await saved(page)).entries.C01.hints,1);
  await page.locator('#connect').click();assert.match(await page.locator('#xp').innerText(),/100/);await page.locator('#next').click();
  checks.push('Invalid digit feedback; hint and draft saved across refresh; retry awards full XP');
  for(const i of [1,2,3,4,5,6,7,9,8,10,11]){
    if(i===9)await page.locator('[data-lock=C10]').click();
    await typeCode(page,keys[i]);await page.locator('#connect').click();assert.match(await page.locator('#feedback').innerText(),/Signal matched/);
    await page.locator('#next').click();
  }
  await page.locator('#completion').waitFor();assert.equal((await saved(page)).completedAt!==null,true);assert.match(await page.locator('#xp').innerText(),/1,200/);
  await page.screenshot({path:artifacts+'/cyber-complete.png',fullPage:true});checks.push('All 12 locks and six stages; reverse maze order; completion');
  await page.locator('#victory-report').click();
  for(const [button,extension] of [['#html-report','html'],['#json-report','json'],['#csv-report','csv']]){
    const promise=page.waitForEvent('download');await page.locator(button).click();const download=await promise;await download.saveAs(`${artifacts}/receipt.${extension}`);
  }
  const report=JSON.parse(await readFile(artifacts+'/receipt.json','utf8'));assert.equal(report.summary.xp,1200);assert.equal(report.summary.independentFirst,11);assert.equal(report.verification,'local/unverified');
  await page.locator('[data-close=report-dialog]').click();await page.reload();await page.locator('#completion').waitFor();
  await page.locator('#teacher-button').click();const restoredDownload=page.waitForEvent('download');await page.locator('#json-report').click();await(await restoredDownload).saveAs(artifacts+'/restored-receipt.json');
  assert.equal(JSON.parse(await readFile(artifacts+'/restored-receipt.json','utf8')).receiptId,report.receiptId);checks.push('HTML/JSON/CSV downloads; recovered identical completion receipt');
  const mobile=await pageFor({viewport:{width:360,height:800},isMobile:true,hasTouch:true,reducedMotion:'reduce'});await start(mobile,'guided');
  assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await mobile.locator('#plus-0').tap();await mobile.locator('#plus-2').tap();assert.match(await mobile.locator('#power-total').innerText(),/5 units/);
  await mobile.locator('#connect').tap();assert.equal((await saved(mobile)).entries.C01.independentFirst,false);
  await mobile.screenshot({path:artifacts+'/cyber-mobile.png',fullPage:true});
  await mobile.locator('#next').tap();await mobile.locator('#settings-button').tap();await mobile.locator('#motion-toggle').check();await mobile.locator('#mode-select').selectOption('independent');await mobile.locator('[data-close=settings]').tap();
  assert.equal(await mobile.locator('body').evaluate(e=>e.classList.contains('reduce-motion')),true);
  await mobile.setViewportSize({width:800,height:360});assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  checks.push('360px touch chips; guided evidence; settings; reduced motion; landscape no overflow');
  const keyboard=await pageFor();await start(keyboard);await keyboard.locator('#plus-0').focus();await keyboard.keyboard.press('Enter');assert.equal(await keyboard.locator('#digit-0').innerText(),'1');await keyboard.locator('#plus-2').focus();await keyboard.keyboard.press('Space');await keyboard.locator('#connect').focus();await keyboard.keyboard.press('Enter');assert.equal((await saved(keyboard)).entries.C01.done,true);checks.push('Keyboard-only chip controls and connection');
  const blocked=await pageFor();await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw Error('blocked');}}));await start(blocked);assert.match(await blocked.locator('#storage-warning').innerText(),/unavailable/);await typeCode(blocked,'101');await blocked.locator('#connect').click();assert.match(await blocked.locator('#xp').innerText(),/100/);checks.push('Storage-denied game remains playable with warning');
  const corrupt=await pageFor();await corrupt.addInitScript(key=>localStorage.setItem(key,'{broken'),KEY);await start(corrupt);assert.match(await corrupt.locator('#storage-warning').innerText(),/protected/);assert.equal(await corrupt.evaluate(key=>localStorage.getItem(key),KEY),'{broken');const rawPromise=corrupt.waitForEvent('download');await corrupt.locator('#raw-backup').click();await(await rawPromise).saveAs(artifacts+'/original-save.json');assert.equal(await readFile(artifacts+'/original-save.json','utf8'),'{broken');checks.push('Corrupted save preserved and downloadable');
  const exposed=await pageFor();await start(exposed);await exposed.locator('#teacher-button').click();await exposed.locator('#report-dialog details summary').click();await exposed.locator('#review-questions').click();await exposed.locator('[data-close=report-dialog]').click();await typeCode(exposed,'101');await exposed.locator('#connect').click();assert.equal((await saved(exposed)).entries.C01.independentFirst,false);checks.push('Answer-review exposure cannot be counted as independent mastery');
  const imported=await pageFor();await start(imported);await imported.locator('#settings-button').click();const backup=await saved(page);imported.once('dialog',d=>d.accept());await imported.locator('#import-file').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await imported.locator('#completion').waitFor();assert.equal((await saved(imported)).runId,backup.runId);checks.push('Validated backup import restores completion');
  assert.deepEqual(errors,[]);assert.deepEqual(network,[]);
  const output={date:'2026-10-18',tested:'Built static files, headless Chrome desktop and mobile emulation',checks,errors,externalRequests:network,limits:['Physical Android/iPad, Safari and assistive technology not tested','Teacher review and student fun/learning pilot pending']};
  await writeFile(artifacts+'/browser-report.json',JSON.stringify(output,null,2));console.log(JSON.stringify(output,null,2));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
