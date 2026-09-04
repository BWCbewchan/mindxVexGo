import {chromium} from 'playwright';import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await context.newPage();await page.goto((process.env.BASE_URL||'http://localhost:3117')+'/training/custom');
 await page.getByRole('button',{name:'Add wall',exact:true}).tap();const wall=page.locator('.designer-object[data-kind="walls"]');await wall.scrollIntoViewIfNeeded();const b=await wall.boundingBox();const before=Number(await page.getByRole('spinbutton',{name:'Object x',exact:true}).inputValue());
 const cdp=await context.newCDPSession(page);const x=b.x+b.width/2,y=b.y+b.height/2;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
 for(let i=1;i<=5;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-i*5,y:y-i*5}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await page.waitForTimeout(400); // Let Chrome finish the injected touch gesture before the next tap.
 assert.ok(Number(await page.getByRole('spinbutton',{name:'Object x',exact:true}).inputValue())<before);
 const handle=await page.locator('.resize-handle').boundingBox();assert.ok(handle.width>=23&&handle.height>=23,'resize grip remains touchable at fit scale');
 await page.getByRole('button',{name:'Zoom in',exact:true}).tap();await page.waitForFunction(()=>document.querySelector('[aria-label="Zoom level"]')?.textContent==='125%',{},{timeout:3000}).catch(async e=>{await page.screenshot({path:'artifacts/touch-failure.png',fullPage:true});throw e;});await page.getByRole('button',{name:'Hide tools',exact:true}).tap();await page.getByRole('button',{name:'Show tools',exact:true}).waitFor();assert.equal(await page.getByRole('toolbar',{name:'Drawing tools'}).isVisible(),false);await page.getByRole('button',{name:'Show tools',exact:true}).tap();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 console.log('PASS: touch-enabled browser icon taps, real touch drag, zoom, sidebar toggle, minimum resize handle size and no horizontal overflow.');
}finally{await browser.close();}
