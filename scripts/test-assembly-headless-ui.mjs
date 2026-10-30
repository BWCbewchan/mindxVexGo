import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
const base=process.env.BASE_URL||'http://localhost:3131',out='artifacts/headless-assembly';await fs.mkdir(out,{recursive:true});
const example=JSON.parse(await fs.readFile('public/assembly/examples/go-plate-pin-shaft-wheel.json','utf8')),car=JSON.parse(await fs.readFile('public/assembly/examples/go-car-two-motors.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--disable-webgl','--disable-gpu']});
try{
 for(const mode of ['context-fails','globals-missing']){
  const context=await browser.newContext({viewport:{width:1600,height:1000}});
  await context.addInitScript(mode=>{window.print=()=>{window.__headlessPrintRequested=true;};const native=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/i.test(type)?null:native.call(this,type,...args);};if(mode==='globals-missing'){Object.defineProperty(window,'WebGLRenderingContext',{value:undefined});Object.defineProperty(window,'WebGL2RenderingContext',{value:undefined});}},mode);
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error('PAGE ERROR',e.stack);});
  await page.goto(base+'/assembly');await page.waitForFunction(()=>window.assemblyAPI);const api=(method,...args)=>page.evaluate(({method,args})=>window.assemblyAPI[method](...args),{method,args});
  console.log('Facade present:',mode);let state=await api('getState');console.log('Facade initialized:',state.viewMode);assert.equal(new URL(page.url()).pathname,'/assembly');assert.equal(state.platform,'vexgo');assert.equal(state.viewMode,'data');assert.equal(state.parts.length,0);
  const frame=page.frameLocator('iframe');await frame.locator('#ai-data-fallback-view').waitFor();assert.equal((await api('listParts')).length,75);
  await frame.getByText('Help',{exact:true}).click();await frame.getByRole('button',{name:'AI / API & MCP',exact:true}).click();await frame.getByTestId('ai-assembly-json-input').waitFor();
  assert.equal(await frame.getByTestId('ai-assembly-catalog').locator('tbody tr').count(),75);
  await frame.getByTestId('ai-assembly-json-input').fill(JSON.stringify(example));await frame.getByTestId('ai-assembly-apply-btn').click();await frame.locator('#ai-assembly-status[data-ok=true]').waitFor();state=await api('getState');assert.equal(state.parts.length,4);assert.ok(state.parts.every(p=>p.id==='base'||p.mate));
  const four=JSON.stringify(state.parts);await assert.rejects(()=>api('appendJSON',example),/penetration|va chạm/i);assert.equal(JSON.stringify((await api('getState')).parts),four);
  const offset=structuredClone(example);offset.parts[0].position[0]+=180;await frame.getByTestId('ai-assembly-json-input').fill(JSON.stringify(offset));await frame.getByTestId('ai-assembly-append-btn').click();await page.waitForFunction(async()=>window.assemblyAPI&&(await window.assemblyAPI.getState()).parts.length===8);
  state=await api('getState');assert.equal(new Set(state.parts.map(p=>p.id)).size,8);const before=JSON.stringify(state.parts);
  for(const input of ['{bad',JSON.stringify({parts:[{partId:'UNKNOWN'}]}),JSON.stringify({...example,parts:example.parts.map(p=>p.id==='pin'?{...p,attachTo:{...p.attachTo,sourceRef:'bad-port'}}:p)})]){await frame.getByTestId('ai-assembly-json-input').fill(input);await frame.getByTestId('ai-assembly-apply-btn').click();await frame.locator('#ai-assembly-status[data-ok=false]').waitFor();assert.equal(JSON.stringify((await api('getState')).parts),before);}
  // A third copy also exceeds one-kit stock; stock rejection is atomic.
  await assert.rejects(()=>api('appendJSON',example),/kit/i);assert.equal(JSON.stringify((await api('getState')).parts),before);
  await frame.getByRole('button',{name:'Đóng',exact:true}).click();
  await api('clear');assert.equal((await api('getState')).parts.length,0);
  const added=await api('addPart',{partId:'228-2500-001',position:[0,40,0]});assert.equal(added.partCount,1);const id=added.addedIds[0],catalog=await api('listParts'),pin=catalog.find(p=>p.partId==='228-2500-2260'),beam=catalog.find(p=>p.partId==='228-2500-001');const tip=pin.ports.find(p=>p.kind==='pin'&&!p.profile&&p.radius<=2.6),hole=beam.ports.find(p=>p.kind==='hole'&&!p.profile);
  await api('addPart',{partId:pin.partId,attachTo:{targetId:id,sourceRef:tip.id,targetRef:hole.id}});assert.equal((await api('getState')).parts.length,2);
  await api('loadJSON',car);state=await api('getState');assert.equal(state.parts.length,54);assert.equal(state.parts.filter(p=>p.sku==='269-6690-000').length,2);assert.ok(state.buildGuide.ready,JSON.stringify(state.buildGuide.blockers));
  await page.screenshot({path:out+'/fallback-'+mode+'.png'});
  const savedId=await page.evaluate(()=>localStorage.getItem('mindx-assembly-default-id-v1'));await page.reload();await page.waitForFunction(()=>window.assemblyAPI);state=await api('getState');assert.equal(state.parts.length,54);assert.equal(await page.evaluate(()=>localStorage.getItem('mindx-assembly-default-id-v1')),savedId);
  const exported=await page.evaluate(()=>window.mindxAssembly.execute('exportGuide'));assert.equal(exported.ok,true,JSON.stringify(exported));const child=page.frames().find(f=>f.url().includes('/assembly/editor.html'));await child.waitForFunction(()=>window.__headlessPrintRequested);assert.ok(await frame.locator('.guide-data-page').count()>1);
  assert.deepEqual(errors,[]);await context.close();console.log('PASS:',mode,'guest workspace, visible chrome/Help, catalog/ports, few-shot/batch facade, exact DOM IDs, append remap, invalid/colliding rollback, 54-part car, persistence, CPU fit and data PDF print.');
 }
}finally{await browser.close();}
