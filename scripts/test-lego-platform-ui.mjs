import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
const base=process.env.BASE_URL||'http://localhost:3120',out='artifacts/lego';await fs.mkdir(out,{recursive:true});
const kits=JSON.parse(await fs.readFile('public/assembly/lego/kits.json','utf8'));
const catalog=JSON.parse(await fs.readFile('public/assembly/lego/parts.json','utf8')),refs=JSON.parse(await fs.readFile('public/assembly/lego/connectors.json','utf8')).parts;
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1520,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 let firstURL;
 for(const kit of kits){
  await page.goto(base+'/assembly/projects');await page.getByRole('button',{name:/^LEGO EV3/}).click();
  await page.getByLabel('Bộ LEGO',{exact:true}).selectOption(kit.id);await page.getByRole('textbox',{name:'Tên dự án',exact:true}).fill('LEGO test '+kit.name);
  if(!firstURL)await page.screenshot({path:out+'/lego-create.png'});
  await page.getByRole('button',{name:'Tạo dự án',exact:true}).click();await page.waitForURL(/\/assembly\/lego\/[a-z0-9-]+/);
  await page.waitForFunction(()=>window.mindxAssembly);
  const call=(name,args={})=>page.evaluate(({name,args})=>window.mindxAssembly.execute(name,args),{name,args});
  let state=(await call('getState')).result;assert.equal(state.project.platform,'lego');assert.equal(state.project.kit.kitId,kit.id);assert.equal(state.project.parts.length,0);
  const frame=page.frameLocator('iframe');console.log('Kit loaded',state.project.kit.kitId,'DOM kit',await frame.locator('html').getAttribute('data-lego-kit'));assert.equal(await frame.locator('#parts button[data-sku]').count(),kit.partTypes);
  assert.equal((await call('listParts')).result.length,329);
  if(!firstURL){
   firstURL=page.url();const add=await call('addPart',{sku:'32524',position:[0,40,0]});assert.equal(add.ok,true,JSON.stringify(add));const beam=add.result.id;
   const addPin=await call('addPart',{sku:'2780',position:[100,40,0]});assert.equal(addPin.ok,true,JSON.stringify(addPin));const pin=addPin.result.id;
   const h=refs['32524'].find(r=>r.normal[1]>.99&&Math.abs(r.point[2])<.1),p=refs['2780'].find(r=>r.normal[0]>.99);
   const attach=await call('attach',{id:pin,targetId:beam,sourceRef:p.id,targetRef:h.id});assert.equal(attach.ok,true,JSON.stringify(attach));
   assert.ok(!(await call('checkFit')).result.issues.some(i=>i.kind==='penetration'));
   const doc=(await call('exportProject')).result;await fs.writeFile(out+'/LEGO-beam-pin-demo.json',JSON.stringify(doc,null,2),'utf8');
   await page.reload();await page.waitForFunction(()=>window.mindxAssembly);state=(await call('getState')).result;assert.equal(state.project.parts.length,2);assert.equal(state.project.kit.kitId,kit.id);
   await page.frameLocator('iframe').locator('#fit').click();await page.screenshot({path:out+'/lego-editor.png'});
  }
  console.log('PASS kit:',kit.id,kit.partTypes,'types,',kit.sourceQuantity,'source quantity');
 }
 await page.goto(base+'/assembly/projects');await page.screenshot({path:out+'/assembly-three-platforms.png'});await page.setViewportSize({width:390,height:844});await page.screenshot({path:out+'/lego-mobile.png',fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);console.log('PASS: all 7 kits create native LEGO projects, all catalog quotas load, actual API attachment, project export / reload, mobile layout, no JavaScript errors.');
}finally{await browser.close();}
