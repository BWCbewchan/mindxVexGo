import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {matingPose,worldReference,linkedPoses} from '../public/assembly/mating.js';
import {insertionLimit} from '../public/assembly/connector-policy.js';
import {chromium} from '@playwright/test';
const data=JSON.parse(await fs.readFile('public/assembly/connectors.json','utf8')).parts;
const sourceRef=data['228-2500-2271'][0],targetRef=data['228-2500-001'][1];
for(let i=0;i<60;i++){
 const source={position:[i*3,24,-10],rotation:[i*7,i*11,i*13]},target={position:[100,-22,30],rotation:[i*17,i*9,i*3]},depth=i%7,twist=i*90;
 const pose=matingPose(source,sourceRef,target,targetRef,{depth,twist});
 const a=worldReference(pose,sourceRef),b=worldReference(target,targetRef);
 const seatedDepth=Math.min(depth,insertionLimit(sourceRef,targetRef));
 assert.ok(a.point.distanceTo(b.point.clone().addScaledVector(b.normal,-seatedDepth))<1e-7);
 assert.ok(a.normal.dot(b.normal)<-.999999);
 const members=[{...target,id:'beam'},{...pose,id:'pin',mate:{target:'beam'}}],newBeam={position:[20,40,70],rotation:[i*3,i*9,33]};
 const moved=linkedPoses(members,'beam',newBeam).get('pin'),c=worldReference(moved,sourceRef),d=worldReference(newBeam,targetRef);
 assert.ok(c.point.distanceTo(d.point.clone().addScaledVector(d.normal,-seatedDepth))<1e-7);
}
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1450,height:950}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{if(location.pathname==='/assembly/editor.html'&&!sessionStorage.getItem('assembly-mating-test-reset')){localStorage.removeItem('mindx-vexgo-assembly-v1');sessionStorage.setItem('assembly-mating-test-reset','1');}});
 await page.goto('http://localhost:3120/assembly');const f=page.frameLocator('iframe');await f.locator('#status').filter({hasText:'Draft saved locally'}).waitFor();
 for(const id of ['228-2500-001','228-2500-2271']){await f.locator('#search').fill(id);await f.locator('#parts button').click();await f.locator('#selection').filter({hasText:id}).waitFor();}
 const frame=page.frames().find(f=>f.url().includes('editor.html'));
 await f.locator('#status').filter({hasText:'Draft saved locally · 2 parts'}).waitFor();
 const before=await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')));
 await f.locator('#connect').click();await f.locator('.connect-panel').waitFor({state:'visible'});
 await f.locator('#mate-source').selectOption('1');await f.locator('#mate-target').selectOption('2');await f.locator('#mate-insert').click();await f.locator('#mate-turn').click();
 assert.equal((await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')))).parts[1].position[1],before.parts[1].position[1],'Preview must not modify saved project');
 await f.locator('#fit').click();await page.screenshot({path:'artifacts/assembly-tests/connect-preview.png'});
 await f.locator('#mate-apply').click();await f.locator('#status').filter({hasText:'Connection applied'}).waitFor();
 const saved=await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')));
 assert.ok(saved.parts[1].mate);const a=worldReference(saved.parts[1],sourceRef),b=worldReference(saved.parts[0],targetRef);assert.ok(a.point.distanceTo(b.point.clone().addScaledVector(b.normal,-insertionLimit(sourceRef,targetRef)))<.01);
 await f.locator('#fit').click();await page.screenshot({path:'artifacts/assembly-tests/connected-pin.png'});
 await f.locator('#precision-fields summary').click();assert.equal(await f.locator('#move-joined').isChecked(),false,'Individual movement must be the default');
 await f.locator('#objects button').nth(1).click();const pinY=saved.parts[1].position[1];await f.locator('#transforms input').nth(1).fill(String(pinY-5));await f.locator('#transforms input').nth(1).press('Tab');
 const independent=await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')));assert.deepEqual(independent.parts[0].position,saved.parts[0].position,'Adjusting pin insertion must leave the beam stationary');const seated=worldReference(independent.parts[1],sourceRef),currentTargetRef=data['228-2500-001'].find(ref=>ref.id===independent.parts[1].mate.targetRef)||targetRef,face=worldReference(independent.parts[0],currentTargetRef),depth=-seated.point.sub(face.point).dot(face.normal),maxDepth=insertionLimit(sourceRef,currentTargetRef);assert.ok(depth>=-1e-6&&depth<=maxDepth+1e-6,`Individual insertion stays within physical end length at nearest hole (depth ${depth}, max ${maxDepth}, mate ${JSON.stringify(independent.parts[1].mate)}).`);
 await f.locator('#undo').click();await f.locator('#status').filter({hasText:'Draft saved'}).waitFor();await f.locator('.tool-options summary').click();await f.locator('#move-joined').check();
 await f.locator('#objects button').first().click();await f.locator('#transforms input').first().fill('10');await f.locator('#transforms input').first().press('Tab');await frame.waitForFunction(({id,expected})=>{const data=JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1'));return Math.abs(data.parts.find(part=>part.id===id)?.position[0]-expected)<1e-6;},{id:saved.parts[1].id,expected:saved.parts[1].position[0]+10},{timeout:10000});
 const moved=await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')));assert.ok(Math.abs(moved.parts[1].position[0]-saved.parts[1].position[0]-10)<1e-6,'Joined pin must move with its beam');
 await f.locator('#undo').click();await f.locator('#status').filter({hasText:'Draft saved'}).waitFor();
 await f.locator('#undo').click();await f.locator('#status').filter({hasText:'Draft saved'}).waitFor();const undone=await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')));assert.deepEqual(undone.parts[1].position,before.parts[1].position);
 await f.locator('#objects button').nth(1).click();await f.locator('#connect').click();await f.locator('#mate-depth').fill('10');await f.locator('#mate-depth').press('Tab');await f.locator('#mate-cancel').click();assert.deepEqual((await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')))).parts[1].position,before.parts[1].position);
 assert.deepEqual(errors,[]);console.log('PASS: 60 rotated CAD alignment and linked-group cases; pin/hole UI preview, depth, 90° twist, apply, group movement, undo and cancel.');
}finally{await browser.close();}
