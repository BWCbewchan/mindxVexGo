'use client';
import {useEffect,useRef,useState} from 'react';
import type {ProjectData,Platform} from '../../../public/assembly/project-store';
import {checkedDocument} from '../../../lib/robotics/project-data';
import styles from '../../library/library.module.css';
export default function ModelPreview({document,platform}:{document:ProjectData;platform:Platform}){
 const frame=useRef<HTMLIFrameElement>(null),[ready,setReady]=useState(false),[data,setData]=useState<Awaited<ReturnType<typeof checkedDocument>>|null>(null),[error,setError]=useState('');
 useEffect(()=>{let active=true;setData(null);setError('');checkedDocument(document,platform).then(value=>{if(active)setData(value);}).catch(e=>{if(active)setError(e.message);});return()=>{active=false;};},[document,platform]);
 useEffect(()=>{if(ready&&data)frame.current?.contentWindow?.postMessage({type:'vr-init',project:data.document,catalog:data.catalog},location.origin);},[ready,data]);
 useEffect(()=>{const receive=(event:MessageEvent)=>{if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;const m=event.data;if(m?.type==='vr-viewer-ready')setReady(true);if(m?.type==='vr-model-error')setError(m.message);if(m?.type==='vr-model-ready'){const span=Math.max(700,m.radius*3),send=(value:object)=>frame.current?.contentWindow?.postMessage(value,location.origin);send({type:'vr-field',field:{width:span,height:span,start:{x:span/2,y:span/2,heading:0},goal:{x:span/2,y:span/2,radius:0},objective:'delivery',walls:[],blocks:[],zones:[],checkpoints:[],robot:{radius:m.radius,yaw:0,eye:false}}});send({type:'vr-pose',x:span/2,y:span/2,heading:0,revision:1,blocks:[],strokes:[]});send({type:'vr-view',mode:'isometric'});}};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);},[]);
 return <div className={styles.preview}><iframe ref={frame} src="/simulation/viewer.html?preview=1" title="Xem mô hình 3D"/>{error&&<p role="status" className={styles.previewStatus}>{error}</p>}</div>;
}
