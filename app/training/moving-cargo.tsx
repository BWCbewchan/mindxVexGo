'use client';
import CargoShape from './cargo-shape';
import {fieldColor} from './field-model';

import {memo,useEffect,useRef,type RefObject} from 'react';
import type {Field} from './field-model';
function MovingCargo({frame,blocks}:{frame:RefObject<HTMLIFrameElement|null>;blocks:Field['blocks']}){
 const nodes=useRef(new Map<string,SVGGElement>());
 useEffect(()=>{
  type Position={x:number;y:number};
  let current=new Map<string,Position>((blocks||[]).map(b=>[b.id,{x:b.x,y:b.y}]));let from=new Map(current),target=new Map(current),arrived=performance.now(),revision=-1,animation=0;
  const receive=(event:MessageEvent)=>{
   if(event.origin!==location.origin||(event.source!==frame.current?.contentWindow&&event.source!==window)||event.data?.type!=='training-pose'||!Array.isArray(event.data.blocks))return;
   const data=event.data,now=performance.now();
   target=new Map(data.blocks.filter((b:{id:string;x:number;y:number})=>typeof b.id==='string'&&Number.isFinite(b.x)&&Number.isFinite(b.y)).map((b:{id:string;x:number;y:number})=>[b.id,{x:b.x,y:b.y}]));
   if(data.revision!==revision||now-arrived>250)current=new Map(target);
   from=new Map(current);arrived=now;revision=data.revision;
   nodes.current.forEach((node,id)=>node.setAttribute('visibility',id===data.carryingId?'hidden':'visible'));
  };
  const draw=(now:number)=>{const t=Math.min(1,Math.max(0,(now-arrived)/34));target.forEach((p,id)=>{const old=from.get(id)||p;const next={x:old.x+(p.x-old.x)*t,y:old.y+(p.y-old.y)*t};current.set(id,next);nodes.current.get(id)?.setAttribute('transform',`translate(${next.x} ${next.y})`);});animation=requestAnimationFrame(draw);};
  window.addEventListener('message',receive);animation=requestAnimationFrame(draw);return()=>{window.removeEventListener('message',receive);cancelAnimationFrame(animation);};
 },[frame,blocks]);
 return <>{blocks?.map(b=><g key={b.id} ref={node=>{if(node)nodes.current.set(b.id,node);else nodes.current.delete(b.id);}} transform={`translate(${b.x} ${b.y})`}><CargoShape color={b.color} shape={b.shape} width={b.width} height={b.height}/>{b.pushable&&<text y="8" textAnchor="middle" fontSize="24" fill="white">→</text>}</g>)}</>;
}
export default memo(MovingCargo);
