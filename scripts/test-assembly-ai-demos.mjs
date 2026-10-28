import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{for(const path of ['api-demo.html','original-car-demo.html?build=1']){
 const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{const match=message.text().match(/Đang lắp bằng API · (\d+):/);if(match&&Number(match[1])%20===0)console.log(`Progress ${path}: command ${match[1]}`);});
 await page.goto('http://localhost:3120/assembly/'+path);try{await page.waitForFunction(()=>window.demoReady||window.demoError,null,{timeout:240000});}catch(error){console.log(await page.locator('#progress').textContent());await page.screenshot({path:'artifacts/assembly-tests/ai-demo-failure.png'});throw error;}
 const result=await page.evaluate(()=>({ready:window.demoReady,error:window.demoError,progress:document.querySelector('#progress').textContent}));assert.equal(result.error,undefined,JSON.stringify(result));assert.equal(result.ready,true);
 const state=await page.evaluate(()=>document.querySelector('iframe').contentWindow.mindxAssembly.execute('getState'));assert.equal(state.ok,true);assert.ok(state.result.project.parts.length>=11);assert.deepEqual(errors,[]);
 console.log(`PASS: same-origin parent/iframe API: ${path} · ${state.result.project.parts.length} parts · ${result.progress}`);await context.close();
}}finally{await browser.close();}
