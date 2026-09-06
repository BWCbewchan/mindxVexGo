import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const catalog=JSON.parse(fs.readFileSync('public/quiz/catalog.json','utf8'));
const devices=JSON.parse(fs.readFileSync('public/quiz/devices.json','utf8'));
const tasks=JSON.parse(fs.readFileSync('public/quiz/tasks.json','utf8'));
const refs=catalog.flatMap(l=>l.questions.flatMap(q=>{assert.ok(q.references?.length,q.id);return q.references;}));
refs.push(...Object.values(tasks).flatMap(ts=>ts.flatMap(t=>t.references||[])),...devices);
const urls=[...new Set(refs.map(r=>r.src))];for(const url of urls)assert.ok(fs.existsSync('public'+url),url);
const b=await chromium.launch({channel:'chrome'});
try{
 const p=await b.newPage({viewport:{width:1280,height:960}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:3117/quiz?lesson=f1ef308b4717');await p.getByRole('button',{name:/^Practice quiz/}).click();
 for(let start=0;start<urls.length;start+=12){const results=await p.evaluate(async urls=>Promise.all(urls.map(async src=>{try{const image=new Image();image.src=src;await image.decode();return {src,ok:image.naturalWidth>0&&image.naturalHeight>0};}catch{return {src,ok:false};}})),urls.slice(start,start+12));assert.ok(results.every(r=>r.ok),JSON.stringify(results.filter(r=>!r.ok)));}
 assert.equal(await p.locator('.quiz-runner img[src="/quiz/devices/battery.svg"]').count(),1);
 assert.equal(await p.locator('.quiz-runner img[src*="/quiz/images/"]').count(),0);
 await p.goto('http://localhost:3117/quiz?lesson=e60f77c9ba8f');await p.getByRole('button',{name:/^Practice quiz/}).click();
 const illustration=p.locator('.quiz-runner .quiz-illustration').first();await illustration.click();await p.getByRole('dialog').waitFor();assert.ok(await p.getByRole('dialog').locator('img').evaluate(img=>img.complete&&img.naturalWidth>0));await p.keyboard.press('Escape');assert.equal(await p.getByRole('dialog').count(),0);
 await p.getByRole('button',{name:'Read lesson',exact:true}).click();
 await p.getByText('VEX GO · Device reference',{exact:true}).click();assert.equal(await p.locator('.quiz-device-grid img').count(),7);await p.locator('.quiz-device-grid button').first().click();await p.getByRole('dialog').waitFor();await p.getByRole('button',{name:'Close image',exact:true}).click();
 await p.screenshot({path:'artifacts/quiz/illustrations-desktop.png'});
 await p.setViewportSize({width:320,height:780});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'artifacts/quiz/illustrations-mobile.png'});
 assert.deepEqual(errors,[]);console.log(`PASS: all 241 questions reference images; ${urls.length} unique question/task/device images decoded over HTTP; zoom, Escape, device shelf, 320px layout.`);
}finally{await b.close();}
