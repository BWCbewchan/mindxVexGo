import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
// RoboCode lists the /training fields in a "Training mindX" group and opens one as a 3D map.
const base=process.env.BLOCKY_URL||'http://localhost:3131/blocky/index.html',errors=[];
const b=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 await fs.mkdir('artifacts/blocky',{recursive:true});
 const p=await b.newPage({viewport:{width:1440,height:900}});p.setDefaultTimeout(240000);
 p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base,{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>document.querySelectorAll('canvas').length>0&&!document.querySelector('.app-loading'),null,{polling:2000});
 await p.getByRole('button',{name:'Sân chơi & nhiệm vụ'}).click();
 const group=p.locator('.mission-world[data-world="training"]');
 await group.waitFor();
 assert.match(await group.innerText(),/Training mindX[\s\S]*84 sân/);
 await group.click();
 assert.equal((await p.locator('.mission-map-count').innerText()).trim(),'84 sân');
 await p.screenshot({path:'artifacts/blocky/training-library.png'});
 await p.getByRole('button',{name:/Training 02 · Around the corner/}).click();
 await p.getByRole('button',{name:'Vào sân chơi'}).click();
 await p.waitForFunction(()=>!document.querySelector('.mission-library'),null,{polling:500});
 await p.waitForTimeout(2500);
 await p.screenshot({path:'artifacts/blocky/training-map.png'});
 const view3d=p.getByRole('button',{name:/3D/}).first();
 if(await view3d.count()){await view3d.click();await p.waitForTimeout(2500);await p.screenshot({path:'artifacts/blocky/training-3d.png'});}
 assert.deepEqual(errors,[]);
 console.log('PASS RoboCode Training mindX 3D maps');
}finally{await b.close();}
