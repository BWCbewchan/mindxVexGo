import {platformCatalogUrl} from '../../public/assembly/platform-registry';
import {validateProjectFile,saveProject,loadProject,listProjects,createProject,type ProjectData,type Platform} from '../../public/assembly/project-store';
import type {CloudProject} from './models';
import {documentSignature} from './document-signature';
import {assertProjectIdentity,ownsProject,type ProjectIdentity} from './project-identity';
export {documentSignature} from './document-signature';
export function bindingKey(userId:string,platform:Platform,id:string){return 'mindx-robotics-binding:'+userId+':'+platform+':'+id;}
export function readBinding(userId:string,platform:Platform,id:string):{id:string;revision:number;signature:string}|null{try{return JSON.parse(localStorage.getItem(bindingKey(userId,platform,id))||'null');}catch{return null;}}
export function setBinding(userId:string,row:CloudProject){localStorage.setItem(bindingKey(userId,row.platform,row.local_id),JSON.stringify({id:row.id,revision:row.revision,signature:documentSignature(row.document)}));}
export async function checkedDocument(document:ProjectData,platform:Platform){const response=await fetch(platformCatalogUrl(platform));if(!response.ok)throw Error('Chưa đọc được thư viện CAD.');const catalog=await response.json();return {document:validateProjectFile(document,platform,catalog),catalog};}
export function boundToAnotherIdentity(key:string,platform:Platform,id:string){if(readBinding(key,platform,id))return false;for(let i=0;i<localStorage.length;i++){const name=localStorage.key(i);if(name?.startsWith('mindx-robotics-binding:')&&name.endsWith(':'+platform+':'+id))return true;}return false;}
export async function restoreProject(row:CloudProject,identity:ProjectIdentity){
 if(!ownsProject(identity,row))throw Error('Bản lưu không thuộc không gian hiện tại.');
 const {document}=await checkedDocument(row.document,row.platform);
 await assertProjectIdentity(identity);
 const old=loadProject(row.platform,row.local_id),meta=listProjects().find(p=>p.platform===row.platform&&p.id===row.local_id);
 if(meta?.deletedAt)throw Error('Dự án này nằm trong thùng rác trên máy. Khôi phục trước khi mở bản đám mây.');
 // Never lose a divergent local assembly when opening another device's version.
 if(old&&documentSignature(old)!==documentSignature(document))createProject(row.platform,old.title+' — bản máy này',{...old,title:(old.title+' — bản máy này').slice(0,120)});
 saveProject(row.platform,row.local_id,document,{thumbnail:row.thumbnail||undefined});setBinding(identity.key,{...row,document:loadProject(row.platform,row.local_id)!});
 return `/assembly/${row.platform}/${row.local_id}`;
}
export function restoreCloud(row:CloudProject,userId:string){return restoreProject(row,{kind:'account',key:userId,userId});}
