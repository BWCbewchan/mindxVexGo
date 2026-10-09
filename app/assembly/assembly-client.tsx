'use client';
import {useEffect,useRef} from 'react';
import {useFormDialog} from '../components/form-dialog';
export default function AssemblyClient(){
 const frame=useRef<HTMLIFrameElement>(null);
 const {ask,dialog}=useFormDialog();
 useEffect(()=>{const listener=async(event:MessageEvent)=>{
  if(event.origin!==location.origin||event.source!==frame.current?.contentWindow||event.data?.type!=='assembly-new-request')return;
  const value=await ask({title:'Start a new assembly?',description:'Save your current project first if you want to keep it.',confirmOnly:true,submitLabel:'New assembly'});
  frame.current?.contentWindow?.postMessage({type:'assembly-new-result',approved:value!==null},location.origin);
 };window.addEventListener('message',listener);return()=>window.removeEventListener('message',listener);},[ask]);
 return <><iframe ref={frame} title="VEX GO assembly editor" src="/assembly/editor.html" style={{display:'block',width:'100%',height:'100dvh',border:0}}/>{dialog}</>;
}
