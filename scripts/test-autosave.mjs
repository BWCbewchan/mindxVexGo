import {chromium,webkit,devices} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3106';
const mobile=process.argv.includes('--iphone');
const browser=await(mobile?webkit:chromium).launch({...(mobile?{}:{channel:'chrome'}),headless:true});
try{
 const page=await browser.newPage(mobile?devices['iPhone 13']:{});
 async function open(){
  await page.goto(base+'/studio');
  await page.getByRole('button',{name:'Continue to editor'}).click();
  await page.getByText('Editor ready',{exact:true}).waitFor();
  return page.locator('iframe').elementHandle().then(e=>e.contentFrame());
 }
 async function importFile(editor,fixture){
  if(!await editor.locator('#file_menu.active').count())await editor.getByRole('button',{name:'File',exact:true}).click();
  const chooser=page.waitForEvent('filechooser');
  await editor.getByText('Load From Your Device',{exact:true}).click();
  await(await chooser).setFiles({name:'autosave.goblocks',mimeType:'application/json',buffer:Buffer.from(fixture)});
 }
 const fixture=await fs.readFile('scripts/fixtures/controls.goblocks','utf8');
 let editor=await open();
 await importFile(editor,fixture);
 await page.waitForFunction(()=>localStorage.getItem('projectDataGO')?.includes('CONTROL_BODY'));
 await editor.getByRole('button',{name:'File',exact:true}).click();
 await editor.locator('.studio-autosave').getByText('Saved',{exact:true}).waitFor();
 editor=await open();
 await editor.waitForFunction(()=>window.VexStudio.functions().some(f=>f.signature==='drive forward'));
 await editor.getByRole('button',{name:'File',exact:true}).click();
 await editor.getByRole('checkbox',{name:'Auto save',exact:true}).uncheck();
 await editor.locator('.studio-autosave').getByText('Off',{exact:true}).waitFor();
 await importFile(editor,fixture.replaceAll('CONTROL_BODY','UNSAVED_CHANGE'));
 await page.waitForTimeout(2500);
 assert.ok(!(await page.evaluate(()=>localStorage.getItem('projectDataGO'))).includes('UNSAVED_CHANGE'));
 editor=await open();
 await editor.getByRole('button',{name:'File',exact:true}).click();
 assert.equal(await editor.getByRole('checkbox',{name:'Auto save',exact:true}).isChecked(),false);
 await editor.getByRole('checkbox',{name:'Auto save',exact:true}).check();
 await editor.locator('.studio-autosave').getByText('Saved',{exact:true}).waitFor();
 await importFile(editor,fixture.replaceAll('CONTROL_BODY','RESAVED_CHANGE'));
 await page.waitForFunction(()=>localStorage.getItem('projectDataGO')?.includes('RESAVED_CHANGE'));
 await editor.getByRole('button',{name:'File',exact:true}).click();
 await editor.evaluate(()=>{
  const write=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,value){if(key==='projectDataGO')throw new DOMException('Full','QuotaExceededError');return write.call(this,key,value);};
 });
 await importFile(editor,fixture.replaceAll('CONTROL_BODY','FAILED_SAVE'));
 await editor.getByRole('button',{name:'File',exact:true}).click();
 await editor.locator('.studio-autosave').getByText('Could not save — use File to download a copy',{exact:true}).waitFor();
 assert.ok(!(await page.evaluate(()=>localStorage.getItem('projectDataGO'))).includes('FAILED_SAVE'));
 console.log('PASS: automatic save/restore, persistent off switch, resume saving, and accurate storage failure status.');
}finally{await browser.close();}
