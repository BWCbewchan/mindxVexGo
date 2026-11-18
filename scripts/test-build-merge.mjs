import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
// Verifies the merged "Lắp ráp" area: projects and library share one tab bar, light theme, no horizontal scroll on phones.
const base='http://localhost:3131',errors=[];
const b=await chromium.launch({channel:'chrome',headless:true});
try{
 await fs.mkdir('artifacts/build',{recursive:true});
 for(const [w,h,tag] of [[1366,860,'desktop'],[390,844,'mobile']]){
  const p=await b.newPage({viewport:{width:w,height:h}});p.setDefaultTimeout(90000);p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/assembly/projects',{waitUntil:'domcontentloaded'});
  const tabs=p.getByRole('navigation',{name:'Lắp ráp'});
  await tabs.getByRole('link',{name:'Dự án của tôi'}).waitFor();
  assert.equal(await tabs.getByRole('link',{name:'Dự án của tôi'}).getAttribute('aria-current'),'page');
  assert.equal(await p.getByRole('heading',{level:1,name:'Lắp ráp'}).count(),1);
  const bg=await p.evaluate(()=>getComputedStyle(document.querySelector('main').parentElement).backgroundColor);
  assert.equal(bg,'rgb(246, 247, 241)','projects uses light theme');
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal scroll '+tag);
  await p.screenshot({path:`artifacts/build/projects-${tag}.png`});
  await tabs.getByRole('link',{name:'Thư viện mẫu'}).click();
  await p.waitForURL('**/library');
  const tabs2=p.getByRole('navigation',{name:'Lắp ráp'});
  assert.equal(await tabs2.getByRole('link',{name:'Thư viện mẫu'}).getAttribute('aria-current'),'page');
  assert.equal(await p.getByRole('heading',{level:1,name:'Lắp ráp'}).count(),1);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'library no horizontal scroll '+tag);
  await p.screenshot({path:`artifacts/build/library-${tag}.png`});
  await tabs2.getByRole('link',{name:'Dự án của tôi'}).click();await p.waitForURL('**/assembly/projects');
  await p.close();
 }
 assert.deepEqual(errors,[]);console.log('PASS merged Lắp ráp tabs on desktop and mobile.');
}finally{await b.close();}
