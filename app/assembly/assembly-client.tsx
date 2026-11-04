'use client';
import {projectCatalog} from '../../public/assembly/project-catalog';
import {platformName,platformEditorUrl} from '../../public/assembly/platform-registry';
import {useEffect,useRef,useState} from 'react';
import CloudSync from '../components/robotics/cloud-sync';
import Link from 'next/link';import {useRouter} from 'next/navigation';
import {createProject,listProjects,loadProject,platformValid,projectIdValid,validateProjectFile,type Platform,type ProjectData} from '../../public/assembly/project-store';
import styles from './workspace.module.css';
export default function AssemblyClient({platform,projectId}:{platform:Platform;projectId:string}){
 const identity=platform+':'+projectId;
 const router=useRouter(),[workspace,setWorkspace]=useState({identity:'',error:'',title:''}),[readyIdentity,setReadyIdentity]=useState(''),[notice,setNotice]=useState(''),[slow,setSlow]=useState(false),[reloading,setReloading]=useState(0),[navigating,setNavigating]=useState(false),[importing,setImporting]=useState(false);
 const frame=useRef<HTMLIFrameElement>(null);
 const apiGeneration=useRef(0),apiBinding=useRef<{identity:string;facade:unknown;native:unknown}|null>(null);
 useEffect(()=>{
  const host=window as Window&{mindxAssembly?:unknown;assemblyAPI?:unknown},token=++apiGeneration.current;
  const clearOwned=(binding:NonNullable<typeof apiBinding.current>)=>{if(host.mindxAssembly===binding.native)delete host.mindxAssembly;if(host.assemblyAPI===binding.facade)delete host.assemblyAPI;};
  if(apiBinding.current&&apiBinding.current.identity!==identity){clearOwned(apiBinding.current);apiBinding.current=null;}
  if(!apiBinding.current&&host.assemblyAPI)apiBinding.current={identity,facade:host.assemblyAPI,native:host.mindxAssembly};
  // Next may restore the mounted iframe on Back without a new load event.
  // Rebind its APIs instead of leaving the host cleared by the prior cleanup.
  const source=frame.current;
  if(source){const address=new URL(source.src),child=source.contentWindow as (Window&{assemblyAPI?:{ready?:Promise<unknown>;connected?:boolean}})|null;if(child?.assemblyAPI&&address.searchParams.get('project')===projectId&&address.searchParams.get('platform')===platform)frameLoaded(source);}
  return()=>{const binding=apiBinding.current;if(!binding||binding.identity!==identity)return;queueMicrotask(()=>{if(apiGeneration.current===token)clearOwned(binding);});};
 },[identity,platform,projectId,reloading]);
 useEffect(()=>{setReadyIdentity(current=>current===identity?current:'');setNotice('');setSlow(false);setNavigating(false);try{const data=loadProject(platform,projectId),meta=listProjects().find(p=>p.id===projectId&&p.platform===platform);if(!data)throw Error('Dự án không có trong trình duyệt này. Mở file dự án hoặc tạo mới từ màn hình chờ.');if(meta?.deletedAt)throw Error('Dự án nằm trong Thùng rác. Khôi phục để tiếp tục.');document.title=data.title+' · '+platformName(platform)+' · mindX';setWorkspace({identity,error:'',title:data.title});}catch(e){setWorkspace({identity,error:e instanceof Error?e.message:'Không đọc được dự án.',title:''});}},[identity,platform,projectId]);
 useEffect(()=>{if(readyIdentity===identity)return;const timer=setTimeout(()=>setSlow(true),12000);return()=>clearTimeout(timer);},[identity,readyIdentity,reloading]);
 useEffect(()=>{let active=true,opening=false;const listener=async(event:MessageEvent)=>{
  if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;
  if(event.data?.type==='assembly-new-request'){setNavigating(true);router.push('/assembly/projects?create='+platform);return;}
  if(event.data?.type==='assembly-navigation-request'){
   if(event.data.destination==='projects'){setNavigating(true);router.push('/assembly/projects');return;}
   const nextPlatform=event.data.platform,nextId=event.data.projectId;
   if(!platformValid(nextPlatform)||!projectIdValid(nextId))return;
   if(nextPlatform===platform&&nextId===projectId)return;
   const meta=listProjects().find(p=>p.platform===nextPlatform&&p.id===nextId);if(!meta||meta.deletedAt||!loadProject(nextPlatform,nextId)){setNotice('Dự án này không còn sẵn sàng. Mở Danh sách dự án để khôi phục hoặc chọn bản khác.');return;}
   setNavigating(true);router.push(`/assembly/${nextPlatform}/${nextId}`);return;
  }
  if(event.data?.type==='assembly-project-saved'&&typeof event.data.title==='string')document.title=event.data.title+' · '+platformName(platform)+' · mindX';
  if(event.data?.type==='assembly-import-request'&&!opening){opening=true;setImporting(true);setNotice('');try{const data=event.data.project as ProjectData,nextPlatform=data?.platform||platform;if(!platformValid(nextPlatform)||data?.version!==1||!Array.isArray(data.parts)||JSON.stringify(data).length>5e6)throw Error('Dự án nhập không hợp lệ.');const validated=validateProjectFile(data,nextPlatform,await projectCatalog(nextPlatform,data));if(!active)return;const id=createProject(nextPlatform,validated.title,validated);setNavigating(true);router.push(`/assembly/${nextPlatform}/${id}`);}catch(e){if(active)setNotice(e instanceof Error?e.message:'Chưa nhập được dự án.');}finally{opening=false;if(active)setImporting(false);}}
 };window.addEventListener('message',listener);return()=>{active=false;window.removeEventListener('message',listener);};},[router,platform,projectId]);
 const error=workspace.identity===identity?workspace.error:'';
 if(error)return <main style={{minHeight:'100dvh',display:'grid',placeContent:'center',gap:20,padding:30,background:'#22272e',color:'#e4edf6'}}><h1>Chưa mở được dự án</h1><p role="alert">{error}</p><Link href="/assembly/projects">← Về các dự án</Link></main>;
 if(workspace.identity!==identity)return <div className={styles.loading} role="status"><strong>Đang mở {platformName(platform)}…</strong><Link href="/assembly/projects">Về danh sách dự án</Link></div>;
 const src=platformEditorUrl(platform)+`?platform=${platform}&project=${encodeURIComponent(projectId)}&hosted=1`;
 function frameLoaded(source:HTMLIFrameElement){if(frame.current!==source)return;const markReady=()=>{if(frame.current===source){const child=source.contentWindow as (Window&{assemblyAPI?:unknown;mindxAssembly?:unknown})|null,host=window as Window&{assemblyAPI?:unknown;mindxAssembly?:unknown};if(child?.assemblyAPI){const pending=host.assemblyAPI as {connected?:boolean;ready?:Promise<unknown>}|undefined;host.assemblyAPI=child.assemblyAPI;host.mindxAssembly=child.mindxAssembly;apiBinding.current={identity,facade:child.assemblyAPI,native:child.mindxAssembly};if(pending?.ready&&!pending.connected&&pending!==child.assemblyAPI)window.dispatchEvent(new CustomEvent('assembly-api-ready',{detail:child.assemblyAPI}));}setReadyIdentity(identity);setSlow(false);}};try{const host=source.contentWindow as (Window&{assemblyAPI?:{connected?:boolean;ready?:Promise<unknown>;getState?:unknown}})|null;if(host?.assemblyAPI?.connected)markReady();else if(host?.assemblyAPI?.ready)void host.assemblyAPI.ready.then(markReady).catch(()=>{if(frame.current===source){setNotice('Chưa khởi tạo được trình lắp ráp. Bạn có thể tải lại dự án.');setSlow(true);}});else if(typeof host?.assemblyAPI?.getState==='function')markReady();else{setNotice('Chưa tải được trình lắp ráp. Thử tải lại hoặc về danh sách dự án.');setSlow(true);}}catch{setNotice('Chưa mở được trình lắp ráp. Bạn có thể tải lại dự án.');setSlow(true);}}
 const waiting=readyIdentity!==identity||navigating||importing;
 return <div className={styles.workspace} aria-busy={waiting}><iframe key={src+':'+reloading} ref={frame} title={platformName(platform)+' assembly editor'} src={src} className={styles.frame} onLoad={e=>frameLoaded(e.currentTarget)}/>{waiting&&<div className={styles.loading} role="status"><span className={styles.spinner} aria-hidden="true"/><strong>{importing?'Đang mở file với đúng bộ linh kiện…':navigating?'Đang chuyển dự án…':`Đang mở ${platformName(platform)}…`}</strong><span>{workspace.title}</span>{slow&&<><p>Đang tải mô hình và thư viện CAD. Dữ liệu dự án vẫn được giữ.</p><button onClick={()=>{const host=window as Window&{assemblyAPI?:unknown;mindxAssembly?:unknown},binding=apiBinding.current;if(binding){if(host.assemblyAPI===binding.facade)delete host.assemblyAPI;if(host.mindxAssembly===binding.native)delete host.mindxAssembly;}apiBinding.current=null;setSlow(false);setReadyIdentity('');setReloading(v=>v+1);}}>Tải lại dự án</button></>}<Link href="/assembly/projects">Về danh sách dự án</Link></div>}{notice&&<div className={styles.notice} role="alert"><span>{notice}</span><button aria-label="Đóng thông báo" onClick={()=>setNotice('')}>×</button></div>}<CloudSync silent platform={platform} id={projectId} frame={frame}/></div>;
}
