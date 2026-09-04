import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const catalog=JSON.parse(await fs.readFile('app/training/missions.json','utf8'));
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto((process.env.BASE_URL||'http://localhost:3118')+'/training');
 const group=page.getByRole('group',{name:'Difficulty',exact:true});
 assert.equal(await group.getByRole('button').count(),5);
 assert.equal(await page.locator('.lesson-card').count(),catalog.length+1);
 for(const [label,key] of [['Beginner','BEGINNER'],['Intermediate','INTERMEDIATE'],['Challenge','CHALLENGE']]){
  const button=group.getByRole('button',{name:new RegExp('^'+label)});await button.click();
  assert.equal(await button.getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('.lesson-card').count(),catalog.filter(l=>l.level.includes(key)).length);
 }
 await group.getByRole('button',{name:/^Your fields/}).click();assert.equal(await page.locator('.lesson-card').count(),1);
 await group.getByRole('button',{name:/^All levels/}).click();
 await page.getByRole('searchbox').fill('Sequence and distance subtraction');assert.equal(await page.locator('.lesson-card').count(),1);
 await page.getByRole('button',{name:'Practice Two stops, one direction',exact:true}).click();
 assert.match(await page.locator('.checkpoint-progress').textContent(),/0 \/ 2/);
 await page.getByText('Route coordinates (mm)',{exact:true}).click();assert.match(await page.locator('.route-coordinates').textContent(),/950/);
 await page.locator('.thinking-hint summary').click();assert.match(await page.locator('.thinking-hint').textContent(),/Subtract consecutive/);
 await page.getByRole('button',{name:/All missions/}).click();await page.getByRole('searchbox').fill('');
 await page.setViewportSize({width:390,height:844});
 await group.getByRole('button',{name:/^Beginner/}).click();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:'artifacts/training-difficulty-mobile.png'});
 console.log('PASS: horizontal difficulty buttons filter all levels, selected states and counts; skill search; checkpoint progress/coordinates/hints; mobile tap and width.');
}finally{await browser.close();}
