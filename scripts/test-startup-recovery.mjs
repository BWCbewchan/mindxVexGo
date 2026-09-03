import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://localhost:3102';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext();
 // Older embedded browsers can lack native modal dialog methods.
 await context.addInitScript(()=>{
  HTMLDialogElement.prototype.showModal=undefined;
  HTMLDialogElement.prototype.close=undefined;
 });
 const page=await context.newPage();
 await page.route('**/editor/dist/main.bundle.js',route=>route.abort('failed'));
 await page.goto(base+'/studio',{waitUntil:'domcontentloaded'});
 const dialog=page.getByRole('dialog',{name:'App permissions'});
 await dialog.waitFor();
 assert.ok(await dialog.evaluate(e=>e.classList.contains('dialog-fallback')));
 await dialog.getByRole('button',{name:'Continue to editor'}).click();
 await dialog.waitFor({state:'hidden'});
 await page.getByText(/Could not load main.bundle.js/).waitFor();
 await page.unroute('**/editor/dist/main.bundle.js');
 await page.getByRole('button',{name:'Retry editor',exact:true}).click();
 await page.locator('.loading').waitFor({state:'hidden',timeout:60000});
 await page.frameLocator('iframe').locator('.blocklySvg').first().waitFor();
 await page.frameLocator('iframe').getByRole('button',{name:'? Help',exact:true}).click();
 await page.getByRole('button',{name:'App permissions',exact:true}).click();
 await dialog.waitFor();
 await page.keyboard.press('Escape');
 await dialog.waitFor({state:'hidden'});
 console.log('PASS: missing dialog API fallback, failed editor script diagnosis, retry recovery, reopen and Escape.');
}finally{await browser.close();}
