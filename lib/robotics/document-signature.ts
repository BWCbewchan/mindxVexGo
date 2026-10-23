import type {ProjectData} from '../../public/assembly/project-store';

function canonical(value:unknown):unknown{
 if(Array.isArray(value))return value.map(canonical);
 if(value!==null&&typeof value==='object')return Object.fromEntries(Object.entries(value).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([key,item])=>[key,canonical(item)]));
 return value;
}
// PostgreSQL jsonb reorders object keys. Compare content, preserving array order.
export function documentSignature(document:ProjectData){
 const {savedAt:_,createdAt:__,projectId:___,...data}=document;
 return JSON.stringify(canonical(data));
}
