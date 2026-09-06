import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const catalog=JSON.parse(fs.readFileSync('public/quiz/catalog.json','utf8'));
const audit=JSON.parse(fs.readFileSync('artifacts/quiz/question-context-review.json','utf8'));
assert.equal(audit.length,catalog.reduce((n,l)=>n+l.questions.length,0));
for(const lesson of catalog)for(const q of lesson.questions){
 if(/vị trí số|theo hình|Giải thoát mê cung|Hình nào thuộc/i.test(q.prompt))assert.ok(q.references.some(r=>r.kind==='question'),q.id);
}
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1280,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3117/quiz?lesson=f1ef308b4717');await page.getByRole('button',{name:/^Practice quiz/}).click();
 for(const [question,src] of [[6,'question-maze.webp'],[7,'question-positions.webp'],[8,'question-positions.webp']]){
  await page.getByRole('button',{name:`Question ${question}`,exact:true}).click();
  const image=page.locator(`.quiz-runner img[src$="${src}"]`);await image.waitFor();await image.evaluate(i=>i.decode());
  assert.equal(await page.locator('.quiz-runner img[src*="-page-"]').count(),0);
  await image.click();await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
 }
 await page.screenshot({path:'artifacts/quiz/positions-desktop.png',fullPage:true});
 await page.setViewportSize({width:375,height:850});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'artifacts/quiz/positions-mobile.png',fullPage:true});
 // Individual lesson and combined lesson must show the same reviewed source.
 await page.goto('http://localhost:3117/quiz?lesson=6325b82877b5');await page.getByRole('button',{name:/^Practice quiz/}).click();await page.locator('.quiz-runner img[src$="question-maze.webp"]').waitFor();
 assert.deepEqual(errors,[]);console.log('PASS: 241-question coverage audit; required diagrams, combined/individual lessons, zoom, no full-page cards, mobile.');
}finally{await browser.close();}
