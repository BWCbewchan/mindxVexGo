import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('dialog',d=>d.accept());
 await page.goto((process.env.BASE_URL||'http://localhost:3116')+'/training');
 for(const name of ['First cargo delivery','Bumper stop and reverse','Eye obstacle lookout']){
  await page.getByRole('button',{name:'Practice '+name,exact:true}).click();
  await page.getByRole('button',{name:'Load sensor example',exact:true}).click();
  await page.getByRole('button',{name:/Run code/}).click();
  await page.waitForFunction(()=>document.querySelector('.training-status')?.textContent==='Program finished',{},{timeout:25000}).catch(async e=>{console.log(name,await page.locator('.training-status').textContent());throw e;});
  assert.match(await page.locator('.goal-status').textContent(),/Goal reached/,name);
  await page.getByRole('button',{name:/All missions/}).click();
 }
 console.log('PASS: all three one-click sensor examples complete their missions.');
}finally{await browser.close();}
