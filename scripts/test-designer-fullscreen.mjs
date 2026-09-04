import {chromium} from 'playwright';import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage();await page.goto((process.env.BASE_URL||'http://localhost:3123')+'/training/custom');await page.locator('.designer-canvas').waitFor();
 for(const [width,height] of [[1440,1000],[1024,768],[390,844],[844,390]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  const viewport=await page.locator('#designer-viewport').boundingBox();const save=await page.getByRole('button',{name:'Save to My fields',exact:true}).boundingBox();
  assert.ok(save.y+save.height<=viewport.y,`${width}: save actions above canvas`);
  assert.ok(Math.abs(viewport.y+viewport.height-height)<=12,`${width}: canvas fills remaining screen (${JSON.stringify(viewport)})`);
  assert.ok(viewport.height>100,`${width}: usable canvas height`);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1&&document.documentElement.scrollWidth<=innerWidth+1),true,`${width}: page stays within screen`);
 }
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'artifacts/designer-fullscreen-desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Hide properties',exact:true}).click();await page.screenshot({path:'artifacts/designer-fullscreen-mobile.png'});
 console.log('PASS: save/status header and full remaining canvas at desktop, tablet, phone and landscape sizes; no page overflow.');
}finally{await browser.close();}
