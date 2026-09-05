'use client';
import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
type Props={visible:boolean;seconds:number;running:boolean;toggle:()=>void;reset:()=>void};
export default function TimerPip({visible,seconds,running,toggle,reset}:Props){
 const [target,setTarget]=useState<Window|null>(null),[fallback,setFallback]=useState(false),[error,setError]=useState('');
 const opened=useRef<Window|null>(null),alive=useRef(true);
 useEffect(()=>{alive.current=true;return()=>{alive.current=false;opened.current?.close();};},[]);
 async function open(){
 if(opened.current&&!opened.current.closed){opened.current.focus();return;}
 const api=(window as Window&{documentPictureInPicture?:{requestWindow:(options:{width:number;height:number})=>Promise<Window>}}).documentPictureInPicture;
 if(!api){setFallback(true);setError('This browser supports an in-page timer only. Keep Classroom open to see it.');return;}
 try{const w=await api.requestWindow({width:340,height:260});if(!alive.current){w.close();return;}opened.current=w;w.document.title='Classroom timer · mindX';const style=w.document.createElement('style');style.textContent='body{margin:0;background:#173b34;color:#fff;font-family:Arial,sans-serif} .pip-clock{padding:20px;text-align:center} h2{font-size:14px;color:#c8ee78;margin:0} output{display:block;font-size:64px;font-variant-numeric:tabular-nums;margin:14px 0}button{padding:10px 16px;border:0;border-radius:8px;margin:4px;background:#c8ee78;color:#173b34;cursor:pointer}button:focus-visible{outline:3px solid white}p{font-size:12px}';w.document.head.append(style);w.addEventListener('pagehide',()=>{opened.current=null;if(alive.current)setTarget(null);},{once:true});setTarget(w);setError('');}catch{setError('Could not open Picture-in-Picture. Try again in a supported browser over HTTPS or localhost.');}
 }
 const clock=<div className="pip-clock"><h2>mindX · Activity timer</h2><output aria-label="Floating activity time">{Math.floor(seconds/60).toString().padStart(2,'0')}:{(seconds%60).toString().padStart(2,'0')}</output><p>{seconds===0?'Time is up!':running?'In progress':'Paused'}</p><button onClick={toggle}>{running?'Pause':'Start'}</button><button onClick={reset}>Reset</button><button onClick={()=>{target?.close();setFallback(false);}}>Close</button></div>;
 return <>{visible&&<div className="cr-pip-launch"><button onClick={open}>▣ Floating timer (PiP)</button>{error&&<p role="status">{error}</p>}</div>}{target&&createPortal(clock,target.document.body)}{fallback&&<aside className="cr-timer-fallback" aria-label="Floating timer">{clock}</aside>}</>;
}
