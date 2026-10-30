import {validateProjectFile,projectIdValid} from './project-store.js';
import {matingPose} from './mating.js';
import {compatibleReferences,recommendedInsertionDepth,insertionLimit} from './connector-policy.js';
import {jointMetrics,validGroupTree,layerLocked} from './assembly-review.js';

const clone=value=>structuredClone(value);
const record=value=>value&&typeof value==='object'&&!Array.isArray(value);
function parse(value){
 let text;try{text=typeof value==='string'?value:JSON.stringify(structuredClone(value));}catch{throw Error('Chỉ nhận dữ liệu JSON; không nhận hàm hoặc mã JavaScript.');}
 if(typeof text!=='string'||text.length>5e6)throw Error('JSON phải nhỏ hơn 5 MB.');
 let data;try{data=JSON.parse(text);}catch(error){throw Error('JSON không hợp lệ: '+error.message);}
 if(!record(data))throw Error('Cần một đối tượng JSON mô hình hoặc {commands:[…]}.');
 return data;
}
const vector=(v,fallback)=>v===undefined?[...fallback]:Array.isArray(v)&&v.length===3&&v.every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<=10000)?[...v]:(()=>{throw Error('Tọa độ/góc phải gồm 3 số hữu hạn trong ±10000.');})();

// The authoritative data operation is independent of DOM, WebGL and renderer setup.
// The caller commits this draft through the same history/stock/CAD transaction as UI edits.
export function buildAssemblyDocument(current,input,{mode='replace',platform,catalog,references,idFactory=()=>crypto.randomUUID()}={}){
 const data=parse(input),append=mode==='append';
 if(!['replace','append'].includes(mode))throw Error('Chế độ nạp không hợp lệ.');
 if(data.platform&&data.platform!==platform)throw Error('JSON thuộc bộ linh kiện khác.');
 const entries=new Map(catalog.map(p=>[p.id,p])),draft=append?clone(current):{version:1,platform,title:data.title??current.title,hideCables:current.hideCables??true,kit:Object.hasOwn(data,'kit')?clone(data.kit):clone(current.kit??null),parts:[],groups:[],steps:[],guidePreferences:clone(data.guidePreferences||{})};
 const initial=new Set(draft.parts.map(p=>p.id)),used=new Set([...initial,...draft.groups.map(g=>g.id)]),idMap=Object.create(null),groupMap=Object.create(null),seen=new Set(),pending=[];
 function allocate(id){if(id===undefined)return idFactory();if(!projectIdValid(id))throw Error('ID không hợp lệ: '+String(id));if(seen.has(id))throw Error('ID bị lặp trong JSON: '+id);seen.add(id);let next=id;while(used.has(next))next=idFactory();used.add(next);idMap[id]=next;return next;}
 function add(row){
  if(!record(row))throw Error('Mỗi linh kiện phải là một đối tượng.');
  const sku=row.partId??row.sku,entry=entries.get(sku);if(!entry)throw Error('Mã linh kiện không có trong thư viện: '+String(sku));
  const id=allocate(row.id);used.add(id);const part={...clone(row),id,sku,label:row.label??entry.name,kind:entry.kind,position:vector(row.position,[draft.parts.length*50,50,0]),rotation:vector(row.rotation,[0,0,0])};delete part.partId;delete part.attachTo;
  if(part.mate){pending.push({part,link:clone(part.mate),raw:true});delete part.mate;}
  if(row.attachTo)pending.push({part,link:clone(row.attachTo),raw:false});
  draft.parts.push(part);if(draft.parts.length>250)throw Error('Tối đa 250 linh kiện.');return part;
 }
 function attach(source,link,raw=false){
  if(!record(link))throw Error('attachTo phải là đối tượng chứa targetId, sourceRef, targetRef.');
  const requested=link.targetId??link.target??link.id,targetId=idMap[requested]??requested,target=draft.parts.find(p=>p.id===targetId);
  if(!target||source.id===targetId)throw Error('Đích liên kết không hợp lệ: '+String(requested));
  const a=references[source.sku]?.find(r=>r.id===link.sourceRef),b=references[target.sku]?.find(r=>r.id===link.targetRef);
  if(!a||!b)throw Error('Không tìm thấy sourceRef/targetRef cho '+source.id+'. Đọc listParts() để lấy đúng ID điểm nối.');
  if(!compatibleReferences(a,b,source.sku,target.sku))throw Error('Hai điểm nối không tương thích: '+source.id+' / '+target.id);
  const depth=link.depth??recommendedInsertionDepth(a,b,source.sku,target.sku),twist=link.twist??0;
  if(!Number.isFinite(depth)||depth<0||depth>insertionLimit(a,b)||!Number.isFinite(twist)||Math.abs(twist)>10000)throw Error('Độ sâu hoặc góc lắp không hợp lệ.');
  if(!raw)Object.assign(source,matingPose(source,a,target,b,{depth,twist,flip:!!link.flip}));
  else if(!jointMetrics(source,target,a,b).valid)throw Error('Vị trí CAD không khớp liên kết đã khai báo: '+source.id);
  source.mate={target:target.id,sourceRef:a.id,targetRef:b.id,depth,twist,flip:!!link.flip};
 }
 function addGroups(groups){
  if(!Array.isArray(groups))throw Error('groups phải là mảng.');
  const rows=groups.map(g=>{if(!record(g)||!projectIdValid(g.id)||groupMap[g.id])throw Error('ID group không hợp lệ hoặc bị lặp.');let id=g.id;while(used.has(id))id=idFactory();used.add(id);groupMap[g.id]=id;return {...clone(g),id};});
  for(const group of rows)if(group.parentId)group.parentId=groupMap[group.parentId]??group.parentId;
  draft.groups.push(...rows);
 }
 if(data.commands!==undefined){
  if(!Array.isArray(data.commands)||data.commands.length>1000||data.parts!==undefined)throw Error('Dùng parts hoặc commands (tối đa 1000 lệnh), không dùng đồng thời.');
  for(const command of data.commands){
   if(!record(command)||!record(command.args??{}))throw Error('Mỗi lệnh dùng {command,args}.');const args=command.args||{};
   if(command.command==='addPart'){const part=add(args);for(const p of pending.splice(0))attach(p.part,p.link,p.raw);}
   else if(command.command==='attach'){const source=draft.parts.find(p=>p.id===(idMap[args.id]??args.id));if(!source)throw Error('Không tìm thấy linh kiện nguồn: '+args.id);if(initial.has(source.id)&&layerLocked(draft,source))throw Error('Layer bị khóa.');attach(source,args);}
   else if(command.command==='group'){if(!Array.isArray(args.ids)||args.ids.length<2)throw Error('Group cần ít nhất hai ID.');const id=args.id||idFactory();addGroups([{id,name:args.name||'AI group'}]);for(const requested of args.ids){const p=draft.parts.find(p=>p.id===(idMap[requested]??requested));if(!p||layerLocked(draft,p))throw Error('Không thể group linh kiện thiếu hoặc bị khóa.');p.groupId=groupMap[id];}}
   else throw Error('Lệnh batch chưa hỗ trợ: '+String(command.command)+'. Dùng addPart, attach hoặc group.');
  }
 }else{
  if(!Array.isArray(data.parts))throw Error('JSON cần có parts:[…] hoặc commands:[…].');
  if(data.parts.length>250)throw Error('Tối đa 250 linh kiện.');
  addGroups(data.groups??[]);for(const row of data.parts)add(row);
  for(const p of draft.parts.filter(p=>!initial.has(p.id)))if(p.groupId)p.groupId=groupMap[p.groupId]??p.groupId;
  // Explicit AI attachments are ordered by their parent dependencies, including
  // forward references. Never produce different poses from JSON array order.
  const remaining=[...pending],done=new Set();
  while(remaining.length){const index=remaining.findIndex(item=>!remaining.some(other=>other!==item&&other.part.id===(idMap[item.link.targetId??item.link.target??item.link.id]??item.link.targetId??item.link.target??item.link.id)));
   if(index<0)throw Error('Liên kết vòng lặp trong JSON.');const item=remaining.splice(index,1)[0];if(done.has(item.part.id))throw Error('Linh kiện có hai liên kết mâu thuẫn.');attach(item.part,item.link,item.raw);done.add(item.part.id);
  }
 }
 if(!validGroupTree(draft.groups))throw Error('Group có vòng lặp hoặc thiếu nhóm cha.');
 const byId=new Map(draft.parts.map(p=>[p.id,p]));
 for(const p of draft.parts)if(p.mate){const target=byId.get(p.mate.target),a=references[p.sku]?.find(r=>r.id===p.mate.sourceRef),b=references[target?.sku]?.find(r=>r.id===p.mate.targetRef);if(!target||!a||!b||!jointMetrics(p,target,a,b).valid)throw Error('Thao tác làm lệch liên kết của '+p.id+'. Hãy di chuyển cả cụm hoặc cập nhật các điểm nối.');}
 for(const p of draft.parts){const visited=new Set([p.id]);let next=p;while(next.mate){if(!byId.has(next.mate.target)||visited.has(next.mate.target))throw Error('Liên kết thiếu đích hoặc tạo vòng lặp.');visited.add(next.mate.target);next=byId.get(next.mate.target);}}
 const document=validateProjectFile(draft,platform,catalog);
 return {document,addedIds:document.parts.filter(p=>!initial.has(p.id)).map(p=>p.id),idMap};
}
