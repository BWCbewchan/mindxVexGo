import styles from './route-loading.module.css';

/** Instant feedback while a heavy route (editor, simulator, iframe app) loads. Used by loading.tsx files. */
export default function RouteLoading({title,detail}:{title:string;detail:string}){
 return <main className={styles.page} aria-busy="true">
  <div className={styles.bar} aria-hidden="true"><span className={styles.mark}/><span className={styles.line}/><span className={styles.lineShort}/></div>
  <div className={styles.body} role="status">
   <span className={styles.spinner} aria-hidden="true"/>
   <strong>{title}</strong>
   <span>{detail}</span>
  </div>
 </main>;
}
