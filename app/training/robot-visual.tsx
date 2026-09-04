'use client';
import RobotIcon from './robot-icon';
import { memo, useEffect, useRef, type RefObject } from 'react';

type Pose={x:number;y:number;heading:number};
function RobotVisual({frame,x,y,heading}:{frame:RefObject<HTMLIFrameElement|null>;x:number;y:number;heading:number}){
  const robot=useRef<SVGGElement>(null);
  const body=useRef<SVGCircleElement>(null);
  const trail=useRef<SVGPolylineElement>(null);
  const cargo=useRef<SVGRectElement>(null);
  useEffect(()=>{
    let current:Pose={x,y,heading},from=current,target=current;
    let arrived=performance.now(),revision=-1,animation=0;
    let points:number[][]=[[x,y]],previous=[x,y];
    const receive=(event:MessageEvent)=>{
      if(event.origin!==location.origin||(event.source!==frame.current?.contentWindow&&event.source!==window)||event.data?.type!=='training-pose')return;
      const p=event.data;if(![p.x,p.y,p.heading].every(Number.isFinite))return;
      const now=performance.now();
      const reset=p.revision!==revision;
      target={x:p.x,y:p.y,heading:p.heading};
      if(reset||now-arrived>250)current=target;
      if(reset){points=[[p.x,p.y]];previous=[p.x,p.y];trail.current?.setAttribute('points',`${p.x},${p.y}`);}
      from=current;arrived=now;revision=p.revision;
      body.current?.setAttribute('stroke',p.collision?'#e65949':'transparent');
      cargo.current?.setAttribute('visibility',p.carrying?'visible':'hidden');
      cargo.current?.setAttribute('fill',({red:'#df5361',green:'#31965b',blue:'#397fd6'} as Record<string,string>)[p.carrying]||'#df5361');
    };
    const draw=(now:number)=>{
      const t=Math.min(1,Math.max(0,(now-arrived)/34));
      current={x:from.x+(target.x-from.x)*t,y:from.y+(target.y-from.y)*t,heading:from.heading+(target.heading-from.heading)*t};
      robot.current?.setAttribute('transform',`translate(${current.x} ${current.y}) rotate(${current.heading})`);
      if(Math.hypot(current.x-previous[0],current.y-previous[1])>3){
        previous=[current.x,current.y];points.push(previous);if(points.length>1500)points.shift();
        trail.current?.setAttribute('points',points.map(p=>p.join(',')).join(' '));
      }
      animation=requestAnimationFrame(draw);
    };
    window.addEventListener('message',receive);animation=requestAnimationFrame(draw);
    return()=>{window.removeEventListener('message',receive);cancelAnimationFrame(animation);};
  },[frame,x,y,heading]);
  return <><polyline ref={trail} fill="none" stroke="#de9b36" strokeWidth="5" strokeLinejoin="round"/><g ref={robot} data-testid="virtual-robot" transform={`translate(${x} ${y}) rotate(${heading})`}><path d="M0 -45V-105" stroke="#4cbfe6" strokeWidth="4" strokeDasharray="6 5"/><rect ref={cargo} visibility="hidden" x="-20" y="-85" width="40" height="40" rx="4" stroke="white" strokeWidth="3"/><circle ref={body} r="48" fill="none" stroke="transparent" strokeWidth="4"/><RobotIcon/></g></>;
}
export default memo(RobotVisual);
