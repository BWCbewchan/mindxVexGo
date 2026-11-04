import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';

const base=process.env.BASE_URL||'http://localhost:3131',out='artifacts/group-quick-attach';await fs.mkdir(out,{recursive:true});
const fixture={version:1,platform:'vexgo',title:'Grouped quick attach',parts:[
 {id:'beam-a',sku:'228-2500-001',label:'Beam A',position:[-60,40,0],rotation:[0,0,0],groupId:'inner'},
 {id:'pin',sku:'228-2500-2260',label:'Pin',position:[-60,40,60],rotation:[0,0,0],groupId:'inner'},
 {id:'beam-b',sku:'228-2500-001',label:'Beam B',position:[60,40,0],rotation:[0,0,0],groupId:'outer'}
],groups:[{id:'inner',name:'Inner',parentId:'outer',visible:true,locked:false},{id:'outer',name:'Outer',visible:true,locked:false}],steps:[]};
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1600,height:1050}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://*.supabase.co/**',r=>r.abort());
try{
 await page.addInitScript(project=>{if(!localStorage.getItem('mindx-vexgo-assembly-v1'))localStorage.setItem('mindx-vexgo-assembly-v1',JSON.stringify(project));},fixture);
 await page.goto(base+'/assembly/editor.html');await page.waitForFunction(()=>window.mindxAssembly);const state=()=>page.evaluate(async()=>(await window.mindxAssembly.execute('getState')).result);
 const idle=()=>page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>!r.result.busy));
 const execute=async(name,args)=>{await idle();const r=await page.evaluate(({name,args})=>window.mindxAssembly.execute(name,args),{name,args});assert.equal(r.ok,true,JSON.stringify(r));return r.result;};
 const selectGroup=async()=>{await page.locator('#inspector-tab-1').click();await page.locator('[data-group-id="outer"] .group-layer-select').click();await page.locator('#fit').click();};
 await idle();await page.locator('#inspector-tab-1').click();await page.locator('[data-part-id="beam-a"] .part-layer-select').click();await page.locator('#fit').click();await page.locator('.quick-point-hit:visible').first().waitFor();
 const single=await page.locator('.quick-point-hit:visible').count();assert.ok(single>0);await selectGroup();
 await page.waitForFunction(()=>document.querySelectorAll('.quick-point-hit').length>0&&[...document.querySelectorAll('.quick-point-hit')].every(b=>b.dataset.partId==='beam-b'));
 const original=await state();assert.equal(original.selectedIds.length,3);
 for(const [owner,kind,heading,sku] of [['beam-a','hole','Choose a pin for this hole','228-2500-2260'],['pin','pin','Choose a part for this pin','228-2500-001']]){
  await execute('select',{ids:fixture.parts.map(p=>p.id).filter(id=>id!==owner).concat(owner)});await page.waitForFunction(id=>document.querySelectorAll('.quick-point-hit').length>0&&[...document.querySelectorAll('.quick-point-hit')].every(b=>b.dataset.partId===id),owner);
  const point=()=>page.locator(`.quick-point-hit[data-part-id="${owner}"][data-ref-kind="${kind}"]:visible`).first();
  await point().click();await page.locator('#quick-heading').filter({hasText:heading}).waitFor();assert.equal(await page.locator('#quick-target-marker').getAttribute('data-part-id'),owner);
  await page.locator('#quick-search').fill(sku);await page.locator('#quick-options button').click();await page.locator('#quick-apply').waitFor();
  assert.equal((await state()).project.parts.length,fixture.parts.length,'Preview does not change the group');
  await page.locator('#quick-close').click();assert.deepEqual((await state()).selectedIds.slice().sort(),original.selectedIds.slice().sort(),'Cancel preserves whole-group selection');
  assert.deepEqual((await state()).project.groups,original.project.groups);
  await point().click();await page.locator('#quick-search').fill(sku);await page.locator('#quick-options button').click();await page.locator('#quick-apply').click();await idle();
  const attached=await state(),added=attached.project.parts.find(p=>!fixture.parts.some(old=>old.id===p.id));assert.ok(added);assert.equal(added.mate.target,owner,'Attach uses the clicked member instead of the active member');assert.equal(added.groupId,'inner','Added part belongs to the target member’s group');
  assert.deepEqual(attached.project.groups,original.project.groups);for(const old of fixture.parts){const p=attached.project.parts.find(p=>p.id===old.id);assert.deepEqual(p.position,old.position);assert.deepEqual(p.rotation,old.rotation);}
  await page.screenshot({path:out+'/'+kind+'-attached.png'});await execute('undo');assert.equal((await state()).project.parts.length,fixture.parts.length);await selectGroup();
 }
 await execute('select',{ids:['beam-a','beam-b','pin']});await page.waitForFunction(()=>document.querySelector('.quick-point-hit[data-part-id=pin]'));
 const pinPoint=await page.locator('.quick-point-hit[data-part-id="pin"][data-ref-kind="pin"]:visible').first().boundingBox();assert.ok(pinPoint);await selectGroup();
 await page.keyboard.press('Escape');await page.mouse.click(pinPoint.x+pinPoint.width/2+3,pinPoint.y+pinPoint.height/2);
 await page.locator('#quick-heading').filter({hasText:'Choose a part for this pin'}).waitFor({timeout:4000});assert.equal(await page.locator('#quick-target-marker').getAttribute('data-part-id'),'pin');
 await page.locator('#quick-close').click();assert.deepEqual((await state()).selectedIds.slice().sort(),['beam-a','pin'],'Tapping the pin body preserves its nested group on cancel');
 await execute('setGroup',{id:'inner',locked:true});await selectGroup();await page.waitForFunction(()=>![...document.querySelectorAll('.quick-point-hit')].some(b=>['beam-a','pin'].includes(b.dataset.partId)));
 assert.ok(await page.locator('.quick-point-hit[data-part-id="beam-b"]:visible').count(),'Unlocked members remain attachable');assert.deepEqual(errors,[]);
 console.log('PASS: only the active member shows markers while the group stays selected; both quick-attach dialogs target the clicked member; preview/cancel preserves selection, nested groups and poses; new parts inherit the group; Undo and locked-member protection.');
}catch(error){await page.screenshot({path:out+'/failure.png'});console.log('Group debug:',await page.evaluate(()=>({selection:document.getElementById('selection')?.textContent,status:document.getElementById('status')?.textContent,points:[...document.querySelectorAll('.quick-point-hit')].map(b=>({owner:b.dataset.partId,kind:b.dataset.refKind,hidden:b.hidden}))})));throw error;}finally{await browser.close();}
