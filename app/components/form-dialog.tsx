'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import './form-dialog.css';
type Options={title:string;label?:string;initial?:string;description?:string;multiline?:boolean;numeric?:boolean;danger?:boolean;confirmOnly?:boolean;submitLabel?:string};
type Request=Options&{resolve:(value:string|null)=>void};
export function useFormDialog(){
 const [request,setRequest]=useState<Request|null>(null);
 const pending=useRef<((value:string|null)=>void)|null>(null);
 const ask=useCallback((options:Options)=>new Promise<string|null>(resolve=>{pending.current?.(null);pending.current=resolve;setRequest({...options,resolve});}),[]);
 const close=useCallback((value:string|null)=>{pending.current?.(value);pending.current=null;setRequest(null);},[]);
 useEffect(()=>()=>{pending.current?.(null);},[]);
 return {ask,dialog:request?<FormDialog key={request.title} request={request} close={close}/>:null};
}
function FormDialog({request,close}:{request:Options;close:(value:string|null)=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 const [value,setValue]=useState(request.initial||'');
 useEffect(()=>{const dialog=ref.current;dialog?.showModal();return()=>dialog?.close();},[]);
 return <dialog ref={ref} className="app-form-dialog" aria-labelledby="app-dialog-title" aria-describedby={request.description?'app-dialog-description':undefined} onCancel={e=>{e.preventDefault();close(null);}}><form onSubmit={e=>{e.preventDefault();if(request.confirmOnly||value.trim())close(request.confirmOnly?'yes':value.trim());}}><header><h2 id="app-dialog-title">{request.title}</h2><button type="button" aria-label="Close dialog" onClick={()=>close(null)}>×</button></header>{request.description&&<p id="app-dialog-description">{request.description}</p>}{!request.confirmOnly&&<label>{request.label||request.title}{request.multiline?<textarea autoFocus required rows={6} maxLength={50000} value={value} onChange={e=>setValue(e.target.value)}/>:<input autoFocus required type={request.numeric?'number':'text'} min={request.numeric?1:undefined} max={request.numeric?1000:undefined} step={request.numeric?1:undefined} maxLength={request.numeric?undefined:100} value={value} onChange={e=>setValue(e.target.value)}/>}</label>}<footer><button autoFocus={request.confirmOnly} type="button" onClick={()=>close(null)}>Cancel</button><button className={request.danger?'app-dialog-danger':'app-dialog-submit'} disabled={!request.confirmOnly&&!value.trim()} type="submit">{request.submitLabel||'Save'}</button></footer></form></dialog>;
}
