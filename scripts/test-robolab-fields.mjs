import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage();const errors=[],failed=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`);});
 await page.goto('http://localhost:3131/robolab/gears/index.html?mission=FLL2025');
 await page.waitForFunction(()=>window.babylon?.world?.options?.imageURL==='textures/maps/FLL/FLL2025.jpg'&&window.robot?.body&&window.blockly?.workspace,null,{timeout:90000});
 const results=await page.evaluate(async()=>{
  const catalog=await fetch('../competitions.json').then(r=>r.json()),results=[];
  for(const entry of catalog){
   const data=await fetch(entry.url).then(r=>r.json());
   babylon.world=worlds.find(item=>item.name===data.worldName);
   simPanel.worldOptionsSetting=data.options;
   await simPanel.resetSim();
   main.tabClicked('navSim');
   await new Promise(resolve=>setTimeout(resolve,100));
   const rgb=robot.getComponentByPort('in1').getRGB();
   results.push({id:entry.id,meshes:babylon.scene.meshes.length,image:babylon.world.options.imageURL===entry.image,rgb});
  }
  return results;
 });
 assert.equal(results.length,38);
 for(const row of results){assert(row.meshes>10,JSON.stringify(row));assert(row.image,JSON.stringify(row));assert(row.rgb.every(Number.isFinite),JSON.stringify(row));}
 console.log(JSON.stringify({fields:results.length,errors,failed}));assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 console.log('PASS all 38 fields render with robot and finite color-sensor readings.');
}finally{await browser.close();}
