import assert from 'node:assert/strict';
import {chromium,expect} from '@playwright/test';

const doc={version:1,platform:'vexgo',title:'Group export',steps:[],groups:[
 {id:'a',name:'Khung xe'},{id:'b',name:'Cụm bánh'},{id:'child',name:'Bên trong',parentId:'a'}],parts:[
 {id:'a1',sku:'228-2500-001',label:'Beam',kind:'body',groupId:'a',position:[0,40,0],rotation:[0,0,0]},
 {id:'a2',sku:'228-2500-2260',label:'Pin',kind:'pin',groupId:'child',position:[20,80,0],rotation:[0,0,0]},
 {id:'b1',sku:'228-2500-001',label:'Beam',kind:'body',groupId:'b',position:[130,40,0],rotation:[0,0,0]},
 {id:'loose',sku:'228-2500-2260',label:'Pin',kind:'pin',position:[170,60,0],rotation:[0,0,0]},
]};
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.addInitScript(doc=>{if(!localStorage.getItem('mindx-vexgo-assembly-v1'))localStorage.setItem('mindx-vexgo-assembly-v1',JSON.stringify(doc));},doc);
 await page.goto((process.env.BASE_URL||'http://localhost:3131')+'/assembly/editor.html');
 const ready=()=>page.waitForFunction(()=>window.mindxAssembly,null,{timeout:90000});
 await ready();
 const guide=()=>page.evaluate(async()=>(await window.mindxAssembly.execute('getGuide')).result);
 await page.locator('#inspector-tab-2').click();
 await expect(page.locator('#guide-order-mode')).toHaveValue('groups');
 let current=await guide();assert.equal(current.steps.length,3);assert.equal(current.orderMode,'groups');
 assert.deepEqual(current.steps[0].added.map(part=>part.id),['a1','a2']);
 await page.locator('#guide-export').click();
 const pdfReady=()=>page.locator('#guide-pdf-preview[data-loading=false] #pdf-preview-paper').waitFor({timeout:90000});
 await pdfReady();await page.locator('.pdf-pages button[data-page="0"]').click();await pdfReady();
 assert.equal(await page.locator('#pdf-preview-paper [data-paper-frame]').count(),2);
 await expect(page.locator('#pdf-preview-paper .guide-step-instruction')).toContainText('Khung xe');
 await page.locator('#pdf-step-order').fill('3');await page.locator('#pdf-step-order').press('Enter');
 await expect.poll(async()=>(await guide()).steps.at(-1).groupId).toBe('a');await pdfReady();
 await page.locator('#pdf-preview-close').click();await page.reload();await ready();
 assert.equal((await guide()).steps.at(-1).groupId,'a');
 await page.locator('#inspector-tab-1').click();
 await page.locator('[data-group-id="b"] .group-layer-select').click();
 await page.getByRole('button',{name:'Đưa group lên · cập nhật thứ tự Guide',exact:true}).click();
 await expect.poll(async()=>(await guide()).steps[0].groupId).toBe('b');
 await page.locator('#undo').click();
 await expect.poll(async()=>(await guide()).steps.at(-1).groupId).toBe('a');
 const dropGroup=async fraction=>{
  const transfer=await page.evaluateHandle(()=>new DataTransfer());
  try{
   const source=page.locator('[data-group-id="b"]'),target=page.locator('[data-group-id="a"]'),box=await target.boundingBox();
   await source.dispatchEvent('dragstart',{dataTransfer:transfer});
   await target.dispatchEvent('drop',{dataTransfer:transfer,clientY:box.y+box.height*fraction});
  }finally{await transfer.dispose();}
 };
 await dropGroup(.05);
 await expect.poll(async()=>(await guide()).steps[0].groupId).toBe('b');
 await page.locator('#undo').click();
 await expect.poll(async()=>(await guide()).steps.at(-1).groupId).toBe('a');
 await dropGroup(.5);
 await expect.poll(async()=>(await guide()).steps.length).toBe(2);
 assert.equal((await guide()).steps[0].added.length,3);
 await page.locator('#undo').click();
 await expect.poll(async()=>(await guide()).steps.length).toBe(3);
 await page.locator('#inspector-tab-2').click();
 await page.locator('#guide-order-mode').selectOption('connections');
 await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(result=>result.result.project.guidePreferences.mode==='connections'));
 await page.reload();await ready();await page.locator('#inspector-tab-2').click();
 await expect(page.locator('#guide-order-mode')).toHaveValue('connections');
 assert.deepEqual(errors,[]);
 console.log('PASS: group export, nested groups, PDF frames, reorder/reload, Layers order reflected in Guide, Undo and mode persistence.');
}finally{await browser.close();}
