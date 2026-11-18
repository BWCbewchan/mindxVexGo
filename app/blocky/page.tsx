import Link from 'next/link';
import styles from './blocky.module.css';

export const metadata={title:'RoboCode · Lập trình khối · mindX'};

// Wraps the vendored RoboCode app (public/blocky, see public/blocky/SOURCE.md).
export default function BlockyPage(){
 return <main className={styles.page}>
  <header className={styles.bar}>
   <Link href="/" className={styles.brand} aria-label="mindX Robotics Lab, trang chủ"><img src="/mindx-logo-color-mark.png" alt="mindX"/></Link>
   <div className={styles.title}><strong>RoboCode</strong><span>Lập trình khối · sân 3D · thử thách</span></div>
   <nav aria-label="RoboCode" className={styles.links}>
    <Link href="/simulation">VR Lab</Link>
    <Link href="/training">Thử thách</Link>
    <a href="/blocky/index.html" target="_blank" rel="noopener">Mở toàn màn hình ↗</a>
   </nav>
   <p className={styles.credit}>Tác giả: Quang Thường</p>
  </header>
  <iframe className={styles.frame} src="/blocky/index.html" title="RoboCode: lập trình khối và mô phỏng robot 3D" allow="fullscreen; clipboard-write"/>
 </main>;
}
