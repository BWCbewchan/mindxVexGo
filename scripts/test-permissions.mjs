import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const unsupported of [false,true]){
  const context=await browser.newContext({viewport:unsupported?{width:390,height:844}:{width:1280,height:900}});
  if(unsupported)await context.addInitScript(()=>Object.defineProperty(navigator,'bluetooth',{value:undefined}));
  const page=await context.newPage();
  await page.goto((process.env.TEST_BASE_URL||'http://localhost:3102')+'/studio');
  const dialog=page.getByRole('dialog',{name:'App permissions'});
  await dialog.waitFor();
  if(unsupported){
   await dialog.getByText(/This browser does not support Web Bluetooth/).waitFor();
   assert.equal(await dialog.getByRole('button',{name:/Open Brain settings|Loading editor/}).isDisabled(),true);
   await dialog.getByRole('button',{name:'Continue to editor'}).click();
  }else{
   const connect=dialog.getByRole('button',{name:'Open Brain settings'});
   await connect.waitFor({timeout:60000});
   await connect.click();
   await page.frameLocator('iframe').getByText('Connect',{exact:true}).first().waitFor();
  }
  await dialog.waitFor({state:'hidden'});
  await page.frameLocator('iframe').getByRole('button',{name:'? Help',exact:true}).click();
  await page.getByRole('button',{name:'App permissions',exact:true}).click();
  await dialog.waitFor();
  await page.keyboard.press('Escape');
  await dialog.waitFor({state:'hidden'});
  await context.close();
 }
 console.log('PASS: startup permission dialog, native Brain connection flow, unsupported mobile fallback, reopen and Escape.');
}finally{await browser.close();}
