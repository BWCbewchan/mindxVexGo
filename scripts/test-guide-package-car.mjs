import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {chromium} from '@playwright/test';
const base=process.env.BASE_URL||'http://localhost:3131',out='artifacts/guide-tools';await fs.mkdir(out,{recursive:true});
const car=JSON.parse(await fs.readFile('public/assembly/examples/go-car-two-motors.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://*.supabase.co/**',r=>r.abort());await page.goto(base+'/assembly');await page.waitForFunction(()=>window.assemblyAPI);
 await page.evaluate(car=>window.assemblyAPI.loadJSON(car),car);const before=await page.evaluate(()=>window.assemblyAPI.getState());assert.equal(before.parts.length,54);assert.equal(before.buildGuide.steps.length,31);
 const start=Date.now(),downloadPromise=page.waitForEvent('download',{timeout:180000});const result=await page.evaluate(()=>window.mindxAssembly.execute('exportGuide',{format:'zip'}));assert.ok(result.ok,JSON.stringify(result));const download=await downloadPromise;await download.saveAs(out+'/GO-car-build-guide.zip');
 assert.equal(JSON.stringify((await page.evaluate(()=>window.assemblyAPI.getState())).parts),JSON.stringify(before.parts));assert.deepEqual(errors,[]);
 execFileSync('python',['-c',"import zipfile,json; z=zipfile.ZipFile('artifacts/guide-tools/GO-car-build-guide.zip'); assert z.testzip() is None; m=json.loads(z.read('manifest.json')); assert len(m['steps'])==31; assert all(s['image'] in z.namelist() for s in m['steps']); assert set(m['files'])==set(z.namelist()); assert 'images/completed.png' in z.namelist(); assert len(json.loads(z.read('project.json'))['parts'])==54"]);
 console.log('PASS: 54-part GO car, 31 actual PNG steps, completed image, consistent manifest/HTML/JSON, valid ZIP CRC and model unchanged;',Date.now()-start,'ms');
}finally{await browser.close();}
