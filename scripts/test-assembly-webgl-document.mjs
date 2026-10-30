import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
const base=process.env.BASE_URL||'http://localhost:3131';
const sample=JSON.parse(await fs.readFile('public/assembly/examples/go-plate-pin-shaft-wheel.json','utf8'));
const car=JSON.parse(await fs.readFile('public/assembly/examples/go-car-two-motors.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());
 await page.goto(base+'/assembly');await page.waitForFunction(()=>window.assemblyAPI);
 const api=(method,...args)=>page.evaluate(({method,args})=>window.assemblyAPI[method](...args),{method,args});
 const native=(command,args={})=>page.evaluate(({command,args})=>window.mindxAssembly.execute(command,args),{command,args});
 assert.equal((await api('getState')).viewMode,'webgl');
 await api('loadJSON',sample);assert.equal((await api('getState')).parts.length,4);
 const ids=(await api('getState')).parts.map(p=>p.id),group=await native('group',{ids,name:'GPU regression'});assert.ok(group.ok,JSON.stringify(group));
 const copy=await native('duplicateParts',{ids,groupId:group.result.groupId,offset:[180,0,0]});assert.ok(copy.ok,JSON.stringify(copy));assert.equal((await api('getState')).parts.length,8);
 assert.ok((await native('ungroup',{ids:copy.result.ids,groupId:copy.result.groupId})).ok);
 await api('clear');assert.equal((await api('getState')).parts.length,0);assert.ok((await native('undo')).ok);assert.equal((await api('getState')).parts.length,8);
 const catalog=await api('listParts'),pin=catalog.find(p=>p.partId==='228-2500-2260'),beam=catalog.find(p=>p.partId==='228-2500-001'),sourceRef=pin.ports.find(p=>p.kind==='pin'&&!p.profile&&p.radius<=2.6).id,targetRef=beam.ports.find(p=>p.kind==='hole'&&!p.profile).id;
 await api('loadJSON',{commands:[{command:'addPart',args:{id:'batch-base',partId:beam.partId,position:[0,40,0]}},{command:'addPart',args:{id:'batch-pin',partId:pin.partId,attachTo:{targetId:'batch-base',sourceRef,targetRef}}}]});
 assert.equal((await api('getState')).parts.length,2);
 await api('loadJSON',car);const state=await api('getState');assert.equal(state.parts.length,54);assert.ok(state.buildGuide.ready);await fs.mkdir('artifacts/headless-assembly',{recursive:true});await page.screenshot({path:'artifacts/headless-assembly/webgl-car.png'});
 const frame=page.frameLocator('iframe');await frame.getByText('Help',{exact:true}).click();await frame.getByRole('button',{name:'AI / API & MCP',exact:true}).click();await frame.getByTestId('ai-assembly-json-input').waitFor();await page.screenshot({path:'artifacts/headless-assembly/webgl-ai-panel.png'});
 await page.goto(base+'/assembly/projects');await page.getByRole('button',{name:'Tạo dự án mới',exact:true}).waitFor();assert.deepEqual(errors,[]);
 console.log('PASS: real WebGL, document facade, batch attach, native grouping/copy/ungroup, Undo clear, complete car/guide, Help JSON panel and project manager.');
}finally{await browser.close();}
