'use client';
import {platformName,platformEditorUrl} from '../../public/assembly/platform-registry';
import {useEffect,useRef,useState} from 'react';
import CloudSync from '../components/robotics/cloud-sync';
import Link from 'next/link';import {useRouter} from 'next/navigation';
import {createProject,listProjects,loadProject,type Platform,type ProjectData} from '../../public/assembly/project-store';
export default function AssemblyClient({platform,projectId}:{platform:Platform;projectId:string}){
 const router=useRouter(),[loaded,setLoaded]=useState(false),[error,setError]=useState('');
 const frame=useRef<HTMLIFrameElement>(null);
 const apiGeneration=useRef(0),apiIdentity=useRef('');
 useEffect(()=>{const host=window as Window&{mindxAssembly?:unknown;assemblyAPI?:unknown},token=++apiGeneration.current,identity=platform+':'+projectId;if(apiIdentity.current&&apiIdentity.current!==identity){delete host.mindxAssembly;delete host.assemblyAPI;}apiIdentity.current=identity;return()=>{const facade=host.assemblyAPI,native=host.mindxAssembly;queueMicrotask(()=>{if(apiGeneration.current!==token)return;if(host.mindxAssembly===native)delete host.mindxAssembly;if(host.assemblyAPI===facade)delete host.assemblyAPI;});};},[platform,projectId]);
 useEffect(()=>{setLoaded(false);setError('');try{const data=loadProject(platform,projectId),meta=listProjects().find(p=>p.id===projectId&&p.platform===platform);if(!data)throw Error('Dự án không có trong trình duyệt này. Mở file dự án hoặc tạo mới từ màn hình chờ.');if(meta?.deletedAt)throw Error('Dự án nằm trong Thùng rác. Khôi phục để tiếp tục.');setLoaded(true);}catch(e){setError(e instanceof Error?e.message:'Không đọc được dự án.');}},[platform,projectId]);
 useEffect(()=>{const listener=(event:MessageEvent)=>{
  if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;
  if(event.data?.type==='assembly-new-request'){router.push('/assembly/projects?create='+platform);return;}
  if(event.data?.type==='assembly-project-saved'&&typeof event.data.title==='string')document.title=event.data.title+' · '+platformName(platform)+' · mindX';
  if(event.data?.type==='assembly-import-request'){try{const data=event.data.project as ProjectData;if(data?.version!==1||data.platform!==platform||!Array.isArray(data.parts))throw Error('Dự án nhập không hợp lệ.');const id=createProject(platform,data.title,data);router.push(`/assembly/${platform}/${id}`);}catch(e){setError(e instanceof Error?e.message:'Chưa nhập được dự án.');}}
 };window.addEventListener('message',listener);return()=>window.removeEventListener('message',listener);},[router,platform]);
 if(error)return <main style={{minHeight:'100dvh',display:'grid',placeContent:'center',gap:20,padding:30,background:'#22272e',color:'#e4edf6'}}><h1>Chưa mở được dự án</h1><p role="alert">{error}</p><Link href="/assembly/projects">← Về các dự án</Link></main>;
 if(!loaded)return <div role="status" style={{padding:30}}>Đang mở dự án…</div>;
 const src=platformEditorUrl(platform)+`?platform=${platform}&project=${encodeURIComponent(projectId)}`;
 return <><iframe key={src} ref={frame} title={platformName(platform)+' assembly editor'} src={src} style={{display:'block',width:'100%',height:'100dvh',border:0}}/><CloudSync silent platform={platform} id={projectId} frame={frame}/></>;
}
