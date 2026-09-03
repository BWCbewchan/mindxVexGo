import { chromium, devices } from 'playwright';
import fs from 'node:fs/promises';
await fs.mkdir('artifacts',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const mobile=process.argv.includes('--mobile');
const context=await browser.newContext(mobile?devices['iPhone 13']:{viewport:{width:1440,height:960}});
if(mobile)await context.addInitScript(()=>Object.defineProperty(navigator,'bluetooth',{value:undefined,configurable:true}));
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.stack));
const consoleErrors=[];page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
await page.goto('http://localhost:3100/studio',{waitUntil:'domcontentloaded'});
await page.getByText('Bộ soạn thảo đã sẵn sàng',{exact:true}).waitFor({timeout:20000}).catch(()=>console.log('NOT READY',errors));
const frame=page.frames().find(f=>f.url().includes('/editor/index.html'));
await page.waitForTimeout(10000);
console.log('VISIBLE BUTTONS',await frame.locator('button:visible').allTextContents());
for(let i=0;i<3;i++) {
 const close=frame.getByRole('button',{name:/^close$/i});
 if(await close.count() && await close.last().isVisible()) await close.last().click();
}
console.log('BODY',(await frame.locator('body').innerText()).slice(-2400));
console.log('UI',await frame.locator('.topmenu').evaluate(el=>el.outerHTML.slice(0,2500)));
console.log('ERRORS',errors);
console.log('CONSOLE ERRORS',consoleErrors);
await page.screenshot({path:`artifacts/${mobile?'mobile':'desktop'}-studio.png`,fullPage:true});
if(!mobile){
 const modalClose=frame.locator('.modal_wrapper').getByRole('button',{name:/^close$/i});
 if(await modalClose.isVisible())await modalClose.click();
 await frame.getByText('File',{exact:true}).click();
 console.log('FILE MENU',await frame.locator('body').innerText());
 await page.screenshot({path:'artifacts/file-menu.png'});
}
await browser.close();
