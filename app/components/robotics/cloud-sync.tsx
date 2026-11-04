'use client';
import {useEffect,useRef,useState,type RefObject} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useProjectIdentity,ownsProject} from '../../../lib/robotics/project-identity';
import {syncProject,submitProject,SyncConflict} from '../../../lib/robotics/sync';
import {restoreProject,documentSignature} from '../../../lib/robotics/project-data';
import {cloudError,type CloudProject} from '../../../lib/robotics/models';
import {loadProject,createProject,projectKey,type Platform,type ProjectData} from '../../../public/assembly/project-store';
import {useFormDialog} from '../form-dialog';
import styles from '../../library/library.module.css';
export default function CloudSync({platform,id,frame,silent=false}:{platform:Platform;id:string;frame:RefObject<HTMLIFrameElement|null>;silent?:boolean}){
 const {identity,user,loading,error:identityError}=useProjectIdentity(),router=useRouter(),{ask,dialog}=useFormDialog(),[status,setStatus]=useState('Đã lưu trên máy'),[message,setMessage]=useState(''),[syncError,setSyncError]=useState(''),[conflict,setConflict]=useState<CloudProject|null>(null),[busy,setBusy]=useState(false),[actionBusy,setActionBusy]=useState(false);
 const perform=useRef<(forceRemote?:boolean)=>Promise<CloudProject|null>>(async()=>null);
 const openedFor=useRef<{key:string;userId:string|null}>({key:platform+':'+id,userId:null}),[accountMismatch,setAccountMismatch]=useState(false);
 useEffect(()=>{setConflict(null);setMessage('');setSyncError('');setAccountMismatch(false);const key=platform+':'+id;if(openedFor.current.key!==key)openedFor.current={key,userId:null};if(!identity){setStatus('Đã lưu trên máy');perform.current=async()=>null;return;}
  if(openedFor.current.userId&&openedFor.current.userId!==identity.key){setAccountMismatch(true);setBusy(false);setStatus('Đã đổi tài khoản');setSyncError('Về Dự án để tiếp tục bằng không gian hiện tại. Bản lắp trên máy vẫn được giữ.');perform.current=async()=>null;return;}
  openedFor.current.userId=identity.key;let active=true,running:Promise<CloudProject|null>|null=null,queued=false,queuedForce=false,firstSync=true,dirty=false;
  const sync=(forceRemote=false):Promise<CloudProject|null>=>{if(running){queued=true;queuedForce||=forceRemote;return running;}dirty=false;const checkRemote=forceRemote||firstSync;if(active){setBusy(true);setStatus('Đang lưu hệ thống…');}running=(async()=>{try{const row=await syncProject(identity,platform,id,{forceRemote:checkRemote});if(row)firstSync=false;if(active){setConflict(null);setSyncError('');setStatus(row?'Đã lưu hệ thống':'Đã lưu trên máy');}return row;}catch(e){dirty=true;if(active){if(e instanceof SyncConflict){setConflict(e.remote);setStatus('Có bản mới trên máy khác');}else setStatus('Chưa lưu hệ thống');setSyncError(cloudError(e));}return null;}finally{running=null;if(active)setBusy(false);if(queued){const force=queuedForce;queued=queuedForce=false;void Promise.resolve().then(()=>sync(force));}}})();return running;};
  // Editing only marks the local draft. Database writes are lifecycle checkpoints.
  const markDirty=()=>{dirty=true;};
  perform.current=sync;
  const saved=(event:MessageEvent)=>{if(event.origin===location.origin&&event.source===frame.current?.contentWindow&&event.data?.type==='assembly-project-saved')markDirty();};
  const storage=(event:StorageEvent)=>{if(event.key===projectKey(platform,id))markDirty();};
  const checkpoint=()=>{if(dirty)void sync();};
  window.addEventListener('message',saved);window.addEventListener('storage',storage);window.addEventListener('pagehide',checkpoint);void sync(true);
  return()=>{active=false;window.removeEventListener('message',saved);window.removeEventListener('storage',storage);window.removeEventListener('pagehide',checkpoint);if(dirty)void sync();perform.current=async()=>null;};
 },[identity,platform,id,frame]);
 useEffect(()=>{const checkpoint=async(event:MessageEvent)=>{if(event.origin!==location.origin||event.source!==frame.current?.contentWindow||event.data?.type!=='assembly-project-checkpoint'||event.data.platform!==platform||event.data.projectId!==id||typeof event.data.requestId!=='string')return;const source=event.source as Window,requestId=event.data.requestId;let row=await perform.current();const latest=loadProject(platform,id);if(row&&latest&&documentSignature(row.document)!==documentSignature(latest))row=await perform.current();source.postMessage({type:'assembly-project-checkpoint-result',requestId,ok:!!row},location.origin);};window.addEventListener('message',checkpoint);return()=>window.removeEventListener('message',checkpoint);},[platform,id,frame]);
 async function flushEditor(hold=false){
  const target=frame.current,api=(target?.contentWindow as (Window&{mindxAssembly?:{execute:(command:string)=>Promise<{ok:boolean;result?:ProjectData;error?:string}>}})|null)?.mindxAssembly;
  if(!target||!api)throw Error('Đợi editor tải xong rồi thử lại.');
  target.inert=true;
  try{const result=await api.execute('flushProject');if(!result.ok||!result.result)throw Error('Chờ thao tác lắp hiện tại hoàn tất rồi thử lại.');if(!hold)target.inert=false;return result.result;}catch(e){target.inert=false;throw e;}
 }
 async function submit(){
  if(!identity)return;
  const description=await ask({title:'Gửi mô hình vào thư viện',label:'Giới thiệu mô hình (tối đa 2.000 ký tự)',description:'Bản hiện tại sẽ được gửi cho quản trị viên. Chỉ bản được duyệt mới xuất hiện công khai.',multiline:true,submitLabel:'Gửi duyệt'});
  if(description===null)return;if(description.length>2000){setMessage('Giới thiệu tối đa 2.000 ký tự.');return;}
  setActionBusy(true);
  try{
   const latest=await flushEditor(true);let row=await perform.current(true);
   if(row&&documentSignature(row.document)!==documentSignature(latest))row=await perform.current(true);
   if(!row){setMessage('Ghép ít nhất hai chi tiết với nhau trước khi gửi thư viện. Bản nháp vẫn được giữ trên máy.');return;}if(!ownsProject(identity,row))throw Error('ROBOTICS_ACCOUNT_CHANGED');
   if(documentSignature(row.document)!==documentSignature(latest))throw Error('Bản lắp đang thay đổi. Đợi lưu xong rồi gửi lại.');
   await submitProject(identity,row,description,String(user?.user_metadata.full_name||user?.email?.split('@')[0]||'Khách lắp ráp'));
   setMessage('Đã gửi duyệt. Theo dõi trạng thái tại màn hình dự án Assembly.');
  }catch(e){setMessage(cloudError(e));}finally{if(frame.current)frame.current.inert=false;setActionBusy(false);}
 }
 if(silent)return null;

 return <><div className={styles.syncBar} aria-label="Lưu mô hình đám mây" title="Mô hình tự động lưu vào hệ thống để quản trị viên xem và duyệt."><span role="status">{loading?'Đang chuẩn bị lưu…':status}</span><button disabled={!identity||busy||actionBusy||accountMismatch} onClick={()=>void flushEditor().then(()=>setStatus('Đã lưu trên máy')).catch(e=>setMessage(cloudError(e)))}>Lưu trên máy</button><button disabled={!identity||busy||actionBusy||accountMismatch||!!conflict} onClick={()=>void submit()}>Gửi thư viện</button><Link href="/assembly/projects">Dự án</Link>{conflict&&identity&&<><button disabled={busy||actionBusy||accountMismatch} onClick={async()=>{setActionBusy(true);try{await flushEditor(true);await restoreProject(conflict,identity);location.reload();}catch(e){if(frame.current)frame.current.inert=false;setMessage(cloudError(e));setActionBusy(false);}}}>Mở bản đám mây · giữ bản máy riêng</button><button disabled={busy||actionBusy||accountMismatch} onClick={async()=>{setActionBusy(true);try{const data=await flushEditor(true);if(data){const next=createProject(platform,(data.title+' — bản riêng').slice(0,120),{...data,title:(data.title+' — bản riêng').slice(0,120)});router.push(`/assembly/${platform}/${next}`);}}catch(e){if(frame.current)frame.current.inert=false;setMessage(cloudError(e));setActionBusy(false);}}}>Lưu bản của tôi riêng</button></>}{(identityError||syncError)&&<span className={styles.syncMessage}>{identityError||syncError}</span>}{message&&<span className={styles.syncMessage}>{message}</span>}</div>{dialog}</>;
}
