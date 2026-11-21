import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
// RoboCode draws the two-motor robot as the VEX GO Super Code Base and still drives it.
const base=process.env.BLOCKY_URL||'http://localhost:3131/blocky/index.html',errors=[];
const b=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 await fs.mkdir('artifacts/blocky',{recursive:true});
 const p=await b.newPage({viewport:{width:1440,height:900}});p.setDefaultTimeout(240000);
 p.on('pageerror',e=>errors.push(e.message));
 const model=p.waitForResponse(r=>r.url().endsWith('/robot-models/vex-go-super-code-base.glb'));
 const n=v=>({shadow:{type:'math_number',fields:{NUM:v}}});
 const program={blocks:{languageVersion:0,blocks:[{type:'robot_when_started',x:420,y:80,next:{block:{type:'vex_drive_for',fields:{DIRECTION:'FORWARD',UNIT:'MM'},inputs:{DISTANCE:n(1500)},next:{block:{type:'vex_turn_for',fields:{DIRECTION:'RIGHT'},inputs:{DEGREES:n(90)}}}}}}]}};
 await p.addInitScript(v=>{try{localStorage.setItem('robocode.workspace.draft',v)}catch{}},JSON.stringify(program));
 await p.goto(base,{waitUntil:'domcontentloaded'});
 assert.equal((await model).status(),200,'GO model served');
 await p.waitForFunction(()=>document.querySelectorAll('canvas').length>0&&!document.querySelector('.app-loading'),null,{polling:2000});
 const sim=p.getByRole('button',{name:/Simulator/}).first();
 if((await sim.getAttribute('aria-pressed'))!=='true')await sim.click();
 const view3d=p.getByRole('button',{name:/3D/}).first();
 if(await view3d.count())await view3d.click();
 await p.waitForTimeout(3000);
 await p.screenshot({path:'artifacts/blocky/go-robot.png'});
 await p.screenshot({path:'artifacts/blocky/go-robot-zoom.png',clip:{x:1100,y:260,width:260,height:200}});
 await p.getByRole('button',{name:/Run/}).first().click();
 await p.waitForTimeout(6000);
 await p.screenshot({path:'artifacts/blocky/go-robot-run.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS RoboCode VEX GO Super Code Base body');
}finally{await b.close();}
