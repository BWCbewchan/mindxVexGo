import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context={};vm.runInNewContext(await fs.readFile('public/training-engine.js','utf8'),context);
const catalog=JSON.parse(await fs.readFile('app/training/missions.json','utf8'));
const pushRoutes=JSON.parse(await fs.readFile('scripts/push-routes.json','utf8'));
const fixture=JSON.parse(await fs.readFile('scripts/fixtures/controls.goblocks','utf8'));
await fs.mkdir('public/training-resources',{recursive:true});
const solutions={};
for(const lesson of catalog){
 if(!pushRoutes[lesson.id]&&!lesson.id.startsWith('thinking-')&&(lesson.field.blocks?.length||lesson.field.requireBumper||lesson.id.startsWith('sensor-')))continue;
 const e=context.createTrainingEngine(lesson.field),commands=[];
 function motion(kind,amount){amount=Number(amount.toFixed(5));if(Math.abs(amount)<.00001)return;commands.push({kind,amount});e.command(kind,amount,kind==='drive'?250:180);for(let i=0;i<20000&&e.moving;i++)e.tick(.02);assert.equal(e.state.collision,false,lesson.id+' collision at '+JSON.stringify(e.state));}
 function go(x,y){const dx=x-e.state.x,dy=y-e.state.y;if(Math.hypot(dx,dy)<.01)return;const heading=Math.atan2(dx,-dy)*180/Math.PI;motion('turn',((heading-e.state.heading+540)%360+360)%360-180);motion('drive',Math.hypot(dx,dy));}
 function magnet(action){commands.push({kind:'magnet',action});e.magnet(action);}
 if(pushRoutes[lesson.id]){for(const [x,y] of pushRoutes[lesson.id])go(x,y);}
 else if(lesson.id.startsWith('thinking-')){
  const f=lesson.field;if(f.blocks?.length)go(200,1200);
  for(const c of f.checkpoints)go(c.x,c.y);
  if(!f.blocks?.length)go(f.goal.x,f.goal.y);
  else{
   go(200,e.state.y);
   for(const [i,b] of f.blocks.entries()){
    go(200,b.y);go(b.x-100,b.y);motion('turn',90-e.state.heading);motion('drive',35);magnet('boost');
    const z=f.zones.find(z=>z.color===b.color),y=lesson.id==='thinking-26'?z.y+(i===0?-60:60):z.y;
    go(1050,b.y);go(1050,y);motion('turn',90-e.state.heading);motion('drive',z.x-65-1050);magnet('drop');go(1050,y);go(1050,1200);go(200,1200);
   }
  }
 }else{
  const f=lesson.field,step=25;
  const hit=(x,y)=>x<45||y<45||x>f.width-45||y>f.height-45||f.walls.some(w=>Math.hypot(x-Math.max(w.x,Math.min(x,w.x+w.width)),y-Math.max(w.y,Math.min(y,w.y+w.height)))<46);
  const start=[Math.round(f.start.x/step)*step,Math.round(f.start.y/step)*step];
  const queue=[start],parents=new Map([[start.join(','),null]]);let goal;
  for(let i=0;i<queue.length;i++){
   const [x,y]=queue[i];if(Math.hypot(x-f.goal.x,y-f.goal.y)<=f.goal.radius-5){goal=queue[i];break;}
   for(const [dx,dy] of [[step,0],[0,step],[-step,0],[0,-step]]){const next=[x+dx,y+dy],key=next.join(',');if(!parents.has(key)&&!hit(...next)&&!hit(x+dx/2,y+dy/2)){parents.set(key,queue[i]);queue.push(next);}}
  }
  assert.ok(goal,lesson.id+' has route');const route=[];for(let at=goal;at;at=parents.get(at.join(',')))route.unshift(at);
  const corners=route.filter((p,i)=>i===0||i===route.length-1||(p[0]-route[i-1][0])*(route[i+1][1]-p[1])!==(p[1]-route[i-1][1])*(route[i+1][0]-p[0]));for(const p of corners)go(...p);
 }
 assert.equal(e.state.goal,true,lesson.id+' solution did not finish');
 const number=(key,n)=>`<value name="${key}"><shadow type="math_number"><field name="NUM">${n}</field></shadow></value>`;
 const block=(type,body,next)=>`<block type="${type}">${body}${next?'<next>'+next+'</next>':''}</block>`;
 let stack='';
 for(const c of [...commands].reverse())stack=c.kind==='magnet'?block('go_magnet_energize',`<field name="MAGNET">Magnet</field><field name="ACTION">${c.action}</field>`,stack):c.kind==='drive'?block('go_drivetrain_drive_for',`<field name="DIRECTION">${c.amount<0?'rev':'fwd'}</field><field name="UNITS">mm</field>`+number('AMOUNT',Math.abs(c.amount)),stack):block('go_drivetrain_turn_for',`<field name="TURNDIRECTION">${c.amount<0?'left':'right'}</field>`+number('AMOUNT',Math.abs(c.amount)),stack);
 stack=block('go_drivetrain_set_drive_velocity',number('VELOCITY',100),block('go_drivetrain_set_turn_velocity',number('VELOCITY',100),stack));
 const workspace='<xml>'+block('go_events_when_started','',stack)+'</xml>';
 const seconds=commands.reduce((sum,c)=>sum+(c.kind==='drive'?Math.abs(c.amount)/250:c.kind==='turn'?Math.abs(c.amount)/180:0),0);
 assert.ok(seconds<280,lesson.id+' solution fits runtime limit');
 const steps=commands.map(c=>c.kind==='magnet'?`Magnet: ${c.action}.`:c.kind==='drive'?`Drive ${c.amount<0?'reverse':'forward'} ${Number(Math.abs(c.amount).toFixed(1))} mm.`:`Turn ${c.amount<0?'left':'right'} ${Number(Math.abs(c.amount).toFixed(1))}°.`);
 solutions[lesson.id]={title:lesson.field.name,steps,seconds:Math.ceil(seconds),project:'/training-resources/'+lesson.id+'.goblocks',field:'/training-resources/'+lesson.id+'.json'};
 await fs.writeFile('public/training-resources/'+lesson.id+'.goblocks',JSON.stringify({...fixture,workspace}));
 await fs.writeFile('public/training-resources/'+lesson.id+'.json',JSON.stringify({version:1,field:lesson.field},null,2));
}
await fs.writeFile('app/training/solutions.json',JSON.stringify(solutions,null,2)+'\n');
console.log('PASS: '+Object.keys(solutions).length+' solutions simulated to completion and exported as Blockly projects + matching fields.');
