import fs from 'node:fs';
import {compatibleReferences,insertionLimit} from '../public/assembly/connector-policy.js';
import {attachmentReferences,matingPose,worldReference} from '../public/assembly/mating.js';
import {constrainJoints} from '../public/assembly/joint-constraints.js';
const catalog=JSON.parse(fs.readFileSync('public/assembly/parts.json','utf8'));
const refs=JSON.parse(fs.readFileSync('public/assembly/connectors.json','utf8')).parts;
let tested=0,accepted=0;const failures=[],pairs=new Map();
for(const a of catalog)for(const b of catalog){

 for(const sourceRef of attachmentReferences(refs[a.id]))for(const targetRef of attachmentReferences(refs[b.id])){
  tested++;const allowed=compatibleReferences(sourceRef,targetRef,a.id,b.id);
  if(allowed!==compatibleReferences(targetRef,sourceRef,b.id,a.id))failures.push({a:a.id,b:b.id,reason:'asymmetric compatibility'});
  if(!allowed)continue;accepted++;
  const limit=insertionLimit(sourceRef,targetRef);
  if(!Number.isFinite(limit)||limit<0){failures.push({a:a.id,b:b.id,reason:'invalid insertion limit'});continue;}
  const target={id:'target',sku:b.id,position:[12,45,-30],rotation:[27,41,13]};
  const source={id:'source',sku:a.id,position:[0,0,0],rotation:[17,23,11]};
  Object.assign(source,matingPose(source,sourceRef,target,targetRef,{depth:limit*.7}));
  source.mate={target:'target',sourceRef:sourceRef.id,targetRef:targetRef.id,depth:limit*.7};
  const from=worldReference(source,sourceRef),to=worldReference(target,targetRef),gap=from.point.clone().sub(to.point);
  if(gap.clone().addScaledVector(to.normal,-gap.dot(to.normal)).length()>1e-6||from.normal.dot(to.normal)>-.999999)failures.push({a:a.id,b:b.id,reason:'misaligned pose'});
  const parts=[target,source],before=structuredClone(parts);source.position[0]+=.001;
  const result=constrainJoints(parts,before,refs,{autoAttach:false});
  if(!result.ok)failures.push({a:a.id,b:b.id,source:sourceRef.id,target:targetRef.id,reason:result.reason});
  const key=[a.id,b.id].sort().join('/');pairs.set(key,{a:a.name,b:b.name});
 }
}
const report={generatedAt:new Date().toISOString(),parts:catalog.length,referencePairsChecked:tested,compatibleReferencePairs:accepted,compatiblePartPairs:pairs.size,failures:failures.slice(0,100),failureCount:failures.length,withoutConnectorReferences:catalog.filter(p=>!refs[p.id]?.length).map(p=>({id:p.id,name:p.name})),scope:'Connector math and constraint coverage only; excludes mesh collision certification, flexible parts, cables and physical kit testing.'};
fs.mkdirSync('artifacts/assembly-tests',{recursive:true});fs.writeFileSync('artifacts/assembly-tests/compatibility-audit.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
