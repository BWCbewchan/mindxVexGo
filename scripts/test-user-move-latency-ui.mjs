import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium,expect} from '@playwright/test';

const path=process.argv[2];if(!path)throw Error('Pass an assembly JSON file to check movement latency');
const project=JSON.parse(await fs.readFile(path,'utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());
 await page.addInitScript(doc=>localStorage.setItem('mindx-vexiq-assembly-v1',JSON.stringify(doc)),project);
 await page.goto((process.env.BASE_URL||'http://localhost:3131')+'/assembly/iq/editor.html');
 await page.waitForFunction(()=>window.mindxAssembly,null,{timeout:90000});
 const state=()=>page.evaluate(async()=>(await window.mindxAssembly.execute('getState')).result);
 await page.locator('#inspector-tab-1').click();
 const group=project.groups.find(g=>project.parts.filter(p=>p.groupId===g.id).length>1&&!g.name.includes('Chain')&&!g.name.includes('Xích'));
 assert.ok(group);await page.locator(`[data-group-id="${group.id}"] .group-layer-select:not(:disabled)`).click({timeout:90000});
 await page.locator('#inspector-tab-0').click();const before=(await state()).project;
 await page.evaluate(()=>{window.busyLocks=0;window.busyObserver=new MutationObserver(()=>{if(document.getElementById('save').disabled)window.busyLocks++;});busyObserver.observe(document.getElementById('save'),{attributes:true,attributeFilter:['disabled']});});
 const input=page.locator('#transforms input').first(),old=Number(await input.inputValue()),start=Date.now();
 const active=before.parts.find(p=>p.groupId===group.id&&Number(p.position[0].toFixed(2))===old),delta=old-5-active.position[0];
 await input.fill(String(old-5));await input.press('Tab');
 await expect.poll(async()=>{const s=await state();return !s.busy&&s.project.parts.some(p=>p.groupId===group.id&&Math.abs(p.position[0]-(before.parts.find(b=>b.id===p.id).position[0]+delta))<1e-6);},{timeout:15000}).toBe(true);
 const readyMS=Date.now()-start;
 await page.waitForTimeout(1000);
 const after=(await state()).project;
 for(const p of before.parts)for(let i=0;i<3;i++)assert.ok(Math.abs(after.parts.find(row=>row.id===p.id).position[i]-(p.position[i]+(p.groupId===group.id&&i===0?delta:0)))<1e-6,'Automatic repair must never nudge the moved model afterward');
 assert.equal(await page.evaluate(()=>{busyObserver.disconnect();return busyLocks;}),0,'No full-model UI lock after a normal group move');
 await page.locator('#undo').click();await expect.poll(async()=>JSON.stringify((await state()).project.parts.map(p=>p.position))).toBe(JSON.stringify(before.parts.map(p=>p.position)));
 assert.deepEqual(errors,[]);console.log('PASS: supplied model group moves, remains interactive during background checks, preserves exact poses, and Undo restores the model.',JSON.stringify({parts:project.parts.length,readyMS,busyLocks:0}));
}finally{await browser.close();}
