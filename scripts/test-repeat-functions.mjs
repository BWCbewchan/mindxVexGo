import {chromium,devices} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3103';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(process.argv.includes('--android')?devices['Pixel 7']:{});
 // Keep the real interpreter and completion loop; stub only robot setup/I/O.
 let bridge=await fs.readFile('public/controller-bridge.js','utf8');
 bridge=bridge.replace(/const connected = [^\r\n]+;/,`const connected = () => true;
 const go=requireModule('./src/HardwareInterface/controllers/VEXGOController.ts').goController;
 window.deviceStopCalls=0;window.queueClearCalls=0;
 go.stopScriptEngine=async()=>{window.deviceStopCalls++;};go.clearMessageQueue=()=>{window.queueClearCalls++;};
 const loadProgram=interpreter.setProgram.bind(interpreter);
 interpreter.setProgram=code=>loadProgram('var vexcodeSystemInit={runInit:function(){}};function wait(){}function waitForConfigReady(){};'+code.slice(code.lastIndexOf('var console_precision = 0;')));
 interpreter.startCode=function(){this.nextStep();};
 `);
 await page.route('**/controller-bridge.js',route=>route.fulfill({contentType:'text/javascript',body:bridge}));
 await page.goto(base+'/studio');
 await page.getByRole('button',{name:'Continue to editor'}).click();
 const editor=await page.locator('iframe').elementHandle().then(e=>e.contentFrame());
 await editor.getByRole('button',{name:'File',exact:true}).click();
 const chooser=page.waitForEvent('filechooser');
 await editor.getByText('Load From Your Device',{exact:true}).click();
 await(await chooser).setFiles('scripts/fixtures/controls.goblocks');
 await editor.waitForFunction(()=>window.VexStudio?.functions().some(f=>f.signature==='drive forward'));
 await page.evaluate(()=>document.querySelector('iframe').contentWindow.postMessage({type:'vex-controller',id:1,action:'enable',enabled:true},location.origin));
 for(let i=0;i<3;i++){
  await editor.evaluate(()=>window.VexStudio.runFunction('drive forward'));
  await editor.waitForFunction(()=>!window.VexStudio.snapshot().running,{},{timeout:3000});
  await page.waitForTimeout(650);
 }
 assert.equal(await editor.locator('.studio-function-running').count(),0);
 assert.equal(await editor.evaluate(()=>window.deviceStopCalls),0,'normal completion must preserve continuous motor commands');
 assert.equal(await editor.evaluate(()=>window.queueClearCalls),0,'normal completion must preserve queued device commands');
 await editor.evaluate(()=>window.VexStudio.stop());
 await editor.waitForFunction(()=>window.deviceStopCalls===1);
 assert.equal(await editor.evaluate(()=>window.queueClearCalls),1);
 console.log('PASS: repeated calls finish without stopping hardware or clearing its queue; explicit Stop still stops hardware after a call completes. Real interpreter, robot I/O mocked.');
}finally{await browser.close();}
