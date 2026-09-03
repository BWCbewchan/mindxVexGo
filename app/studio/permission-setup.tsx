'use client';
import {useEffect,useRef,useState,type RefObject} from 'react';

export default function PermissionSetup({frame,ready,open,onClose}:{frame:RefObject<HTMLIFrameElement|null>;ready:boolean;open:boolean;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 const [secure,setSecure]=useState(false);
 const [bluetooth,setBluetooth]=useState(false);
 const [fullscreen,setFullscreen]=useState(false);
 const [notice,setNotice]=useState('Choose the features you want to use. Your browser will ask you to confirm access.');
 useEffect(()=>{
  setSecure(window.isSecureContext);
  setBluetooth(!!(navigator as Navigator & {bluetooth?:unknown}).bluetooth);
  setFullscreen(document.fullscreenEnabled);
 },[]);
 useEffect(()=>{if(open&&!dialog.current?.open){dialog.current?.showModal();dialog.current?.focus();}else if(!open&&dialog.current?.open)dialog.current.close();},[open]);
 function connect(){
  const button=frame.current?.contentDocument?.querySelector<HTMLButtonElement>('.brain_button');
  if(!button){setNotice('The editor is still loading. Please try again.');return;}
  // Use the existing device connection flow and its VEX GO filters.
  // Access is requested by its Connect action, not by granting broad permissions.
  button.click();onClose();
 }
 async function enterFullscreen(){
  try{await document.documentElement.requestFullscreen();setNotice('Fullscreen is active.');}
  catch{setNotice('Fullscreen was not enabled. You can continue in the current window.');}
 }
 return <dialog ref={dialog} tabIndex={-1} className="permission-dialog" aria-labelledby="permissions-title" onCancel={onClose} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();onClose();}}}>
  <div className="permission-title"><span>WELCOME TO GO STUDIO</span><button onClick={onClose} aria-label="Close permissions">×</button></div>
  <h2 id="permissions-title">App permissions</h2>
  <p>Set up access for this device before you start.</p>
  <section><h3>Bluetooth · VEX GO Brain</h3><p>{!secure?'Open this website over HTTPS to connect a robot.':!bluetooth?'This browser does not support Web Bluetooth. You can still edit projects.':'Turn on your Brain. Open Brain settings, choose Connect, then select your robot in the browser prompt.'}</p><button disabled={!secure||!bluetooth||!ready} onClick={connect}>{ready?'Open Brain settings':'Loading editor…'}</button></section>
  <section><h3>Fullscreen · optional</h3><p>{fullscreen?'Use the full screen for your workspace and controls.':'Fullscreen is unavailable in this browser. The editor works in a normal window.'}</p><button disabled={!fullscreen} onClick={enterFullscreen}>Enable fullscreen</button></section>
  <section><h3>Project files & keyboard</h3><p>Choose files through File → Load From Your Device. Keyboard and touch controls need no extra browser permission. Enable controls in Setup when you are ready.</p></section>
  <p className="permission-notice" role="status">{notice}</p>
  <button className="permission-continue" onClick={onClose}>Continue to editor</button>
 </dialog>;
}
