import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';

// Quick attach on a long square shaft offers every free position along it,
// skips stretches that already carry a part, and "Gắn & tiếp tục" stacks parts.
const base=process.env.BASE_URL||'http://localhost:3120',out='artifacts/shaft-stations';await fs.mkdir(out,{recursive:true});
const fixture={version:1,platform:'vexiq',title:'Shaft stations',parts:[
 {id:'shaft',sku:'228-2500-261',label:'Shaft',position:[0,80,0],rotation:[0,0,0]}
],groups:[],steps:[]};
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1600,height:1050}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.addInitScript(project=>localStorage.setItem('mindx-assembly-project-v1:vexiq:stations',JSON.stringify(project)),fixture);
 await page.goto(base+'/assembly/iq/editor.html?platform=vexiq&project=stations');await page.waitForFunction(()=>window.mindxAssembly);
 const parts=()=>page.evaluate(async()=>(await window.mindxAssembly.execute('getState')).result.project.parts);
 await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>!r.result.busy));
 await page.locator('#inspector-tab-1').click();await page.locator('[data-part-id="shaft"] .part-layer-select').click();await page.locator('#fit').click();
 // Clicking the shaft body (not its tip) opens quick attach at that position.
 const canvas=await page.locator('#viewport canvas').first().boundingBox();
 let opened=false;
 for(const dy of [-.18,-.12,-.24,-.06]){
  await page.mouse.click(canvas.x+canvas.width/2,canvas.y+canvas.height*(.5+dy));
  if(await page.locator('#quick-heading').filter({hasText:'trục'}).isVisible())break;
 }
 await page.locator('#quick-heading').filter({hasText:'Chọn chi tiết gắn vào trục'}).waitFor({timeout:5000});
 await page.locator('#quick-search').fill('228-2500-001');await page.locator('#quick-options button').first().click();
 await page.locator('#quick-station-row').waitFor({state:'visible'});
 const clicked=Number(await page.locator('#quick-depth').inputValue());
 assert.ok(clicked>15,`A click on the shaft body picks a position along it, not the tip (got ${clicked} mm)`);
 opened=true;await page.keyboard.press('Escape');await page.locator('.quick-attach').waitFor({state:'hidden'});
 await page.locator('[data-part-id="shaft"] .part-layer-select').click();
 await page.locator('.quick-point-hit[data-part-id="shaft"]').first().dispatchEvent('click');
 await page.locator('#quick-heading').filter({hasText:'Chọn chi tiết gắn vào trục'}).waitFor();
 assert.match(await page.locator('#quick-structure').textContent(),/Trục vuông · dài 125 mm/);
 await page.locator('#quick-search').fill('228-2500-001');await page.locator('#quick-options button').first().click();
 await page.locator('#quick-station-row').waitFor({state:'visible'});
 const count=await page.locator('#quick-stations button').count();assert.ok(count>=10,`Expected many positions along a 125 mm shaft, got ${count}`);
 const depths=await page.locator('#quick-stations button').evaluateAll(b=>b.map(x=>Number(x.dataset.depth)));
 assert.equal(await page.locator('#quick-stations button').nth(0).getAttribute('aria-pressed'),'true','Nearest free position is preselected');
 await page.locator('#quick-stations button').nth(2).click();
 assert.equal(Number(await page.locator('#quick-depth').inputValue()),depths[2]);assert.equal(await page.locator('#quick-stations button').nth(2).getAttribute('aria-pressed'),'true');
 assert.match(await page.locator('#quick-station-label').textContent(),/^3\//);
 await page.locator('#quick-station-next').click();assert.equal(await page.locator('#quick-stations button').nth(3).getAttribute('aria-pressed'),'true');
 await page.locator('#quick-station-prev').click();
 await page.screenshot({path:out+'/stations.png'});
 // Attach and continue: the panel stays on the shaft and the used stretch disappears.
 await page.locator('#quick-apply-next').click();
 await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>r.result.project.parts.length===2));
 await page.locator('#quick-station-row').waitFor({state:'visible'});
 const placed=(await parts()).find(p=>p.id!=='shaft');assert.equal(placed.mate.target,'shaft');assert.ok(Math.abs(placed.mate.depth-depths[2])<.05,'Attached at the chosen position');
 const after=await page.locator('#quick-stations button').evaluateAll(b=>b.map(x=>Number(x.dataset.depth)));
 assert.ok(after.every(d=>Math.abs(d-depths[2])>4),'The used position is no longer offered');
 assert.match(await page.locator('#quick-structure').textContent(),/đã có 1 chi tiết trên trục/);
 await page.locator('#quick-apply').click();
 await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>r.result.project.parts.length===3));
 assert.equal(await page.locator('.quick-attach').isHidden(),true,'"Gắn vào đây" closes the panel');
 assert.deepEqual(errors,[]);
 console.log(`PASS: shaft-body click opens at that position, ${count} positions along a 125 mm shaft, chosen position attached, used stretch skipped, attach & continue keeps the panel, no page errors.`);
}finally{await browser.close();}
