import {chromium,devices} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const base=process.env.TEST_BASE_URL||'http://localhost:3102';
const fixture=JSON.parse(await fs.readFile('scripts/fixtures/controls.goblocks','utf8'));
fixture.workspace=fixture.workspace
 .replace('proccode="drive forward"','proccode="set values %n %b %s"')
 .replace('argumentids="[]"','argumentids="[&quot;num-id&quot;,&quot;bool-id&quot;,&quot;text-id&quot;]"')
 .replace('argumentnames="[]"','argumentnames="[&quot;amount&quot;,&quot;enabled&quot;,&quot;label&quot;]"')
 .replace('argumentdefaults="[]"','argumentdefaults="[0,false,&quot;&quot;]"')
 .replace('argumenttypes="[]"','argumenttypes="[&quot;n&quot;,&quot;b&quot;,&quot;s&quot;]"');
const browser=await chromium.launch({channel:'chrome',headless:true});
// An unused invalid hardware function must not prevent this pure function compiling.
fixture.workspace=fixture.workspace.replace('</xml>', '<block type="procedures_definition" x="400" y="200"><statement name="custom_block"><shadow type="procedures_prototype"><mutation proccode="unused drive" argumentids="[]" argumentnames="[]" argumentdefaults="[]" warp="false"></mutation></shadow></statement><next><block type="go_drivetrain_drive"><field name="DIRECTION">fwd</field></block></next></block></xml>');
try{
 const page=await browser.newPage(process.argv.includes('--android')?devices['Pixel 7']:{});
 await page.goto(base+'/studio');
 await page.getByRole('button',{name:'Continue to editor'}).click();
 const editor=await page.locator('iframe').elementHandle().then(e=>e.contentFrame());
 await editor.getByRole('button',{name:'File',exact:true}).click();
 const chooser=page.waitForEvent('filechooser');
 await editor.getByText('Load From Your Device',{exact:true}).click();
 await(await chooser).setFiles({name:'parameters.goblocks',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(fixture))});
 await editor.waitForFunction(()=>window.VexStudio?.functions().some(f=>f.signature==='set values %n %b %s'));
 const functions=await editor.evaluate(()=>window.VexStudio.functions());
 assert.deepEqual(functions[0].args.map(a=>a.type),['number','boolean','text']);
 const label='quote " and newline\ntext \\ end';
 for(const enabled of [true,false]){
  const code=await editor.evaluate(args=>window.VexStudio.compileFunction('set values %n %b %s',args),[12,enabled,label]);
  new vm.Script(code); // Real JavaScript syntax validation, including escaped input.
  assert.ok(code.includes(`(12, ${enabled}, ${JSON.stringify(label)})`));
  assert.ok(!code.includes('START_SENTINEL'));
  // Execute the pure print-only fixture. No hardware connection is simulated.
  const calls=[];
  vm.runInNewContext(code.slice(code.lastIndexOf('var console_precision = 0;')),{
   print:value=>calls.push(value),wait(){},waitForConfigReady(){},vexcodeSystemInit:{runInit(){}},
  },{timeout:1000});
  assert.deepEqual(calls,['CONTROL_BODY'],'one button invocation must execute the body once');
 }
 await assert.rejects(editor.evaluate(()=>window.VexStudio.compileFunction('set values %n %b %s',['invalid'])),/valid number/);
 await assert.rejects(editor.evaluate(()=>window.VexStudio.runFunction('set values %n %b %s',[])),/Enable controls first/);
 await page.evaluate(()=>document.querySelector('iframe').contentWindow.postMessage({type:'vex-controller',id:999,action:'enable',enabled:true},location.origin));
 await assert.rejects(editor.evaluate(()=>window.VexStudio.runFunction('set values %n %b %s',[])),/Connect a VEX GO Brain/);
 assert.deepEqual(await editor.evaluate(()=>window.VexStudio.functions()),functions);
 await assert.rejects(editor.evaluate(()=>window.VexStudio.compileFunction('unused drive',[])),/drivetrain configured/);
 await editor.getByRole('button',{name:'⌨ Controls',exact:true}).click();
 await page.getByRole('button',{name:'+ Add control',exact:true}).click();
 await page.getByRole('combobox',{name:'Function 1',exact:true}).selectOption('set values %n %b %s');
 await page.getByRole('button',{name:'Check code',exact:true}).click();
 await page.getByText(/Code compiled successfully:/).first().waitFor();
 console.log('PASS: numeric/boolean/text arguments, quote escaping, single execution, no normal start stack, validation, disabled/disconnected guards, function definitions preserved.');
}finally{await browser.close();}
