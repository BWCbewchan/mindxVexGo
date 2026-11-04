import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {defaultKitProfile} from '../public/assembly/kit-policy.js';

const base=process.env.BASE_URL||'http://localhost:3131',out='artifacts/iq-gen2-ui';
await fs.mkdir(out,{recursive:true});
const catalog=JSON.parse(await fs.readFile('public/assembly/iq/parts.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[],failed=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().includes('/assembly/iq/parts/'))failed.push([r.status(),r.url()]);});
 await page.route('https://*.supabase.co/**',r=>r.abort());
 await page.addInitScript(kit=>{if(!localStorage.getItem('mindx-vexiq-assembly-v1'))localStorage.setItem('mindx-vexiq-assembly-v1',JSON.stringify({version:1,platform:'vexiq',title:'Gen2 CAD validation',parts:[],groups:[],steps:[],kit}));},defaultKitProfile(catalog,'vexiq'));
 const ready=()=>page.waitForFunction(()=>window.mindxAssembly);
 const call=(name,args={})=>page.evaluate(({name,args})=>window.mindxAssembly.execute(name,args),{name,args});
 const state=async()=>(await call('getState')).result.project;
 const execute=async(name,args)=>{await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>!r.result.busy));const r=await call(name,args);assert.equal(r.ok,true,JSON.stringify(r));return r.result;};
 await page.goto(base+'/assembly/iq/editor.html');await ready();
 await page.locator('#parts [data-sku="228-2560"]').click();
 await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>r.result.project.parts.length===3));
 await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>!r.result.busy));if((await state()).parts.length!==3)console.log('Motor add status:',await page.locator('#status').innerText());assert.deepEqual(new Set((await state()).parts.map(p=>p.sku)),new Set(['228-2560','228-6480','228-7045']),'Motor uses Gen2 Brain/Battery in standard IQ kit');
 const sensors=[];
 for(const [i,sku] of ['228-7082','228-7106'].entries())sensors.push({sku,...await execute('addPart',{sku,position:[i*100,60,200]})});
 assert.equal((await state()).parts.length,5,'Companion electronics are not duplicated');
 const targets=[{sku:'228-6480',id:(await state()).parts.find(p=>p.sku==='228-6480').id},...sensors];
 const attachments=[];
 for(const [i,target] of targets.entries()){
  const pin=await execute('addPart',{sku:'228-2500-060',position:[i*100,60,400]});
  const options=await execute('getConnectionOptions',{id:pin.id,targetId:target.id});assert.ok(options.total>0);
  let attached=false;
  for(const option of options.options){const result=await call('attach',{id:pin.id,targetId:target.id,sourceRef:option.sourceRef,targetRef:option.targetRef});if(result.ok){attachments.push({sku:target.sku,...result.result.mate});attached=true;break;}}
  assert.ok(attached,'Real IQ pin can attach to '+target.sku);
 }
 assert.equal((await execute('getConnectors',{id:(await state()).parts.find(p=>p.sku==='228-7045').id})).length,0,'Battery latch detail must not act as a connector');
 const inventory=await execute('getInventory');assert.ok(inventory);
 const saved=await state();await execute('flushProject');await page.reload();await ready();assert.equal(JSON.stringify((await state()).parts),JSON.stringify(saved.parts));
 await page.locator('#kit-status').click();
 const settings=page.frameLocator('iframe[title="Cài đặt số lượng bộ kit"]');
 for(const sku of ['228-6480','228-7045','228-7082','228-7106']){
  const row=catalog.find(p=>p.id===sku);await settings.getByRole('searchbox',{name:'Tìm linh kiện bộ kit'}).fill(sku);
  assert.equal(await settings.getByRole('spinbutton',{name:`Số lượng ${row.name} trong 1 bộ`,exact:true}).inputValue(),'1');
 }
 await settings.getByRole('button',{name:'Hủy',exact:true}).click();await page.locator('.kit-settings-dialog').waitFor({state:'detached'});
 await page.locator('#category').selectOption('electronics');await page.locator('#fit').click();await page.screenshot({path:out+'/gen2-electronics-and-pin-mounts.png'});
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await fs.writeFile(out+'/result.json',JSON.stringify({parts:saved.parts,attachments,errors,failed},null,2));
 console.log('PASS: WebGL loads all four Gen2 models; standard kit click adds correct Brain/Battery; sensors mount on actual IQ pins; no duplicate companions; persisted reload, preview assets and runtime errors verified.');
}finally{await browser.close();}
