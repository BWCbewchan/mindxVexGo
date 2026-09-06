'use client';
import {useState,useRef,useEffect} from 'react';

type Lap = {
 id: number;
 split: number;
 total: number;
};

export default function Stopwatch(){
 const [running,setRunning] = useState(false);
 const [elapsed,setElapsed] = useState(0);
 const [laps,setLaps] = useState<Lap[]>([]);
 const startRef = useRef(0);
 const offsetRef = useRef(0);
 const rafRef = useRef<number|null>(null);

 useEffect(()=>{
  if(running){
   startRef.current = performance.now();
   const tick = () => {
    setElapsed(offsetRef.current + (performance.now() - startRef.current));
    rafRef.current = requestAnimationFrame(tick);
   };
   rafRef.current = requestAnimationFrame(tick);
  } else {
   if(rafRef.current) cancelAnimationFrame(rafRef.current);
  }
  return () => {
   if(rafRef.current) cancelAnimationFrame(rafRef.current);
  };
 },[running]);

 function toggle(){
  if(running){
   offsetRef.current += performance.now() - startRef.current;
   setRunning(false);
  } else {
   setRunning(true);
  }
 }

 function reset(){
  setRunning(false);
  offsetRef.current = 0;
  setElapsed(0);
  setLaps([]);
 }

 function addLap(){
  if(!running && elapsed === 0) return;
  const prevTotal = laps.length > 0 ? laps[0].total : 0;
  const split = elapsed - prevTotal;
  const newLap: Lap = {
   id: laps.length + 1,
   split,
   total: elapsed
  };
  setLaps([newLap, ...laps]);
 }

 const formatTime = (ms:number) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${cs.toString().padStart(2,'0')}`;
 };

 const fastestLapId = laps.length > 1 ? laps.reduce((best, l) => l.split < best.split ? l : best, laps[0]).id : null;

 return (
  <div className="cr-stopwatch">
   <div className="cr-stopwatch-display">
    <span className="cr-stopwatch-time" aria-label="Stopwatch time">{formatTime(elapsed)}</span>
    <span className="cr-eyebrow">TRIAL STOPWATCH</span>
   </div>
   <div className="cr-stopwatch-controls">
    <button 
     className={running ? 'cr-stopwatch-btn-pause' : 'cr-stopwatch-btn-start'}
     onClick={toggle}
    >
     {running ? 'Pause' : 'Start'}
    </button>
    <button 
     disabled={!running && elapsed === 0} 
     onClick={addLap}
    >
     Lap
    </button>
    <button 
     disabled={elapsed === 0} 
     onClick={reset}
    >
     Reset
    </button>
   </div>

   {laps.length > 0 && (
    <div className="cr-stopwatch-laps">
     <div className="cr-laps-header">
      <span>Lap</span>
      <span>Split</span>
      <span>Total</span>
     </div>
     <div className="cr-laps-list">
      {laps.map(lap => (
       <div 
        key={lap.id} 
        className={`cr-lap-row ${lap.id === fastestLapId ? 'cr-lap-fastest' : ''}`}
       >
        <strong>#{lap.id} {lap.id === fastestLapId ? '· Fastest' : ''}</strong>
        <span>+{formatTime(lap.split)}</span>
        <span>{formatTime(lap.total)}</span>
       </div>
      ))}
     </div>
    </div>
   )}
  </div>
 );
}
