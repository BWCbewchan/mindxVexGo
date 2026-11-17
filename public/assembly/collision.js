import {chainSprocketContact} from './chain-route.js';
import {seatedIQPowerPack} from './iq-power-pack.js';
import * as THREE from './vendor/three.module.js';
import {MeshBVH} from './vendor/mesh-bvh.js';
import {compatibleReferences,insertionLimit} from './connector-policy.js?v=motor-pair-29';
import {attachmentReferences,worldReference} from './mating.js';
import {seatedConnections} from './assembly-review.js';

const trees=new WeakMap(), tolerance=.00015;
const combined=new WeakMap();
const connector=/^228-2500-(124|143|154|2221|2234|2238|2258|2260|2261|2268|2269|2271)$/;
function prepared(geometry){
 if(!trees.has(geometry)){
  const copy=geometry.clone(); copy.computeBoundingBox();
  copy.boundsTree=new MeshBVH(copy,{targetLeafSize:12});
  trees.set(geometry,copy);
 }
 return trees.get(geometry);
}
export function collisionMesh(object){
 object.updateMatrixWorld(true);
 if(object.isMesh)return object;
 if(object.children.length===1&&object.children[0].isMesh)return object.children[0];
 if(!combined.has(object)){
  const positions=[],indices=[],inverse=object.matrixWorld.clone().invert(),point=new THREE.Vector3();let offset=0;
  object.traverse(m=>{if(!m.isMesh||m.userData.cable||!m.geometry?.attributes.position)return;
   const attr=m.geometry.attributes.position,index=m.geometry.index,matrix=inverse.clone().multiply(m.matrixWorld);
   for(let i=0;i<attr.count;i++){point.fromBufferAttribute(attr,i).applyMatrix4(matrix);positions.push(point.x,point.y,point.z);}
   if(index)for(let i=0;i<index.count;i++)indices.push(offset+index.getX(i));else for(let i=0;i<attr.count;i++)indices.push(offset+i);
   offset+=attr.count;
  });
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);
  const mesh=new THREE.Mesh(geometry);mesh.matrixAutoUpdate=false;combined.set(object,mesh);
 }
 const mesh=combined.get(object);mesh.matrixWorld.copy(object.matrixWorld);return mesh;
}
function meshes(object){return [collisionMesh(object)];}
function interior(geometry,point){
 const tree=geometry.boundsTree;
 if(!geometry.boundingBox.containsPoint(point))return false;
 const nearest=tree.closestPointToPoint(point,{},0,tolerance);
 if(nearest&&nearest.distance<=tolerance)return false;
 // Require two non-axis-aligned rays to agree; a surface or unreliable shell is not a hard collision.
 return [[.831,.371,.413],[.217,.893,.397]].every(a=>{
  const ray=new THREE.Ray(point,new THREE.Vector3(...a).normalize());
  const hits=tree.raycast(ray,THREE.DoubleSide).map(h=>h.distance).filter(v=>v>tolerance).sort((a,b)=>a-b);
  let unique=0,last=-Infinity;for(const hit of hits)if(hit-last>1e-7){unique++;last=hit;}
  return unique%2===1;
 });
}
function probesInside(source,target,matrix){
 const attr=source.attributes.position,p=new THREE.Vector3();
 // Deterministic bounded samples. A negative result is inconclusive, not proof of clearance.
 const stride=Math.max(1,Math.floor(attr.count/32));
 for(let i=0;i<attr.count;i+=stride){p.fromBufferAttribute(attr,i).applyMatrix4(matrix);if(interior(target,p))return true;}
 return false;
}
function surfaceProbe(source,target,matrix){
 const index=source.index,positions=source.attributes.position,count=index?index.count:positions.count;
 const a=new THREE.Vector3(),b=new THREE.Vector3(),direction=new THREE.Vector3();
 const stride=Math.max(3,Math.floor(count/48/3)*3);
 for(let i=0;i+2<count;i+=stride){
  a.fromBufferAttribute(positions,index?index.getX(i):i).applyMatrix4(matrix);
  b.fromBufferAttribute(positions,index?index.getX(i+1):i+1).applyMatrix4(matrix);
  const length=a.distanceTo(b);if(length<=tolerance*2)continue;
  direction.copy(b).sub(a).normalize();
  const hit=target.boundsTree.raycastFirst(new THREE.Ray(a,direction),THREE.DoubleSide,tolerance,length-tolerance);
  if(hit&&hit.distance<length-tolerance)return true;
 }
 return false;
}
function trianglePenetration(a,b,bToA,aToB){
 const line=new THREE.Line3(),sample=new THREE.Vector3(),offset=.0003;
 const candidates=[];
 // Sparse vertex probes can miss a narrow crossing on detailed CAD meshes. Walk
 // only overlapping BVH leaves, then confirm shared interior around each surface
 // crossing so face-to-face contact and parts seated in openings stay allowed.
 a.boundsTree.bvhcast(b.boundsTree,bToA,{intersectsTriangles:(ta,tb)=>{
  if(!ta.intersectsTriangle(tb,line,true))return false;
  if(Math.abs(ta.plane.normal.dot(tb.plane.normal))>.9995)return false;
  candidates.push({start:line.start.clone(),end:line.end.clone(),normalA:ta.plane.normal.clone(),normalB:tb.plane.normal.clone(),span:line.start.distanceTo(line.end)});
  // Avoid unbounded work on coincident, highly tessellated surfaces.
  return candidates.length>=64;
 }});
 candidates.sort((x,y)=>y.span-x.span);
 for(const crossing of candidates.slice(0,12)){
  const point=crossing.start.clone().lerp(crossing.end,.5);
  for(const sa of [-1,1])for(const sb of [-1,1]){
   sample.copy(point).addScaledVector(crossing.normalA,sa*offset).addScaledVector(crossing.normalB,sb*offset);
   if(interior(a,sample)&&interior(b,sample.clone().applyMatrix4(aToB)))return true;
  }
 }
 return false;
}
export function meshContact(a,b){
 const ga=prepared(a.geometry),gb=prepared(b.geometry);
 const ba=ga.boundingBox.clone().applyMatrix4(a.matrixWorld),bb=gb.boundingBox.clone().applyMatrix4(b.matrixWorld);
 if(!ba.intersectsBox(bb))return null;
 const depth=['x','y','z'].map(k=>Math.min(ba.max[k],bb.max[k])-Math.max(ba.min[k],bb.min[k]));
 if(Math.min(...depth)<=tolerance)return null;
 const bToA=a.matrixWorld.clone().invert().multiply(b.matrixWorld),aToB=bToA.clone().invert();
 const midpoint=ba.clone().intersect(bb).getCenter(new THREE.Vector3());
 const sharedInterior=interior(ga,midpoint.clone().applyMatrix4(a.matrixWorld.clone().invert()))&&interior(gb,midpoint.clone().applyMatrix4(b.matrixWorld.clone().invert()));
 const inside=sharedInterior||probesInside(gb,ga,bToA)||probesInside(ga,gb,aToB)||trianglePenetration(ga,gb,bToA,aToB);
 if(inside)return 'penetration';
 return surfaceProbe(gb,ga,bToA)||surfaceProbe(ga,gb,aToB)?'surface':null;
}
export function seatedConnectorContact(a,b,references={},lateralTolerance=.15){
 // Connectors also have integral pegs: their joints are just as valid as loose pins.
 if(![...(references[a.sku]||[]),...(references[b.sku]||[])].some(ref=>ref.kind==='pin'))return false;
 const world=(part,ref)=>{const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));return {point:new THREE.Vector3().fromArray(ref.point).applyQuaternion(q).add(new THREE.Vector3().fromArray(part.position)),normal:new THREE.Vector3().fromArray(ref.normal).applyQuaternion(q)};};
 for(const ar of references[a.sku]||[])for(const br of references[b.sku]||[]){
  if(!compatibleReferences(ar,br,a.sku,b.sku))continue;
  const pin=ar.kind==='pin'?ar:br,hole=pin===ar?br:ar;
  const rim=pin.profile==='iq-balloon-rim'&&hole.profile===pin.profile;
  if((!rim&&pin.radius>2.6)||hole.kind!=='hole')continue;
  const p=world(pin===ar?a:b,pin),h=world(hole===ar?a:b,hole),offset=p.point.sub(h.point),depth=-offset.dot(h.normal);
  const lateral=offset.addScaledVector(h.normal,depth).length();
  if(lateral<=lateralTolerance&&p.normal.dot(h.normal)<-.999&&(rim?Math.abs(depth)<=.15:depth>.15&&depth<=insertionLimit(pin,hole)+.15))return true;
 }
 return false;
}
const trimmed=new WeakMap();
// Elastic insertion tips may touch a bore. That never grants permission for
// the connector's carrier body (or another beam in its group) to overlap.
function withoutSeatedTips(mesh,part,other,references,lateralTolerance){
 const inverse=mesh.matrixWorld.clone().invert(),scale=inverse.getMaxScaleOnAxis(),zones=[];
 for(const ref of attachmentReferences(references[part.sku]||[])){
  if(ref.kind!=='pin'||ref.profile)continue;
  const pin=worldReference(part,ref);
  const seated=(references[other.sku]||[]).some(hole=>{
   if(!compatibleReferences(ref,hole,part.sku,other.sku))return false;
   const h=worldReference(other,hole),d=h.point.clone().sub(pin.point),depth=-d.dot(pin.normal);
   return pin.normal.dot(h.normal)<-.999&&depth>.1&&depth<=insertionLimit(ref,hole)+.15&&d.addScaledVector(pin.normal,depth).length()<=lateralTolerance;
  });
  if(seated)zones.push({tip:pin.point.multiplyScalar(.001).applyMatrix4(inverse),normal:pin.normal.transformDirection(inverse),radius:(ref.radius+.16)*.001*scale,depth:(ref.depth+.2)*.001*scale});
 }
 if(!zones.length)return mesh;
 const key=JSON.stringify(zones.map(z=>[...z.tip.toArray(),...z.normal.toArray(),z.radius,z.depth].map(v=>Math.round(v*1e7))));
 let variants=trimmed.get(mesh.geometry);if(!variants){variants=new Map();trimmed.set(mesh.geometry,variants);}
 let geometry=variants.get(key);
 if(!geometry){
  const source=mesh.geometry,index=source.index,attr=source.attributes.position,count=index?index.count:attr.count,kept=[],p=new THREE.Vector3(),delta=new THREE.Vector3();
  const within=(i,z)=>{p.fromBufferAttribute(attr,i);delta.copy(p).sub(z.tip);const depth=-delta.dot(z.normal);return depth>=-.0002*scale&&depth<=z.depth&&delta.addScaledVector(z.normal,depth).lengthSq()<=z.radius*z.radius;};
  for(let i=0;i+2<count;i+=3){const ids=[0,1,2].map(n=>index?index.getX(i+n):i+n);if(!zones.some(z=>ids.every(id=>within(id,z))))kept.push(...ids);}
  if(kept.length===count)geometry=source;
  else{geometry=source.clone();geometry.setIndex(kept);}
  if(variants.size>=24){const oldest=variants.keys().next().value,old=variants.get(oldest);if(old!==mesh.geometry)old.dispose();variants.delete(oldest);}
  variants.set(key,geometry);
 }
 if(geometry===mesh.geometry)return mesh;
 const result=new THREE.Mesh(geometry,mesh.material);result.matrixAutoUpdate=false;result.matrixWorld.copy(mesh.matrixWorld);return result;
}
export function partContact(a,b,ma,mb,references={},lateralTolerance=.15){
 if(seatedIQPowerPack(a,b))return null;
 const contact=meshContact(ma,mb);if(!contact)return null;
 if(chainSprocketContact(a,b))return 'joint';
 if(!seatedConnectorContact(a,b,references,lateralTolerance))return contact;
 if(contact==='penetration'){
  const first=withoutSeatedTips(ma,a,b,references,lateralTolerance),second=withoutSeatedTips(mb,b,a,references,lateralTolerance);
  if(meshContact(first,second)==='penetration')return 'penetration';
 }
 return 'joint';
}
export function analyzeCollisions(parts,objects,{limit=80,references={}}={}){
 const groups=new Map(),issues=[];let omitted=false;
 const contacts=seatedConnections(parts,references,1),neighbors=new Map(parts.map(p=>[p.id,new Set()]));
 for(const c of contacts){neighbors.get(c.part)?.add(c.target);neighbors.get(c.target)?.add(c.part);}
 const tolerantParts=new Set(parts.filter(p=>!connector.test(p.sku)&&neighbors.get(p.id).size>=2).map(p=>p.id));
 for(const p of parts){const obj=objects.get(p.id);if(obj)groups.set(p.id,meshes(obj));}
 for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++){
  const a=parts[i],b=parts[j];let result=null;
  // CAD shell parity treats the open battery bay as solid. The measured seated
  // pose has clear surfaces. Other poses and all surrounding parts still collide normally.
  if(seatedIQPowerPack(a,b))continue;
  for(const ma of groups.get(a.id)||[])for(const mb of groups.get(b.id)||[]){
   const contact=partContact(a,b,ma,mb,references,tolerantParts.has(a.id)||tolerantParts.has(b.id)?1:.15);if(contact==='penetration')result=contact;else if(contact&&result!=='penetration')result=contact;
  }
  if(!result)continue;
  // Only a recorded compatible mate is an intentional connector contact. Merely
  // containing a connector SKU must not hide an unrelated body collision.
  const joint=result==='joint';
  // Dense chains have many valid hinge contacts. Keep scanning so these
  // cannot exhaust the report before a later body penetration is checked.
  if(joint&&issues.length>=limit){omitted=true;continue;}
  issues.push({a:a.id,b:b.id,key:[a.id,b.id].sort().join('|'),kind:joint?'joint':result,label:joint?'Connector contact · verify seating':result==='penetration'?'Detected mesh penetration':'Surface intersection · review'});
  if(!joint&&issues.length>=limit)return {issues,truncated:true};
 }
 return {issues,truncated:omitted};
}
