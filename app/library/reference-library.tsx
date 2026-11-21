'use client';
import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import styles from './library.module.css';

// Reference models rebuilt from teacher SolidWorks CAD (scripts/build-reference-library.mjs).
export type ReferenceModel={slug:string;title:string;platform:'vexgo'|'vexiq';kind:'robot'|'small'|'part';course:string;courseName:string;note:string;parts:number;electronics:number;source:string;picture:string|null;children:string[];parents:string[];subassemblyCount:number;listed:boolean};
export const KIND_NAMES:Record<ReferenceModel['kind'],string>={robot:'Robot hoàn chỉnh',small:'Mô hình nhỏ',part:'Cụm lắp'};
export const KIT_NAMES:Record<ReferenceModel['platform'],string>={vexgo:'VEX GO',vexiq:'VEX IQ'};
const SORTS={default:'Gợi ý (robot trước)',most:'Nhiều chi tiết nhất',fewest:'Ít chi tiết nhất',name:'Tên A–Z'} as const;
type Sort=keyof typeof SORTS;

let cache:Promise<ReferenceModel[]>|undefined;
export function referenceModels(){return cache??=fetch('/library/reference/index.json').then(r=>{if(!r.ok)throw Error('Không đọc được danh mục mô hình chuẩn.');return r.json();}).then(d=>d.models as ReferenceModel[]).catch(e=>{cache=undefined;throw e;});}

function Chips<T extends string>({label,value,options,onChange}:{label:string;value:T;options:[T,string,number][];onChange:(v:T)=>void}){
 return <fieldset className={styles.chipGroup}><legend>{label}</legend>{options.map(([v,text,count])=><button type="button" key={v} aria-pressed={value===v} className={styles.chip} disabled={count===0&&value!==v} onClick={()=>onChange(v)}>{text}<small>{count}</small></button>)}</fieldset>;
}

export default function ReferenceLibrary(){
 const [models,setModels]=useState<ReferenceModel[]|null>(null),[error,setError]=useState('');
 const [search,setSearch]=useState(''),[kit,setKit]=useState<'all'|ReferenceModel['platform']>('all'),[kind,setKind]=useState<'all'|ReferenceModel['kind']>('all'),[course,setCourse]=useState('all'),[sort,setSort]=useState<Sort>('default'),[showParts,setShowParts]=useState(false);
 useEffect(()=>{let active=true;referenceModels().then(m=>{if(active)setModels(m);}).catch(e=>{if(active)setError(e.message);});return()=>{active=false;};},[]);
 // Sub-assemblies live inside their model; the checkbox lists them on their own too.
 const every=models??[],all=showParts?every:every.filter(m=>m.listed),hiddenParts=every.length-every.filter(m=>m.listed).length;
 const text=search.trim().toLocaleLowerCase('vi');
 // Each filter's counts respect the other filters, so a chip never leads to an empty page.
 const match=(m:ReferenceModel,skip?:'kit'|'kind'|'course')=>(skip==='kit'||kit==='all'||m.platform===kit)&&(skip==='kind'||kind==='all'||m.kind===kind)&&(skip==='course'||course==='all'||m.course===course)&&(!text||`${m.title} ${m.note} ${m.courseName}`.toLocaleLowerCase('vi').includes(text));
 const count=(skip:'kit'|'kind'|'course',test:(m:ReferenceModel)=>boolean)=>all.filter(m=>match(m,skip)&&test(m)).length;
 const courses=useMemo(()=>[...new Map(all.map(m=>[m.course,m.courseName])).entries()],[all]);
 const shown=all.filter(m=>match(m)).sort((a,b)=>sort==='most'?b.parts-a.parts:sort==='fewest'?a.parts-b.parts:sort==='name'?a.title.localeCompare(b.title,'vi'):0);
 const active=[kit!=='all',kind!=='all',course!=='all',!!text,showParts].filter(Boolean).length;
 const reset=()=>{setKit('all');setKind('all');setCourse('all');setSearch('');setSort('default');setShowParts(false);};
 if(error)return <p className={styles.alert} role="alert">{error}</p>;
 if(!models)return <p role="status">Đang mở mô hình chuẩn…</p>;
 return <section aria-label="Mô hình chuẩn">
  <div className={styles.filters}>
   <input type="search" aria-label="Tìm mô hình chuẩn" placeholder="Tìm theo tên, khoá học…" value={search} onChange={e=>setSearch(e.target.value)}/>
   <Chips label="Bộ kit" value={kit} onChange={setKit} options={[['all','Tất cả',count('kit',()=>true)],['vexgo','VEX GO',count('kit',m=>m.platform==='vexgo')],['vexiq','VEX IQ',count('kit',m=>m.platform==='vexiq')]]}/>
   <Chips label="Loại mô hình" value={kind} onChange={setKind} options={[['all','Tất cả',count('kind',()=>true)],...(['robot','small','part'] as const).map(k=>[k,KIND_NAMES[k],count('kind',m=>m.kind===k)] as [typeof k,string,number])]}/>
   <div className={styles.filterRow}>
    <label>Khoá học<select value={course} onChange={e=>setCourse(e.target.value)}><option value="all">Tất cả khoá học</option>{courses.map(([id,name])=><option key={id} value={id}>{name} ({count('course',m=>m.course===id)})</option>)}</select></label>
    <label>Sắp xếp<select value={sort} onChange={e=>setSort(e.target.value as Sort)}>{Object.entries(SORTS).map(([v,t])=><option key={v} value={v}>{t}</option>)}</select></label>
    <label className={styles.check}><input type="checkbox" checked={showParts} onChange={e=>setShowParts(e.target.checked)}/>Hiện cả {hiddenParts} cụm lắp con</label>
    <p className={styles.resultCount} role="status">{shown.length} / {all.length} mô hình{active?` · ${active} bộ lọc`:''}</p>
    {active>0&&<button type="button" onClick={reset}>Xoá bộ lọc</button>}
   </div>
  </div>
  {shown.length?<div className={styles.grid}>{shown.map(m=><article className={styles.card} key={m.slug}><Link href={'/library/mau/'+m.slug}><div className={styles.cover}>{m.picture?<img src={m.picture} alt={m.title} loading="lazy" decoding="async"/>:<span>◇ {KIT_NAMES[m.platform]}</span>}</div><div className={styles.cardBody}><div className={styles.badges}><span className={styles.badge}>{KIT_NAMES[m.platform]}</span><span className={styles.badge}>{KIND_NAMES[m.kind]}</span><span className={styles.badge}>{m.courseName}</span></div><h2>{m.title}</h2><p>{m.note||'Cụm lắp từ mô hình CAD của giáo viên.'}</p><span className={styles.meta}>{m.parts} chi tiết{m.subassemblyCount?` · gồm ${m.subassemblyCount} cụm lắp`:''}{m.electronics?` · ${m.electronics} thiết bị điện`:''} · Xem mô hình ↗</span></div></Link></article>)}</div>
  :<div className={styles.empty}><h2>Không có mô hình khớp bộ lọc</h2><p>Bỏ bớt một bộ lọc hoặc đổi từ khoá tìm kiếm.</p><button type="button" onClick={reset}>Xoá bộ lọc</button></div>}
 </section>;
}
