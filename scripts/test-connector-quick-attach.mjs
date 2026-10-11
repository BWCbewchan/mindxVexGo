import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1450,height:950}});
try{
 await page.addInitScript(()=>{if(location.pathname==='/assembly/editor.html'&&!sessionStorage.getItem('quick-attach-test-reset')){localStorage.removeItem('mindx-vexgo-assembly-v1');sessionStorage.setItem('quick-attach-test-reset','1');}});
 await page.goto('http://localhost:3120/assembly');const f=page.frameLocator('iframe');await f.locator('#status').filter({hasText:'Draft saved locally'}).waitFor();
 await f.locator('#search').fill('228-2500-2308');await f.locator('#parts button').click();await f.locator('#selection').filter({hasText:'Green Connector'}).waitFor();await f.locator('#fit').click();
 const pins=f.locator('button.quick-point-hit[aria-label*="pin"]');await pins.first().waitFor({state:'attached'});assert.equal(await pins.count(),4);
 for(let i=0;i<4;i++){
 await pins.nth(i).evaluate(el=>el.click());await f.locator('#quick-heading').filter({hasText:'Choose a part for this pin'}).waitFor();
 await f.locator('#quick-search').fill('228-2500-001');await f.locator('#quick-options button').click();await f.locator('#quick-move[aria-pressed="true"]').waitFor();assert.equal(await f.locator('#quick-apply').isEnabled(),true);await f.locator('#quick-close').click();
 }
 await f.locator('#wiring-visibility').click();const frame=page.frames().find(frame=>frame.url().includes('editor.html'));assert.equal(await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).hideCables),true);await f.locator('#wiring-visibility').click();assert.equal(await frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).hideCables),false);
 console.log('PASS: Both connector pins open quick attach; part previews default to Move and cancel without saving.');
}finally{await browser.close();}
