import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[],failed=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()]);});
 await page.addInitScript(()=>{if(window===window.top){localStorage.setItem('mindx-vexgo-assembly-v1','existing-project-canary');sessionStorage.setItem('existing-project','canary');}});
 await page.goto((process.env.BASE_URL||'http://localhost:3131')+'/robolab');
 const engine=()=>page.frames().find(f=>f.url().includes('/robolab/runtime/'));
 await page.waitForFunction(()=>document.querySelector('[role=status]')?.textContent==='Sẵn sàng',null,{timeout:90000});
 const state=await engine().evaluate(()=>({cad:!!window.__cad,blocks:!!window.__wb?.ws(),missions:!!window.__umc,learning:!!window.__trainModel,vision:!!window.__vla,demonstrations:!!window.__bc,realHub:!!window.__real,physics:!!document.getElementById('simPhys'),fields:document.getElementById('simMat')?.options.length,storageKeys:Object.keys(localStorage)}));
 assert.ok(state.cad&&state.blocks&&state.missions&&state.learning&&state.vision&&state.demonstrations&&state.realHub&&state.physics,JSON.stringify(state));
 assert.ok(state.fields>10,JSON.stringify(state));
 await engine().evaluate(()=>{window.dialogResult=null;window.robolabDialogs.confirm('Kiểm tra hộp thoại').then(value=>window.dialogResult=value);});
 await page.frameLocator('iframe').getByRole('button',{name:'Hủy',exact:true}).click();assert.equal(await engine().evaluate(()=>window.dialogResult),false);
 await engine().evaluate(()=>new Promise((resolve,reject)=>{const request=indexedDB.open('boundary-check',1);request.onsuccess=()=>{request.result.close();resolve();};request.onerror=()=>reject(request.error);}));
 assert.ok(await page.evaluate(async()=>(await indexedDB.databases()).some(db=>db.name==='mindx-robolab:v1:boundary-check')));
 await engine().evaluate(()=>{localStorage.setItem('test','module');localStorage.clear();localStorage.setItem('reload-test','saved');});
 assert.equal(await page.evaluate(()=>localStorage.getItem('mindx-vexgo-assembly-v1')),'existing-project-canary');
 assert.equal(await page.evaluate(()=>sessionStorage.getItem('existing-project')),'canary');
 assert.equal(await page.evaluate(()=>localStorage.getItem('mindx-robolab:v1:reload-test')),'saved');
 await page.reload();await page.waitForFunction(()=>document.querySelector('[role=status]')?.textContent==='Sẵn sàng',null,{timeout:90000});
 assert.equal(await engine().evaluate(()=>localStorage.getItem('reload-test')),'saved');
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await fs.mkdir('artifacts/robolab',{recursive:true});await page.screenshot({path:'artifacts/robolab/mobile.png'});
 console.log(JSON.stringify({state,errors,failed}));assert.deepEqual(errors,[]);
 console.log('PASS: independent RoboLab boots all feature modules, supplies fields, isolates storage/clear, reloads and fits a narrow viewport.');
}finally{await browser.close();}
