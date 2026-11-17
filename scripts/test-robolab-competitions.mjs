import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const failed=[];page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`);});
 await page.goto('http://localhost:3131/robolab');
 await page.evaluate(()=>localStorage.setItem('competition-host-canary','existing assembly'));
 await page.getByRole('button',{name:'FLL / WRO',exact:true}).click();
 await page.getByRole('region',{name:'Chọn sa bàn FLL WRO'}).getByRole('button',{name:'FLL',exact:true}).click();
 await page.getByRole('button',{name:/2025 FLL/}).waitFor();
 await page.screenshot({path:'artifacts/robolab/04-competitions.png'});
 const catalog=await page.evaluate(()=>fetch('/robolab/competitions.json').then(r=>r.json()));assert.equal(catalog.length,38);
 for(const id of ['FLL2020','WRO-2026-Junior','FLL2025']){
  const item=catalog.find(m=>m.id===id);assert(item);
  if(!await page.getByRole('region',{name:'Chọn sa bàn FLL WRO'}).isVisible())await page.getByRole('button',{name:'FLL / WRO',exact:true}).click();
  await page.getByRole('button',{name:item.family,exact:true}).click();
  await page.getByRole('button',{name:new RegExp(item.title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).click();
  await page.waitForFunction(()=>document.querySelector('[role=status]')?.textContent==='Sẵn sàng',null,{timeout:90000});
  const frame=page.frames().find(f=>f.url().includes('/gears/index.html'));
  assert(frame);
  const state=await frame.evaluate(()=>({image:babylon.world.options.imageURL,meshes:babylon.scene.meshes.length,position:robot.body.position.asArray(),blocks:!!blockly.workspace}));
  console.log(id,JSON.stringify(state));assert.equal(state.image,item.image);assert(state.meshes>10);assert(state.blocks);
  await frame.evaluate(()=>localStorage.setItem('competition-test','separate'));
  if(id==='WRO-2026-Junior'){
   await page.screenshot({path:'artifacts/robolab/05-wro-simulator.png'});
   const start=await frame.evaluate(()=>robot.body.position.asArray());
   await frame.evaluate(()=>{filesManager.files['main.py']='from ev3dev2.motor import MoveTank, OUTPUT_A, OUTPUT_B\ntank = MoveTank(OUTPUT_A, OUTPUT_B)\ntank.on_for_seconds(20, 20, 1)';filesManager.modified=true;simPanel.runSim();});
   await frame.waitForFunction(()=>skulpt.running===true);
   await frame.waitForFunction(()=>skulpt.running===false,null,{timeout:15000});
   const end=await frame.evaluate(()=>robot.body.position.asArray());
   assert(Math.hypot(end[0]-start[0],end[2]-start[2])>1,'Python program must move the physical robot');
   console.log('Python drive distance (cm)',Math.hypot(end[0]-start[0],end[2]-start[2]));
  }
 }
 assert.equal(await page.evaluate(()=>localStorage.getItem('competition-host-canary')),'existing assembly');
 assert.equal(await page.evaluate(()=>localStorage.getItem('mindx-robolab-gears:v1:competition-test')),'separate');
 await page.getByRole('button',{name:'Lắp & lập trình',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('[role=status]')?.textContent==='Sẵn sàng',null,{timeout:90000});
 const lab=page.frames().find(f=>f.url().includes('/runtime/index.html'));
 assert.equal(await lab.locator('header img.logo').count(),0);
 assert.equal(await lab.locator('#btnAbout').isVisible(),false);
 assert.equal(await lab.locator('header h1').isVisible(),false);
 console.log(JSON.stringify({errors,failed}));assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 console.log('PASS competition catalog, three season loads, isolated storage, engine switching, visual branding.');
}finally{await browser.close();}
