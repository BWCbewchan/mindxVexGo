'use client';
import {useEffect,useRef,useState,useCallback} from 'react';

export function useCelebration(){
 const [sound,setSound]=useState(false);
 const [burst,setBurst]=useState<{id:number;students:string[];points:number}|null>(null);
 const audio=useRef<AudioContext|null>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null);

 useEffect(()=>{
  try{setSound(localStorage.getItem('mindx-classroom-sound')==='on');}catch{}
  return()=>{
   if(timer.current)clearTimeout(timer.current);
   void audio.current?.close().catch(()=>{});
  };
 },[]);

 function toggleSound(){
  const next=!sound;
  setSound(next);
  try{localStorage.setItem('mindx-classroom-sound',next?'on':'off');}catch{}
 }

 const getAudio=useCallback(()=>{
  try{
   const ctx=audio.current||(audio.current=new (window.AudioContext||(window as unknown as {webkitAudioContext:typeof AudioContext}).webkitAudioContext)());
   if(ctx.state==='suspended')void ctx.resume();
   return ctx;
  }catch{
   return null;
  }
 },[]);

 function playTock(){
  if(!sound)return;
  const ctx=getAudio();if(!ctx)return;
  try{
   const osc=ctx.createOscillator(),gain=ctx.createGain(),t=ctx.currentTime;
   osc.type='triangle';
   osc.frequency.setValueAtTime(480,t);
   osc.frequency.exponentialRampToValueAtTime(240,t+0.035);
   gain.gain.setValueAtTime(0.06,t);
   gain.gain.exponentialRampToValueAtTime(0.001,t+0.035);
   osc.connect(gain);gain.connect(ctx.destination);
   osc.start(t);osc.stop(t+0.04);
  }catch{}
 }

 function playFanfare(){
  if(!sound)return;
  const ctx=getAudio();if(!ctx)return;
  try{
   const notes=[
    {f:523.25,t:0,d:0.12},
    {f:659.25,t:0.12,d:0.12},
    {f:783.99,t:0.24,d:0.15},
    {f:1046.5,t:0.39,d:0.4}
   ];
   const start=ctx.currentTime;
   notes.forEach(n=>{
    const osc=ctx.createOscillator(),gain=ctx.createGain(),t=start+n.t;
    osc.type='sine';osc.frequency.setValueAtTime(n.f,t);
    gain.gain.setValueAtTime(0.001,t);
    gain.gain.linearRampToValueAtTime(0.09,t+0.02);
    gain.gain.exponentialRampToValueAtTime(0.001,t+n.d);
    osc.connect(gain);gain.connect(ctx.destination);
    osc.start(t);osc.stop(t+n.d+0.04);
   });
  }catch{}
 }

 function playTimerBell(){
  if(!sound)return;
  const ctx=getAudio();if(!ctx)return;
  try{
   [880,1760].forEach((freq,i)=>{
    const osc=ctx.createOscillator(),gain=ctx.createGain(),t=ctx.currentTime;
    osc.type='sine';osc.frequency.setValueAtTime(freq,t);
    gain.gain.setValueAtTime(i===0?0.12:0.04,t);
    gain.gain.exponentialRampToValueAtTime(0.0001,t+1.4);
    osc.connect(gain);gain.connect(ctx.destination);
    osc.start(t);osc.stop(t+1.5);
   });
  }catch{}
 }

 function celebrate(students:string[],points:number){
  if(timer.current)clearTimeout(timer.current);
  setBurst({id:performance.now(),students:[...students],points});
  timer.current=setTimeout(()=>setBurst(null),1400);
  if(!sound)return;
  const ctx=getAudio();if(!ctx)return;
  try{
   [523.25,659.25,783.99].forEach((frequency,i)=>{
    const tone=ctx.createOscillator(),gain=ctx.createGain(),start=ctx.currentTime+i*.085;
    tone.type='sine';tone.frequency.value=frequency;
    gain.gain.setValueAtTime(0,start);
    gain.gain.linearRampToValueAtTime(.06,start+.012);
    gain.gain.exponentialRampToValueAtTime(.001,start+.24);
    tone.connect(gain);gain.connect(ctx.destination);
    tone.start(start);tone.stop(start+.25);
    tone.onended=()=>{tone.disconnect();gain.disconnect();};
   });
  }catch{}
 }

 return {sound,toggleSound,burst,celebrate,playTock,playFanfare,playTimerBell};
}

export function SkillIcon({name}:{name:string}){
 const paths=name==='Teamwork'||name==='support'?<><circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21v-3a6 6 0 0 1 12 0v3m2-7a5 5 0 0 1 6 5v2"/></>:name==='Creative thinking'||name==='iteration'?<><path d="M9 18h6m-6 3h6M8 15a7 7 0 1 1 8 0l-1 3H9z"/></>:name==='Persistence'||name==='debug'?<><path d="m13 2-9 12h7l-1 8 10-13h-7z"/></>:name==='Mission completed'||name==='first_run'?<><circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/></>:name==='assembly'?<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>:name==='logic'?<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></>:name==='navigation'?<><polygon points="3 11 22 2 13 21 11 13 3 11"/></>:<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>;
 return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>;
}
