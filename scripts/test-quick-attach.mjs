import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1450,height:950}});
try{
 await page.addInitScript(()=>{if(location.pathname==='/assembly/editor.html'&&!sessionStorage.getItem('quick-attach-test-reset')){localStorage.removeItem('mindx-vexgo-assembly-v1');sessionStorage.setItem('quick-attach-test-reset','1');}});
 await page.goto('http://localhost:3120/assembly');const f=page.frameLocator('iframe');await f.locator('#status').filter({hasText:'Draft saved locally'}).waitFor();
 await f.locator('#search').fill('228-2500-001');await f.locator('#parts button').click();await f.locator('#selection').filter({hasText:'Red Beam'}).waitFor();await f.locator('#fit').click();
 await page.screenshot({path:'artifacts/assembly-tests/quick-points.png'});
 const frame=page.frames().find(f=>f.url().includes('editor.html'));
 await f.getByRole('button',{name:'Quick attach at hole 2',exact:true}).click();await f.locator('#quick-heading').filter({hasText:'Choose a pin'}).waitFor();
 await f.locator('#quick-search').fill('228-2500-2271');await f.locator('#quick-options button').click();await f.locator('#quick-apply').waitFor({state:'visible'});assert.equal(await f.locator('#quick-move').getAttribute('aria-pressed'),'true');assert.equal(await f.locator('#quick-apply').isEnabled(),true);
 await f.locator('#quick-description').filter({hasText:'228-2500-2271'}).waitFor();assert.equal((await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')))).parts.length,1,'Preview must not persist a new part');
 await page.screenshot({path:'artifacts/assembly-tests/quick-pin-preview.png'});await f.locator('#quick-apply').click();await f.locator('#status').filter({hasText:'Part attached'}).waitFor();
 let project=await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')));assert.equal(project.parts.length,2);assert.equal(project.parts[1].mate.target,project.parts[0].id);
 await f.locator('button.quick-point-hit').filter({visible:true}).first().click();await f.locator('#quick-heading').filter({hasText:'Choose a part'}).waitFor();await f.locator('#quick-search').fill('228-2500-001');await f.locator('#quick-options button').click();await f.locator('#quick-description').filter({hasText:'228-2500-001'}).waitFor();
 await page.screenshot({path:'artifacts/assembly-tests/quick-beam-preview.png'});await f.locator('#quick-apply').click();await f.locator('#status').filter({hasText:'Part attached'}).waitFor();project=await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')));assert.equal(project.parts.length,3);assert.equal(project.parts[2].mate.target,project.parts[1].id);
 await f.locator('#undo').click();await f.locator('#status').filter({hasText:'2 parts'}).waitFor();assert.equal((await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')))).parts.length,2);
 await f.locator('#objects .part-layer-select').first().click();await f.getByRole('button',{name:'Quick attach at hole 2',exact:true}).click();await f.locator('#quick-search').fill('228-2500-2269');await f.locator('#quick-options button').click();await f.locator('#quick-description').filter({hasText:'228-2500-2269'}).waitFor();await f.locator('#quick-close').click();assert.equal((await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')))).parts.length,2);
 await f.locator('#search').fill('228-2500-2308');await f.locator('#parts button').click();await f.locator('#selection').filter({hasText:'Green Connector'}).waitFor();await f.locator('#fit').click();const pinPoints=f.locator('button.quick-point-hit[aria-label*="pin"]');await pinPoints.first().waitFor({state:'attached'});assert.equal(await pinPoints.count(),2,'Both connector pins must expose quick attach');await pinPoints.filter({visible:true}).first().click();await f.locator('#quick-heading').filter({hasText:'Choose a part for this pin'}).waitFor();
 console.log('PASS: click hole → pin preview/attach; click pin → beam preview/attach; preview isolation, cancel and one-step undo.');
}finally{await browser.close();}
