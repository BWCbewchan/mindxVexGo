import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';

const fixture=JSON.parse(await fs.readFile(process.env.PERF_PROJECT||'public/assembly/examples/go-car-two-motors.json','utf8'));
const platform=fixture.platform||'vexgo',editor=platform==='vexiq'?'iq/':platform==='lego'?'lego/':'';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());
 await page.addInitScript(({doc,platform})=>localStorage.setItem('mindx-'+platform+'-assembly-v1',JSON.stringify(doc)),{doc:fixture,platform});
 await page.goto((process.env.BASE_URL||'http://127.0.0.1:3131')+'/assembly/'+editor+'editor.html');
 await page.waitForFunction(()=>window.mindxAssembly,null,{timeout:90000});
 await page.waitForFunction(()=>window.mindxAssembly.execute('getState').then(r=>!r.result.busy),null,{timeout:90000});
 await page.locator('#inspector-tab-1').click();await page.locator('.part-layer-select:not(:disabled)').first().waitFor({timeout:90000});
 const cdp=await page.context().newCDPSession(page);await cdp.send('Profiler.enable');await cdp.send('Profiler.start');
 const selection=await page.evaluate(()=>{
  const rows=[...document.querySelectorAll('.part-layer-select:not(:disabled)')].slice(0,30),times=[];
  if(!rows.length)throw Error('No enabled Layers rows');
  for(let i=0;i<60;i++){const start=performance.now();rows[i%rows.length].click();times.push(performance.now()-start);}
  times.sort((a,b)=>a-b);return {rows:rows.length,median:times[30],p95:times[57],total:times.reduce((a,b)=>a+b,0),selected:document.querySelector('#selection').textContent};
 });
 const {profile}=await cdp.send('Profiler.stop');
 const counts=new Map();for(const id of profile.samples||[])counts.set(id,(counts.get(id)||0)+1);
 const top=profile.nodes.map(n=>({name:n.callFrame.functionName,file:n.callFrame.url.split('/').at(-1),line:n.callFrame.lineNumber+1,samples:counts.get(n.id)||0})).sort((a,b)=>b.samples-a.samples).slice(0,20);
 const start=Date.now();await page.locator('#inspector-tab-2').click();await page.locator('.guide-live-stage[data-ready=true]').first().waitFor({timeout:90000});
 console.log(JSON.stringify({parts:fixture.parts.length,groups:fixture.groups?.length,selection,guideFirstMs:Date.now()-start,top,errors},null,2));
}finally{await browser.close();}
