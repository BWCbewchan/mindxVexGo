'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import styles from './build-tabs.module.css';

const tabs=[
 {href:'/assembly/projects',label:'Dự án của tôi',match:(p:string)=>p.startsWith('/assembly')},
 {href:'/library',label:'Thư viện mẫu',match:(p:string)=>p.startsWith('/library')},
];

/** Shared header for the merged "Lắp ráp" area: my projects and the public model library. */
export default function BuildTabs({tone='light'}:{tone?:'light'|'plain'}){
 const path=usePathname()||'';
 return <div className={styles.head} data-tone={tone}>
  <div className={styles.title}><h1>Lắp ráp</h1><p>Dự án của bạn và các mẫu đã duyệt, ở cùng một chỗ.</p></div>
  <nav className={styles.tabs} aria-label="Lắp ráp">{tabs.map(t=>{const on=t.match(path);return <Link key={t.href} href={t.href} aria-current={on?'page':undefined} className={on?styles.on:undefined}>{t.label}</Link>;})}</nav>
 </div>;
}
