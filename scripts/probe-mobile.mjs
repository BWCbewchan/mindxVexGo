import {chromium,webkit,devices} from 'playwright';
const browser=await (process.argv.includes('--webkit')?webkit:chromium).launch(process.argv.includes('--webkit')?{headless:true}:{channel:'chrome',headless:true});
try {
 const context=await browser.newContext({...devices['iPhone 13'],locale:'vi-VN'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.stack));
 await page.goto('http://localhost:3100/studio',{waitUntil:'domcontentloaded'});
 await page.getByText('Bộ soạn thảo đã sẵn sàng',{exact:true}).waitFor({timeout:35000}).catch(()=>{});
 await page.waitForTimeout(5000);
 const frame=page.frames().find(f=>f.url().includes('/editor/index.html'));
 console.log('ERRORS',errors);
 console.log('LAYOUT',await frame.evaluate(()=>({top:[...document.querySelector('.topmenu').children].map(e=>[e.tagName,e.id,e.className,e.getBoundingClientRect().toJSON()]),portals:[...document.querySelectorAll('[class*=tutorial]')].filter(e=>e.getBoundingClientRect().height>0).map(e=>[e.className,e.getBoundingClientRect().toJSON()]).slice(-12)})));
 await page.screenshot({path:'artifacts/mobile-before.png',fullPage:true});
}finally{await browser.close()}
