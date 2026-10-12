import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 await page.goto('http://localhost:3120/assembly/editor.html');
 await page.locator('#status').filter({hasText:'Draft saved locally'}).waitFor();
 await page.locator('#open').setInputFiles('artifacts/assembly-tests/project.json');
 await page.locator('#status').filter({hasText:'2 parts'}).waitFor();
 await page.evaluate(()=>window.print=()=>{});
 await page.locator('#export').click();
 await page.locator('#status').filter({hasText:'Guide ready'}).waitFor();
 await page.pdf({path:'artifacts/assembly-tests/student-guide.pdf',printBackground:true,preferCSSPageSize:true});
 await page.locator('#objects button').first().click();await page.locator('#fit').click();
 await page.screenshot({path:'artifacts/assembly-tests/gizmo.png'});
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts[0].position);
 await page.mouse.move(735,506);await page.mouse.down();await page.mouse.move(795,536,{steps:18});await page.mouse.up();
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts[0].position);
 if(JSON.stringify(before)===JSON.stringify(after))throw Error('Dragging the X-axis gizmo must change the selected part position.');
 await page.locator('#precision-fields summary').click();await page.locator('#transforms input').nth(4).fill('90');await page.locator('#transforms input').nth(4).press('Tab');
 const rotation=await page.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts[0].rotation[1]);if(rotation!==90)throw Error('Rotation must preserve 90 degrees.');
 await fs.writeFile('artifacts/assembly-tests/guide-audit.json',JSON.stringify({pages:await page.locator('.guide-page').count(),images:await page.locator('.guide-page img').count(),text:await page.locator('#print-guide').innerText()},null,2));
 console.log('Printable guide PDF and selected-part screenshot captured.');
}finally{await browser.close();}
