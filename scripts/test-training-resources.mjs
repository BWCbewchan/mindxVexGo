import {chromium} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('dialog',d=>d.accept());
 await page.goto((process.env.BASE_URL||'http://localhost:3119')+'/training');
 await page.getByRole('button',{name:'Worked solutions · 72',exact:true}).click();assert.equal(await page.locator('.lesson-card').count(),72);
 await page.getByRole('button',{name:'Practice First push',exact:true}).click();await page.locator('.worked-solution summary').click();
 const pending=page.waitForEvent('download');await page.getByRole('link',{name:'Download Blockly project',exact:true}).click();const download=await pending;await download.saveAs('artifacts/push-solution.goblocks');
 const saved=JSON.parse(await fs.readFile('artifacts/push-solution.goblocks','utf8'));assert.match(saved.workspace,/go_drivetrain_drive_for/);
 const fieldRequest=await page.request.get(new URL('/training-resources/push-1.json',page.url()).href);assert.equal(fieldRequest.status(),200);assert.equal((await fieldRequest.json()).field.blocks[0].pushable,true);
 const frame=await(await page.locator('iframe').elementHandle()).contentFrame();await frame.waitForFunction(()=>!!window.VexStudio);
 await frame.getByRole('button',{name:'File',exact:true}).click();const chooser=page.waitForEvent('filechooser');await frame.getByText('Load From Your Device',{exact:true}).click();
 const discard=frame.getByRole('button',{name:'Discard',exact:true});if(await Promise.race([chooser.then(()=>false),discard.waitFor({state:'visible'}).then(()=>true)]))await discard.click();
 await(await chooser).setFiles('artifacts/push-solution.goblocks');
 await frame.waitForFunction(()=>[...document.querySelectorAll('.blocklyBlockCanvas')].some(n=>n.textContent.includes('935')));
 await page.getByRole('button',{name:/Reset robot/}).click();await page.getByRole('button',{name:/Run code/}).click();
 await page.waitForFunction(()=>document.querySelector('.training-status')?.textContent==='Program finished',{},{timeout:20000});
 assert.match(await page.locator('.goal-status').textContent(),/Goal reached/);await page.screenshot({path:'artifacts/push-solution-run.png'});
 console.log('PASS: 72-resource library filter; Blockly and field downloads; downloaded push solution imported and completed using the actual Blockly interpreter.');
}finally{await browser.close();}
