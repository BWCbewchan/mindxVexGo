import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const base=process.env.TEST_BASE_URL||'http://localhost:3100';
const tracked=new Set(execFileSync('git',['ls-files'],{encoding:'utf8',maxBuffer:8*1024*1024}).split('\n'));
const browser=await chromium.launch({channel:'chrome',headless:true});
const checked=new Set();
try {
 const page=await browser.newPage();
 await page.goto(base+'/studio',{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:'Continue to editor'}).click();
 const frame=page.frameLocator('iframe[title="Bộ lập trình VEXcode GO"]');
 await frame.locator('.studio-toolbar-actions').waitFor({timeout:60000});
 async function checkImages(){
  const urls=await frame.locator('img,image').evaluateAll(elements=>elements.map(e=>e.currentSrc||e.getAttribute('src')||e.getAttribute('href')||e.getAttribute('xlink:href')).filter(Boolean).map(src=>new URL(src,document.baseURI).href));
  for(const url of new Set(urls)){
   if(!url.startsWith(base)||checked.has(url))continue;
   assert.ok(!url.includes('/node_modules/'),url);
   const pathname=decodeURIComponent(new URL(url).pathname);
   assert.ok(tracked.has('public'+pathname),'Missing or incorrectly cased Git asset: '+pathname);
   const response=await page.request.get(url);
   assert.equal(response.status(),200,url);
   assert.match(response.headers()['content-type'],/^image\//,url);
   checked.add(url);
  }
 }
 await checkImages();
 await frame.locator('.blocklyTreeRow').filter({hasText:'My Blocks'}).click();
 await frame.getByText('Make a Block',{exact:true}).click();
 await checkImages();
 await frame.getByRole('button',{name:'Cancel',exact:true}).last().click();
 for(const name of ['Tutorials','Builds']){
  await page.goto(base+'/studio',{waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:'Continue to editor'}).click();
  await frame.locator('.studio-toolbar-actions').waitFor({timeout:60000});
  await frame.getByRole('button',{name,exact:true}).click();
  await page.waitForTimeout(700);
  await checkImages();
 }
 assert.ok([...checked].some(url=>url.endsWith('/monitor.svg')));
 console.log('PASS: '+checked.size+' local images return image content, are tracked in Git with exact case, and avoid node_modules paths.');
}finally{await browser.close();}
