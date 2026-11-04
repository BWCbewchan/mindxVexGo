import * as THREE from './vendor/three.module.js';
const pitch=6.35,teethBySku={'228-2500-232':8,'228-2500-233':16,'228-2500-235':24,'228-2500-236':32,'228-2500-237':40};
const source=sku=>String(sku||'').replace(/^(vexgo|vexiq)__/,'');
export const sprocketTeeth=part=>teethBySku[source(part?.sku||part?.id)]||0;
const q=part=>new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));
const radius=part=>pitch/(2*Math.sin(Math.PI/sprocketTeeth(part)));
export function chainSprocketContact(a,b){
 const link=source(a.sku)==='228-2500-230'?a:source(b.sku)==='228-2500-230'?b:null,gear=link===a?b:a;if(!link||!sprocketTeeth(gear))return false;
 const axis=new THREE.Vector3(0,1,0).applyQuaternion(q(gear)),hinge=new THREE.Vector3(1,0,0).applyQuaternion(q(link));if(Math.abs(axis.dot(hinge))<.999)return false;
 const origin=new THREE.Vector3(...link.position),center=new THREE.Vector3(...gear.position),end=new THREE.Vector3(0,-pitch,0).applyQuaternion(q(link)).add(origin),a0=origin.sub(center),a1=end.sub(center);if(Math.max(Math.abs(a0.dot(axis)),Math.abs(a1.dot(axis)))>.35)return false;a0.addScaledVector(axis,-a0.dot(axis));a1.addScaledVector(axis,-a1.dot(axis));const r=radius(gear),lo=Math.min(a0.length(),a1.length()),hi=Math.max(a0.length(),a1.length());// The open clip extends 2.203 mm past its hinge in the supplied CAD.
 return lo>=r-.3&&lo<=r+2.25&&hi<=r+pitch+2.25;
}
export function chainDriveContacts(parts){const links=parts.filter(p=>source(p.sku)==='228-2500-230'),gears=parts.filter(sprocketTeeth),result=[];for(const link of links)for(const gear of gears)if(chainSprocketContact(link,gear))result.push({part:link.id,target:gear.id,sourceRef:'chain-pitch',targetRef:'sprocket-pitch',drive:true,depth:0});return result;}
export function chainDriveGroups(parts){
 const hingeAxis=p=>new THREE.Vector3(1,0,0).applyQuaternion(q(p)),end=p=>new THREE.Vector3(0,-pitch,0).applyQuaternion(q(p)).add(new THREE.Vector3(...p.position)),aligned=(a,b)=>hingeAxis(a).dot(hingeAxis(b))>.999;
 const byId=new Map(parts.map(p=>[p.id,p])),links=parts.filter(p=>source(p.sku)==='228-2500-230'),neighbors=new Map(links.map(p=>[p.id,[]]));for(const p of links){const target=byId.get(p.mate?.target);if(!target||!neighbors.has(target.id))continue;if(!aligned(p,target)||Math.min(end(target).distanceTo(new THREE.Vector3(...p.position)),end(p).distanceTo(new THREE.Vector3(...target.position)))>.25)continue;neighbors.get(p.id).push(target.id);neighbors.get(target.id).push(p.id);}
 const contacts=chainDriveContacts(parts),seen=new Set(),groups=[];for(const p of links){if(seen.has(p.id))continue;const ids=[p.id];seen.add(p.id);for(const id of ids)for(const next of neighbors.get(id))if(!seen.has(next)){seen.add(next);ids.push(next);}const idSet=new Set(ids),gears=[...new Set(contacts.filter(c=>idSet.has(c.part)).map(c=>c.target))];const closed=ids.every(id=>{const item=byId.get(id),end=new THREE.Vector3(0,-pitch,0).applyQuaternion(q(item)).add(new THREE.Vector3(...item.position));return ids.some(other=>other!==id&&aligned(item,byId.get(other))&&end.distanceTo(new THREE.Vector3(...byId.get(other).position))<.25);});if(ids.length>=4&&closed&&gears.length>=2)groups.push({ids,gears});}return groups;
}
function relax(points,locks,circles){
 let error=Infinity;for(let iteration=0;iteration<9000;iteration++){
  const reverse=iteration%2;for(let j=0;j<points.length;j++){const i=reverse?points.length-1-j:j,k=(i+1)%points.length,a=points[i],b=points[k],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy);if(d<1e-9)continue;const f=(d-pitch)/d*.5;a[0]+=dx*f;a[1]+=dy*f;b[0]-=dx*f;b[1]-=dy*f;}
  for(let i=0;i<points.length;i++){const p=points[i];for(let c=0;c<circles.length;c++){const [x,r]=circles[c],dx=p[0]-x,dy=p[1],d=Math.hypot(dx,dy);if(d<r||locks[i]===c){const scale=r/Math.max(d,1e-9);p[0]=x+dx*scale;p[1]=dy*scale;}}}
  if(iteration%20===0){error=Math.max(...points.map((p,i)=>Math.abs(Math.hypot(p[0]-points[(i+1)%points.length][0],p[1]-points[(i+1)%points.length][1])-pitch)));if(error<.002)break;}
 }return error;
}
export function routeChain(first,second,{extraLinks=0}={}){
 if(!first||!second||first.id===second.id||!sprocketTeeth(first)||!sprocketTeeth(second))throw Error('Chọn hai nhông xích khác nhau (Sprocket).');if(!Number.isInteger(extraLinks)||extraLinks<0||extraLinks>4)throw Error('Độ chùng chỉ thêm từ 0 đến 4 mắt.');
 const axis=new THREE.Vector3(0,1,0).applyQuaternion(q(first)),axisB=new THREE.Vector3(0,1,0).applyQuaternion(q(second));if(Math.abs(axis.dot(axisB))<.999)throw Error('Hai trục nhông cần song song trước khi quấn xích.');const ca=new THREE.Vector3(...first.position),cb=new THREE.Vector3(...second.position),delta=cb.clone().sub(ca),planeGap=delta.dot(axis);if(Math.abs(planeGap)>.35)throw Error(`Hai nhông lệch mặt phẳng ${Math.abs(planeGap).toFixed(1)} mm. Đưa hai nhông về cùng mặt phẳng xích.`);
 const u=delta.clone().addScaledVector(axis,-planeGap).normalize(),v=axis.clone().cross(u).normalize(),distance=delta.clone().addScaledVector(axis,-planeGap).length(),ra=radius(first),rb=radius(second);if(distance<ra+rb+3)throw Error('Hai nhông đang quá gần hoặc chạm nhau. Tăng khoảng cách tâm nhông.');
 const angle=Math.acos((ra-rb)/distance),line=Math.sqrt(distance*distance-(ra-rb)**2),lengths=[ra*(2*Math.PI-2*angle),line,rb*2*angle,line],perimeter=lengths.reduce((a,b)=>a+b,0),count=Math.ceil(perimeter/pitch)+extraLinks;if(count>200)throw Error(`Đường xích cần ${count} mắt, vượt giới hạn 200 mắt. Đưa hai nhông gần hơn.`);
 const points=[],locks=[],slack=Math.max(0,count*pitch-perimeter),sag=Math.sqrt(slack*distance*.35);for(let i=0;i<count;i++){let s=i*perimeter/count,segment=0;while(segment<3&&s>lengths[segment])s-=lengths[segment++];const t=s/lengths[segment];let p;
  if(segment===0){const a=angle+t*(2*Math.PI-2*angle);p=[ra*Math.cos(a),ra*Math.sin(a)];locks.push(0);}else if(segment===1){p=[ra*Math.cos(angle)+t*(distance+(rb-ra)*Math.cos(angle)),-ra*Math.sin(angle)+t*(ra-rb)*Math.sin(angle)-sag*Math.sin(Math.PI*t)];locks.push(-1);}else if(segment===2){const a=-angle+t*2*angle;p=[distance+rb*Math.cos(a),rb*Math.sin(a)];locks.push(1);}else{p=[distance+rb*Math.cos(angle)-t*(distance+(rb-ra)*Math.cos(angle)),rb*Math.sin(angle)+t*(ra-rb)*Math.sin(angle)];locks.push(-1);}points.push(p);
 }
 const error=relax(points,locks,[[0,ra],[distance,rb]]);if(error>.08)throw Error('Chưa tìm được đường xích đủ khít. Thử tăng độ chùng một mắt hoặc chỉnh khoảng cách hai nhông.');
 const origin=ca.clone().addScaledVector(axis,planeGap/2),world=points.map(p=>origin.clone().addScaledVector(u,p[0]).addScaledVector(v,p[1]));return {count,points:world.map(p=>p.toArray()),plane:points,circles:[[0,0,ra],[distance,0,rb]],axis:axis.toArray(),error,teeth:[sprocketTeeth(first),sprocketTeeth(second)],distance};
}
export function buildSprocketChain(part,first,second,{extraLinks=0,id=()=>crypto.randomUUID()}={}){
 const route=routeChain(first,second,{extraLinks}),group={id:id(),name:`Xích · ${route.count} mắt · ${route.teeth[0]}T ↔ ${route.teeth[1]}T`,visible:true,locked:false},x=new THREE.Vector3(...route.axis),parts=[];
 for(let i=0;i<route.count;i++){const point=new THREE.Vector3(...route.points[i]),next=new THREE.Vector3(...route.points[(i+1)%route.count]),y=next.sub(point).normalize().negate(),z=x.clone().cross(y).normalize(),rotation=new THREE.Euler().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x,y,z),'XYZ'),p={id:id(),sku:part.id,label:part.name,kind:part.kind||'accessory',groupId:group.id,position:point.toArray(),rotation:[rotation.x,rotation.y,rotation.z].map(THREE.MathUtils.radToDeg)};if(i)p.mate={target:parts[i-1].id,sourceRef:'chain-pin',targetRef:'chain-socket',depth:6.5,twist:0,flip:false};parts.push(p);}return {parts,group,route};
}
