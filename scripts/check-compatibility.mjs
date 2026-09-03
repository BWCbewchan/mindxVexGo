import {chromium,webkit,firefox,devices} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3102';
const profiles=[
 {name:'Chrome desktop',engine:chromium,launch:{channel:'chrome'},context:{viewport:{width:1440,height:900}},ble:true},
 {name:'Edge desktop',engine:chromium,launch:{channel:'msedge'},context:{viewport:{width:1366,height:768}},ble:true},
 {name:'Android phone',engine:chromium,launch:{channel:'chrome'},context:devices['Pixel 7'],ble:true},
 {name:'iPhone portrait',engine:webkit,context:devices['iPhone 13']},
 {name:'iPhone landscape',engine:webkit,context:devices['iPhone 13 landscape']},
 {name:'iPad portrait',engine:webkit,context:devices['iPad (gen 7)']},
 {name:'Firefox desktop',engine:firefox,context:{viewport:{width:1366,height:768}}},
];
const selected=process.argv[2];
const report=[];
await fs.mkdir('artifacts',{recursive:true});
for(const profile of profiles.filter(p=>!selected||p.name.toLowerCase().includes(selected.toLowerCase()))){
 let browser,page;const errors=[];const result={profile:profile.name,checks:[]};
 try{
  browser=await profile.engine.launch({headless:true,...profile.launch});
  const context=await browser.newContext({...profile.context,locale:'en-US'});
  // A canceled chooser exercises the native request path without a real robot.
  if(profile.ble)await context.addInitScript(()=>{
   window.__bleRequests=[];
   Object.defineProperty(navigator,'bluetooth',{value:{getAvailability:async()=>true,addEventListener(){},removeEventListener(){},getDevices:async()=>[],requestDevice:async options=>{window.__bleRequests.push({options,active:navigator.userActivation.isActive});throw new DOMException('User cancelled the chooser','NotFoundError');}}});
  });
  page=await context.newPage();page.setDefaultTimeout(15000);
  page.on('pageerror',error=>errors.push(error.stack||error.message));
  await page.goto(base+'/studio',{waitUntil:'domcontentloaded'});
  await page.getByRole('dialog',{name:'App permissions'}).waitFor();
  await page.getByRole('button',{name:'Continue to editor'}).click();
  const frame=await page.locator('iframe').elementHandle().then(e=>e.contentFrame());
  await frame.locator('.studio-toolbar-actions').waitFor({timeout:60000});
  await frame.locator('.blocklySvg').first().waitFor();
  result.checks.push('editor opens');
  const layout=await frame.locator('.topmenu').evaluate(el=>({width:innerWidth,buttons:[...el.querySelectorAll('button')].filter(e=>e.getBoundingClientRect().width).map(e=>({name:e.innerText,right:e.getBoundingClientRect().right,bottom:e.getBoundingClientRect().bottom})),bottom:el.getBoundingClientRect().bottom}));
  assert.ok(layout.buttons.every(b=>b.right<=layout.width+2&&b.bottom<=layout.bottom+2),JSON.stringify(layout));
  result.checks.push('toolbar fits');
  await frame.locator('.brain_button').click();
  if(profile.ble){
   await frame.getByText('Connect',{exact:true}).first().click();
   await page.waitForTimeout(600);
   const requests=await frame.evaluate(()=>window.__bleRequests);
   assert.equal(requests.length,1,'Brain Connect must call requestDevice');
   assert.equal(requests[0].active,true,'Bluetooth request must retain user activation');
   assert.ok(requests[0].options.filters?.length,'VEX device filters required');
   result.checks.push('Bluetooth chooser invoked with VEX filters and user activation; cancel handled');
  }else {
   await page.getByRole('dialog',{name:'App permissions'}).waitFor();
   await page.getByText('This browser does not support Web Bluetooth. You can still edit projects.',{exact:true}).waitFor();
   await page.getByRole('button',{name:'Continue to editor'}).click();
   result.checks.push('unsupported Bluetooth has actionable fallback, no failed native call');
  }
  // Reload to dismiss vendor menus, then verify project and control setup.
  await page.goto(base+'/studio',{waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:'Continue to editor'}).click();
  const editor=await page.locator('iframe').elementHandle().then(e=>e.contentFrame());
  await editor.locator('.studio-toolbar-actions').waitFor({timeout:60000});
  await editor.getByRole('button',{name:'File',exact:true}).click();
  const chooser=page.waitForEvent('filechooser');
  await editor.getByText('Load From Your Device',{exact:true}).click();
  await (await chooser).setFiles('scripts/fixtures/controls.goblocks');
  await editor.getByRole('button',{name:'⌨ Controls',exact:true}).click();
  await page.getByRole('button',{name:'+ Add control',exact:true}).click();
  await page.getByRole('combobox',{name:'Function 1',exact:true}).selectOption('drive forward');
  await page.getByRole('combobox',{name:'Choose key 1',exact:true}).selectOption('ArrowUp');
  await page.getByRole('button',{name:'Close controller',exact:true}).click();
  const dock=page.getByRole('navigation',{name:'Assigned control keys'});
  await dock.waitFor();if(profile.context?.hasTouch)await dock.locator('.dock-key').first().tap();else await dock.locator('.dock-key').first().click();
  await dock.getByText('Enable controls first.',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Hide dock'}).click();
  await editor.getByRole('button',{name:'▤ Dock',exact:true}).click();await dock.waitFor();
  result.checks.push('file import, My Block detection, dock tap/hide/show');
  const code=await editor.evaluate(()=>window.VexStudio.compileFunction('drive forward'));
  assert.ok(code.includes('CONTROL_BODY'),'function body must be compiled');
  assert.ok(!code.includes('START_SENTINEL'),'normal when-started code must not run');
  assert.match(code,/myblockfunction_drive_forward\(\);/,'function invocation must exist');
  result.checks.push('selected function compiles independently');
  await editor.locator('.blocklyTreeRow').filter({hasText:'My Blocks'}).click();
  await editor.locator('.blocklyFlyoutButton').filter({hasText:'Make a Block'}).click();
  const dialogBounds=await editor.locator('.window:visible').last().evaluate(e=>({left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,width:innerWidth}));
  assert.ok(dialogBounds.left>=-1&&dialogBounds.right<=dialogBounds.width+1,JSON.stringify(dialogBounds));
  await editor.getByText('block name',{exact:true}).click();
  const inline=editor.locator('.blocklyHtmlInput');
  if(await inline.isVisible()){
   await inline.fill('new_action');await inline.press('Enter');
  }else{
   await editor.locator('input:visible').last().fill('');
   await editor.locator('input:visible').last().pressSequentially('new_action');
   await editor.getByRole('button',{name:'Update',exact:true}).click();
  }
  await editor.getByRole('button',{name:'OK',exact:true}).click();
  await editor.waitForFunction(()=>window.VexStudio.functions().some(f=>f.signature==='new_action'));
  result.checks.push('native Make a Block creation and automatic discovery');
  await page.waitForTimeout(300);
  assert.equal(errors.length,0,errors.join('\n'));
  result.pass=true;
  await page.screenshot({path:'artifacts/compat-'+profile.name.replaceAll(' ','-')+'.png'});
 }catch(error){result.pass=false;result.error=error.message;result.runtimeErrors=errors;if(page){await page.screenshot({path:'artifacts/compat-failed-'+profile.name.replaceAll(' ','-')+'.png'}).catch(()=>{});result.frames=page.frames().map(f=>f.url());}}
 finally{if(browser)await browser.close();report.push(result);console.log(JSON.stringify(result));}
}
await fs.writeFile('artifacts/compatibility-report.json',JSON.stringify(report,null,2));
if(report.some(r=>!r.pass))process.exitCode=1;
