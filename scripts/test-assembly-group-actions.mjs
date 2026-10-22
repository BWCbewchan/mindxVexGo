import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const fixture={version:1,title:'Group action regression',parts:[
 {id:'beam-a',sku:'228-2500-001',label:'Beam A',position:[-60,40,0],rotation:[0,0,0],groupId:'inner'},
 {id:'beam-b',sku:'228-2500-001',label:'Beam B',position:[60,40,0],rotation:[0,0,0],groupId:'inner'},
 {id:'loose',sku:'228-2500-001',label:'Loose beam',position:[180,40,0],rotation:[0,0,0]}
],groups:[{id:'inner',name:'Inner',parentId:'outer',visible:true,locked:false},{id:'outer',name:'Outer',visible:true,locked:false}],steps:[]};
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const failures=[];
await fs.mkdir('artifacts/assembly-tests',{recursive:true});
async function setup(){
 const page=await browser.newPage({viewport:{width:1500,height:1000}});
 await page.addInitScript(project=>localStorage.setItem('mindx-vexgo-assembly-v1',JSON.stringify(project)),fixture);
 await page.goto('http://localhost:3120/assembly/editor.html');
 await page.waitForFunction(()=>window.mindxAssembly);
 await page.locator('#status').filter({hasText:'Draft saved locally'}).waitFor();
 await page.locator('#inspector-tab-1').click();
 return page;
}
const state=page=>page.evaluate(async()=>(await window.mindxAssembly.execute('getState')).result);
async function scenario(name,run){let page;try{page=await setup();await run(page);console.log('PASS:',name);}catch(error){failures.push(name+': '+error.message);if(page)await page.screenshot({path:'artifacts/assembly-tests/'+name+'.png'});console.error('FAIL:',name,error.message);}finally{await page?.close();}}
try{
 await scenario('ungroup-selected-nested-folder',async page=>{
  await page.locator('[data-group-id="inner"] .group-layer-select').click();
  await page.getByRole('button',{name:'Ungroup selection · Ctrl+Shift+G',exact:true}).click();
  await page.waitForFunction(async()=>!(await window.mindxAssembly.execute('getState')).result.busy);
  const {project}=await state(page);
  assert.deepEqual(project.groups.map(g=>g.id),['outer'],'Ungroup must dissolve the clicked inner folder, not its outer parent with identical members');
  assert.ok(project.parts.filter(p=>p.id!=='loose').every(p=>p.groupId==='outer'));
 });
 await scenario('duplicate-whole-group',async page=>{
  await page.locator('[data-group-id="outer"] .group-layer-select').click();
  await page.locator('.layers-tools').getByRole('button',{name:'Duplicate · Ctrl+J',exact:true}).click();
  await page.waitForFunction(async()=>!(await window.mindxAssembly.execute('getState')).result.busy);
  await page.waitForTimeout(500);
  const {project,selectedIds}=await state(page);
  assert.equal(project.parts.length,5,'Duplicate must copy both selected members');
  assert.equal(project.groups.length,4,'Duplicate must copy the folder hierarchy');
  assert.equal(selectedIds.length,2,'All duplicated members must remain selected');
  const added=project.parts.filter(p=>!fixture.parts.some(old=>old.id===p.id));
  assert.equal(added[1].position[0]-added[0].position[0],120,'Relative transforms must be preserved');
  assert.ok(added.every(p=>p.groupId!=='inner'),'Copies must not join the original group');
 });
 await scenario('quick-attach-selected-hole-highlight',async page=>{
  await page.locator('[data-part-id="beam-a"] .part-layer-select').click();
  await page.locator('#fit').click();
  await page.getByRole('button',{name:/Quick attach at hole/}).first().dispatchEvent('click');
  await page.locator('#quick-heading').filter({hasText:'Choose a pin for this hole'}).waitFor();
  await page.locator('#quick-target-marker').waitFor({state:'visible',timeout:3000});
  assert.equal(await page.locator('#quick-target-marker').getAttribute('data-part-id'),'beam-a');
  await page.locator('#quick-search').fill('228-2500-2260');
  await page.locator('#quick-options button').click();
  await page.locator('#quick-apply').waitFor({state:'visible'});
  assert.equal(await page.locator('#quick-target-marker').isVisible(),true,'Hole stays highlighted while previewing');
  await page.screenshot({path:'artifacts/assembly-tests/quick-selected-hole.png'});
  await page.locator('#quick-close').click();
  assert.equal(await page.locator('#quick-target-marker').isVisible(),false,'Cancel removes the target highlight');
  assert.equal((await state(page)).project.parts.length,fixture.parts.length,'Preview/cancel must not change the project');
 });
 await scenario('group-keyboard-copy-history-and-ungroup',async page=>{
  const original=(await state(page)).project;
  await page.locator('[data-group-id="inner"] .group-layer-select').click();
  await page.keyboard.press('Control+j');
  await page.waitForFunction(async()=>{const s=(await window.mindxAssembly.execute('getState')).result;return !s.busy&&s.project.parts.length===5;});
  const copied=await state(page);
  assert.equal(copied.project.groups.length,3,'Copying a child folder must not copy its parent');
  await page.keyboard.press('Control+z');
  await page.waitForFunction(async()=>{const s=(await window.mindxAssembly.execute('getState')).result;return !s.busy&&s.project.parts.length===3;});
  assert.deepEqual((await state(page)).project,original,'Undo restores all original members in one action');
  await page.keyboard.press('Control+Shift+z');
  await page.waitForFunction(async()=>{const s=(await window.mindxAssembly.execute('getState')).result;return !s.busy&&s.project.parts.length===5;});
  assert.deepEqual((await state(page)).project,copied.project,'Redo restores the complete copied hierarchy');
  const folder=copied.project.groups.find(g=>!fixture.groups.some(old=>old.id===g.id));
  await page.locator(`[data-group-id="${folder.id}"] .group-layer-select`).click();
  await page.keyboard.press('Control+Shift+g');
  await page.waitForFunction(async()=>!(await window.mindxAssembly.execute('getState')).result.busy);
  const ungrouped=await state(page);
  assert.equal(ungrouped.project.groups.length,2);
  assert.ok(ungrouped.project.parts.filter(p=>copied.selectedIds.includes(p.id)).every(p=>!p.groupId));
  assert.deepEqual(ungrouped.project.parts.map(p=>p.position),copied.project.parts.map(p=>p.position),'Ungroup must not move parts');
 });
 await scenario('highlight-clears-after-attach-and-escape',async page=>{
  await page.locator('[data-part-id="beam-a"] .part-layer-select').click();await page.locator('#fit').click();
  await page.getByRole('button',{name:/Quick attach at hole/}).first().dispatchEvent('click');
  await page.locator('#quick-search').fill('228-2500-2260');
  await page.locator('#quick-options button').click();
  await page.locator('#quick-apply').click();
  await page.waitForFunction(async()=>{const s=(await window.mindxAssembly.execute('getState')).result;return !s.busy&&s.project.parts.length===4;});
  assert.equal(await page.locator('#quick-target-marker').isVisible(),false,'Successful attach removes the target highlight');
  await page.locator('[data-part-id="beam-b"] .part-layer-select').click();
  await page.getByRole('button',{name:/Quick attach at hole/}).first().dispatchEvent('click');
  await page.locator('#quick-target-marker').waitFor({state:'visible'});
  assert.equal(await page.locator('#quick-target-marker').getAttribute('data-part-id'),'beam-b');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#quick-target-marker').isVisible(),false,'Escape removes the target highlight');
 });
 await scenario('nearby-hole-buttons-are-clickable',async page=>{
  await page.locator('[data-part-id="beam-a"] .part-layer-select').click();await page.locator('#fit').click();
  await page.getByRole('button',{name:'Quick attach at hole 2',exact:true}).click({timeout:3000});
  await page.locator('#quick-heading').filter({hasText:'Choose a pin'}).waitFor();
 });
}finally{await browser.close();}
assert.deepEqual(failures,[],failures.join('\n'));
