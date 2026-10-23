import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{let req;Object.defineProperty(window,'__vexStudioRequire',{configurable:true,get:()=>req,set:v=>{req=v;window.__testRequire=v;}});window.addEventListener('message',e=>{if(e.data?.type==='simulation-error')window.__failure=e.data.message;});});
 await page.goto('http://localhost:3120/editor/index.html?mode=training&simulation=assembly&lesson=guard-tests');await page.waitForFunction(()=>!!window.VexTraining);
 async function rejects(xml,expected){
  await page.evaluate(xml=>{window.__failure=null;const req=window.__testRequire,B=req('./src/Blockly/BlocklyAccess.ts').Blockly,ws=req('./src/Blockly/BlocklyController.ts').getCurrentMainController().blocklyWorkspace;ws.clear();B.Xml.domToWorkspace(B.Xml.textToDom(xml),ws);window.postMessage({type:'training-command',action:'run'},location.origin);},xml);
  await page.waitForFunction(()=>!!window.__failure);assert.match(await page.evaluate(()=>window.__failure),expected);
 }
 for(const type of ['go_events_when_bumper','go_events_when_timer','go_events_when_broadcasted'])await rejects(`<xml><block type="go_events_when_started"/><block type="${type}"/></xml>`,new RegExp('Not simulated yet: '+type));
 await rejects('<xml><block type="go_events_when_started"/><block type="go_events_when_started"/></xml>',/một khối when started/);
 await rejects('<xml><block type="go_events_when_started"><next><block type="go_magnet_energize"/></next></block></xml>',/chưa có nam châm/);
 console.log('PASS: unsupported event roots rejected, parallel entry points rejected, missing hardware rejected before execution');
 await page.goto('http://localhost:3120/simulation/teacher.html');await page.locator('article').nth(7).waitFor();assert.equal(await page.locator('article').count(),8);assert.equal(await page.getByRole('button',{name:'In / lưu PDF kịch bản'}).isVisible(),true);
 await page.evaluate(()=>{window.print=()=>{document.body.dataset.printed='true';};});await page.getByRole('button',{name:'In / lưu PDF kịch bản'}).click();assert.equal(await page.locator('body').getAttribute('data-printed'),'true');await page.emulateMedia({media:'print'});assert.equal(await page.getByRole('button',{name:'In / lưu PDF kịch bản'}).isVisible(),false);assert.equal(await page.locator('article').count(),8);
 await page.emulateMedia({media:'screen'});await fs.mkdir('artifacts/simulation',{recursive:true});await page.screenshot({path:'artifacts/simulation/teacher-book.png',fullPage:true});
 await page.goto('http://localhost:3120/simulation/support.html');await page.locator('#commands section').nth(8).waitFor();assert.ok(await page.locator('#commands code').count()>100);assert.equal(await page.locator('#commands code').filter({hasText:'comment_text'}).count(),1);assert.deepEqual(errors,[]);
 console.log('PASS: all 8 teacher lessons render, print button invokes printing, print CSS works and live registry reference renders without runtime errors');
}finally{await browser.close();}
