import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
const base=process.env.BASE_URL||'http://localhost:3131';
const example=JSON.parse(await fs.readFile('public/assembly/examples/lego-beam-pin.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1040}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route('https://*.supabase.co/**',r=>r.abort());
 await page.goto(base+'/assembly/lego/editor.html');await page.waitForFunction(()=>window.assemblyAPI?.connected);
 await page.evaluate(example=>window.assemblyAPI.loadJSON(example),example);
 const state=()=>page.evaluate(()=>window.assemblyAPI.getState());
 const initial=await state(),original=initial.buildGuide.steps[0].title,poses=JSON.stringify(initial.parts);
 await page.locator('#guide-shortcut').click();await page.locator('.guide-advanced-settings>summary').click();
 await page.locator('.guide-edit>summary').first().click();
 await page.getByLabel('Tiêu đề bước 1',{exact:true}).fill('Custom title');await page.locator('.guide-edit').first().getByRole('button',{name:'Áp dụng',exact:true}).click();
 assert.equal((await state()).buildGuide.steps[0].title,'Custom title');
 await page.locator('.guide-edit>summary').first().click();await page.getByLabel('Tiêu đề bước 1',{exact:true}).fill('');await page.locator('.guide-edit').first().getByRole('button',{name:'Áp dụng',exact:true}).click();
 assert.equal((await state()).buildGuide.steps[0].title,original,'Clearing an override restores the generated title without regenerating CAD');
 assert.equal((await state()).buildGuide.reviewRequired,true,'Presentation changes preserve draft quality');
 assert.equal((await state()).buildGuide.steps[0].reviewRequired,true);
 assert.equal(JSON.stringify((await state()).parts),poses,'Editing instructions preserves CAD');
 await page.reload();await page.waitForFunction(()=>window.assemblyAPI?.connected);assert.equal((await state()).buildGuide.steps[0].title,original);assert.deepEqual(errors,[]);
 console.log('PASS: generated title survives custom/clear/reload; draft quality preserved; CAD unchanged.');
}finally{await browser.close();}
