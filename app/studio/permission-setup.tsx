'use client';
import {useEffect,useRef,useState,type RefObject} from 'react';

export default function PermissionSetup({frame,ready,open,onClose}:{frame:RefObject<HTMLIFrameElement|null>;ready:boolean;open:boolean;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 const [secure,setSecure]=useState(false);
 const [bluetooth,setBluetooth]=useState(false);
 const [fullscreen,setFullscreen]=useState(false);
 const [appleMobile,setAppleMobile]=useState(false);
 const [notice,setNotice]=useState('Choose the features you want to use. Your browser will ask you to confirm access.');
 useEffect(()=>{
  setSecure(window.isSecureContext);
  setBluetooth(typeof (navigator as Navigator & {bluetooth?:{requestDevice?:unknown}}).bluetooth?.requestDevice==='function');
  setFullscreen(!!document.fullscreenEnabled);
  setAppleMobile(/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1));
 },[]);
 useEffect(()=>{
  const element=dialog.current;if(!element)return;
  if(open&&!element.open){
   if(typeof element.showModal==='function')element.showModal();
   else{element.setAttribute('open','');element.classList.add('dialog-fallback');}
   element.focus();
  }else if(!open&&element.hasAttribute('open')){
   if(typeof element.close==='function')element.close();else element.removeAttribute('open');
  }
 },[open]);
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
  {!bluetooth&&<section><h3>{appleMobile?'Using an iPhone or iPad':'Choose a compatible browser'}</h3><p>{appleMobile?'Safari cannot connect directly to a Brain. A browser with Web Bluetooth, such as Bluefy, may provide device access; this robot connection still needs verification on your device.':'For robot access, open this HTTPS link in Chrome or Edge on a supported computer, or Chrome on Android. In-app browsers may not expose Bluetooth.'}</p>{appleMobile&&<a href="https://apps.apple.com/app/bluefy-web-ble-browser/id1492822055" target="_blank" rel="noreferrer">View Bluefy in the App Store ↗</a>}</section>}
  <details><summary>Brain not appearing?</summary><p>Charge and turn on the Brain, keep it nearby, and disconnect it from other apps or devices. Enable Bluetooth and allow nearby-device access in your browser or system settings. Canceling the chooser does not grant access; choose Connect again to retry.</p><a href="https://kb.vex.com/hc/en-us/articles/4403005149972-Troubleshooting-Connecting-to-Web-based-VEXcode-GO" target="_blank" rel="noreferrer">VEX connection troubleshooting ↗</a></details>
  <section><h3>Fullscreen · optional</h3><p>{fullscreen?'Use the full screen for your workspace and controls.':'Fullscreen is unavailable in this browser. The editor works in a normal window.'}</p><button disabled={!fullscreen} onClick={enterFullscreen}>Enable fullscreen</button></section>
  <section><h3>Project files & keyboard</h3><p>Choose files through File → Load From Your Device. Keyboard and touch controls need no extra browser permission. Enable controls in Setup when you are ready.</p></section>
  <p className="permission-notice" role="status">{notice}</p>
  <button className="permission-continue" onClick={onClose}>Continue to editor</button>
 </dialog>;
}
