import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync('app/quiz/coding-model.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const exp={};new Function('exports','require',compiled)(exp,()=>({codeRules:()=>[]}));
const tasks=JSON.parse(fs.readFileSync('public/quiz/tasks.json','utf8'));
const square=tasks.ad8a441fd98c.find(t=>t.profile==='square');
assert.deepEqual(exp.grade(square,{running:false,status:'Program finished',bumperHits:0,checkpointIndex:3,goal:true,distance:1200}),[true,true]);
assert.deepEqual(exp.grade(square,{running:false,status:'Program finished',bumperHits:1,checkpointIndex:0,goal:true,distance:0}),[false,false]);
const b=await chromium.launch({channel:'chrome'});
try{
 const p=await b.newPage({viewport:{width:1440,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',()=>{throw Error('Unexpected native dialog');});
 async function open(id){await p.goto('http://localhost:3117/quiz?lesson='+id);await p.getByRole('button',{name:/^Coding task ·/}).click();const f=await p.locator('.coding-editor iframe').elementHandle().then(e=>e.contentFrame());await f.waitForFunction(()=>!!window.VexTraining&&!!window.VexStudio);await p.getByRole('button',{name:'Submit code',exact:true}).waitFor();await p.waitForFunction(()=>!document.querySelector('.coding-toolbar .quiz-primary').disabled);return f;}
 async function xml(f,body){
 await p.locator('.coding-editor').evaluate(el=>el.scrollIntoView({block:'start'}));
 const fixture=JSON.parse(fs.readFileSync('scripts/fixtures/controls.goblocks','utf8'));
 fixture.workspace='<xml><block type="go_events_when_started" x="30" y="30">'+(body?'<next>'+body+'</next>':'')+'</block></xml>';
 await f.getByRole('button',{name:'File',exact:true}).click();
 const chooser=p.waitForEvent('filechooser');await f.getByText('Load From Your Device',{exact:true}).click();
 const discard=f.getByRole('button',{name:'Discard',exact:true});
 if(await Promise.race([chooser.then(()=>false),discard.waitFor({state:'visible'}).then(()=>true)]))await discard.click({timeout:4000}).catch(async e=>{await p.screenshot({path:'artifacts/quiz/dialog-error.png'});console.log(await discard.boundingBox());throw e;});
 await(await chooser).setFiles({name:'answer.goblocks',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(fixture))});
 await f.getByRole('button',{name:'File',exact:true}).waitFor();
 await p.waitForTimeout(600);
 }
 const drive=n=>`<block type="go_drivetrain_drive_for"><field name="DIRECTION">forward</field><field name="UNITS">mm</field><value name="AMOUNT"><shadow type="math_number"><field name="NUM">${n}</field></shadow></value></block>`;
 async function submit(outcome){await p.getByRole('button',{name:'Submit code',exact:true}).click();await p.locator('.coding-result.'+outcome).waitFor({timeout:15000});}
 let f=await open('ad8a441fd98c');await xml(f,'');await submit('error');
 await xml(f,drive(100));await submit('retry');await xml(f,drive(300));await submit('passed');
 // A second submission must reset the robot; otherwise this ends at x=800 and fails.
 await submit('passed');assert.match(await p.locator('.coding-telemetry').textContent(),/300 mm/);
 await p.getByRole('button',{name:'Hide map',exact:true}).click();assert.ok(await p.locator('#quiz-coding-map').isHidden());await p.getByRole('button',{name:'Show map',exact:true}).click();
 await p.screenshot({path:'artifacts/quiz/coding-desktop.png'});
 await p.getByLabel('Choose a task').selectOption('task-2');await p.waitForFunction(()=>!document.querySelector('.coding-toolbar .quiz-primary').disabled);f=await p.locator('.coding-editor iframe').elementHandle().then(e=>e.contentFrame());await xml(f,'');await submit('error');
 await p.getByLabel('Choose a task').selectOption('task-1');await p.waitForFunction(()=>!document.querySelector('.coding-toolbar .quiz-primary').disabled);await submit('passed');
 f=await open('cac391ef4c9a');await xml(f,'<block type="go_drivetrain_drive"><field name="DIRECTION">forward</field><next><block type="go_control_wait_until"><value name="CONDITION"><block type="go_sensing_eye_found_object"><field name="EYE">Eye</field></block></value><next><block type="go_drivetrain_stop_driving"/></next></block></next></block>');await submit('passed');
 await xml(f,'<block type="go_drivetrain_drive"><field name="DIRECTION">forward</field><next><block type="go_control_forever"><statement name="SUBSTACK"><block type="go_control_if_then"><value name="CONDITION"><block type="go_sensing_eye_found_object"><field name="EYE">Eye</field></block></value><statement name="SUBSTACK"><block type="go_drivetrain_stop_driving"/></statement></block></statement></block></next></block>');await submit('passed');
 f=await open('5b4e2977412b');await xml(f,drive(100));await submit('retry');await p.getByLabel('Test scene').selectOption('red');
 await p.setViewportSize({width:390,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:'artifacts/quiz/coding-mobile.png'});
 assert.deepEqual(errors,[]);console.log('PASS: grading, empty/wrong/correct code, repeat reset, task code isolation, sensor stop, teacher review, map toggle, mobile.');
}finally{await b.close();}


