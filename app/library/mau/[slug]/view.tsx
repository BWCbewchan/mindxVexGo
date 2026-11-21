'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {checkedDocument} from '../../../../lib/robotics/project-data';
import {createProject,type ProjectData} from '../../../../public/assembly/project-store';
import RoboticsNav from '../../../components/robotics/nav';
import ModelPreview from '../../../components/robotics/model-preview';
import {referenceModels,KIND_NAMES,KIT_NAMES,type ReferenceModel} from '../../reference-library';
import styles from '../../library.module.css';

export default function ReferenceDetail({slug}:{slug:string}){
 const router=useRouter(),[model,setModel]=useState<ReferenceModel|null>(null),[all,setAll]=useState<ReferenceModel[]>([]),[document,setDocument]=useState<ProjectData|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{let active=true;(async()=>{try{
  const models=await referenceModels(),found=models.find(m=>m.slug===slug);if(!found)throw Error('Không tìm thấy mô hình chuẩn này.');if(active)setAll(models);
  const response=await fetch(`/library/reference/${encodeURIComponent(slug)}.json`);if(!response.ok)throw Error('Không đọc được mô hình.');
  const data=await response.json();if(active){setModel(found);setDocument(data);}
 }catch(e){if(active)setError(e instanceof Error?e.message:String(e));}})();return()=>{active=false;};},[slug]);
 async function copy(){if(!model||!document)return;setBusy(true);try{const {document:checked}=await checkedDocument(document,model.platform),id=createProject(model.platform,model.title,checked);router.push(`/assembly/${model.platform}/${id}`);}catch(e){setError(e instanceof Error?e.message:String(e));setBusy(false);}}
 return <main className={styles.page}><RoboticsNav/><div className={styles.wrap}><Link href="/library">← Thư viện mô hình</Link>{model?.parents.map(p=>{const parent=all.find(m=>m.slug===p);return parent?<span key={p}> · <Link href={'/library/mau/'+p}>Thuộc: {parent.title}</Link></span>:null;})}
  {model&&document?<><section className={styles.hero}><div className={styles.badges}><span className={styles.badge}>{KIT_NAMES[model.platform]}</span><span className={styles.badge}>{KIND_NAMES[model.kind]}</span><span className={styles.badge}>{model.courseName}</span><span className={styles.badge}>Mô hình chuẩn</span></div><h1>{model.title}</h1></section>
   <div className={styles.detailGrid}><ModelPreview document={document} platform={model.platform}/><div><h2>Về mô hình này</h2><p className={styles.reviewNote}>{model.note||'Cụm lắp từ mô hình CAD của giáo viên.'}</p>
    <p className={styles.meta}>{model.parts} chi tiết{model.electronics?` · ${model.electronics} thiết bị điện`:''}</p>
    <p className={styles.meta}>Nguồn: {model.source==='Assembly'?'Bản gốc trong Assembly':'CAD SolidWorks của giáo viên'}{model.source&&model.source!=='Assembly'?` (${model.source})`:''}, vị trí từng chi tiết giữ nguyên như bản vẽ.</p>
    <p>Bản sao mở trong Assembly có thể chỉnh sửa độc lập. Mô hình chuẩn không thay đổi theo bản sao của bạn.</p>
    <button className={styles.button} disabled={busy} onClick={()=>void copy()}>{busy?'Đang mở…':'Mở bản sao trong Assembly ↗'}</button></div></div>
   {model.children.length>0&&<section aria-label="Các cụm lắp bên trong"><h2>Các cụm lắp bên trong ({model.children.length})</h2><p className={styles.meta}>Mô hình này ghép từ các cụm dưới đây. Mở từng cụm để xem hoặc lắp riêng.</p><div className={styles.subGrid}>{model.children.map(c=>all.find(m=>m.slug===c)).filter((m):m is ReferenceModel=>!!m).map(c=><Link key={c.slug} href={'/library/mau/'+c.slug} className={styles.subCard}>{c.picture&&<img src={c.picture} alt={c.title} loading="lazy"/>}<span>{c.title}<small>{c.parts} chi tiết{c.subassemblyCount?` · gồm ${c.subassemblyCount} cụm`:''}</small></span></Link>)}</div></section>}</>
  :!error&&<p role="status">Đang đọc mô hình…</p>}
  {error&&<p className={styles.alert} role="alert">{error}</p>}</div></main>;
}
