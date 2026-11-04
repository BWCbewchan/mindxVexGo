'use client';
import Link from 'next/link';
import {resetServiceRestriction} from '../../../lib/robotics/cloud-transport';
import styles from '../../library/library.module.css';
export default function ServiceRestriction({onRetry,admin=false}:{onRetry:()=>void;admin?:boolean}){return <section className={styles.panel} role="alert" data-service-restricted><h2>Thư viện đang tạm gián đoạn</h2><p>{admin?'Supabase đang chặn API vì vượt hạn mức dữ liệu truyền ra. Chủ tổ chức cần xử lý hạn mức trong Usage / Billing để khôi phục việc xem và duyệt mô hình.':'Hiện chưa thể tải thư viện. Bạn vẫn có thể mở và lắp mô hình đã lưu trên máy.'}</p><div className={styles.actions}><button onClick={()=>{resetServiceRestriction();onRetry();}}>Kiểm tra lại kết nối</button><Link className={styles.button} href="/assembly/projects">Mở dự án trên máy</Link></div></section>;}
