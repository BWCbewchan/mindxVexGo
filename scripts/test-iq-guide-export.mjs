import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from '@playwright/test';
const source=process.argv[2]||'scripts/fixtures/iq-guide-codebase.json';
const output=path.resolve(process.argv[3]||'artifacts/iq-guide-regression');await fs.mkdir(output,{recursive:true});
const project=JSON.parse(await fs.readFile(source,'utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>{errors.push(e.message);console.error('PAGE ERROR',e.stack);});
 await page.addInitScript(project=>{localStorage.setItem('mindx-assembly-project-v1:vexiq:guide-regression',JSON.stringify(project));window.print=()=>window.__guidePrinted=true;},project);
 await page.goto('http://localhost:3120/assembly/iq/editor.html?platform=vexiq&project=guide-regression');
 await page.waitForFunction(()=>window.mindxAssembly);const call=(name,args={})=>page.evaluate(({name,args})=>window.mindxAssembly.execute(name,args),{name,args});
 const before=(await call('getState')).result.project,guide=(await call('getGuide')).result;assert.equal(guide.ready,true,JSON.stringify(guide.blockers));assert.equal(guide.steps.length,17);assert.equal(guide.steps.at(-1).parts.length,26);assert.equal(guide.pathCheck?.method,'sampled-cad-path','Export must use the CAD route plan, not the metadata-only draft');const stepOf=sku=>guide.steps.findIndex(s=>s.added.some(p=>p.sku===sku));assert.ok(stepOf('228-2500-2236')<stepOf('228-2560'),'Shaft before motor');
 console.log('Guide ready:',guide.steps.length,'steps. Exporting original app print pages...');
 const result=await call('exportGuide');assert.equal(result.ok,true,JSON.stringify(result));
 await page.waitForFunction(()=>window.__guidePrinted,null,{timeout:180000});
 assert.equal(await page.locator('.guide-assembly-step').count(),17);assert.equal(await page.locator('.guide-prep').count(),1);assert.equal(await page.locator('.guide-finished').count(),1);
 const after=(await call('getState')).result.project;assert.deepEqual(after,before,'Export preserves saved model');assert.deepEqual(errors,[]);
 const pdf=path.join(output,'Code-base-VEX-IQ-guide.pdf');await page.pdf({path:pdf,printBackground:true,preferCSSPageSize:true});
 await fs.writeFile(path.join(output,'guide-steps.json'),JSON.stringify(guide,null,2),'utf8');
 await page.getByRole('tab',{name:'Guide',exact:true}).click();await page.screenshot({path:path.join(output,'guide-inspector.png')});
 console.log('PASS: 26 parts preserved, 17 build steps, one preparation and one completion page, app PDF export, no runtime errors.',pdf);
}finally{await browser.close();}
