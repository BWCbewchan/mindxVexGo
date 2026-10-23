'use client';
import {roboticsClient} from './supabase';
import {documentSignature,readBinding,setBinding,boundToAnotherIdentity} from './project-data';
import {assertProjectIdentity,ownsProject,guestArgs,type ProjectIdentity} from './project-identity';
import {listProjects,loadProject,type Platform} from '../../public/assembly/project-store';
import {submissionFields,type Submission,type CloudProject} from './models';
export class SyncConflict extends Error{constructor(public remote:CloudProject){super('ROBOTICS_CONFLICT');}}
export async function findCloudProject(identity:ProjectIdentity,platform:Platform,id:string):Promise<CloudProject|null>{const c=roboticsClient();const result=identity.kind==='guest'?await c.rpc('robotics_guest_project',{...guestArgs(identity),p_platform:platform,p_local_id:id}):await c.from('robotics_projects').select('*').eq('owner_id',identity.userId).eq('platform',platform).eq('local_id',id).maybeSingle();if(result.error)throw result.error;return result.data as CloudProject|null;}
export async function getCloudProject(identity:ProjectIdentity,id:string):Promise<CloudProject>{const c=roboticsClient();const result=identity.kind==='guest'?await c.rpc('robotics_guest_project',{...guestArgs(identity),p_id:id}):await c.from('robotics_projects').select('*').eq('id',id).single();if(result.error)throw result.error;if(!result.data?.id)throw Error('Không tìm thấy bản lưu.');return result.data as CloudProject;}
export async function cloudProjects(identity:ProjectIdentity,page:number){const c=roboticsClient();const result=identity.kind==='guest'?await c.rpc('robotics_guest_projects',{...guestArgs(identity),p_page:page}):await c.from('robotics_projects').select('id,owner_id,visitor_id,local_id,platform,title,thumbnail,revision,updated_at').eq('owner_id',identity.userId).order('updated_at',{ascending:false}).range(page*12,page*12+11);if(result.error)throw result.error;return result.data as CloudProject[];}
export async function cloudSubmissions(identity:ProjectIdentity){const c=roboticsClient();const result=identity.kind==='guest'?await c.rpc('robotics_guest_submissions',guestArgs(identity)):await c.from('robotics_submissions').select(submissionFields).eq('owner_id',identity.userId).order('created_at',{ascending:false}).limit(30);if(result.error)throw result.error;return result.data as unknown as Submission[];}
export async function syncProject(identity:ProjectIdentity,platform:Platform,id:string){
 const client=roboticsClient(),document=loadProject(platform,id),meta=listProjects().find(p=>p.platform===platform&&p.id===id);
 if(!document||meta?.deletedAt)throw Error('Dự án không có trên máy hoặc đang ở thùng rác.');
 await assertProjectIdentity(identity);
 if(boundToAnotherIdentity(identity.key,platform,id))throw Error('Bản lắp đã thuộc không gian khác. Nhân bản dự án ở màn hình dự án để lưu vào không gian hiện tại.');
 const signature=documentSignature(document),binding=readBinding(identity.key,platform,id),remote=await findCloudProject(identity,platform,id);
 if(remote&&documentSignature(remote.document)===signature){setBinding(identity.key,remote);return remote;}
 if(remote&&(!binding||binding.revision!==remote.revision))throw new SyncConflict(remote);
 await assertProjectIdentity(identity);
 const params={p_local_id:id,p_platform:platform,p_title:document.title,p_document:document,p_thumbnail:meta?.thumbnail||null,p_expected_revision:remote?.revision??null};
 const result=identity.kind==='guest'?await client.rpc('robotics_guest_save',{...guestArgs(identity),...params}):await client.rpc('robotics_save_project',{...params,p_expected_owner:identity.userId});
 if(result.error){if(result.error.message.includes('ROBOTICS_CONFLICT')){const fresh=await findCloudProject(identity,platform,id);if(fresh)throw new SyncConflict(fresh);}throw result.error;}
 const row=result.data as CloudProject;if(!ownsProject(identity,row))throw Error('ROBOTICS_ACCOUNT_CHANGED');setBinding(identity.key,row);return row;
}
export function syncLocalProject(userId:string,platform:Platform,id:string){return syncProject({kind:'account',key:userId,userId},platform,id);}
export async function submitProject(identity:ProjectIdentity,row:CloudProject,description:string,authorName:string){await assertProjectIdentity(identity);if(!ownsProject(identity,row))throw Error('ROBOTICS_ACCOUNT_CHANGED');const c=roboticsClient();const result=identity.kind==='guest'?await c.rpc('robotics_guest_submit',{...guestArgs(identity),p_id:row.id,p_revision:row.revision,p_description:description}):await c.from('robotics_submissions').insert({project_id:row.id,project_revision:row.revision,title:row.title,description,author_name:authorName.slice(0,80)});if(result.error){if(result.error.code==='23505')throw Error('Bản này đã được gửi. Xem trạng thái ở màn hình dự án.');throw result.error;}}
