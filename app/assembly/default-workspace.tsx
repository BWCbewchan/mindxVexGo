'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import AssemblyClient from './assembly-client';
import {loadProject,listProjects,createProject,migrateLegacyDraft} from '../../public/assembly/project-store';
import {defaultKitProfile} from '../../public/assembly/kit-policy';
import {readAssemblyCatalog} from '../../public/assembly/project-catalog';

export default function DefaultWorkspace(){
 const [projectId,setProjectId]=useState(''),[error,setError]=useState('');
 useEffect(()=>{let active=true;(async()=>{try{
  migrateLegacyDraft();
  let id=localStorage.getItem('mindx-assembly-default-id-v1')||'default';
  const deleted=listProjects().some(p=>p.id===id&&p.platform==='vexgo'&&p.deletedAt);
  if(deleted||!loadProject('vexgo',id)){const catalog=await readAssemblyCatalog('vexgo');if(!active)return;id=createProject('vexgo','VEX GO · Không gian lắp ráp',{hideCables:true,kit:defaultKitProfile(catalog,'vexgo')});localStorage.setItem('mindx-assembly-default-id-v1',id);}
  if(active)setProjectId(id);
 }catch(e){if(active)setError(e instanceof Error?e.message:'Chưa mở được workspace.');}})();return()=>{active=false;};},[]);
 if(error)return <main style={{padding:30}}><p role="alert">{error}</p><Link href="/assembly/projects">Mở danh sách dự án</Link></main>;
 if(!projectId)return <main role="status" style={{padding:30}}>Đang mở không gian lắp ráp VEX GO… <Link href="/assembly/projects">Dự án của tôi</Link></main>;
 return <AssemblyClient platform="vexgo" projectId={projectId}/>;
}
