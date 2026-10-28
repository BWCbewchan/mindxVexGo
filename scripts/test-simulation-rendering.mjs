import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {createField} from '../public/simulation/fields.js';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.__draws=0;for(const proto of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype]){const draw=proto.drawElements;proto.drawElements=function(...args){window.__draws++;return draw.apply(this,args);};}window.addEventListener('message',e=>{if(e.data?.type==='vr-model-ready')window.__modelReady=true;});});
 // Observe actual GPU buffer state in this isolated test, without shipping a
 // diagnostic API or changing the renderer implementation under test.
 await page.route('**/simulation/viewer.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('const loader=new GLTFLoader()',"window.__buffers=()=>({ink:ink.geometry.uuid,count:ink.geometry.drawRange.count,positions:Array.from(ink.geometry.getAttribute('position')?.array.slice(0,36)||[]),trail:trail.geometry.uuid});\nconst loader=new GLTFLoader()")});});
 await page.goto('http://localhost:3120/simulation/viewer.html');
 const send=data=>page.evaluate(data=>window.postMessage(data,location.origin),data);
 const field={...createField('grid',100),robot:{radius:100,eye:true}};
 await send({type:'vr-field',field});await send({type:'vr-init',project:null,catalog:[]});await page.waitForFunction(()=>window.__modelReady);
 await send({type:'vr-view',mode:'top'});
 const line=x=>({x1:x,y1:900,x2:x+50,y2:900,width:8,color:'#df5361'});
 const pose={type:'vr-pose',x:400,y:1600,heading:90,revision:0,blocks:[],strokes:[line(800),line(900)],inkReset:true};
 await send(pose);await page.waitForFunction(()=>window.__buffers().count===12);const first=await page.evaluate(()=>window.__buffers());
 await send({...pose,x:410,strokes:[line(1200),line(1300)],inkReset:true});await page.waitForFunction(()=>window.__buffers().positions[0]>1);const replaced=await page.evaluate(()=>window.__buffers());assert.equal(replaced.ink,first.ink,'Clear/redraw reuses allocated buffer');assert.notEqual(first.positions[0],replaced.positions[0],'Clear and redraw at equal count replaces earlier segments');
 const {strokes,inkReset,...motion}=pose;await send({...motion,x:420});await page.waitForTimeout(100);const moved=await page.evaluate(()=>window.__buffers());assert.equal(moved.ink,replaced.ink);assert.deepEqual(moved.positions,replaced.positions,'Pose without ink update keeps drawing');assert.equal(moved.trail,replaced.trail,'Trail updates reuse GPU geometry');
 await send({...pose,revision:1,strokes:[],inkReset:true});await page.waitForFunction(()=>window.__buffers().count===0);await page.waitForTimeout(700);const draws=await page.evaluate(()=>window.__draws);await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>window.__draws),draws,'Settled viewer must stop drawing');
 assert.deepEqual(errors,[]);console.log('PASS: actual 3D ink replacement/clear, unchanged strokes, reusable trail buffers, scene wakeup and zero idle GPU draws.');
}finally{await browser.close();}
