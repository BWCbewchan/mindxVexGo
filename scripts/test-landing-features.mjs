import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
// Landing lists every feature; each link responds; RoboLab deep links open the right panel.
const base='http://localhost:3131';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/');
 const links=await page.locator('#all-tools a').evaluateAll(a=>a.map(x=>x.getAttribute('href')));
 assert.equal(links.length,21);
 for(const href of new Set(links.map(h=>h.split('?')[0]))){const r=await page.request.get(base+href);assert.equal(r.status(),200,href);}
 assert(await page.locator('.landing-card-robolab').isVisible());
 await page.locator('#all-tools').screenshot({path:'artifacts/landing-all-tools.png'});
 await page.locator('.landing-grid').screenshot({path:'artifacts/landing-cards.png'});
 const mobile=await browser.newPage({viewport:{width:390,height:844}});
 await mobile.goto(base+'/');
 assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'no horizontal scroll');
 await mobile.locator('#all-tools').screenshot({path:'artifacts/landing-all-tools-mobile.png'});
 await page.goto(base+'/robolab?view=competitions');
 await page.getByRole('region',{name:'Chọn sa bàn FLL WRO'}).waitFor();
 assert.equal(await page.getByRole('region',{name:'Chọn sa bàn FLL WRO'}).getByRole('button',{name:'FLL',exact:true}).getAttribute('aria-pressed'),'true');
 await page.goto(base+'/robolab?view=practice');
 assert.equal(await page.getByRole('region',{name:'Chọn sa bàn FLL WRO'}).getByRole('button',{name:'Luyện tập',exact:true}).getAttribute('aria-pressed'),'true');
 await page.goto(base+'/robolab?tool=arena');
 await page.waitForFunction(()=>document.querySelector('iframe')?.src.includes('/gears/arena.html'));
 assert.deepEqual(errors,[]);
 console.log('PASS landing features, links, mobile width, RoboLab deep links');
}finally{await browser.close();}
