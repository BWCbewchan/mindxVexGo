import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const context={};vm.runInNewContext(await fs.readFile('public/training-engine.js','utf8'),context);
const lessons=JSON.parse(await fs.readFile('app/training/missions.json','utf8'));
const field=lessons.find(l=>l.id==='cargo-1').field;
const engine=context.createTrainingEngine(field);
function move(kind,amount){engine.command(kind,amount,250);for(let i=0;i<2000&&engine.moving;i++)engine.tick(.02);}
assert.equal(engine.read('eye_found_object'),true);
assert.equal(engine.read('eye_color'),'red');
assert.ok(Math.abs(engine.read('eye_distance')-135)<=2);
engine.sensorSetting('range','near');assert.equal(engine.read('eye_found_object'),true);
engine.sensorSetting('light',0);assert.equal(engine.read('eye_brightness'),20);
engine.magnet('boost');assert.equal(engine.state.carrying,null,'cannot pick up distant cargo');
move('drive',100);assert.equal(engine.state.carrying,'box-0');
move('drive',600);assert.equal(engine.state.goal,false,'carried cargo cannot score');
engine.magnet('drop');assert.equal(engine.state.delivered,1);assert.equal(engine.state.goal,true);
engine.reset();assert.equal(engine.state.blocks[0].x,400);assert.equal(engine.state.carrying,null);assert.equal(engine.state.goal,false);
engine.magnet('boost');move('drive',100);move('drive',150);engine.magnet('drop');assert.equal(engine.state.delivered,0,'drop outside zone does not score');
engine.reset({...field,zones:[{x:1000,y:300,radius:90,color:'blue'}]});
engine.magnet('boost');move('drive',700);engine.magnet('drop');assert.equal(engine.state.delivered,0,'wrong color does not score');
engine.reset({...field,walls:[{x:310,y:200,width:30,height:200}]});
assert.equal(engine.read('eye_color'),'none','wall occludes red cargo');assert.ok(engine.read('eye_distance')<70);
move('drive',1000);assert.equal(engine.read('bumper'),true);assert.equal(engine.moving,false);
move('drive',-100);assert.equal(engine.read('bumper'),false);assert.ok(engine.state.x<200);
engine.reset({...field,blocks:[],walls:[]});engine.sensorSetting('range','near');assert.equal(engine.read('eye_found_object'),false);assert.equal(engine.read('eye_distance'),150);
engine.reset({...field,walls:[{x:500,y:200,width:50,height:200}]});engine.magnet('boost');move('drive',600);
assert.equal(engine.read('bumper'),true);assert.ok(engine.state.blocks[0].x+20<=500,'held cargo cannot cross a wall');
engine.reset({...field,blocks:[],walls:[{x:800,y:200,width:50,height:200}]});
let done=false;engine.commandUntil(1,'object',250,()=>{done=true;});for(let i=0;i<1000&&engine.moving;i++)engine.tick(.02);
assert.equal(done,true);assert.equal(engine.state.collision,false);assert.ok(engine.state.x>=355&&engine.state.x<=360,'drive-until-object stops at eye range');
engine.commandUntil(1,'crash',250);for(let i=0;i<1000&&engine.moving;i++)engine.tick(.02);assert.equal(engine.state.collision,true);
for(const {field:f,id} of lessons.filter(l=>l.id.startsWith('cargo-'))){
  assert.ok(f.blocks.every(b=>f.zones.some(z=>z.color===b.color)),id+' has matching delivery zones');
  assert.ok(f.blocks.every(b=>!f.walls.some(w=>b.x+20>w.x&&b.x-20<w.x+w.width&&b.y+20>w.y&&b.y-20<w.y+w.height)),id+' cargo is clear of walls');
}
console.log('PASS: eye distance/range/color/occlusion/light; pickup range, carry, correct/wrong/outside-zone delivery, reset; bumper contact and reverse; carried cargo wall collision; 8 cargo mission layouts.');
