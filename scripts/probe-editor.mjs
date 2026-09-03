import { chromium } from 'playwright';
import fs from 'node:fs/promises';
await fs.mkdir('artifacts', {recursive:true});
const browser = await chromium.launch({channel:'chrome', headless:true});
const page = await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];const failed=[];
page.on('pageerror', e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`)});
await page.goto('http://localhost:3100/studio',{waitUntil:'domcontentloaded',timeout:60000});
await page.waitForTimeout(18000);
console.log('PAGE',await page.locator('body').innerText());
for(const frame of page.frames().slice(1)){
 console.log('FRAME',frame.url(),(await frame.locator('body').innerText()).slice(0,10000));
 console.log('BLOCKLY',await frame.locator('.blocklySvg').count());
}
console.log('ERRORS',errors);console.log('FAILED',failed.slice(0,40));
await page.screenshot({path:'artifacts/initial-desktop.png',fullPage:true});
await browser.close();
