import assert from 'node:assert/strict';
import {chromium,expect} from '@playwright/test';

const fixture={version:1,platform:'vexgo',title:'250-part stress',groups:Array.from({length:5},(_,i)=>({id:'g'+i,name:'Module '+i})),parts:Array.from({length:250},(_,i)=>({id:'p'+i,sku:'228-2500-001',label:'Beam',groupId:'g'+Math.floor(i/50),position:[i%25*100,40+Math.floor(i/25)*100,0],rotation:[0,0,0]})),steps:[]};
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());
 await page.addInitScript(project=>localStorage.setItem('mindx-vexgo-assembly-v1',JSON.stringify(project)),fixture);
 await page.goto((process.env.BASE_URL||'http://127.0.0.1:3131')+'/assembly/editor.html');
 await page.waitForFunction(()=>window.mindxAssembly,null,{timeout:90000});
 const state=()=>page.evaluate(async()=>(await window.mindxAssembly.execute('getState')).result);
 await expect.poll(async()=>(await state()).busy,{timeout:90000}).toBe(false);
 await page.locator('#inspector-tab-1').click();
 await page.locator('.part-layer-select:not(:disabled)').first().waitFor({timeout:90000});
 const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 const selection=await page.evaluate(()=>{const times=[];for(let i=0;i<20;i++){const start=performance.now();document.querySelector(`[data-group-id="g${i%5}"] .group-layer-select`).click();times.push(performance.now()-start);}times.sort((a,b)=>a-b);return {medianMS:times[10],p95MS:times[19]};});
 assert.equal((await state()).selectedIds.length,50);
 await page.locator('#inspector-tab-0').click();
 const before=(await state()).project;
 const x=page.locator('#transforms input').first(),oldX=Number(await x.inputValue());
 await x.fill(String(oldX+10));await x.press('Tab');
 await expect.poll(async()=>Number((await state()).project.parts.find(p=>p.id===before.parts.find(p=>p.position[0]===oldX&&p.groupId==='g4')?.id)?.position[0]),{timeout:90000}).toBe(oldX+10);
 const moved=(await state()).project;
 for(const p of before.parts)assert.deepEqual(moved.parts.find(row=>row.id===p.id).position,p.position.map((v,i)=>v+(p.groupId==='g4'&&i===0?10:0)),'Only the selected group moves rigidly');
 await page.locator('#undo').click();
 await expect.poll(async()=>JSON.stringify((await state()).project.parts.map(p=>p.position)),{timeout:90000}).toBe(JSON.stringify(before.parts.map(p=>p.position)));
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 await page.locator('#inspector-tab-2').click();
 for(let i=0;i<3;i++){
  await page.locator('#guide-export').click();
  await page.locator('#guide-pdf-preview[data-loading=false] #pdf-preview-paper').waitFor({timeout:90000});
  await page.locator('#pdf-mode-orbit').click();
  const live=page.locator('.pdf-orbit-canvas');await live.waitFor({timeout:90000});
  const savedCamera=async()=>JSON.stringify(Object.values((await state()).project.guidePreferences?.steps||{})[0]?.page?.frames?.assembled?.camera);
  const oldCamera=await savedCamera(),rect=await live.boundingBox();
  await page.mouse.move(rect.x+rect.width*.5,rect.y+rect.height*.5);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.5+30,rect.y+rect.height*.5+10,{steps:5});await page.mouse.up();
  await expect.poll(savedCamera,{timeout:90000}).not.toBe(oldCamera);
  await page.locator('#guide-pdf-preview[data-loading=false] #pdf-preview-paper').waitFor({timeout:90000});
  await page.locator('#pdf-preview-close').click();
  await expect(page.locator('#guide-pdf-preview .pdf-pages > *')).toHaveCount(0);
  await expect(page.locator('#guide-pdf-preview .pdf-paper-holder > *')).toHaveCount(0);
 }
 assert.equal((await state()).project.parts.length,250);
 assert.deepEqual(errors,[]);
 console.log('PASS: 250 CAD parts, 50-member group selection/translation/Undo at 4× CPU throttling, three PDF open/close cycles release page images.',JSON.stringify(selection));
}finally{await browser.close();}
