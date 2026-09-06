'use client';
import {useEffect,useRef,useState} from 'react';
import devices from '../../public/quiz/devices.json';
import type {Question} from './model';
import {blockExample} from './block-examples';
export function Illustration({src,caption,large=false}:{src:string;caption:string;large?:boolean}){
 const [open,setOpen]=useState(false),[failed,setFailed]=useState(false);const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(open){dialog.current?.showModal();}return()=>dialog.current?.close();},[open]);
 return <><button type="button" className={'quiz-illustration'+(large?' primary-image':'')} aria-label={'Phóng to: '+caption} onClick={()=>setOpen(true)}>{failed?<span>Image unavailable · open original</span>:<img src={src} alt={caption} loading="lazy" onError={()=>setFailed(true)}/>}<span>{caption} ↗</span></button>{open&&<dialog ref={dialog} className="quiz-image-dialog" aria-label={caption} onCancel={e=>{e.preventDefault();setOpen(false);}}><header><strong>{caption}</strong><button autoFocus onClick={()=>setOpen(false)} aria-label="Close image">×</button></header><div><img src={src} alt={caption}/></div><a href={src} target="_blank" rel="noreferrer">Open full-size image ↗</a></dialog>}</>;
}
export function QuestionVisuals({question}:{question:Question}){
 const example=blockExample(question.prompt);
 const refs=(question.references||[]).filter(r=>r.kind==='question'||r.kind==='device');
 if(example)return <section className="quiz-visuals quiz-block-example" aria-label="Programming blocks"><strong>Quan sát thẻ lệnh</strong><Illustration src={example.src} caption={example.caption} large/><p>Thẻ lệnh từ trình lập trình của app · Ví dụ minh họa khái niệm trong câu hỏi.</p><details><summary>Đọc mô tả thẻ lệnh</summary><p lang="vi">{example.description}</p></details></section>;
 if(!refs.length&&!question.context)return null;
 return <section className="quiz-visuals" aria-label="Question illustrations">{question.context&&<div className="quiz-question-context"><strong>{question.context.label}</strong>{question.context.src?<Illustration src={question.context.src} caption="Trích đoạn nhiệm vụ" large/>:<blockquote>{question.context.text}</blockquote>}{question.context.src&&<details><summary>Đọc nội dung trích đoạn</summary><blockquote>{question.context.text}</blockquote></details>}</div>}<div>{refs.map(r=><Illustration key={r.src} src={r.src} caption={r.caption} large={r.kind==='question'}/>)}</div></section>;
}
export function DeviceReference(){return <details className="quiz-device-reference"><summary>VEX GO · Device reference</summary><div className="quiz-device-grid">{devices.map(d=><Illustration key={d.id} src={d.src} caption={d.name}/>)}</div><p>Images: <a href="https://www.vexrobotics.com/parts/269-6911" target="_blank" rel="noreferrer">VEX Robotics — GO Kit Contents ↗</a></p></details>;}
