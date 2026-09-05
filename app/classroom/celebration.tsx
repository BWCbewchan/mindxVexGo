'use client';
import {useEffect,useRef,useState} from 'react';
export function useCelebration(){
 const [sound,setSound]=useState(false);
 const [burst,setBurst]=useState<{id:number;students:string[];points:number}|null>(null);
 const audio=useRef<AudioContext|null>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{try{setSound(localStorage.getItem('mindx-classroom-sound')==='on');}catch{}return()=>{if(timer.current)clearTimeout(timer.current);void audio.current?.close().catch(()=>{});};},[]);
 function toggleSound(){const next=!sound;setSound(next);try{localStorage.setItem('mindx-classroom-sound',next?'on':'off');}catch{}}
 function celebrate(students:string[],points:number){
 if(timer.current)clearTimeout(timer.current);
 setBurst({id:performance.now(),students:[...students],points});timer.current=setTimeout(()=>setBurst(null),1400);
 if(!sound)return;
 try{
 const ctx=audio.current||(audio.current=new AudioContext());
 void ctx.resume().then(()=>{[523.25,659.25,783.99].forEach((frequency,i)=>{const tone=ctx.createOscillator(),gain=ctx.createGain(),start=ctx.currentTime+i*.085;tone.type='sine';tone.frequency.value=frequency;gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.06,start+.012);gain.gain.exponentialRampToValueAtTime(.001,start+.24);tone.connect(gain);gain.connect(ctx.destination);tone.start(start);tone.stop(start+.25);tone.onended=()=>{tone.disconnect();gain.disconnect();};});}).catch(()=>{});
 }catch{}
 }
 return {sound,toggleSound,burst,celebrate};
}
export function SkillIcon({name}:{name:string}){
 const paths=name==='Teamwork'?<><circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21v-3a6 6 0 0 1 12 0v3m2-7a5 5 0 0 1 6 5v2"/></>:name==='Creative thinking'?<><path d="M9 18h6m-6 3h6M8 15a7 7 0 1 1 8 0l-1 3H9z"/></>:name==='Persistence'?<><path d="m13 2-9 12h7l-1 8 10-13h-7z"/></>:name==='Mission completed'?<><circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/></>:<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>;
 return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>;
}
