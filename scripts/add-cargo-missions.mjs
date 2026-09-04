import fs from 'node:fs/promises';
const path='app/training/missions.json';
const lessons=JSON.parse(await fs.readFile(path,'utf8')).filter(l=>!l.id.startsWith('cargo-')&&!l.id.startsWith('sensor-'));
const colors=['red','green','blue'];
for(let i=0;i<8;i++){
  const count=i<3?1:i<6?2:3;
  const blocks=Array.from({length:count},(_,j)=>({id:'box-'+j,x:400+(i%3)*50,y:300+j*250,color:colors[(i+j)%3]}));
  const zones=blocks.map(b=>({x:1000,y:b.y,radius:90,color:b.color}));
  lessons.push({id:'cargo-'+(i+1),level:(31+i)+' · '+(count===1?'BEGINNER':count===2?'INTERMEDIATE':'CHALLENGE'),description:count===1?'Find the colored cargo with Eye sensing. Use Magnet boost to pick it up, then drop it completely inside the matching delivery zone.':'Sort '+count+' cargo blocks into their matching color zones. Use Eye color detection, loops and My Blocks to automate each delivery.',field:{name:['First cargo delivery','Green cargo pickup','Blue cargo pickup','Two-color warehouse','Red and blue dispatch','Green and blue dispatch','Three-color sorting','Warehouse master'][i],width:1200,height:1200,start:{x:200,y:300,heading:90},goal:{x:950,y:300,radius:70},walls:i>=6?[{x:650,y:150,width:100,height:650}]:[],blocks,zones}});
}
for(let i=0;i<2;i++)lessons.push({id:'sensor-bumper-'+(i+1),level:(39+i)+' · INTERMEDIATE',description:'Drive until Bumper is pressed, reverse away from the wall, then navigate to the green target. Touching an obstacle is required to complete this mission.',field:{name:i?'Bumper corner escape':'Bumper stop and reverse',width:1200,height:1200,start:{x:200,y:400,heading:90},goal:{x:200,y:800,radius:70},walls:[{x:650,y:200,width:100,height:i?650:400}],requireBumper:true}});
for(let i=0;i<2;i++)lessons.push({id:'sensor-eye-'+(i+1),level:(41+i)+' · INTERMEDIATE',description:'Use Eye found object or Eye distance in a wait-until condition to stop before the wall. Turn and reach the green target without contact.',field:{name:i?'Eye narrow approach':'Eye obstacle lookout',width:1200,height:1200,start:{x:200,y:300,heading:90},goal:{x:1000,y:900,radius:70},walls:[{x:700,y:100,width:100,height:i?650:500}]}});
await fs.writeFile(path,JSON.stringify(lessons,null,2)+'\n');
