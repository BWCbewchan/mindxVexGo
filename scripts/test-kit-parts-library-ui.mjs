import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {IQ_STANDARD_PREFERRED,IQ_MISSING_PARTS,IQ_IMPROVED_WHEELS} from '../public/assembly/iq/library-reference.js';
const expectedCAD=Object.keys(IQ_STANDARD_PREFERRED).length+IQ_IMPROVED_WHEELS.filter(id=>!Object.values(IQ_STANDARD_PREFERRED).includes(id)).length-1,expectedMissing=IQ_MISSING_PARTS.length,totalCAD=JSON.parse(await fs.readFile('public/assembly/iq/parts.json','utf8')).length-1;
const base=process.env.BASE_URL||'http://localhost:3131',out='artifacts/kit-parts-library';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--disable-webgl','--disable-gpu']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error(e.stack);});await page.route('https://*.supabase.co/**',r=>r.abort());
 await page.addInitScript(()=>{if(!sessionStorage.getItem('legacy-library-seeded')){localStorage.setItem('mindx-vexgo-assembly-v1',JSON.stringify({version:1,platform:'vexiq',title:'Preserved legacy IQ',parts:[],groups:[],steps:[]}));sessionStorage.setItem('legacy-library-seeded','true');}});await page.goto(base+'/assembly/iq/editor.html');await page.waitForFunction(()=>window.mindxAssembly);const state=()=>page.evaluate(()=>window.assemblyAPI.getState());
 assert.equal(await page.locator('#library-kit').inputValue(),'kit:228-7755');assert.equal(await page.locator('#library-kit option[value^="kit:"]').count(),9);
 assert.equal(await page.locator('#parts button[data-sku]').count(),expectedCAD);assert.equal(await page.locator('.library-missing-part').count(),expectedMissing);
 for(const sku of ['228-2536','iq-200mm-travel-wheel'])assert.equal(await page.locator(`#parts [data-sku="${sku}"]`).count(),1);
 assert.equal(await page.locator('#parts [data-sku="228-2540"]').count(),0);assert.equal(await page.locator('#parts [data-sku="228-2500-2260"]').count(),0);
 assert.ok(await page.locator('#parts [data-sku="228-6480"]').count());assert.equal(await page.locator('.library').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(17, 19, 21)');
 await page.locator('#category').selectOption('wheels');assert.ok(await page.locator('#parts [data-sku="iq-200mm-travel-wheel"]').isVisible());assert.equal(await page.locator('.library-group').count(),1);await page.locator('#category').selectOption('electronics');await page.waitForFunction(()=>{const img=document.querySelector('#parts [data-sku="228-6480"] img');return img?.dataset.backgroundRemoved==='true'&&img.complete&&img.naturalWidth>0;});await page.locator('.library').screenshot({path:out+'/iq-electronics.png'});assert.equal(await page.locator('#parts button[data-sku]').count(),6);await page.locator('#category').selectOption('');
 const unchanged=JSON.stringify((await state()).parts);await page.locator('[data-scope=extras]').click();assert.ok(await page.locator('#parts [data-sku="228-2540"]').count());
 await page.locator('#search').fill('228-2500-2260');await page.waitForFunction(()=>document.querySelectorAll('#parts button[data-sku]').length===1);assert.equal(await page.locator('#parts button[data-sku]').getAttribute('data-sku'),'228-2500-2260');
 await page.locator('[data-scope=all]').click();await page.locator('#search').fill('');await page.waitForFunction(total=>document.querySelectorAll('#parts button[data-sku]').length===total,totalCAD);
 await page.locator('[data-scope=kit]').click();await page.locator('#search').fill('đinh');await page.waitForFunction(()=>[...document.querySelectorAll('#parts button[data-sku]')].every(el=>el.dataset.libraryGroup==='pins'));assert.ok(await page.locator('#parts button[data-sku]').count());
 await page.locator('#search').fill('not-found-xx');await page.locator('.library-empty').waitFor();await page.getByRole('button',{name:'Xóa bộ lọc',exact:true}).click();assert.equal(await page.locator('#parts button[data-sku]').count(),expectedCAD);assert.equal(JSON.stringify((await state()).parts),unchanged);
 await page.locator('.library').screenshot({path:out+'/iq-library.png'});
 // Source-kit navigation opens a new project flow and preselects the requested LEGO set.
 await page.locator('#library-kit').selectOption('kit:45678-1');await page.waitForURL(/\/assembly\/projects\?create=lego&kit=45678-1/);await page.getByRole('dialog').waitFor();assert.equal(await page.getByRole('combobox',{name:'Bộ LEGO',exact:true}).inputValue(),'45678-1');
 await page.goto(base+'/assembly/lego/editor.html');await page.waitForFunction(()=>window.mindxAssembly);assert.equal(await page.locator('#library-kit').inputValue(),'kit:45544-1');
 const counts=[];for(const id of ['45544-1','45560-1','31313-1','45678-1','45681-1','45345-1','51515-1']){await page.locator('#library-kit').selectOption('kit:'+id);counts.push(await page.locator('#parts button[data-sku]').count());assert.ok(counts.at(-1)>0);}assert.ok(new Set(counts).size>1);
 assert.equal((await state()).parts.length,0);await page.locator('.library').screenshot({path:out+'/lego-library.png'});
 await page.goto(base+'/assembly/editor.html');await page.waitForFunction(()=>window.mindxAssembly);assert.equal(await page.locator('#library-kit').inputValue(),'kit:269-6911');assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexiq-assembly-v1')).title),'Preserved legacy IQ','Legacy IQ draft survives opening GO');assert.ok(await page.locator('#parts button[data-sku]').count());assert.deepEqual(errors,[]);
 console.log('PASS: IQ standard/legacy separation, preserved wheels, correct non-addable reference counts and four imported Gen2 electronics, all9 kits, grouped/filter/search/clear, safe foreign-kit navigation, seven LEGO set views, dark theme and unchanged models.');
}finally{await browser.close();}
