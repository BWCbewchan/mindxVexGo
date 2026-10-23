'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {roboticsClient} from '../../../lib/robotics/supabase';
import {cloudError,type Submission} from '../../../lib/robotics/models';
import {checkedDocument} from '../../../lib/robotics/project-data';
import {createProject} from '../../../public/assembly/project-store';
import RoboticsNav from '../../components/robotics/nav';
import ModelPreview from '../../components/robotics/model-preview';
import styles from '../library.module.css';
export default function LibraryDetail({id}:{id:string}){const router=useRouter(),[item,setItem]=useState<Submission|null>(null),[error,setError]=useState(''),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false);useEffect(()=>{let active=true;(async()=>{try{if(!/^[0-9a-f-]{36}$/i.test(id))throw Error('Không tìm thấy mô hình.');const {data,error}=await roboticsClient().from('robotics_submissions').select('*').eq('id',id).maybeSingle();if(error)throw error;if(!data)throw Error('Mô hình chưa được công khai hoặc không tồn tại.');if(active)setItem(data);}catch(e){if(active)setError(cloudError(e));}finally{if(active)setLoading(false);}})();return()=>{active=false;};},[id]);
 async function copy(){if(!item?.document)return;setBusy(true);try{const {document}=await checkedDocument(item.document,item.platform),project=createProject(item.platform,item.title,document);router.push(`/assembly/${item.platform}/${project}`);}catch(e){setError(cloudError(e));setBusy(false);}}
 return <main className={styles.page}><RoboticsNav/><div className={styles.wrap}><Link href="/library">← Thư viện mô hình</Link>{loading?<p role="status">Đang đọc mô hình…</p>:item?<><section className={styles.hero}><span className={styles.badge}>{item.platform.toUpperCase()} · {item.status==='approved'?'Đã duyệt':'Chưa công khai'}</span><h1>{item.title}</h1></section><div className={styles.detailGrid}>{item.document&&<ModelPreview document={item.document} platform={item.platform}/>}<div><h2>Về mô hình này</h2><p className={styles.reviewNote}>{item.description||'Một thiết kế từ cộng đồng Robotics.'}</p><p className={styles.meta}>Tác giả: {item.author_name} · Bản gửi #{item.project_revision}</p><p>Bản sao mở trong Assembly có thể chỉnh sửa độc lập. Mô hình thư viện không thay đổi theo bản sao của bạn.</p><button className={styles.button} disabled={busy} onClick={()=>void copy()}>{busy?'Đang mở…':'Mở bản sao trong Assembly ↗'}</button></div></div></>:null}{error&&<p className={styles.alert} role="alert">{error}</p>}</div></main>;
}
