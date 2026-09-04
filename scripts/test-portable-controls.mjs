import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'});
const base=process.env.TEST_BASE_URL||'http://localhost:3110';
async function open(){
  const context=await browser.newContext();
  const page=await context.newPage();
  await page.goto(base+'/studio');
  await page.getByRole('button',{name:'Continue to editor'}).click();
  const editor=await page.locator('iframe').elementHandle().then(e=>e.contentFrame());
  await editor.waitForFunction(()=>!!window.VexStudio);
  return {page,editor};
}
async function load(page,editor,file){
  await editor.getByRole('button',{name:'File',exact:true}).click();
  const chooser=page.waitForEvent('filechooser');
  await editor.getByText('Load From Your Device',{exact:true}).click();
  await(await chooser).setFiles(file);
  await editor.waitForFunction(()=>window.VexStudio.functions().some(f=>f.signature==='drive forward'));
}
try{
  const first=await open();
  await load(first.page,first.editor,'scripts/fixtures/controls.goblocks');
  await first.editor.getByRole('button',{name:'⌨ Controls',exact:true}).click();
  await first.page.getByRole('button',{name:'+ Add control',exact:true}).click();
  await first.page.getByRole('combobox',{name:'Function 1',exact:true}).selectOption('drive forward');
  await first.page.getByLabel('Button label',{exact:true}).fill('My robot forward');
  await first.page.getByRole('combobox',{name:'Choose key 1',exact:true}).selectOption('KeyQ');
  await first.page.getByRole('button',{name:'Close controller'}).click();
  await first.editor.getByRole('button',{name:'File',exact:true}).click();
  const downloadEvent=first.page.waitForEvent('download');
  await first.editor.getByText('Save To Your Device',{exact:true}).click();
  const download=await downloadEvent;
  const file='artifacts/portable-controls.goblocks';
  await download.saveAs(file);
  const saved=JSON.parse(await fs.readFile(file,'utf8'));
  assert.equal(saved.mindxController.bindings[0].key,'KeyQ');
  assert.equal(saved.mindxController.bindings[0].label,'My robot forward');
  const second=await open(); // Separate storage, as on another computer.
  await load(second.page,second.editor,file);
  await second.editor.getByRole('button',{name:'⌨ Controls',exact:true}).click();
  await second.page.waitForFunction(()=>document.querySelector('input')&&localStorage.getItem('mindx-go-controller-v1')?.includes('My robot forward'));
  assert.equal(await second.page.getByLabel('Button label',{exact:true}).inputValue(),'My robot forward');
  assert.equal(await second.page.getByRole('combobox',{name:'Choose key 1',exact:true}).inputValue(),'KeyQ');
  assert.equal(await second.page.getByRole('combobox',{name:'Function 1',exact:true}).inputValue(),'drive forward');
  assert.equal(await second.page.getByRole('checkbox',{name:/Enable controls/}).isChecked(),false);
  await second.page.getByRole('button',{name:'Close controller'}).click();
  await load(second.page,second.editor,'scripts/fixtures/controls.goblocks');
  await second.page.waitForFunction(()=>localStorage.getItem('mindx-go-controller-v1')==='[]');
  console.log('PASS: downloaded project contains controls; fresh browser restores key, label and function; controls remain disabled; legacy files clear bindings.');
}finally{await browser.close();}
