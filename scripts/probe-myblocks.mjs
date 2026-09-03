import {chromium} from 'playwright';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:960}});const errors=[];page.on('pageerror',e=>errors.push(e.stack));
 await page.goto('http://localhost:3100/studio',{waitUntil:'domcontentloaded'});
 await page.getByText('Bộ soạn thảo đã sẵn sàng',{exact:true}).waitFor({timeout:60000});
 const frame=page.frames().find(f=>f.url().includes('/editor/index.html'));
 await page.waitForTimeout(9000);
 for(let i=0;i<4;i++){const close=frame.getByRole('button',{name:/^close$/i});if(await close.count() && await close.last().isVisible())await close.last().click();}
 await frame.locator('.blocklyTreeRow').filter({hasText:'My Blocks'}).click();
 await frame.getByText('Make a Block',{exact:true}).click();
 console.log('DIALOG',(await frame.locator('body').innerText()).slice(-2300));
 console.log('INPUTS',await frame.locator('input:visible').evaluateAll(els=>els.map(e=>e.outerHTML)));
 await frame.getByText('block name',{exact:true}).click();
 console.log('EDIT INPUTS',await frame.locator('input:visible').evaluateAll(els=>els.map(e=>e.outerHTML)));
 await frame.locator('.blocklyHtmlInput').fill('drive forward');
 await frame.locator('.blocklyHtmlInput').press('Enter');
 await frame.getByRole('button',{name:'OK',exact:true}).click();
 await page.waitForTimeout(1000);
 console.log('FUNCTIONS',await frame.evaluate(()=>window.VexStudio.functions()));
 console.log('COMPILED',await frame.evaluate(()=>window.VexStudio.compileFunction('drive forward').slice(-700)));
 await frame.getByRole('button',{name:'File',exact:true}).click();
 const downloadEvent=page.waitForEvent('download');
 await frame.getByText('Save To Your Device',{exact:true}).click();
 await (await downloadEvent).saveAs('artifacts/myblock.goblocks');
 console.log('ERRORS',errors);
 await page.screenshot({path:'artifacts/make-block-dialog.png'});
}finally{await browser.close()}
