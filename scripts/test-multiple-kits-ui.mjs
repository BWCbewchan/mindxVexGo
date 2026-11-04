import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {defaultKitProfile} from '../public/assembly/kit-policy.js';

const base=process.env.BASE_URL||'http://localhost:3131',out='artifacts/multiple-kits';await fs.mkdir(out,{recursive:true});
const catalog={vexgo:JSON.parse(await fs.readFile('public/assembly/parts.json','utf8')),vexiq:JSON.parse(await fs.readFile('public/assembly/iq/parts.json','utf8')),lego:JSON.parse(await fs.readFile('public/assembly/lego/parts.json','utf8'))};
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 for(const platform of ['vexgo','vexiq','lego']){
  const page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[],failed=[],previews=[];
  page.on('pageerror',e=>{errors.push(e.message);console.error(e.stack);});page.on('response',r=>{if(r.url().includes('/preview'))previews.push(r.url());if(r.status()>=400&&r.url().includes('/assembly/')&&!r.url().includes('supabase'))failed.push(r.url());});
  await page.route('https://*.supabase.co/**',r=>r.abort());
  const key=platform==='vexgo'?'mindx-vexgo-assembly-v1':platform==='vexiq'?'mindx-vexiq-assembly-v1':'mindx-lego-assembly-v1';
  await page.addInitScript(({key,platform,kit})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({version:1,platform,title:'Optional extra kits',parts:[],groups:[],steps:[],kit}));window.print=()=>{window.testPrintRequested=true;};},{key,platform,kit:defaultKitProfile(catalog[platform],platform)});
  const ready=()=>page.waitForFunction(()=>window.mindxAssembly);
  const call=(name,args={})=>page.evaluate(({name,args})=>window.mindxAssembly.execute(name,args),{name,args});
  const state=async()=>(await call('getState')).result.project;
  const idle=()=>page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>!r.result.busy));
  const execute=async(name,args)=>{await idle();const r=await call(name,args);assert.equal(r.ok,true,JSON.stringify(r));return r.result;};
  const frame=()=>page.frameLocator('iframe[title="Cài đặt số lượng bộ kit"]');
  const settings=async()=>{await page.locator('#kit-status').click();await frame().getByRole('heading',{name:'Cài đặt bộ kit',exact:true}).waitFor();};
  const extraId=platform==='vexgo'?'228-7755':platform==='vexiq'?'269-6911':'45678-1';
  const addExtra=async()=>{await frame().getByRole('button',{name:'+ Thêm kit khác',exact:true}).click();assert.equal(await frame().getByRole('combobox',{name:'Kit muốn thêm'}).locator('option').count(),platform==='lego'?6:1);await frame().getByRole('combobox',{name:'Kit muốn thêm'}).selectOption(extraId);await frame().getByRole('button',{name:'Thêm vào dự án',exact:true}).click();await frame().getByText('Kit thêm vào dự án',{exact:true}).waitFor();};
  await page.goto(base+(platform==='vexgo'?'/assembly/editor.html':platform==='vexiq'?'/assembly/iq/editor.html':'/assembly/lego/editor.html'));await ready();
  assert.equal((await state()).kit.additionalKits,undefined);
  await settings();assert.equal(await frame().getByText('Kit thêm vào dự án',{exact:true}).count(),0,'No additional rows by default');
  await addExtra();await frame().getByRole('button',{name:'Hủy',exact:true}).click();await page.locator('.kit-settings-dialog').waitFor({state:'detached'});assert.equal((await state()).kit.additionalKits,undefined,'Cancel preserves original stock');
  await settings();await addExtra();
  const name=platform==='vexgo'?'VEX IQ (2nd gen) · 228-7755':platform==='vexiq'?'VEX GO · 269-6911':'LEGO SPIKE Prime · 45678-1';
  await frame().getByRole('spinbutton',{name:'Số bộ '+name,exact:true}).fill('2');await page.screenshot({path:out+'/'+platform+'-settings.png'});
  await frame().getByRole('button',{name:'Áp dụng bộ kit',exact:true}).click();await page.locator('.kit-settings-dialog').waitFor({state:'detached'});await idle();assert.equal((await state()).kit.additionalKits[0].count,2);
  assert.equal(await page.locator('#library-kit').inputValue(),'project');
  if(platform!=='lego'){
   const other=platform==='vexgo'?'vexiq':'vexgo',sku=other+'__228-2500-001';
   await page.locator('#search').fill(sku);const card=page.locator(`#parts button[data-sku="${sku}"]`);assert.equal(await card.isEnabled(),true);await card.click();await idle();
   const target=(await state()).parts.find(p=>p.sku===sku);assert.ok(target,'Foreign part added from actual library card');
   const pin=await execute('addPart',{sku:platform==='vexgo'?'228-2500-2260':'228-2500-060',position:[200,70,0]});
   const options=await execute('getConnectionOptions',{id:pin.id,targetId:target.id});assert.ok(options.total);
   let attached=false;for(const option of options.options){await idle();if((await call('attach',{id:pin.id,targetId:target.id,sourceRef:option.sourceRef,targetRef:option.targetRef})).ok){attached=true;break;}}assert.ok(attached,'Cross-kit compatible pin/hole attaches');
   const inventory=await execute('getInventory');assert.ok(inventory.some(r=>r.skus.includes(sku)&&r.available>0));
   const guide=await execute('getGuide');assert.equal(guide.ready,true,JSON.stringify(guide.blockers));
   await execute('exportGuide',{format:'pdf'});assert.equal(await page.evaluate(()=>window.testPrintRequested),true);assert.ok(await page.locator('#print-guide .guide-page').count()>1);
   const images=await page.locator('#print-guide img').evaluateAll(images=>images.map(img=>({src:img.src,ok:img.complete&&img.naturalWidth>0})));assert.ok(images.every(i=>i.ok));assert.ok(previews.some(url=>url.includes(other==='vexiq'?'/assembly/iq/parts/228-2500-001/':'/assembly/parts/228-2500-001/')));
   await page.pdf({path:out+'/'+platform+'-mixed-guide.pdf',printBackground:true,preferCSSPageSize:true});
   const motor=await execute('addPart',{sku:other+'__'+(other==='vexiq'?'228-2560':'269-6690-000'),position:[400,80,0]});assert.equal(motor.addedIds.length,3,'Foreign motor gets companions from its own platform');await execute('deleteParts',{ids:motor.addedIds});
  }else{
   const shared=catalog.lego.find(p=>p.sets?.['45544-1']&&p.sets?.['45678-1']),unique=catalog.lego.find(p=>!p.sets?.['45544-1']&&p.sets?.['45678-1']);assert.ok(shared&&unique);
   await execute('addPart',{sku:shared.id,position:[0,60,0]});await execute('addPart',{sku:unique.id,position:[200,60,0]});
   const row=(await execute('getInventory')).find(r=>r.sku===shared.id);assert.equal(row.available,shared.sets['45544-1']+2*shared.sets['45678-1']);assert.equal((await state()).parts.find(p=>p.sku===unique.id).legoKitId,'45678-1');
  }
  await execute('flushProject');const saved=await state();await page.reload();await ready();assert.equal(JSON.stringify((await state()).parts),JSON.stringify(saved.parts));assert.equal((await state()).kit.additionalKits[0].kitId,extraId);await page.screenshot({path:out+'/'+platform+'-editor.png'});
  await execute('setKit',{profile:saved.kit});await idle();await page.evaluate(document=>window.assemblyAPI.loadJSON(document),saved);const count=(await state()).parts.length;await settings();await frame().getByRole('button',{name:'Bỏ kit '+name,exact:true}).click();await frame().getByRole('button',{name:'Áp dụng bộ kit',exact:true}).click();await page.locator('.kit-settings-dialog').waitFor({state:'detached'});await idle();assert.equal((await state()).parts.length,count);assert.equal((await state()).kit.additionalKits,undefined);
  assert.ok((await execute('getInventory')).some(r=>r.remaining<0),'Removing a kit reports shortages and preserves CAD');
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);console.log('PASS:',platform,'default/add/cancel/apply/source CAD/mating/stock/guide/reload/removal');await page.close();
 }
}finally{await browser.close();}
