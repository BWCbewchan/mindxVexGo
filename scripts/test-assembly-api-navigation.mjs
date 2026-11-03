import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
const base=process.env.BASE_URL||'http://localhost:3131';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--disable-webgl','--disable-gpu']});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/i.test(type)?null:original.call(this,type,...args);};});
 await page.goto(base+'/assembly',{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.assemblyAPI?.ready);
 assert.equal(await page.evaluate(async()=>{const api=window.assemblyAPI;await api.ready;return (await api.getState()).platform;}),'vexgo','Initial host bootstrap still resolves');
 await page.waitForFunction(()=>document.querySelector('[aria-busy]')?.getAttribute('aria-busy')==='false');
 assert.ok(await page.evaluate(()=>window.assemblyAPI===document.querySelector('iframe').contentWindow.assemblyAPI));
 await page.frameLocator('iframe').locator('header>a').click();await page.waitForURL(base+'/assembly/projects');
 await page.waitForFunction(()=>!window.assemblyAPI&&!window.mindxAssembly);
 await page.goBack();await page.waitForURL(base+'/assembly');await page.waitForFunction(()=>document.querySelector('[aria-busy]')?.getAttribute('aria-busy')==='false');
 assert.equal(await page.evaluate(async()=> (await window.assemblyAPI.getState()).platform),'vexgo');
 await page.goto(base+'/assembly/projects');
 const id=await page.evaluate(async()=> (await import('/assembly/project-store.js')).createProject('vexiq','Cancelled startup'));
 let release;const gate=new Promise(resolve=>release=resolve);
 await page.route('**/assembly/iq/parts.json*',async r=>{await gate;await r.continue().catch(()=>{});});
 await page.goto(base+'/assembly/vexiq/'+id,{waitUntil:'domcontentloaded'});
 await page.frameLocator('iframe').locator('.app-menubar').waitFor();
 assert.ok(await page.evaluate(()=>!!document.querySelector('iframe').contentWindow.assemblyAPI),'Child has its pending bootstrap');
 assert.ok(await page.evaluate(()=>!window.assemblyAPI&&!window.mindxAssembly),'Pending child never publishes a stale host API');
 await page.getByRole('link',{name:'Về danh sách dự án',exact:true}).click();await page.waitForURL(base+'/assembly/projects');release();
 assert.ok(await page.evaluate(()=>!window.assemblyAPI&&!window.mindxAssembly));
 assert.deepEqual(errors,[]);console.log('PASS: initial host ready handshake, default workspace Back restoration, managed iframe ownership and cancellation during CAD startup.');
}finally{await browser.close();}
