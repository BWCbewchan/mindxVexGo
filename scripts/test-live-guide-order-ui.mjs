import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {matingPose} from '../public/assembly/mating.js';
import {recommendedInsertionDepth} from '../public/assembly/connector-policy.js';
import {editGuide,stepKey} from '../public/assembly/guide-editing.js';

const base=process.env.BASE_URL||'http://localhost:3131',out='artifacts/vertical-guide';await fs.mkdir(out,{recursive:true});
const catalog=JSON.parse(await fs.readFile('public/assembly/iq/parts.json','utf8')),refs=JSON.parse(await fs.readFile('public/assembly/iq/connectors.json','utf8')).parts;
const make=(id,sku)=>({id,sku,label:catalog.find(p=>p.id===sku).name,position:[0,70,0],rotation:[0,0,0]});
const beam=make('base','228-2500-026'),a=make('pin-a','228-2500-060'),b=make('pin-b','228-2500-061'),top=make('top','228-2500-017');
function join(p,source,target,destination){const depth=recommendedInsertionDepth(source,destination,p.sku,target.sku);Object.assign(p,matingPose(p,source,target,destination,{depth}));p.mate={target:target.id,sourceRef:source.id,targetRef:destination.id,depth,twist:0,flip:false};}
const holes=refs[beam.sku].filter(r=>r.kind==='hole'&&r.radius===2.1&&r.normal[1]===1);
join(a,refs[a.sku].find(r=>r.id==='1'),beam,holes[0]);join(b,refs[b.sku].find(r=>r.id==='1'),beam,holes.at(-1));
join(top,refs[top.sku].find(r=>r.kind==='hole'&&r.radius===2.1&&r.normal[1]===-1),a,refs[a.sku].find(r=>r.id==='6'));
delete a.mate;const fixture={version:1,platform:'vexiq',title:'Paged instructions',parts:[beam,a,b,top],groups:[],steps:[],editorSettings:{liveGuidePreview:false}},poses=fixture.parts.map(p=>[p.id,p.position,p.rotation]);
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1600,height:1050}}),errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error(e.stack);});await page.route('https://*.supabase.co/**',r=>r.abort());
try{
 await page.addInitScript(project=>{if(!localStorage.getItem('mindx-vexiq-assembly-v1'))localStorage.setItem('mindx-vexiq-assembly-v1',JSON.stringify(project));},fixture);
 await page.goto(base+'/assembly/iq/editor.html');await page.waitForFunction(()=>window.mindxAssembly);
 const call=(name,args={})=>page.evaluate(({name,args})=>window.mindxAssembly.execute(name,args),{name,args}),state=async()=>(await call('getState')).result.project;
 await page.locator('#inspector-tab-2').click();await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>!r.result.busy&&r.result.project.parts.filter(p=>p.mate).length===3),null,{timeout:20000});
 assert.equal(JSON.stringify((await state()).parts.map(p=>[p.id,p.position,p.rotation])),JSON.stringify(poses),'Automatic repair recovers links without moving the fixture');

 const ready=()=>page.waitForFunction(()=>[...document.querySelectorAll('.guide-live-stage')].length>0&&[...document.querySelectorAll('.guide-live-stage')].every(s=>s.dataset.ready==='true'),null,{timeout:30000});await ready();
 let guide=(await call('getGuide')).result;assert.equal(await page.locator('.guide-live-card').count(),guide.steps.length);assert.ok(guide.steps.length>=3);
 assert.equal(await page.locator('.guide-card-navigation,.guide-live-strip').count(),0);
 assert.ok(await page.locator('#guide-export').isVisible());assert.ok(await page.locator('#guide-zip').isVisible());
 assert.equal(await page.locator('#guide-repair:visible,#guide-summary:visible,.guide-advanced-settings:visible').count(),0);
 assert.ok(await page.locator('.guide-live-preview').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)));
 const keys=guide.steps.map(stepKey);await page.locator('.guide-step-order').nth(1).fill('3');await page.locator('.guide-step-order').nth(1).press('Enter');await ready();
 guide=(await call('getGuide')).result;assert.equal(stepKey(guide.steps[2]),keys[1]);
 let included=new Set();for(const step of guide.steps){for(const part of step.added)included.add(part.id);assert.deepEqual(new Set(step.parts.map(p=>p.id)),included);}
 const row=page.locator('.guide-live-card').nth(2),stage=row.locator('.guide-live-stage');await stage.scrollIntoViewIfNeeded();await stage.press('ArrowRight');
 await page.waitForFunction(key=>!!window.__unused||window.mindxAssembly.execute('getState').then(r=>!!r.result.project.guidePreferences?.steps?.[key]?.page?.frames?.detail?.camera),keys[1]);
 const prefs=(await state()).guidePreferences.steps[keys[1]].page.frames;assert.ok(prefs.detail.camera);assert.equal(prefs.assembled?.camera,undefined);
 const cameraBefore=JSON.stringify((await state()).guidePreferences.steps[keys[1]].page.frames.detail.camera);await page.locator('.guide-live-stage').nth(0).press('ArrowLeft');await page.waitForTimeout(300);assert.equal(JSON.stringify((await state()).guidePreferences.steps[keys[1]].page.frames.detail.camera),cameraBefore,'Switching cards preserves previous camera');
 const before=JSON.stringify((await state()).guidePreferences.order);await row.locator('.guide-step-order').fill('1');await row.locator('.guide-step-order').press('Enter');assert.equal(JSON.stringify((await state()).guidePreferences.order),before);assert.ok(await row.locator('.guide-card-error').isVisible());
 await page.locator('#guide-export').click();await page.locator('#guide-pdf-preview[open]').waitFor();await page.locator('#pdf-preview-paper').waitFor();await page.waitForFunction(()=>document.querySelector('#guide-pdf-preview').dataset.loading==='false');await page.locator('#pdf-preview-close').click();
 const download=page.waitForEvent('download',{timeout:60000});await page.locator('#guide-zip').click();const zip=await download;assert.match(zip.suggestedFilename(),/\.zip$/i);await zip.saveAs(out+'/guide.zip');
 await page.evaluate(()=>{window.__printCount=0;window.print=()=>{window.__printCount++;};});await page.locator('#guide-export').click();await page.locator('#guide-pdf-preview[open]').waitFor();await page.waitForFunction(()=>document.querySelector('#guide-pdf-preview').dataset.loading==='false');await page.locator('#pdf-preview-print').click();await page.waitForFunction(()=>window.__printCount===1,null,{timeout:60000});await page.pdf({path:out+'/guide.pdf',printBackground:true});await page.locator('#pdf-preview-close').click();
 await page.locator('.guide-live-stage').nth(0).scrollIntoViewIfNeeded();await page.screenshot({path:out+'/vertical-feed.png'});
 assert.equal(JSON.stringify((await state()).parts.map(p=>[p.id,p.position,p.rotation])),JSON.stringify(poses));
 await page.reload();await page.waitForFunction(()=>window.mindxAssembly);await page.locator('#inspector-tab-2').click();await ready();guide=(await call('getGuide')).result;assert.equal(stepKey(guide.steps[2]),keys[1]);assert.ok(await page.locator('#guide-export').isVisible());assert.ok(await page.locator('#guide-zip').isVisible());
 assert.deepEqual(errors,[]);console.log('PASS: stacked automatic instruction images, automatic repair, valid reorder/persistence, invalid dependency protection, independent cameras, visible PDF/ZIP buttons, PDF preview, actual PDF and ZIP exports.');
}catch(e){await page.screenshot({path:out+'/failure.png'});console.log('Guide debug:',await page.locator('#status').innerText());throw e;}finally{await browser.close();}
