import {chromium} from 'playwright';import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});try{
const page=await browser.newPage({viewport:{width:1440,height:1000}});await page.goto((process.env.BASE_URL||'http://localhost:3124')+'/training/custom');await page.locator('.designer-canvas').waitFor();
const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Upload background image',exact:true}).click();const input=await chooser;
await input.setFiles('artifacts/designer-fullscreen-desktop.png');await page.locator('.designer-canvas image').waitFor();assert.ok((await page.locator('.designer-canvas image').getAttribute('href')).startsWith('data:image/jpeg;base64,'));
await page.getByRole('button',{name:'Add push block',exact:true}).click();
for(const shape of ['circle','triangle','hexagon','square']){await page.getByLabel('Object shape',{exact:true}).selectOption(shape);const tag=shape==='circle'?'circle':shape==='square'?'rect':'polygon';await page.locator('[data-kind="blocks"] '+tag).waitFor();}
await page.getByLabel('Object shape',{exact:true}).selectOption('hexagon');await page.getByLabel('Object HEX color',{exact:true}).fill('#aB12EF');await page.getByLabel('Object HEX color',{exact:true}).press('Tab');assert.equal(await page.locator('[data-kind="blocks"] polygon').getAttribute('fill'),'#ab12ef');
await page.getByRole('button',{name:'Add delivery zone',exact:true}).click();await page.getByLabel('Object HEX color',{exact:true}).fill('#ab12ef');await page.getByLabel('Object HEX color',{exact:true}).press('Tab');
await page.getByRole('button',{name:'Save to My fields',exact:true}).click();await page.waitForURL(/id=field-/);await page.reload();await page.locator('.designer-canvas image').waitFor();assert.equal(await page.locator('[data-kind="blocks"] polygon').getAttribute('fill'),'#ab12ef');
const download=page.waitForEvent('download');await page.getByRole('button',{name:'Export field',exact:true}).click();const file=await download;const stream=await file.createReadStream();let json='';for await(const chunk of stream)json+=chunk;const field=JSON.parse(json).field;assert.equal(field.blocks[0].shape,'hexagon');assert.equal(field.zones[0].color,'#ab12ef');assert.ok(field.image.length<1500000);
await page.getByLabel('Background image',{exact:true}).setInputFiles({name:'broken.png',mimeType:'image/png',buffer:Buffer.from('invalid image')});await page.getByRole('status').filter({hasText:'could not be opened'}).waitFor();assert.ok(await page.locator('.designer-canvas image').count());
console.log('PASS: visible upload action, compressed background, four shapes, normalized HEX, save/reload/export and invalid-image recovery.');
}finally{await browser.close();}
