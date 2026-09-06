import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const catalog=JSON.parse(fs.readFileSync('public/quiz/catalog.json','utf8'));
const flatten=bs=>bs.flatMap(b=>b.type==='table'?[b,...flatten(b.rows.flatMap(r=>r.flatMap(c=>c.blocks)))]:[b]);
const assets=catalog.flatMap(l=>flatten(JSON.parse(fs.readFileSync('public'+l.content,'utf8')).blocks).filter(b=>b.src).map(b=>b.src));
assets.push(...catalog.flatMap(l=>l.questions.filter(q=>q.context?.src).map(q=>q.context.src)));
const browser=await chromium.launch({channel:'chrome'});
try{
 const p=await browser.newPage({viewport:{width:1280,height:900}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:3117/quiz?lesson=5b4e2977412b');
 await p.getByRole('button',{name:/^Practice quiz/}).click();
 await p.locator('.quiz-question-context img').waitFor();
 assert.match(await p.locator('.quiz-question-context').textContent(),/10%/);
 await p.locator('.quiz-question-context .quiz-illustration').click();await p.getByRole('dialog').waitFor();await p.keyboard.press('Escape');
 for(const width of [1280,375]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:`artifacts/quiz/context-${width}.png`,fullPage:true});}
 for(let i=0;i<assets.length;i+=16){const failed=await p.evaluate(async urls=>(await Promise.all(urls.map(async src=>{const img=new Image();img.src=src;try{await img.decode();return null;}catch{return src;}}))).filter(Boolean),assets.slice(i,i+16));assert.deepEqual(failed,[]);}
 const word=catalog.find(l=>l.format==='DOCX'&&flatten(JSON.parse(fs.readFileSync('public'+l.content,'utf8')).blocks).some(b=>b.type==='table'));
 await p.goto('http://localhost:3117/quiz?lesson='+word.id);await p.getByRole('button',{name:'Read lesson',exact:true}).click();await p.locator('.quiz-source-table table').first().waitFor();
 assert.deepEqual(errors,[]);console.log(`PASS: task context, image zoom, mobile layout, Word tables, ${assets.length} reader/context images decoded.`);
}finally{await browser.close();}
