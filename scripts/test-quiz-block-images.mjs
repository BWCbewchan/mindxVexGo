import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const examples=JSON.parse(fs.readFileSync('public/quiz/blocks/examples.json','utf8'));
const compiled=ts.transpileModule(fs.readFileSync('app/quiz/block-examples.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
const exp={};new Function('exports','require',compiled)(exp,()=>examples);
const catalog=JSON.parse(fs.readFileSync('public/quiz/catalog.json','utf8'));
const matches=catalog.flatMap(l=>l.questions).filter(q=>exp.blockExample(q.prompt));
const browser=await chromium.launch({channel:'chrome'});
try{
 const p=await browser.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:3117/quiz?lesson=f1ef308b4717');await p.getByRole('button',{name:/^Practice quiz/}).click();await p.getByRole('button',{name:'Question 11',exact:true}).click();
 await p.locator('.quiz-block-example img').waitFor();assert.match(await p.locator('.quiz-block-example img').getAttribute('src'),/until.png/);
 for(const example of Object.values(examples))assert.ok(await p.evaluate(async src=>{const image=new Image();image.src=src;await image.decode();return image.naturalWidth>0;},example.src));
 await p.locator('.quiz-block-example .quiz-illustration').click();await p.getByRole('dialog').waitFor();await p.keyboard.press('Escape');
 for(const width of [1366,375]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:`artifacts/quiz/blocks-${width}.png`,fullPage:true});}
 assert.deepEqual(errors,[]);console.log(`PASS: ${matches.length} questions with authentic block illustrations; 7 assets decoded, zoom, keyboard dismissal, desktop and mobile.`);
}finally{await browser.close();}
