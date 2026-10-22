import * as THREE from 'three';
import {worldReference} from './mating.js?v=fit-tolerance-36';

export function createQuickTargetMarker(api){
 const marker=document.createElement('div');marker.id='quick-target-marker';marker.className='quick-target-marker';marker.hidden=true;marker.setAttribute('role','img');
 const label=document.createElement('span');marker.append(label);api.canvas.parentNode.append(marker);
 const halo=new THREE.Group(),ring=new THREE.Mesh(new THREE.RingGeometry(.0022,.0035,48),new THREE.MeshBasicMaterial({color:0xb04bff,side:THREE.DoubleSide,depthTest:false,depthWrite:false,transparent:true,opacity:.95})),fill=new THREE.Mesh(new THREE.CircleGeometry(.0022,48),new THREE.MeshBasicMaterial({color:0xb04bff,side:THREE.DoubleSide,depthTest:false,depthWrite:false,transparent:true,opacity:.35}));
 ring.renderOrder=51;fill.renderOrder=50;halo.add(fill,ring);halo.visible=false;api.scene.add(halo);
 let target=null;
 function clear(){target=null;halo.visible=false;marker.hidden=true;delete marker.dataset.partId;delete marker.dataset.refId;}
 function update(){
  if(!target)return;
  const part=api.project().parts.find(part=>part.id===target.id);
  if(!part){clear();return;}
  const ref=worldReference(part,target.ref),point=ref.point.multiplyScalar(.001);
  halo.position.copy(point).addScaledVector(ref.normal,.00015);halo.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),ref.normal);halo.visible=api.objects.get(part.id)?.visible!==false;
  const projected=point.clone().project(api.camera),rect=api.canvas.getBoundingClientRect(),parent=api.canvas.parentNode.getBoundingClientRect();
  marker.hidden=!halo.visible||projected.z>1||projected.z< -1||Math.abs(projected.x)>1.05||Math.abs(projected.y)>1.05;
  marker.style.left=(rect.left-parent.left+(projected.x+1)*rect.width/2)+'px';marker.style.top=(rect.top-parent.top+(1-projected.y)*rect.height/2)+'px';
 }
 function show(part,ref){target={id:part.id,ref};marker.dataset.partId=part.id;marker.dataset.refId=ref.id;label.textContent=ref.kind==='hole'?'Lỗ đang lắp':'Chốt đang lắp';marker.setAttribute('aria-label',ref.kind==='hole'?'Selected hole for pin insertion':'Selected pin for attachment');update();}
 return {show,clear,update};
}

// Partition overlapping hit boxes at the halfway line between their centres.
// The visible + markers keep their size and each hole remains clickable at its centre.
export function clipQuickPointTargets(items){
 const half=12;
 for(const [index,item] of items.entries()){
  let polygon=[[-half,-half],[half,-half],[half,half],[-half,half]];
  for(const [otherIndex,other] of items.entries()){
   if(index===otherIndex)continue;
   const dx=other.x-item.x,dy=other.y-item.y,squared=dx*dx+dy*dy;
   if(squared<.01){if(otherIndex<index)polygon=[];continue;}
   if(Math.abs(dx)>24||Math.abs(dy)>24)continue;
   const clipped=[],limit=squared/2;
   for(let i=0;i<polygon.length;i++){
    const a=polygon[i],b=polygon[(i+1)%polygon.length],da=a[0]*dx+a[1]*dy-limit,db=b[0]*dx+b[1]*dy-limit;
    if(da<=0)clipped.push(a);
    if((da<=0)!==(db<=0)){const t=da/(da-db);clipped.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}
   }
   polygon=clipped;if(!polygon.length)break;
  }
  item.button.hidden=!polygon.length;
  item.button.style.clipPath=polygon.length?'polygon('+polygon.map(([x,y])=>`${(x+half)/24*100}% ${(y+half)/24*100}%`).join(',')+')':'';
 }
}
