import styles from '../../workspace.module.css';
export default function LoadingProject(){return <div className={styles.loading} role="status"><span className={styles.spinner} aria-hidden="true"/><strong>Đang chuyển tới dự án…</strong></div>;}
