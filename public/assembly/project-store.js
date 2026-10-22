import {validateKitProfile} from './kit-policy.js';
export const PROJECT_INDEX='mindx-assembly-projects-v1';
export const platformValid=value=>['vexgo','vexiq'].includes(value);
export const projectIdValid=id=>typeof id==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(id);
export function validateProjectFile(data,platform,catalog){
 if(!platformValid(platform)||data?.platform&&data.platform!==platform||data?.version!==1||typeof data.title!=='string'||!data.title.trim()||data.title.length>120||!Array.isArray(data.parts)||data.parts.length>250)throw Error('File dự án không hợp lệ.');
 const entries=new Map(catalog.map(p=>[p.id,p])),groups=data.groups??[],vector=v=>Array.isArray(v)&&v.length===3&&v.every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<=10000);
 if(!Array.isArray(groups)||groups.length>250||new Set(groups.map(g=>g?.id)).size!==groups.length||groups.some(g=>!g||!projectIdValid(g.id)||typeof g.name!=='string'||!g.name.trim()||g.name.length>120))throw Error('Dữ liệu nhóm không hợp lệ.');
 const groupIds=new Map(groups.map(g=>[g.id,g]));for(const group of groups){const seen=new Set([group.id]);let parent=group.parentId;while(parent){if(seen.has(parent)||!groupIds.has(parent))throw Error('Nhóm bị vòng lặp hoặc thiếu nhóm cha.');seen.add(parent);parent=groupIds.get(parent).parentId;}}
 if(new Set(data.parts.map(p=>p?.id)).size!==data.parts.length||data.parts.some(p=>!p||!projectIdValid(p.id)||!entries.has(p.sku)||typeof p.label!=='string'||p.label.length>200||!vector(p.position)||!vector(p.rotation)||p.groupId&&!groupIds.has(p.groupId)))throw Error('Linh kiện, layer hoặc tọa độ không thuộc thư viện dự án này.');
 return {...structuredClone(data),kit:data.kit?validateKitProfile(data.kit,catalog,platform):null,platform,parts:data.parts.map(p=>({...structuredClone(p),kind:entries.get(p.sku).kind}))};
}
export function projectKey(platform,id){if(!platformValid(platform)||!projectIdValid(id))throw Error('Dự án không hợp lệ.');return `mindx-assembly-project-v1:${platform}:${id}`;}
function readIndex(storage){const value=JSON.parse(storage.getItem(PROJECT_INDEX)||'[]');if(!Array.isArray(value))throw Error('Danh sách dự án không hợp lệ.');return value.filter(p=>platformValid(p.platform)&&projectIdValid(p.id));}
export function listProjects(storage=globalThis.localStorage){
 const rows=readIndex(storage),known=new Set(rows.map(p=>projectKey(p.platform,p.id)));
 // Recover projects after an index write fails. Never discard valid CAD data.
 for(let i=0;i<storage.length;i++){const key=storage.key(i);if(!key?.startsWith('mindx-assembly-project-v1:')||known.has(key))continue;try{const [,platform,id]=key.split(':'),data=JSON.parse(storage.getItem(key));if(platformValid(platform)&&projectIdValid(id)&&Array.isArray(data.parts))rows.push({id,platform,title:data.title||'Dự án',createdAt:data.createdAt||Date.now(),updatedAt:data.savedAt||Date.now(),partCount:data.parts.length});}catch{}}
 return rows.sort((a,b)=>b.updatedAt-a.updatedAt);
}
export function loadProject(platform,id,storage=globalThis.localStorage){const value=storage.getItem(projectKey(platform,id));return value?JSON.parse(value):null;}
export function saveProject(platform,id,data,{thumbnail}={},storage=globalThis.localStorage){
 if(data.platform&&data.platform!==platform)throw Error('Không thể lưu dữ liệu sang bộ linh kiện khác.');
 const key=projectKey(platform,id),now=Date.now(),rows=listProjects(storage),existing=rows.find(p=>p.id===id&&p.platform===platform);
 if(existing?.deletedAt)throw Error('Dự án nằm trong thùng rác. Khôi phục trước khi chỉnh sửa.');
 const payload={...data,platform,projectId:id,createdAt:existing?.createdAt||data.createdAt||now,savedAt:now};
 storage.setItem(key,JSON.stringify(payload));
 const meta={...existing,id,platform,title:payload.title,createdAt:payload.createdAt,updatedAt:now,partCount:payload.parts.length,...(thumbnail?{thumbnail}:{})};
 const next=rows.filter(p=>p.id!==id||p.platform!==platform);next.push(meta);storage.setItem(PROJECT_INDEX,JSON.stringify(next));return meta;
}
export function createProject(platform,title,data,storage=globalThis.localStorage){const id=crypto.randomUUID();saveProject(platform,id,{version:1,title:title.trim().slice(0,120),parts:[],groups:[],steps:[],hideCables:true,...data}, {},storage);return id;}
export function markProjectDeleted(platform,id,deleted,storage=globalThis.localStorage){const rows=listProjects(storage),row=rows.find(p=>p.id===id&&p.platform===platform);if(!row)throw Error('Không tìm thấy dự án.');if(deleted)row.deletedAt=Date.now();else delete row.deletedAt;storage.setItem(PROJECT_INDEX,JSON.stringify(rows));}
export function migrateLegacyDraft(storage=globalThis.localStorage){
 const marker='mindx-assembly-legacy-migrated-v1';if(storage.getItem(marker))return;
 const value=storage.getItem('mindx-vexgo-assembly-v1');if(!value){storage.setItem(marker,'none');return;}
 const data=JSON.parse(value);if(data?.version!==1||!Array.isArray(data.parts))throw Error('Bản nháp cũ không hợp lệ; file gốc vẫn được giữ.');
 const existing=listProjects(storage).find(p=>p.legacyDraft);if(existing){storage.setItem(marker,existing.id);return;}
 if(!data.parts.length){storage.setItem(marker,'empty');return;}
 const id=createProject('vexgo',data.title||'Bản nháp VEX GO',data,storage),rows=listProjects(storage);rows.find(p=>p.id===id).legacyDraft=true;storage.setItem(PROJECT_INDEX,JSON.stringify(rows));storage.setItem(marker,id);
}
