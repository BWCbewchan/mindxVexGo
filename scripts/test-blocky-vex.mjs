import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
// RoboCode shows the VEXcode command set, switches between VEX GO and VEX IQ wording, and runs a VEXcode program.
const base='http://localhost:3131/blocky/index.html',errors=[];
const b=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 await fs.mkdir('artifacts/blocky',{recursive:true});
 const p=await b.newPage({viewport:{width:1440,height:900}});p.setDefaultTimeout(240000);
 p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{try{localStorage.setItem('robocode.vexKit','go')}catch{}});
 await p.goto(base,{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>document.querySelectorAll('canvas').length>0&&!document.querySelector('.app-loading'),null,{polling:2000});
 const cats=()=>p.$$eval('.blocklyToolboxCategory, .scratchCategoryMenuItem',els=>els.map(e=>e.textContent.trim()).filter(Boolean));
 const flyout=()=>p.$$eval('.blocklyFlyout',els=>els.map(e=>e.textContent.replace(/[\s ]+/g,' ').trim()));
 const go=await cats();console.log('GO categories',JSON.stringify(go));
 for(const c of ['Events','Drivetrain','Sensing','Control','Operators'])assert(go.includes(c),'missing category '+c);
 const goWords=(await flyout()).join(' ');
 assert(/turn to heading/.test(goWords)&&/drive heading in degrees/.test(goWords),'GO commands in flyout');
 await p.screenshot({path:'artifacts/blocky/vex-go.png'});
 await p.getByRole('combobox',{name:'Bộ lệnh VEXcode'}).selectOption('iq');
 await p.waitForTimeout(800);
 const iqWords=(await flyout()).join(' ');
 assert(/Gyro heading in degrees/.test(iqWords),'IQ gyro block');assert(!/drive heading in degrees/.test(iqWords),'GO-only block hidden in IQ');
 console.log('IQ has Optical:',/Optical/.test(iqWords),'Distance:',/Distance object distance/.test(iqWords));
 await p.screenshot({path:'artifacts/blocky/vex-iq.png'});
 // Load a VEXcode program through RoboCode's own draft storage, then Run it.
 const n=v=>({shadow:{type:'math_number',fields:{NUM:v}}});
 const program={blocks:{languageVersion:0,blocks:[{type:'robot_when_started',x:420,y:80,next:{block:{type:'vex_set_drive_heading',inputs:{HEADING:n(0)},next:{block:{type:'vex_drive_for',fields:{DIRECTION:'FORWARD',UNIT:'MM'},inputs:{DISTANCE:n(300)},next:{block:{type:'vex_turn_to_heading',inputs:{HEADING:n(90)},next:{block:{type:'vex_repeat',inputs:{TIMES:n(2),DO:{block:{type:'vex_turn_for',fields:{DIRECTION:'LEFT'},inputs:{DEGREES:n(45)}}}},next:{block:{type:'vex_wait',inputs:{SECONDS:n(0.5)}}}}}}}}}}}}]}};
 const key=await p.evaluate(()=>Object.keys(localStorage).find(k=>k.endsWith('robocode.workspace.draft'))||'robocode.workspace.draft');
 await p.evaluate(([k,v])=>localStorage.setItem(k,v),[key,JSON.stringify(program)]);
 await p.reload({waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>document.querySelectorAll('canvas').length>0&&!document.querySelector('.app-loading'),null,{polling:2000});
 await p.waitForTimeout(1500);
 const top=await p.$$eval('.blocklyWorkspace > .blocklyBlockCanvas > .blocklyDraggable',els=>els.map(e=>e.textContent.replace(/[\s ]+/g,' ').trim()));
 console.log('workspace',JSON.stringify(top));
 assert(top.some(t=>/when started/.test(t)&&/turn to heading/.test(t)&&/repeat/.test(t)&&/turnleftfordegrees/.test(t.replace(/ /g,''))),'VEXcode program loaded');
 const states=[];
 await p.exposeFunction('reportState',s=>states.push(s));
 await p.getByRole('button',{name:/Run/}).first().click();
 for(let i=0;i<40;i++){await p.waitForTimeout(500);const s=await p.evaluate(()=>document.body.innerText.match(/(Hoàn thành|hoàn tất|xong|Đang chạy|lỗi|Lỗi|stopped|complete)[^\n]{0,80}/i)?.[0]||'');if(!states.includes(s))states.push(s);if(/Hoàn thành|hoàn tất|xong|complete/i.test(s))break;}
 console.log('status',JSON.stringify(states));
 assert(!states.some(s=>/lỗi/i.test(s)),'program ran without a runtime error');
 await p.screenshot({path:'artifacts/blocky/vex-run.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS RoboCode VEXcode GO/IQ command set');
}finally{await b.close();}
