import * as THREE from './vendor/three.module.js';
import {analyzeCollisions} from './collision.js?v=iq-power-pack-89';
import {assetUrl,PLATFORM_ID} from './platform.js';
import {generateStudentGuide} from './guide-sequence.js?v=guide-drive-100';
import {seatedConnections,jointMetrics} from './assembly-review.js';
import {analyzeIQInsertionPaths} from './iq-insertion-paths.js';

function auditGuide(parts,objects,references,names){
 const links=new Map(parts.map(p=>[p.id,[]])),byId=new Map(parts.map(p=>[p.id,p])),seen=new Set();
 const contacts=seatedConnections(parts,references);
 for(const part of parts){
  const mate=part.mate,target=byId.get(mate?.target);
  if(!target)continue;
  const source=references[part.sku]?.find(r=>r.id===mate.sourceRef),socket=references[target.sku]?.find(r=>r.id===mate.targetRef);
  if(!source||!socket)continue;
  const metrics=jointMetrics(part,target,source,socket);
  if(metrics.valid)contacts.push({part:part.id,target:target.id,sourceRef:source.id,targetRef:socket.id,depth:metrics.depth,gap:metrics.gap});
 }
 for(const contact of contacts){
  const key=[contact.part+':'+contact.sourceRef,contact.target+':'+contact.targetRef].sort().join('|');
  if(seen.has(key))continue;
  seen.add(key);
  links.get(contact.part).push(contact);
  links.get(contact.target).push({...contact,part:contact.target,target:contact.part,sourceRef:contact.targetRef,targetRef:contact.sourceRef});
 }
 const paths=analyzeIQInsertionPaths(parts,references,links,objects);
 if(PLATFORM_ID==='vexgo')return {guide:null,paths};
 const options={references,inferConnections:true,insertionPaths:paths,nameFor:p=>names[p.id]||p.label||p.sku};
 let guide=generateStudentGuide(parts,options);
 if(guide.pathSearch&&!guide.pathSearch.budgetExceeded){
  const candidates=parts.filter(p=>p.kind==='body'&&p.id!==guide.pathSearch.rootId)
   .sort((a,b)=>links.get(b.id).length-links.get(a.id).length||a.sku.localeCompare(b.sku)).slice(0,3);
  for(const root of candidates){
   const alternate=generateStudentGuide(parts,{...options,rootId:root.id});
   if(alternate.ready){guide=alternate;break;}
  }
 }
 return {guide,paths};
}
const geometries=new Map();
const references=fetch(assetUrl('connectors.json?v=platform-73'),{cache:'no-store'}).then(r=>r.json()).then(r=>r.parts);
self.onmessage=async e=>{
 const {id,parts,groups,geometryData,referenceData={},guideNames}=e.data;
 try{
  for(const g of geometryData){const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(g.position,3));if(g.index)geometry.setIndex(new THREE.BufferAttribute(g.index,1));geometries.set(g.id,geometry);}
  const objects=new Map();
  for(const record of groups){const group=new THREE.Group();for(const item of record.meshes){const mesh=new THREE.Mesh(geometries.get(item.geometry));mesh.matrixAutoUpdate=false;mesh.matrix.fromArray(item.matrix);group.add(mesh);}objects.set(record.id,group);}
  const refs=await references;Object.assign(refs,referenceData);self.postMessage({id,report:guideNames?auditGuide(parts,objects,refs,guideNames):analyzeCollisions(parts,objects,{references:refs})});
 }catch(error){self.postMessage({id,error:error.message});}
};
