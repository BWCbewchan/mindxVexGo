import fs from 'node:fs/promises';import vm from 'node:vm';import assert from 'node:assert/strict';
const context={};vm.runInNewContext(await fs.readFile('public/training-engine.js','utf8'),context);
const f={width:1200,height:1000,start:{x:200,y:500,heading:90},goal:{x:1000,y:800,radius:70},walls:[],blocks:[{id:'box',x:400,y:500,color:'red',pushable:true}],zones:[{x:900,y:500,radius:85,color:'red'}]};
const e=context.createTrainingEngine(f);const drive=n=>{e.command('drive',n,250);for(let i=0;i<1000&&e.moving;i++)e.tick(.02);};
e.magnet('boost');drive(100);assert.equal(e.state.carrying,null);drive(535);assert.equal(e.state.goal,true);assert.ok(e.state.blocks[0].x>850);e.reset();assert.equal(e.state.blocks[0].x,400);assert.equal(e.state.goal,false);
e.reset({...f,walls:[{x:700,y:400,width:100,height:200}]});drive(900);assert.equal(e.state.collision,true);assert.ok(e.state.blocks[0].x+20<=700);drive(-100);assert.equal(e.state.collision,false);
e.reset({...f,blocks:[...f.blocks,{id:'second',x:600,y:500,color:'blue'}]});drive(800);assert.equal(e.state.collision,true);assert.ok(e.state.blocks[0].x+40<=600);assert.equal(e.state.blocks[1].x,600);
e.reset({...f,blocks:[{...f.blocks[0],pushable:false}]});drive(800);assert.equal(e.state.blocks[0].x,400);assert.equal(e.state.collision,true);
console.log('PASS: push-only ignores magnet; delivery/reset; wall and block contact prevent penetration; reversing releases contact; magnetic cargo retains original behavior.');
