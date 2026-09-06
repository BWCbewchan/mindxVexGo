import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const b=await chromium.launch({channel:'chrome'});
try{
 const p=await b.newPage();
 await p.addInitScript(()=>localStorage.setItem('mindx-quiz-code-result-v2:5b4e2977412b:task-1',JSON.stringify({at:'2026-09-05T12:00:00Z',outcome:'checked',checks:[],labels:[],status:'Program finished',seconds:1})));
 await p.goto('http://localhost:3117/quiz?lesson=5b4e2977412b');
 await p.getByRole('button',{name:/^Coding task/}).click();
 await p.locator('.coding-result.checked').waitFor();
 assert.equal(await p.getByRole('button',{name:'\u21ba Reset',exact:true}).count(),1);
 assert.match(await p.locator('.coding-task-picker select').innerText(),/\u00b7 Code check/);
 assert.equal(await p.locator('meta[charset]').getAttribute('charset'),'utf-8');
 assert.doesNotMatch(await p.locator('.quiz-coding').innerText(),/\u00e2[\u0153\u2010-\u203f\u20ac]|\u00c2[\u0080-\u00bf]|\ufffd/);
 await p.screenshot({path:'artifacts/quiz/encoding-fixed.png'});
 console.log('PASS: UTF-8 browser rendering, curly apostrophe, reset icon, task separator; no mojibake in coding UI.');
}finally{await b.close();}
