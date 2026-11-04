import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {matingPose} from '../public/assembly/mating.js';
import {recommendedInsertionDepth} from '../public/assembly/connector-policy.js';
import {editGuide,stepKey} from '../public/assembly/guide-editing.js';

const base=process.env.BASE_URL||'http://localhost:3131',out='artifacts/paged-guide';await fs.mkdir(out,{recursive:true});
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
 const ready=()=>page.locator('#guide-workbench-stage[data-ready="true"]').waitFor({timeout:20000});await ready();
 assert.equal(await page.locator('#guide-workbench-stage').getAttribute('data-frame'),'detail');assert.equal(await page.locator('.guide-live-card:visible').count(),1);assert.equal(await page.locator('#guide-workbench-strip').count(),0);assert.equal(await page.locator('#guide-repair:visible,#guide-summary:visible,.guide-advanced-settings:visible,.guide-export-tools:visible').count(),0);
 assert.equal(await page.locator('#guide-step-order').inputValue(),'1');let guide=(await call('getGuide')).result;console.log('Guide pages:',guide.steps.map(s=>({title:s.title,requires:s.requires,key:stepKey(s)})));assert.ok(guide.steps.length>=2);
 if(guide.steps.length>1){await page.locator('#guide-workbench-next').click();await ready();assert.equal(await page.locator('#guide-page-counter').innerText(),`2 / ${guide.steps.length}`);await page.locator('#guide-workbench-prev').click();await ready();}
 let change;
 for(let from=1;from<guide.steps.length&&!change;from++)for(let to=1;to<guide.steps.length;to++){if(from===to)continue;const order=guide.steps.map(stepKey),[id]=order.splice(from,1);order.splice(to,0,id);if(!editGuide(guide,{order}).editError){change={from,to,key:id};break;}}
 assert.ok(change,'Fixture must permit an independent branch to be installed earlier');
 for(let i=0;i<change.from;i++)await page.locator('#guide-workbench-next').click();await ready();
 await page.locator('#guide-step-order').fill(String(change.to+1));await page.locator('#guide-step-order').press('Enter');await ready();
 guide=(await call('getGuide')).result;assert.equal(stepKey(guide.steps[change.to]),change.key);assert.equal(await page.locator('#guide-step-order').inputValue(),String(change.to+1));
 let included=new Set();for(const step of guide.steps){for(const part of step.added)included.add(part.id);assert.deepEqual(new Set(step.parts.map(p=>p.id)),included,'Later cumulative pages follow the edited order');}
 const beforeCamera=(await state()).guidePreferences?.steps?.[change.key]?.page?.frames?.assembled?.camera;
 const canvas=page.locator('#guide-workbench-image'),rect=await canvas.boundingBox();await page.mouse.move(rect.x+rect.width*.5,rect.y+rect.height*.5);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.5+45,rect.y+rect.height*.5-20,{steps:6});await page.mouse.up();await ready();
 const cameraPrefs=(await state()).guidePreferences.steps[change.key].page.frames;assert.ok(cameraPrefs.detail.camera);assert.deepEqual(cameraPrefs.assembled?.camera,beforeCamera,'Instruction orbit does not change the overview camera');
 const orderBefore=JSON.stringify((await state()).guidePreferences.order);await page.locator('#guide-step-order').fill('1');await page.locator('#guide-step-order').press('Enter');assert.equal(JSON.stringify((await state()).guidePreferences.order),orderBefore,'Missing support cannot be reordered ahead of its dependency');assert.ok(await page.locator('.guide-card-error').isVisible());
 await page.keyboard.press('Control+p');await page.locator('#guide-pdf-preview[open]').waitFor();await page.locator('#pdf-preview-paper').waitFor();assert.equal(await page.locator('.pdf-pages button[aria-current="true"]').getAttribute('data-index'),String(change.to));await page.locator('#pdf-preview-close').click();await ready();
 await page.screenshot({path:out+'/instruction-card.png'});assert.equal(JSON.stringify((await state()).parts.map(p=>[p.id,p.position,p.rotation])),JSON.stringify(poses));
 await page.reload();await page.waitForFunction(()=>window.mindxAssembly);await page.locator('#inspector-tab-2').click();await ready();guide=(await call('getGuide')).result;assert.equal(stepKey(guide.steps[change.to]),change.key);
 assert.deepEqual(errors,[]);console.log('PASS: automatic link repair, always-live instruction detail, one card per page, no scrolling list/legacy controls, previous/next and number-based reorder with rebuilt cumulative pages and persistence.');
}catch(e){await page.screenshot({path:out+'/failure.png'});console.log('Guide debug:',await page.locator('#status').innerText());throw e;}finally{await browser.close();}
