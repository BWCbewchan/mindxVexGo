import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
// Verifies: each competition family loads its own mindX robot, practice worlds load, tools open, only mindX logo is shown.
const base='http://localhost:3131';
const profiles=JSON.parse(await fs.readFile('public/robolab/robot-profiles.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],failed=[];
const count=list=>{let n=0;const walk=cs=>cs.forEach(c=>{n++;if(c.components)walk(c.components);});walk(list);return n;};
try{
 const page=await browser.newPage({viewport:{width:1500,height:950}});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`);});
 await page.goto(base+'/robolab');
 await fs.mkdir('artifacts/robolab',{recursive:true});
 const ready=()=>page.waitForFunction(()=>document.querySelector('[role=status]')?.textContent==='Sẵn sàng',null,{timeout:120000});
 const gears=()=>page.frames().find(f=>f.url().includes('/robolab/gears/'));
 const open=async(family,title)=>{
  if(!await page.getByRole('region',{name:'Chọn sa bàn FLL WRO'}).isVisible())await page.getByRole('button',{name:'FLL / WRO',exact:true}).click();
  await page.getByRole('region',{name:'Chọn sa bàn FLL WRO'}).getByRole('button',{name:family,exact:true}).click();
  await page.getByRole('button',{name:new RegExp(title)}).first().click();
  await ready();
 };
 const cases=[['FLL','2024 FLL','mindx-fll'],['WRO','2026 WRO \\(Elementary\\)','mindx-wro-elementary'],['WRO','2026 WRO \\(Junior\\)','mindx-wro-junior'],['WRO','2026 WRO \\(Senior\\)','mindx-wro-senior'],['WRO','Future Engineer Obstacle','mindx-wro-fe'],['WRO','2025 WRO \\(Sport\\)','mindx-wro-sport']];
 for(const [family,title,profile] of cases){
  await open(family,title);
  const state=await gears().evaluate(()=>{const n=[];const walk=cs=>cs.forEach(c=>{n.push(c.port);if(c.components)walk(c.components);});walk(robot.components);return {name:robot.options.name,ports:n,start:robot.body.position.asArray(),header:document.querySelector('header')?.innerText,icons:[...document.querySelectorAll('header img')].map(i=>i.getAttribute('src'))};});
  assert.equal(state.name,profile,title);
  assert.equal(state.ports.length,count(profiles.profiles[profile].components),'component count '+profile);
  assert(!/GearsBot/.test(state.header),'Gears header text hidden');
  assert.deepEqual(state.icons,['/mindx-logo-color-mark.png']);
  await page.getByRole('button',{name:/^Robot: /}).click();
  const rows=await page.getByRole('complementary',{name:'Robot của sa bàn'}).locator('tr').count();
  assert.equal(rows,1+count(profiles.profiles[profile].components),'port table '+profile);
  if(profile==='mindx-wro-junior')await page.screenshot({path:'artifacts/robolab/06-wro-junior-robot.png'});
  await page.getByRole('complementary',{name:'Robot của sa bàn'}).getByRole('button',{name:'Đóng'}).click();
  // robot actually drives with its profile
  await gears().evaluate(()=>{filesManager.files['main.py']='from ev3dev2.motor import MoveTank, OUTPUT_A, OUTPUT_B\nMoveTank(OUTPUT_A, OUTPUT_B).on_for_seconds(30, 30, 1)';filesManager.modified=true;simPanel.runSim();});
  await gears().waitForFunction(()=>skulpt.running===false,null,{timeout:20000,polling:200});
  const end=await gears().evaluate(()=>robot.body.position.asArray());
  const moved=Math.hypot(end[0]-state.start[0],end[2]-state.start[2]);
  console.log(profile,'components',state.ports.length,'moved cm',moved.toFixed(1));
  assert(moved>1,'robot must drive on '+title);
 }
 for(const title of ['Dò line · Đường cong đơn giản','Sumo · Đối thủ đứng yên','Gyro · Đi thẳng','Cứu hỏa · Cháy ở tiệm tạp hóa','Bóng đá robot','Mê cung']){
  await open('Luyện tập',title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  const s=await gears().evaluate(()=>({world:babylon.world.name,meshes:babylon.scene.meshes.length,robot:robot.options.name}));
  console.log('practice',title,JSON.stringify(s));assert(s.meshes>5);
  if(title.startsWith('Dò line'))await page.screenshot({path:'artifacts/robolab/07-practice-line.png'});
 }
 for(const [label,file] of [['Thiết kế robot','configurator'],['Tạo sa bàn','builder'],['Đấu trường','arena']]){
  await page.getByRole('button',{name:'Công cụ',exact:true}).click();
  await page.getByRole('button',{name:new RegExp('^'+label)}).click();
  await ready();
  const f=page.frames().find(x=>x.url().includes(`/gears/${file}.html`));assert(f,file);
  await f.waitForSelector('header');
  const h=await f.evaluate(()=>({text:document.querySelector('header').innerText,icons:[...document.querySelectorAll('header img')].map(i=>i.getAttribute('src'))}));
  assert(!/GearsBot/.test(h.text));assert.deepEqual(h.icons,['/mindx-logo-color-mark.png']);
  await page.waitForTimeout(3000);
  if(file==='configurator')await page.screenshot({path:'artifacts/robolab/08-configurator.png'});
  console.log('tool',file,h.text.split('\n')[0]);
 }
 console.log(JSON.stringify({errors,failed}));assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 console.log('PASS per-field robots, practice worlds, tools, mindX-only branding.');
}finally{await browser.close();}
