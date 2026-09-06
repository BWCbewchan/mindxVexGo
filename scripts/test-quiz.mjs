import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const catalog=JSON.parse(fs.readFileSync('public/quiz/catalog.json','utf8'));
assert.equal(catalog.length,72);
for(const l of catalog){
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync('public'+l.original)).digest('hex'),l.sha256);
 const content=JSON.parse(fs.readFileSync('public'+l.content,'utf8'));
 for(const b of content.blocks)if(b.src)assert.ok(fs.existsSync('public'+b.src));
 assert.ok(l.questions.length>0);
 assert.equal(new Set(l.questions.map(q=>q.id)).size,l.questions.length);
 for(const q of l.questions){assert.equal(q.options.length,4);assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.evidence);if(q.image)assert.ok(fs.existsSync('public'+q.image));}
}
const browser=await chromium.launch({channel:'chrome'});
try{
 const p=await browser.newPage({viewport:{width:1440,height:960}});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',()=>{throw Error('Unexpected browser dialog');});
 await p.goto('http://localhost:3117/quiz');
 await p.locator('.quiz-card').last().waitFor();assert.equal(await p.locator('.quiz-card').count(),72);
 for(const group of ['ARMA','ARMB','ARMI','PREA','PREB','PREI']){await p.getByRole('button',{name:group,exact:true}).click();assert.equal(await p.locator('.quiz-card').count(),catalog.filter(l=>l.group===group).length);}
 await p.getByRole('button',{name:'All',exact:true}).click();
 fs.mkdirSync('artifacts/quiz',{recursive:true});await p.screenshot({path:'artifacts/quiz/library.png'});
 const lesson=catalog.find(l=>l.questions.length===2);
 await p.goto('http://localhost:3117/quiz?lesson='+lesson.id);
 await p.getByRole('button',{name:'Practice quiz',exact:false}).click();
 await p.getByRole('radio').nth(lesson.questions[0].answer).check();
 await p.reload();await p.getByRole('button',{name:'Practice quiz',exact:false}).click();assert.ok(await p.getByRole('radio').nth(lesson.questions[0].answer).isChecked());
 await p.getByRole('button',{name:'Next',exact:true}).click();await p.getByRole('button',{name:'Submit quiz',exact:true}).click();
 await p.getByRole('dialog').waitFor();await p.getByRole('dialog').getByRole('button',{name:'Submit quiz',exact:true}).click();
 await p.locator('.quiz-score').waitFor();assert.equal(await p.locator('.quiz-score h2').textContent(),'1 / 2');
 await p.getByRole('button',{name:'Try again',exact:true}).click();await p.getByRole('dialog').getByRole('button',{name:'Try again',exact:true}).click();
 for(let i=0;i<lesson.questions.length;i++){await p.getByRole('radio').nth(lesson.questions[i].answer).check();await p.getByRole('button',{name:i===lesson.questions.length-1?'Submit quiz':'Next',exact:true}).click();}
 await p.locator('.quiz-score').waitFor();assert.equal(await p.locator('.quiz-score h2').textContent(),'2 / 2');assert.match(await p.locator('.quiz-score').textContent(),/Best: 2/);
 await p.setViewportSize({width:390,height:844});await p.screenshot({path:'artifacts/quiz/results-mobile.png'});
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
 await p.goto('http://localhost:3117/quiz');await p.locator('.quiz-card').last().waitFor();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));await p.screenshot({path:'artifacts/quiz/library-mobile.png'});
 const pdf=catalog.find(l=>l.format==='PDF');await p.goto('http://localhost:3117/quiz?lesson='+pdf.id);await p.locator('.quiz-reader figure img').first().waitFor();await p.locator('.quiz-reader figure img').first().evaluate(img=>img.decode());
 await p.evaluate(()=>localStorage.setItem('mindx-quiz-progress-v1','bad json'));await p.reload();await p.locator('.quiz-status').waitFor();assert.equal(await p.evaluate(()=>localStorage.getItem('mindx-quiz-progress-v1')),'bad json');
 assert.deepEqual(errors,[]);console.log(`PASS: 72 original hashes, all assets, ${catalog.reduce((n,l)=>n+l.questions.length,0)} questions; filters, resume, grading, retry, mobile, PDF and corrupt-storage protection.`);
}finally{await browser.close();}
