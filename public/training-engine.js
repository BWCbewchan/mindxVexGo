(function(root){
  'use strict';
  const colorHex=c=>({red:'#df5361',green:'#31965b',blue:'#397fd6'})[c]||c;
  const hueOf=c=>{if(c==='none')return 0;if(({red:1,green:1,blue:1})[c])return ({red:0,green:120,blue:240})[c];const rgb=[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)/255),[r,g,b]=rgb,max=Math.max(...rgb),min=Math.min(...rgb),delta=max-min;if(!delta)return 0;return Math.round(((max===r?(g-b)/delta:max===g?2+(b-r)/delta:4+(r-g)/delta)*60+360)%360);};
  root.createTrainingEngine=function(field){
    const halfW=b=>(b.width||40)/2,halfH=b=>(b.height||40)/2;
    const radius=b=>Math.max(halfW(b),halfH(b));
    const blockedBlock=(b,x,y)=>x<halfW(b)||y<halfH(b)||x>field.width-halfW(b)||y>field.height-halfH(b)||field.walls.some(w=>x+halfW(b)>w.x&&x-halfW(b)<w.x+w.width&&y+halfH(b)>w.y&&y-halfH(b)<w.y+w.height)||state.blocks.some(o=>o.id!==b.id&&Math.abs(x-o.x)<halfW(b)+halfW(o)&&Math.abs(y-o.y)<halfH(b)+halfH(o));
    const robotRadius=()=>Number.isFinite(field.robot?.radius)?Math.max(10,Math.min(1000,field.robot.radius)):45;
    let motion=null,headingOffset=0,motionTimeout=0;
    const state={x:0,y:0,heading:90,distance:0,rotation:0,collision:false,goal:false};
    const finite=(n)=>{if(!Number.isFinite(Number(n)))throw new Error('Motion requires a finite number.');return Number(n);};
    const hit=(x,y)=>x<robotRadius()||y<robotRadius()||x>field.width-robotRadius()||y>field.height-robotRadius()||field.walls.some(w=>Math.hypot(x-Math.max(w.x,Math.min(x,w.x+w.width)),y-Math.max(w.y,Math.min(y,w.y+w.height)))<robotRadius());
    const cargoBlocked=(x,y,heading)=>{
      if(!state.carrying)return false;
      const b=state.blocks.find(b=>b.id===state.carrying),offset=robotRadius()+radius(b);const cx=x+Math.sin(heading*Math.PI/180)*offset,cy=y-Math.cos(heading*Math.PI/180)*offset;
      return blockedBlock(b,cx,cy);
    };
    const finish=()=>{const done=motion?.done;motion=null;done?.();};
    const front=(offset=robotRadius()+20)=>({x:state.x+Math.sin(state.heading*Math.PI/180)*offset,y:state.y-Math.cos(state.heading*Math.PI/180)*offset});
    const update=()=>{
      state.driveHeading=((state.heading+headingOffset)%360+360)%360;
      const carryingBlock=state.blocks.find(b=>b.id===state.carrying);const mount=front(carryingBlock?robotRadius()+radius(carryingBlock):robotRadius()+20);
      const carried=state.blocks.find(b=>b.id===state.carrying);
      if(carried)Object.assign(carried,mount);
      if(state.magnet&&!carried){
        const block=state.blocks.find(b=>!b.pushable&&Math.hypot(b.x-mount.x,b.y-mount.y)<=35.00001&&mount.x>=20&&mount.y>=20&&mount.x<=field.width-20&&mount.y<=field.height-20&&!field.walls.some(w=>mount.x+20>w.x&&mount.x-20<w.x+w.width&&mount.y+20>w.y&&mount.y-20<w.y+w.height));
        if(block){state.carrying=block.id;Object.assign(block,mount);}
      }
      state.delivered=state.blocks.filter(b=>b.id!==state.carrying&&(field.zones||[]).some(z=>colorHex(z.color)===colorHex(b.color)&&Math.hypot(b.x-z.x,b.y-z.y)+radius(b)<=z.radius)).length;
      const checkpoint=(field.checkpoints||[])[state.checkpointIndex];
      if(checkpoint&&Math.hypot(state.x-checkpoint.x,state.y-checkpoint.y)<=checkpoint.radius)state.checkpointIndex++;
      const navigated=Math.hypot(state.x-field.goal.x,state.y-field.goal.y)<=field.goal.radius&&(!field.requireBumper||state.bumperHits>0);
      state.goal=state.checkpointIndex===(field.checkpoints||[]).length&&(field.objective==='draw'?navigated&&state.penDistance>=(field.drawDistance||0):field.objective==='navigate'?navigated:state.blocks.length>0?state.delivered===state.blocks.length:navigated);
      const origin=front(robotRadius()),angle=state.heading*Math.PI/180,dx=Math.sin(angle),dy=-Math.cos(angle);
      const range=state.eyeRange==='near'?150:400;
      let distance=range,color='none',found=false;
      for(let d=0;d<=range;d+=2){
        const x=origin.x+dx*d,y=origin.y+dy*d;
        const block=state.blocks.find(b=>b.id!==state.carrying&&Math.abs(x-b.x)<=halfW(b)&&Math.abs(y-b.y)<=halfH(b));
        if(block||x<0||y<0||x>field.width||y>field.height||field.walls.some(w=>x>=w.x&&x<=w.x+w.width&&y>=w.y&&y<=w.y+w.height)){
          distance=d;color=block?.color||'none';found=true;break;
        }
      }
      const hue=hueOf(color);const sensedColor=color.startsWith('#')?(hue<60||hue>=300?'red':hue<180?'green':'blue'):color;
      state.eye={distance,found,color:sensedColor,hue,brightness:found?Math.round(20+state.eyeLight*0.8):0};
    };
    const api={state,
      get moving(){return !!motion;},
      reset(next=field){finish();field=next;headingOffset=0;motionTimeout=0;Object.assign(state,{x:field.start.x,y:field.start.y,heading:field.start.heading,distance:0,rotation:0,collision:false,goal:false,checkpointIndex:0,blocks:(field.blocks||[]).map(b=>({...b})),carrying:null,magnet:false,delivered:0,bumperHits:0,eyeRange:'far',eyeLight:100,timedOut:false,penDown:false,penColor:'#3b69b1',penWidth:4,penDistance:0,strokes:[]});update();},
      stop:finish,
      setHeading(value){headingOffset=finite(value)-state.heading;update();},
      setRotation(value){state.rotation=finite(value);},
      timeout(seconds){motionTimeout=Math.max(0,finite(seconds));},
      velocity(kind,speed){speed=finite(speed);if(speed<0)throw Error('Velocity cannot be negative.');if(motion?.kind===kind)motion.speed=speed;},
      pen(action,value){if(action==='down'||action==='up')state.penDown=action==='down';else if(action==='clear'){state.strokes=[];state.penDistance=0;update();}else if(action==='color'){if(!/^#[0-9a-f]{6}$/i.test(value))throw Error('Invalid pen color.');state.penColor=value;}else if(action==='width')state.penWidth=Math.max(1,Math.min(25,finite(value)));},
      magnet(action){state.magnet=action==='boost';if(!state.magnet)state.carrying=null;update();},
      sensorSetting(kind,value){if(kind==='range')state.eyeRange=value==='near'?'near':'far';else state.eyeLight=Math.max(0,Math.min(100,finite(value)));update();},
      read(kind){return ({bumper:state.collision,eye_distance:state.eye.distance,eye_found_object:state.eye.found,eye_hue:state.eye.hue,eye_brightness:state.eye.brightness,eye_color:state.eye.color})[kind];},
      commandUntil(direction,obstacle,speed,done){
        api.command('drive',direction*1000000000,speed,done);
        motion.until=obstacle==='object'?'object':'crash';
      },
      command(kind,amount,speed,done){
        amount=amount===null?null:finite(amount);speed=finite(speed);
        if(speed<0)throw new Error('Velocity cannot be negative.');
        if(!['drive','turn'].includes(kind))throw Error('Unknown motion kind.');
        finish();
        state.timedOut=false;motion={kind,left:amount===null?Infinity:Math.abs(amount),sign:amount===null?1:Math.sign(amount),speed,done,timeout:motionTimeout||Infinity};
        if(amount===0)finish();
      },
      tick(dt){
        const duration=Number.isFinite(dt)?Math.min(Math.max(dt,0),.05):0;
        const count=Math.min(1000,Math.max(1,Math.ceil((motion?.speed||0)*duration/5)));
        for(let i=0;i<count&&motion;i++)api.advance(duration/count);
      },
      advance(dt){
        if(!motion)return;
        if(motion.until==='object'&&state.eye.found){finish();return;}
        dt=Math.min(Math.max(dt,0),0.05);
        dt=Math.min(dt,motion.timeout);motion.timeout-=dt;
        const step=Math.min(motion.left,motion.speed*dt),delta=step*motion.sign;
        if(motion.kind==='drive'){
          const angle=state.heading*Math.PI/180;
          const x=state.x+Math.sin(angle)*delta,y=state.y-Math.cos(angle)*delta;
          const contacts=state.blocks.filter(b=>b.id!==state.carrying&&((b.width??40)===40&&(b.height??40)===40?Math.hypot(x-b.x,y-b.y)<robotRadius()+19.999:Math.hypot(Math.max(0,Math.abs(x-b.x)-halfW(b)),Math.max(0,Math.abs(y-b.y)-halfH(b)))<robotRadius()-.001));
          let pushed=null;
          if(contacts.length===1&&contacts[0].pushable){
            const b=contacts[0],dx=x-state.x,dy=y-state.y,len=Math.hypot(dx,dy);
            const lateral=len?Math.abs((b.x-state.x)*dy-(b.y-state.y)*dx)/len:Infinity;
            const nx=b.x+dx,ny=b.y+dy;
            if(lateral<=radius(b)&&(b.x-state.x)*dx+(b.y-state.y)*dy>0&&!blockedBlock(b,nx,ny))pushed={block:b,x:nx,y:ny};
          }
          if(hit(x,y)||cargoBlocked(x,y,state.heading)||(contacts.length&&!pushed)){
            if(!state.collision)state.bumperHits++;
            state.collision=true;finish();update();return;
          }
          if(pushed){pushed.block.x=pushed.x;pushed.block.y=pushed.y;}
          if(state.penDown&&step>0){state.penDistance+=step;const last=state.strokes.at(-1),dx=x-state.x,dy=y-state.y;if(last&&last.color===state.penColor&&last.width===state.penWidth&&Math.hypot(last.x2-state.x,last.y2-state.y)<.001&&Math.abs((last.x2-last.x1)*dy-(last.y2-last.y1)*dx)<.001&&(last.x2-last.x1)*dx+(last.y2-last.y1)*dy>0){last.x2=x;last.y2=y;}else state.strokes.push({x1:state.x,y1:state.y,x2:x,y2:y,color:state.penColor,width:state.penWidth});if(state.strokes.length>12000)state.strokes.shift();}
          state.collision=false;state.x=x;state.y=y;state.distance+=step;
        }else{
          if(cargoBlocked(state.x,state.y,state.heading+delta)){if(!state.collision)state.bumperHits++;state.collision=true;finish();update();return;}
          state.heading+=delta;state.rotation+=delta;state.collision=false;
        }
        motion.left-=step;
        update();
        if(motion.left<=0.00001)finish();else if(motion.timeout<=1e-9){state.timedOut=true;finish();}
      }
    };
    api.reset();return api;
  };
})(globalThis);
