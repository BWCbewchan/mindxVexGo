import {chromium} from 'playwright';import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto((process.env.BASE_URL||'http://localhost:3117')+'/training/custom');
 const designer=page.getByRole('region',{name:'Field designer'});
 await designer.getByRole('textbox',{name:'Name',exact:true}).fill('Diagram arena');
 await designer.getByRole('button',{name:'Add wall',exact:true}).click();
 const wall=page.locator('.designer-canvas [data-kind="walls"]').first();
 await wall.scrollIntoViewIfNeeded();
 const before=await wall.boundingBox();await page.mouse.move(before.x+10,before.y+10);await page.mouse.down();await page.mouse.move(before.x-90,before.y-90,{steps:10});await page.mouse.up();
 const x=Number(await designer.getByRole('spinbutton',{name:'Object x',exact:true}).inputValue());assert.ok(x<600);
 const handle=page.locator('.resize-handle');const box=await handle.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+70,box.y+70,{steps:10});await page.mouse.up();
 assert.ok(Number(await designer.getByRole('spinbutton',{name:'Object width',exact:true}).inputValue())>150);
 await designer.getByRole('button',{name:'Duplicate',exact:true}).click();assert.equal(await page.locator('.designer-object[data-kind="walls"]').count(),2);
 await designer.getByRole('button',{name:'Delete',exact:true}).click();assert.equal(await page.locator('.designer-object[data-kind="walls"]').count(),1);
 await designer.getByRole('button',{name:'Undo',exact:true}).click();assert.equal(await page.locator('.designer-object[data-kind="walls"]').count(),2);
 await designer.getByRole('button',{name:'Redo',exact:true}).click();assert.equal(await page.locator('.designer-object[data-kind="walls"]').count(),1);
 await designer.getByRole('button',{name:'Add push block',exact:true}).click();assert.equal(await designer.getByRole('checkbox',{name:'Push-only (no magnet)',exact:true}).isChecked(),true);
 await designer.getByRole('spinbutton',{name:'Object x',exact:true}).fill('350');await designer.getByRole('spinbutton',{name:'Object y',exact:true}).fill('900');await designer.getByRole('button',{name:'Add delivery zone',exact:true}).click();
 await designer.getByRole('spinbutton',{name:'Object x',exact:true}).fill('1000');await designer.getByRole('spinbutton',{name:'Object y',exact:true}).fill('900');await designer.getByRole('button',{name:'Save to My fields',exact:true}).click();
 await page.waitForURL(/\/training\/custom\?id=/);await designer.getByRole('button',{name:'Done editing',exact:true}).click();await page.getByRole('button',{name:'Practice Diagram arena',exact:true}).waitFor();await page.reload();await page.getByRole('button',{name:'Practice Diagram arena',exact:true}).click();
 await page.getByRole('button',{name:'Edit field',exact:true}).click();
 assert.equal(await page.locator('.designer-object[data-kind="walls"]').count(),1);
 const saved=await page.evaluate(()=>{const l=JSON.parse(localStorage.getItem('mindx-training-library'))[0];return JSON.parse(localStorage.getItem('mindx-training-field:'+l.id));});assert.equal(saved.blocks[0].pushable,true);assert.equal(saved.blocks[0].x,350);assert.equal(saved.zones[0].x,1000);
 await page.screenshot({path:'artifacts/diagram-designer.png'});await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 console.log('PASS: designer drag, resize, duplicate, delete, undo/redo, push properties, local library save/reload and mobile layout.');
}finally{await browser.close();}
