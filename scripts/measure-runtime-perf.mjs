import {chromium} from '@playwright/test';
const base=process.argv[2]||'http://localhost:3120';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
const page=await browser.newPage({viewport:{width:1440,height:950}});const failures=[];page.on('pageerror',e=>failures.push(e.message));
await page.addInitScript(()=>{window.__perf={draws:0,fields:0,poses:0,longTasks:0,longMs:0};for(const proto of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype])for(const name of ['drawElements','drawArrays']){const original=proto[name];proto[name]=function(...args){window.__perf.draws++;return original.apply(this,args);};}window.addEventListener('message',e=>{if(e.data?.type==='vr-field')window.__perf.fields++;if(e.data?.type==='vr-pose')window.__perf.poses++;});new PerformanceObserver(list=>{for(const e of list.getEntries()){window.__perf.longTasks++;window.__perf.longMs+=e.duration;}}).observe({type:'longtask',buffered:true});});
const start=Date.now();await page.goto(base+'/simulation?robot=sample');await page.waitForFunction(()=>document.querySelector('button[class*="run"]')?.disabled===false,null,{timeout:120000});const readyMs=Date.now()-start;
const viewer=page.frames().find(f=>f.url().includes('/simulation/viewer.html'));await page.waitForTimeout(2000);const before=await viewer.evaluate(()=>({...window.__perf}));await page.waitForTimeout(3000);const after=await viewer.evaluate(()=>({...window.__perf}));
const resources=await Promise.all(page.frames().map(f=>f.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,bytes:r.encodedBodySize,duration:r.duration,transfer:r.transferSize})))));
console.log(JSON.stringify({base,readyMs,idle3s:{draws:after.draws-before.draws,poses:after.poses-before.poses,fields:after.fields-before.fields},longTasks:await page.evaluate(()=>window.__perf),largest:resources.flat().sort((a,b)=>b.bytes-a.bytes).slice(0,7),failures},null,2));
}finally{await browser.close();}
