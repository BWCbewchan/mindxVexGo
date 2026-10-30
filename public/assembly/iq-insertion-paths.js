import * as THREE from 'three';
import {collisionMesh,meshContact} from './collision.js';
import {worldReference} from './mating.js';

const axes=['x','y','z'];
// Sampled rigid withdrawal paths, reversed for assembly. Final-pose contact is
// insufficient: a shaft shoulder must not travel through a closed bearing.
export function analyzeIQInsertionPaths(parts,references,links,objects){
 const meshes=new Map(),routes=new Map(),owned=[];
 for(const p of parts){const source=collisionMesh(objects.get(p.id)),mesh=new THREE.Mesh(source.geometry);mesh.matrixAutoUpdate=false;mesh.matrixWorld.copy(source.matrixWorld);meshes.set(p.id,mesh);}
 const filtered=new Map();
 function pairMesh(p,other){
  const key=p.id+'|'+other.id;if(filtered.has(key))return filtered.get(key);
  const source=meshes.get(p.id),tips=(links.get(p.id)||[]).filter(c=>c.target===other.id).map(c=>references[p.sku].find(r=>r.id===c.sourceRef)).filter(r=>r.kind==='pin'&&!r.profile&&r.radius<=2.6);
  if(!tips.length){filtered.set(key,source);return source;}
  // Remove only the intended elastic peg insertion zones, not its shoulder or
  // carrier body. Unrelated pins and all shaft caps remain collision obstacles.
  const geometry=new THREE.BufferGeometry(),attr=source.geometry.attributes.position,index=source.geometry.index,keep=[];
  const pose=new THREE.Matrix4().compose(new THREE.Vector3(...p.position.map(v=>v/1000)),new THREE.Quaternion().setFromEuler(new THREE.Euler(...p.rotation.map(THREE.MathUtils.degToRad))),new THREE.Vector3(1,1,1));
  const local=pose.invert().multiply(source.matrixWorld),point=new THREE.Vector3();
  const within=i=>{point.fromBufferAttribute(attr,i).applyMatrix4(local).multiplyScalar(1000);return tips.some(r=>{const delta=point.clone().sub(new THREE.Vector3(...r.point)),normal=new THREE.Vector3(...r.normal),depth=-delta.dot(normal);return depth>=-.85&&depth<=r.depth+.3&&delta.addScaledVector(normal,depth).length()<=r.radius+1.2;});};
  const count=index?index.count:attr.count;
  for(let i=0;i<count;i+=3){const ids=[0,1,2].map(j=>index?index.getX(i+j):i+j);if(!ids.every(within))keep.push(...ids);}
  const positions=[];for(const i of keep)positions.push(attr.getX(i),attr.getY(i),attr.getZ(i));geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const mesh=new THREE.Mesh(geometry);mesh.matrixAutoUpdate=false;mesh.matrixWorld.copy(source.matrixWorld);owned.push(geometry);filtered.set(key,mesh);return mesh;
 }
 function corridor(a,b,axis){
  const aa=new THREE.Box3().setFromBufferAttribute(a.geometry.attributes.position).applyMatrix4(a.matrixWorld),bb=new THREE.Box3().setFromBufferAttribute(b.geometry.attributes.position).applyMatrix4(b.matrixWorld);
  let lo=0,hi=Infinity;
  for(const key of axes){const speed=axis[key];if(Math.abs(speed)<1e-8){if(aa.max[key]<bb.min[key]||aa.min[key]>bb.max[key])return null;continue;}const ends=[(bb.min[key]-aa.max[key])/speed,(bb.max[key]-aa.min[key])/speed].sort((a,b)=>a-b);lo=Math.max(lo,ends[0]);hi=Math.min(hi,ends[1]);}
  return hi>=lo&&hi>=0?{lo:Math.max(0,lo*1000),hi:hi*1000}:null;
 }
 try{
  for(const p of parts){
   const options=[];
   for(const c of links.get(p.id)||[]){const r=references[p.sku].find(r=>r.id===c.sourceRef),axis=worldReference(p,r).normal.negate();let option=options.find(o=>o.vector.dot(axis)>.9999);if(!option){option={vector:axis,contacts:[],blockedBy:[],clearance:5,clearanceByPart:{}};options.push(option);}option.contacts.push(c);}
   for(const option of options){
    for(const other of parts){if(p.id===other.id)continue;
     const rubber=row=>row.kind==='retainer'&&(row.sku==='228-2500-168'||/rubber/i.test(row.label||''));
     const elastic=(rubber(p)&&other.kind==='shaft')||(rubber(other)&&p.kind==='shaft');
     if(elastic&&(links.get(p.id)||[]).some(c=>c.target===other.id))continue;
     const moving=pairMesh(p,other),fixed=pairMesh(other,p),base=moving.matrixWorld.clone(),range=corridor(moving,fixed,option.vector);if(!range)continue;
     option.clearance=Math.max(option.clearance,range.hi+5);
     option.clearanceByPart[other.id]=range.hi+5;
     for(let mm=Math.max(.5,Math.floor(range.lo));mm<=range.hi+.5;mm+=1){
      moving.matrixWorld.copy(base);moving.matrixWorld.elements[12]+=option.vector.x*mm/1000;moving.matrixWorld.elements[13]+=option.vector.y*mm/1000;moving.matrixWorld.elements[14]+=option.vector.z*mm/1000;
      if(meshContact(moving,fixed)==='penetration'){option.blockedBy.push(other.id);break;}
     }
     moving.matrixWorld.copy(base);
    }
    option.axis=option.vector.toArray();delete option.vector;
   }
   routes.set(p.id,options);
  }
 }finally{for(const geometry of owned)geometry.dispose();}
 return routes;
}
