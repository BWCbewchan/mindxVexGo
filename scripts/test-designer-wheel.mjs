import {chromium} from 'playwright';import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});await page.goto((process.env.BASE_URL||'http://localhost:3117')+'/training/custom');
 const svg=page.locator('.designer-canvas');await svg.waitFor();
 const bounds=await page.locator('#designer-viewport').boundingBox();const x=bounds.x+bounds.width*.55,y=bounds.y+bounds.height*.45;
 const point=()=>svg.evaluate((s,{x,y})=>{const p=s.createSVGPoint();p.x=x;p.y=y;const q=p.matrixTransform(s.getScreenCTM().inverse());return {x:q.x,y:q.y};},{x,y});
 const before=await point();await page.mouse.move(x,y);await page.mouse.wheel(0,-150);
 await page.waitForFunction(()=>parseFloat(document.querySelector('[aria-label="Zoom level"]').textContent)>100,{},{timeout:2500});
 const after=await point();assert.ok(Math.hypot(before.x-after.x,before.y-after.y)<4,'wheel zoom preserves cursor anchor');
 const level=await page.getByLabel('Zoom level').textContent();
 await svg.dispatchEvent('wheel',{deltaY:-100,ctrlKey:true,clientX:x,clientY:y,bubbles:true,cancelable:true});
 await page.waitForFunction(old=>parseFloat(document.querySelector('[aria-label="Zoom level"]').textContent)>parseFloat(old),level);
 assert.equal(await page.evaluate(()=>visualViewport.scale),1,'pinch affects canvas, not browser page');
 await page.mouse.wheel(0,120);await page.getByRole('button',{name:'Fit field',exact:true}).click();assert.equal(await page.getByLabel('Zoom level').textContent(),'100%');
 await svg.dispatchEvent('wheel',{deltaY:-100000,clientX:x,clientY:y,bubbles:true,cancelable:true});await page.waitForFunction(()=>document.querySelector('[aria-label="Zoom level"]').textContent==='300%');
 await svg.dispatchEvent('wheel',{deltaY:100000,clientX:x,clientY:y,bubbles:true,cancelable:true});await page.waitForFunction(()=>document.querySelector('[aria-label="Zoom level"]').textContent==='25%');
 console.log('PASS: native wheel, touchpad ctrl-wheel pinch, cursor anchor, canvas-only zoom, Fit and 25–300% bounds.');
}finally{await browser.close();}
