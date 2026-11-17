import assert from 'node:assert/strict';
import {chromium,expect} from '@playwright/test';

const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:800,height:600}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/guide-background-test',route=>route.fulfill({contentType:'text/html',body:'<style>.inspector-body{height:400px;overflow:auto;width:300px}.guide-live-card{height:300px}.guide-live-stage{height:200px}img{max-width:100px}</style><div class="inspector-body"></div>'}));
 await page.goto((process.env.BASE_URL||'http://127.0.0.1:3131')+'/guide-background-test');
 await page.evaluate(async()=>{
  const {installGuideWorkbench}=await import('/assembly/guide-workbench.js');
  window.busyModel=true;window.renders=[];
  const image='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
  window.steps=Array.from({length:12},(_,i)=>({type:'group',title:'Group '+i,parts:[{id:'p'+i,sku:'sample',position:[i,0,0],rotation:[0,0,0]}],added:[{id:'p'+i,sku:'sample',name:'sample'}]}));
  window.workbench=installGuideWorkbench({enabled:false,platform:'vexgo',appearance:()=>'',suspended:()=>window.busyModel,render:async(step,{alive})=>{if(!alive())return null;window.renders.push(step.title);return image;}});
  document.querySelector('.inspector-body').append(workbench.element);workbench.update({ready:true,steps});
 });
 await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>renders.length),0,'Main-model dragging pauses background previews');
 await page.evaluate(()=>{busyModel=false;workbench.resume(false);});
 await expect.poll(()=>page.evaluate(()=>renders.length)).toBeGreaterThan(0);
 await page.waitForTimeout(200);const firstCount=await page.evaluate(()=>renders.length);assert.ok(firstCount<12,'Offscreen pages stay lazy');
 await page.evaluate(()=>{busyModel=true;steps=steps.map(step=>({...step,parts:step.parts.map(p=>({...p,position:[p.position[0]+1,0,0]}))}));workbench.update({ready:true,steps});});
 await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>renders.length),firstCount,'Model updates do not restart previews during a drag');
 await page.evaluate(()=>{busyModel=false;workbench.resume(false);});
 await expect.poll(()=>page.evaluate(()=>renders.length)).toBeGreaterThan(firstCount);
 await page.evaluate(()=>{document.querySelector('.inspector-body').scrollTop=3600;});
 await expect.poll(()=>page.evaluate(()=>renders.some(name=>name==='Group 11'))).toBe(true);
 await page.evaluate(()=>workbench.clear());assert.equal(await page.locator('.guide-live-card').count(),0);
 await page.evaluate(()=>{workbench.update({ready:true,steps:steps.slice(0,1)});document.querySelector('.inspector-body').scrollTop=0;workbench.resume(false);});
 await page.locator('.guide-live-stage[data-ready=true]').waitFor();
 await page.evaluate(()=>workbench.dispose());assert.equal(await page.locator('#guide-workbench').count(),0);
 assert.deepEqual(errors,[]);console.log('PASS: background previews pause while dragging, resume afterward, load visible pages lazily, and clear/reopen/dispose cleanly.');
}finally{await browser.close();}
