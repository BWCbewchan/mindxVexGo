import * as THREE from './vendor/three.module.js';
import {collisionMesh,meshContact} from './collision.js';
import {worldReference} from './mating.js';

const axes=['x','y','z'];
const rubber=part=>part.kind==='retainer'&&(part.sku==='228-2500-168'||/rubber/i.test(part.label||''));
// Sampled rigid withdrawal paths, reversed for assembly. Final-pose contact is
// insufficient: a shaft shoulder must not travel through a closed bearing.
export function analyzeIQInsertionPaths(parts,references,links,objects){
 const meshes=new Map(),routes=new Map(),owned=[],byId=new Map(parts.map(p=>[p.id,p]));
 // Signed distance from a connector row to the centroid of the part's other
 // rows, measured along that row's normal (positive: carrier lies in front).
 const sides=new Map();
 function bodySide(sku,ref){
  const key=sku+'\u0000'+ref.id;if(sides.has(key))return sides.get(key);
  const rows=(references[sku]||[]).filter(row=>row!==ref&&Array.isArray(row.point));
  let value=0;
  if(rows.length){const center=rows.reduce((sum,row)=>sum.add(new THREE.Vector3(...row.point)),new THREE.Vector3()).divideScalar(rows.length);value=center.sub(new THREE.Vector3(...ref.point)).dot(new THREE.Vector3(...ref.normal));}
  sides.set(key,value);return value;
 }
 for(const p of parts){const source=collisionMesh(objects.get(p.id)),mesh=new THREE.Mesh(source.geometry);mesh.matrixAutoUpdate=false;mesh.matrixWorld.copy(source.matrixWorld);meshes.set(p.id,mesh);}
 const filtered=new Map();
 // Pegs of p that sit coaxially inside a hole of other (within 0.6 mm).
 function seatedPegs(p,other){
  const holes=(references[other.sku]||[]).filter(r=>r.kind==='hole'&&!r.profile).map(r=>worldReference(other,r));if(!holes.length)return [];
  return (references[p.sku]||[]).filter(r=>r.kind==='pin'&&!r.profile).filter(r=>{const w=worldReference(p,r);return holes.some(h=>{const d=w.point.clone().sub(h.point);return Math.abs(w.normal.dot(h.normal))>.99&&d.clone().addScaledVector(h.normal,-d.dot(h.normal)).length()<.6&&Math.abs(d.dot(h.normal))<6;});});
 }
 function pairMesh(p,other){
  const key=p.id+'|'+other.id;if(filtered.has(key))return filtered.get(key);
  const source=meshes.get(p.id),tips=[...new Set([...(links.get(p.id)||[]).filter(c=>c.target===other.id).map(c=>references[p.sku].find(r=>r.id===c.sourceRef)),...seatedPegs(p,other)])].filter(r=>r&&r.kind==='pin'&&!r.profile&&r.radius<=2.6);
  if(!tips.length){filtered.set(key,source);return source;}
  // Remove only the intended elastic peg insertion zones, not its shoulder or
  // carrier body. Unrelated pins and all shaft caps remain collision obstacles.
  const geometry=new THREE.BufferGeometry(),attr=source.geometry.attributes.position,index=source.geometry.index,keep=[];
  const pose=new THREE.Matrix4().compose(new THREE.Vector3(...p.position.map(v=>v/1000)),new THREE.Quaternion().setFromEuler(new THREE.Euler(...p.rotation.map(THREE.MathUtils.degToRad))),new THREE.Vector3(1,1,1));
  const local=pose.invert().multiply(source.matrixWorld),point=new THREE.Vector3();
  // Some CAD pegs (weak standoffs) are modeled longer than their analytic
  // seating depth. Past an outermost tip only that peg can exist, so clear
  // the whole cylinder beyond it instead of leaving a phantom ring in the bore.
  const rows=references[p.sku]||[];
  const beyond=new Map(tips.map(r=>{const normal=new THREE.Vector3(...r.normal),origin=new THREE.Vector3(...r.point);
   const outer=!rows.some(other=>other!==r&&new THREE.Vector3(...other.point).sub(origin).dot(normal)>.05);return [r,outer?8:.85];}));
  const within=i=>{point.fromBufferAttribute(attr,i).applyMatrix4(local).multiplyScalar(1000);return tips.some(r=>{const delta=point.clone().sub(new THREE.Vector3(...r.point)),normal=new THREE.Vector3(...r.normal),depth=-delta.dot(normal);return depth>=-beyond.get(r)&&depth<=r.depth+.3&&delta.addScaledVector(normal,depth).length()<=r.radius+1.2;});};
  const count=index?index.count:attr.count;
  for(let i=0;i<count;i+=3){const ids=[0,1,2].map(j=>index?index.getX(i+j):i+j);if(!ids.every(within))keep.push(...ids);}
  const positions=[];for(const i of keep)positions.push(attr.getX(i),attr.getY(i),attr.getZ(i));geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const mesh=new THREE.Mesh(geometry);mesh.matrixAutoUpdate=false;mesh.matrixWorld.copy(source.matrixWorld);owned.push(geometry);filtered.set(key,mesh);return mesh;
 }
 const boundsCache=new WeakMap(),restCache=new Map();
 function bounds(mesh){if(!boundsCache.has(mesh))boundsCache.set(mesh,new THREE.Box3().setFromBufferAttribute(mesh.geometry.attributes.position).applyMatrix4(mesh.matrixWorld));return boundsCache.get(mesh);}
 function corridor(a,b,axis){
  const aa=bounds(a),bb=bounds(b);
  let lo=0,hi=Infinity;
  for(const key of axes){const speed=axis[key];if(Math.abs(speed)<1e-8){if(aa.max[key]<bb.min[key]||aa.min[key]>bb.max[key])return null;continue;}const ends=[(bb.min[key]-aa.max[key])/speed,(bb.max[key]-aa.min[key])/speed].sort((a,b)=>a-b);lo=Math.max(lo,ends[0]);hi=Math.min(hi,ends[1]);}
  return hi>=lo&&hi>=0?{lo:Math.max(0,lo*1000),hi:hi*1000}:null;
 }
 function engagement(p,option){
  if(['shaft','motor'].includes(p.kind)||p.kind==='retainer')return Infinity;
  let travel=0;
  for(const c of option.contacts){const r=references[p.sku]?.find(row=>row.id===c.sourceRef),t=byId.get(c.target),s=references[t?.sku]?.find(row=>row.id===c.targetRef);
   const pin=r?.kind==='pin'?r:s?.kind==='pin'?s:null;if(!pin||pin.profile)return Infinity;travel=Math.max(travel,pin.depth||0);}
  return Math.min(15,travel+3);
 }
 // From `engage` mm out along the insertion axis, can the part leave along a
 // world axis without touching anything? (Sampled sweep against every part.)
 function escapeFrom(p,vector,engage){
  const candidates=[];for(const key of axes)for(const sign of [1,-1]){const d=new THREE.Vector3();d[key]=sign;if(d.dot(vector)>-.5)candidates.push(d);}
  candidates.sort((a,b)=>b.dot(vector)-a.dot(vector));
  for(const d of candidates){
   let blocked=false;
   for(const other of parts){if(other.id===p.id||restCache.get(p.id+'|'+other.id))continue;
    const moving=pairMesh(p,other),fixed=pairMesh(other,p),base=moving.matrixWorld.clone();
    const shift=new THREE.Matrix4().makeTranslation(vector.x*engage/1000,vector.y*engage/1000,vector.z*engage/1000);
    moving.matrixWorld.premultiply(shift);boundsCache.delete(moving);
    const range=corridor(moving,fixed,d);
    if(range)for(let mm=Math.max(.5,Math.floor(range.lo));mm<=range.hi+.5;mm+=1.5){
     const m=moving.matrixWorld.clone();moving.matrixWorld.elements[12]+=d.x*mm/1000;moving.matrixWorld.elements[13]+=d.y*mm/1000;moving.matrixWorld.elements[14]+=d.z*mm/1000;
     const hit=meshContact(moving,fixed)==='penetration';moving.matrixWorld.copy(m);if(hit){blocked=true;break;}
    }
    moving.matrixWorld.copy(base);boundsCache.delete(moving);
    if(blocked)break;
   }
   if(!blocked)return d;
  }
  return null;
 }
 try{
  for(const p of parts){
   const options=[];
   const add=(axis,c)=>{let option=options.find(o=>o.vector.dot(axis)>.9999);if(!option){option={vector:axis,contacts:[],blockedBy:[],interference:[],clearance:5,clearanceByPart:{}};options.push(option);}if(!option.contacts.includes(c))option.contacts.push(c);};
   for(const c of links.get(p.id)||[]){const r=references[p.sku].find(r=>r.id===c.sourceRef),axis=worldReference(p,r).normal.negate();
    // Peg rows exist for both its tip (normal out of the part) and its base
    // (normal back toward the carrier). Withdraw toward the carrier body so a
    // base-face contact does not push the peg deeper into its socket.
    const target=byId.get(c.target),socket=references[target?.sku]?.find(row=>row.id===c.targetRef);
    if(r?.kind==='pin'&&bodySide(p.sku,r)>.05)axis.negate();
    // A socket leaves opposite to its peg, whichever face row recorded it.
    else if(r?.kind==='hole'&&socket?.kind==='pin'&&bodySide(target.sku,socket)>.05)axis.negate();
    add(axis,c);
    // A hub, beam or gear threaded on a shaft can slide on from either shaft
    // end. The sampled sweep still rejects the end blocked by a collar or cap.
    if(p.kind!=='shaft'&&r?.kind==='hole'&&target?.kind==='shaft'&&socket?.kind==='pin')add(axis.clone().negate(),c);
    // A beam pressed onto an integral peg (corner connectors, standoffs) also
    // gets the opposite approach: the centroid side test is ambiguous for
    // compact connectors, and the sweep rejects the direction through the body.
    else if(p.kind!=='pin'&&r?.kind==='hole'&&socket?.kind==='pin'&&!socket.profile&&target?.kind==='body')add(axis.clone().negate(),c);
    else if(p.kind==='body'&&r?.kind==='pin'&&!r.profile&&socket?.kind==='hole'&&target?.kind!=='pin')add(axis.clone().negate(),c);}
   for(const option of options){
    for(const other of parts){if(p.id===other.id)continue;
     const elastic=(rubber(p)&&other.kind==='shaft')||(rubber(other)&&p.kind==='shaft');
     if(elastic&&(links.get(p.id)||[]).some(c=>c.target===other.id))continue;
     const roughRange=corridor(meshes.get(p.id),meshes.get(other.id),option.vector);
     if(!roughRange)continue;
     const moving=pairMesh(p,other),fixed=pairMesh(other,p);
     const range=moving===meshes.get(p.id)&&fixed===meshes.get(other.id)?roughRange:corridor(moving,fixed,option.vector);
     if(!range)continue;
     const base=moving.matrixWorld.clone();
     option.clearance=Math.max(option.clearance,range.hi+5);
     option.clearanceByPart[other.id]=range.hi+5;
     // Bodies that already overlap in the finished CAD pose (flexed braces,
     // off-grid diagonals, a hub turned on its square shaft) cannot be judged
     // by a rigid sweep. Report the interference instead of inventing an
     // impossible order; the fit review shows the overlap to the author.
     const restKey=p.id+'|'+other.id;
     if(!restCache.has(restKey))restCache.set(restKey,meshContact(moving,fixed)==='penetration');
     if(restCache.get(restKey)){if(!option.interference.includes(other.id))option.interference.push(other.id);continue;}
     for(let mm=Math.max(.5,Math.floor(range.lo));mm<=range.hi+.5;mm+=1){
      moving.matrixWorld.copy(base);moving.matrixWorld.elements[12]+=option.vector.x*mm/1000;moving.matrixWorld.elements[13]+=option.vector.y*mm/1000;moving.matrixWorld.elements[14]+=option.vector.z*mm/1000;
      if(meshContact(moving,fixed)==='penetration'){option.blockedBy.push(other.id);(option.hitAt||={})[other.id]=mm;break;}
     }
     moving.matrixWorld.copy(base);
    }
    // A hand only pushes a short-peg part straight for its engagement travel;
    // before that it can arrive from the side. Obstacles met only beyond the
    // engagement length are cleared if some escape direction is free there.
    const engage=engagement(p,option);
    if(Number.isFinite(engage)&&option.blockedBy.length&&option.blockedBy.every(id=>option.hitAt[id]>engage)){
     const escape=escapeFrom(p,option.vector,engage);
     if(escape){option.approach={engageMM:engage,escape:escape.toArray()};option.farBlockedBy=option.blockedBy;option.blockedBy=[];}
    }
    delete option.hitAt;
    option.axis=option.vector.toArray();delete option.vector;
   }
   routes.set(p.id,options);
  }
 }finally{for(const geometry of owned)geometry.dispose();}
 return routes;
}
