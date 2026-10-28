import {matingPose,nearestMate} from './mating.js?v=fit-tolerance-36';
import {compatibleReferences,insertionLimit,recommendedInsertionDepth} from './connector-policy.js?v=deep-seat-49';
import {groupSelection,groupMembers,validGroupTree} from './assembly-review.js';
import {ungroupSelection,copySelection} from './selection-operations.js';
import {kitInventory} from './kit-inventory.js';
import {validateKitProfile} from './kit-policy.js';
import {ASSEMBLY_API_VERSION,describeAssemblyAPI,validateAssemblyCommand,API_ERROR_HELP} from './api-contract.js';

export function installAssemblyAPI(app){
 const clone=value=>structuredClone(value);
 const fail=(code,message)=>{throw Object.assign(Error(message),{code});};
 const part=id=>{const p=app.project().parts.find(p=>p.id===id);if(!p)fail('UNKNOWN_PART','Unknown part ID: '+id);return p;};
 const writable=p=>{if(app.locked(p))fail('LAYER_LOCKED','Layer is locked: '+p.id);return p;};
 const vector=value=>{if(!Array.isArray(value)||value.length!==3||value.some(v=>!Number.isFinite(v)||Math.abs(v)>10000))throw Error('Expected three finite mm/degrees values, within ±10000.');return [...value];};
 const idsChecked=ids=>{if(!Array.isArray(ids)||!ids.length||new Set(ids).size!==ids.length)throw Error('Supply a nonempty array of unique part IDs');ids.forEach(part);return ids;};
 const releaseChildren=id=>{const children=app.project().parts.filter(p=>p.mate?.target===id);children.forEach(writable);children.forEach(p=>delete p.mate);};
 const cycle=(source,target)=>{let current=target;const seen=new Set();while(current?.mate&&!seen.has(current.id)){seen.add(current.id);if(current.mate.target===source.id)return true;current=app.project().parts.find(p=>p.id===current.mate.target);}return source.id===target.id;};
 const selection=ids=>{if(!Array.isArray(ids)||!ids.length)throw Error('Choose at least one part.');ids.forEach(part);app.select(ids);};
 const ref=(p,id)=>{const r=app.references[p.sku]?.find(r=>r.id===id);if(!r)fail('UNKNOWN_CONNECTOR','Unknown connector reference: '+id);return r;};
 async function change(fn){if(app.busy())fail('BUSY','Editor is busy or a gesture is active.');return app.transaction(fn);}
 const records=[];let completed=0,queued=0;
 function record(command,response){completed++;records.push({command:String(command).slice(0,200),requestId:response.meta.requestId,ok:response.ok,errorCode:response.errorCode||null,durationMs:response.meta.durationMs,finishedAt:new Date().toISOString()});if(records.length>60)records.shift();return response;}
 function errorCode(error){if(error.code)return error.code;const text=error.message||'';if(/locked|Unlock/.test(text))return 'LAYER_LOCKED';if(/New body penetration/.test(text))return 'COLLISION';if(/Vượt giới hạn bộ kit/.test(text))return 'KIT_LIMIT';if(/Editor is busy/.test(text))return 'BUSY';if(/Could not save/.test(text))return 'PERSISTENCE_FAILED';return 'EDITOR_REJECTED';}
 const methods={
  getCapabilities:()=>describeAssemblyAPI(),
  getState:()=>({project:clone(app.project()),context:clone(app.context||{projectId:null,platform:app.project().platform}),selectedIds:app.selection(),busy:app.busy()}),
  getDiagnostics:()=>({version:ASSEMBLY_API_VERSION,context:clone(app.context||{projectId:null,platform:app.project().platform}),platform:app.project().platform,busy:app.busy(),parts:app.project().parts.length,groups:app.project().groups.length,queued,completed,recent:clone(records)}),
  listParts:({query='',category}={})=>app.catalog().filter(p=>(!category||p.category===category)&&(p.name+' '+p.id).toLowerCase().includes(String(query).toLowerCase())).map(clone),
  getConnectors:({id})=>clone(app.references[part(id).sku]||[]),
  getCatalogConnectors:({sku})=>{if(!app.catalog().some(p=>p.id===sku))fail('UNKNOWN_SKU','Unknown SKU');return clone(app.references[sku]||[]);},
  getConnectionOptions:({id,targetId,offset=0,limit=50})=>{
   const source=part(id),target=part(targetId);if(id===targetId)fail('INCOMPATIBLE_CONNECTORS','Choose two different parts');
   const options=[];let total=0;
   for(const a of app.references[source.sku]||[])for(const b of app.references[target.sku]||[])if(compatibleReferences(a,b,source.sku,target.sku)){
    if(total>=offset&&options.length<limit)options.push({sourceRef:a.id,targetRef:b.id,depth:recommendedInsertionDepth(a,b,source.sku,target.sku),maxDepth:insertionLimit(a,b)});total++;
   }
   return {id,targetId,total,offset,options,nextOffset:offset+options.length<total?offset+options.length:null,requiresFitCheck:true};
  },
  select:({ids})=>{if(app.busy())throw Error('Editor is busy');idsChecked(ids);selection(ids);return {selectedIds:ids};},
  addPart:args=>change(async()=>{const entry=app.catalog().find(p=>p.id===args.sku);if(!entry)fail('UNKNOWN_SKU','Unknown SKU');const item={id:crypto.randomUUID(),sku:entry.id,label:entry.name,kind:entry.kind,position:args.position?vector(args.position):await app.staging(entry.id),rotation:args.rotation?vector(args.rotation):[0,0,0]};const additions=app.withElectronics(item);app.assertAdditions?.(additions);if(app.project().parts.length+additions.length>250)throw Error('Maximum 250 parts');app.project().parts.push(...additions);return {id:item.id,addedIds:additions.map(p=>p.id)};}),
  setTransform:args=>change(()=>{const p=writable(part(args.id));if(!args.position&&!args.rotation)throw Error('Supply position or rotation');if(args.position)p.position=vector(args.position);if(args.rotation)p.rotation=vector(args.rotation);releaseChildren(p.id);delete p.mate;return {id:p.id};}),
  attach:args=>change(()=>{const source=writable(part(args.id)),target=part(args.targetId);if(source.id===target.id)fail('CYCLE_REJECTED','Cannot attach to itself');const a=ref(source,args.sourceRef),b=ref(target,args.targetRef);if(!compatibleReferences(a,b,source.sku,target.sku))fail('INCOMPATIBLE_CONNECTORS','Incompatible connectors');let current=target;const seen=new Set();while(current?.mate&&!seen.has(current.id)){seen.add(current.id);if(current.mate.target===source.id)fail('CYCLE_REJECTED','Attachment would create a cycle');current=app.project().parts.find(p=>p.id===current.mate.target);}const depth=args.depth??recommendedInsertionDepth(a,b,source.sku,target.sku),twist=args.twist??0;if(!Number.isFinite(depth)||depth<0||depth>insertionLimit(a,b)||!Number.isFinite(twist))throw Error('Invalid insertion depth or angle');releaseChildren(source.id);Object.assign(source,matingPose(source,a,target,b,{depth,twist}));source.mate={target:target.id,sourceRef:a.id,targetRef:b.id,depth,twist,flip:false};delete source.snapBlocked;return {id:source.id,mate:clone(source.mate)};}),
  snap:args=>change(()=>{const p=writable(part(args.id));const match=nearestMate(p,app.project().parts,app.references);if(!match)fail('INCOMPATIBLE_CONNECTORS','No compatible connection nearby');if(cycle(p,match.target))fail('CYCLE_REJECTED','Attachment would create a cycle');releaseChildren(p.id);Object.assign(p,match.pose);p.mate={target:match.target.id,sourceRef:match.sourceRef.id,targetRef:match.targetRef.id,depth:match.depth,twist:0,flip:false};return {id:p.id,support:match.support};}),
  detach:({id})=>change(()=>{const p=writable(part(id));delete p.mate;return {id};}),
  deleteParts:({ids})=>change(()=>{idsChecked(ids);app.project().parts.filter(p=>ids.includes(p.mate?.target)&&!ids.includes(p.id)).forEach(writable);ids.forEach(id=>writable(part(id)));app.project().parts=app.project().parts.filter(p=>!ids.includes(p.id));for(const p of app.project().parts)if(ids.includes(p.mate?.target))delete p.mate;app.clean();return {deletedIds:ids};}),
  duplicateParts:({ids,groupId,offset=[100,0,0]})=>change(()=>{
   idsChecked(ids);if(groupId){const members=groupMembers(app.project(),groupId);if(!members.length||members.some(p=>!ids.includes(p.id)))throw Error('Selection does not include the chosen group');}
   const originals=app.project().parts.filter(p=>ids.includes(p.id));
   const copied=copySelection(app.project(),ids,{groupId}),additions=[];
   for(const p of copied.parts){p.position=vector(p.position.map((value,i)=>value+offset[i]));additions.push(...app.withElectronics(p,additions));}
   app.assertAdditions?.(additions);if(app.project().parts.length+additions.length>250)throw Error('Maximum 250 parts');
   app.project().parts.push(...additions);app.project().groups.push(...copied.groups);app.clean();
   return {ids:copied.ids,addedIds:additions.map(p=>p.id),groupId:copied.groupId,idMap:Object.fromEntries(originals.map((p,i)=>[p.id,copied.ids[i]]))};
  }),
  group:({ids,name='AI group'})=>change(()=>{idsChecked(ids);if(ids.length<2)throw Error('Select at least two parts');ids.forEach(id=>writable(part(id)));const id=crypto.randomUUID();groupSelection(app.project(),ids,{id,name:String(name).slice(0,120),visible:true,locked:false});app.clean();return {groupId:id};}),
  ungroup:({ids,groupId})=>change(()=>{idsChecked(ids);const result=ungroupSelection(app.project(),ids,groupId);app.clean();return result;}),
  setLayer:({id,visible,locked})=>change(()=>{const p=part(id);if(visible!==undefined){if(typeof visible!=='boolean')throw Error('visible must be boolean');p.visible=visible;}if(locked!==undefined){if(typeof locked!=='boolean')throw Error('locked must be boolean');p.locked=locked;}return {id};}),
  checkFit:()=>app.fitReport(),
  getGuide:()=>clone(app.guide()),
  getConnections:()=>clone(app.review().connections),
  reviewMechanics:()=>clone(app.review().mechanics),
  getInventory:()=>kitInventory(app.project().parts,app.catalog(),app.project().kit||null),
  getKit:()=>clone(app.project().kit||null),
  setKit:({profile})=>change(()=>{app.project().kit=validateKitProfile(profile,app.catalog(),app.project().platform);return {profile:clone(app.project().kit)};}),
  setGroup:args=>change(()=>{const group=app.project().groups.find(g=>g.id===args.id);if(!group)throw Error('Unknown group');
   if(args.parentId!==undefined){if(app.locked(group))throw Error('Group is locked');const parent=args.parentId===null?undefined:args.parentId;if(parent&&(!app.project().groups.some(g=>g.id===parent)||app.locked(app.project().groups.find(g=>g.id===parent))))throw Error('Invalid or locked parent group');if(!validGroupTree(app.project().groups.map(g=>g===group?{...g,parentId:parent}:g)))throw Error('Group cycle rejected');if(parent)group.parentId=parent;else delete group.parentId;}
   for(const key of ['visible','locked','collapsed'])if(args[key]!==undefined){if(typeof args[key]!=='boolean')throw Error(key+' must be boolean');group[key]=args[key];}if(args.name!==undefined){if(typeof args.name!=='string'||!args.name.trim())throw Error('Group name required');group.name=args.name.trim().slice(0,120);}return {group:clone(group)};
  }),
  exportProject:()=>clone(app.project()),
  flushProject:async()=>{if(app.busy())throw Error('Editor is busy. Finish the current edit before syncing.');if(!await app.save())throw Error('Could not save the current edit.');return clone(app.project());},
  exportGuide:()=>{if(app.busy())throw Error('Editor is busy');if(!app.guide().ready)fail('GUIDE_NOT_READY',app.guide().blockers.join('; ')||'Guide is not ready');const result=app.exportGuide();return result;},
  undo:()=>{if(app.busy())throw Error('Editor is busy');return app.undo(false);},
  redo:()=>{if(app.busy())throw Error('Editor is busy');return app.undo(true);},
 };
 let tail=Promise.resolve();
 const api=Object.freeze({version:ASSEMBLY_API_VERSION,commands:Object.freeze(Object.keys(methods)),describe:describeAssemblyAPI,execute(command,args={}){
  const requestId=crypto.randomUUID(),started=performance.now(),meta=()=>({requestId,command,durationMs:Math.round(performance.now()-started)});
  let validation,snapshot;try{validation=validateAssemblyCommand(command,args);if(validation.ok)snapshot=clone(args);}catch{validation={ok:false,errorCode:'INVALID_ARGUMENTS',error:'Arguments must be plain JSON',hint:API_ERROR_HELP.INVALID_ARGUMENTS};}
  if(!validation.ok)return Promise.resolve(record(command,{...validation,meta:meta()}));
  queued++;
  const task=tail.then(async()=>{queued--;try{return record(command,{ok:true,result:await methods[command](snapshot),meta:meta()});}catch(error){const code=errorCode(error);return record(command,{ok:false,errorCode:code,error:error.message,hint:API_ERROR_HELP[code]||API_ERROR_HELP.EDITOR_REJECTED,meta:meta()});}});tail=task.then(()=>undefined);return task;
 }});
 window.mindxAssembly=api;
 // Only a same-origin hosting page can reach the editor API.
 if(window.parent!==window)try{if(window.parent.location.origin===location.origin)window.parent.mindxAssembly=api;}catch{}
 return api;
}
