import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3103';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage();
 // Test only: simulate the interpreter lifecycle without sending robot commands.
 // Blockly, project loading, compilation and SVG rendering remain real.
 let bridge=await fs.readFile('public/controller-bridge.js','utf8');
 bridge=bridge.replace(/const interpreter = [^\r\n]+;/,`const listeners=[];const interpreter={isRunning:false,setProgram(){},setVarNames(){},run(){this.isRunning=true;},stop(){this.isRunning=false;listeners.forEach(fn=>fn());},on(event,fn){if(event==='onStop')listeners.push(fn);}};window.finishTestFunction=()=>interpreter.stop();`);
 bridge=bridge.replace(/const connected = [^\r\n]+;/,'const connected = () => true;');
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
 await editor.evaluate(()=>window.VexStudio.runFunction('drive forward'));
 const blocks=editor.locator('.studio-function-running');
 assert.ok(await blocks.count()>=2);
 const highlightedText=await blocks.allTextContents();
 assert.ok(highlightedText.some(text=>text.includes('CONTROL_BODY')));
 assert.ok(highlightedText.every(text=>!text.includes('START_SENTINEL')));
 const style=await editor.locator('.studio-function-running > .blocklyPath').first().evaluate(e=>({stroke:getComputedStyle(e).stroke,width:getComputedStyle(e).strokeWidth}));
 assert.deepEqual(style,{stroke:'rgb(57, 231, 95)',width:'4px'});
 await page.screenshot({path:'artifacts/function-green-border.png'});
 await editor.evaluate(()=>window.finishTestFunction());
 await blocks.first().waitFor({state:'detached'});
 await page.waitForTimeout(600);
 await editor.evaluate(()=>window.VexStudio.runFunction('drive forward'));
 assert.ok(await blocks.count()>0);
 await editor.evaluate(()=>window.VexStudio.stop());
 assert.equal(await blocks.count(),0);
 console.log('PASS: called My Block stack has a green SVG border; other start stack unchanged; completion and Stop clear it. Interpreter lifecycle simulated, no physical Brain test.');
}finally{await browser.close();}
