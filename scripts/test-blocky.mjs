import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
// Verifies the vendored RoboCode app loads inside /blocky: Blockly workspace and 3D simulator render.
const base='http://localhost:3131',errors=[],failed=[];
const b=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 await fs.mkdir('artifacts/blocky',{recursive:true});
 const p=await b.newPage({viewport:{width:1440,height:900}});p.setDefaultTimeout(120000);
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`);});
 p.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text().slice(0,200));});
 await p.goto(base+'/blocky',{waitUntil:'domcontentloaded'});
 const f=()=>p.frames().find(x=>x.url().includes('/blocky/index.html'));
 await p.waitForFunction(()=>true);await p.waitForTimeout(1000);
 const frame=f();assert(frame,'iframe');
 await frame.waitForSelector('.blocklySvg, .injectionDiv',{timeout:120000});
 await frame.waitForSelector('canvas',{timeout:120000});
 await p.waitForTimeout(4000);
 const info=await frame.evaluate(()=>({title:document.title,canvases:document.querySelectorAll('canvas').length,blocks:document.querySelectorAll('.blocklyDraggable').length,buttons:[...document.querySelectorAll('button')].map(b=>(b.textContent||b.getAttribute('aria-label')||'').trim()).filter(Boolean).slice(0,30)}));
 console.log(JSON.stringify(info));
 await p.screenshot({path:'artifacts/blocky/blocky.png'});
 console.log(JSON.stringify({errors,failed}));
 assert(info.canvases>0,'3D canvas');
}finally{await b.close();}
