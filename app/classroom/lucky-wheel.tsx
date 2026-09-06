'use client';
import {useEffect,useRef,useState,useCallback} from 'react';
import type {Student} from './model';

type Props = {
 eligible: Student[];
 onWinner: (student: Student) => void;
 onTock: () => void;
 onCelebrate: () => void;
};

const COLORS = [
 '#173b34', '#3d6759', '#448fba', '#bb8c3d', '#507947', 
 '#487ba5', '#71963c', '#8c6a3a', '#245548', '#39647d'
];

export default function LuckyWheel({eligible,onWinner,onTock,onCelebrate}:Props){
 const canvasRef = useRef<HTMLCanvasElement|null>(null);
 const [spinning,setSpinning] = useState(false);
 const [winner,setWinner] = useState<Student|null>(null);
 const angleRef = useRef(0);
 const spinAnimRef = useRef<number|null>(null);
 const lastTockSlice = useRef(-1);

 const drawWheel = useCallback((angle:number) => {
  const canvas = canvasRef.current;
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  if(!ctx) return;

  const size = canvas.width;
  const radius = size / 2 - 16;
  const center = size / 2;
  ctx.clearRect(0,0,size,size);

  const count = eligible.length;
  if(count === 0){
   ctx.save();
   ctx.translate(center,center);
   ctx.beginPath();
   ctx.arc(0,0,radius,0,Math.PI*2);
   ctx.fillStyle = '#f1f5f0';
   ctx.fill();
   ctx.strokeStyle = '#dce1d7';
   ctx.lineWidth = 2;
   ctx.stroke();
   ctx.fillStyle = '#65766e';
   ctx.font = '500 13px system-ui, sans-serif';
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   ctx.fillText('Mark students present', 0, 0);
   ctx.restore();
   return;
  }

  const arc = (Math.PI * 2) / count;

  ctx.save();
  ctx.translate(center,center);
  ctx.rotate(angle);

  for(let i=0; i<count; i++){
   const startArc = i * arc;
   const endArc = startArc + arc;

   ctx.beginPath();
   ctx.moveTo(0,0);
   ctx.arc(0,0,radius,startArc,endArc);
   ctx.closePath();
   ctx.fillStyle = COLORS[i % COLORS.length];
   ctx.fill();
   ctx.strokeStyle = '#ffffff';
   ctx.lineWidth = 2;
   ctx.stroke();

   ctx.save();
   ctx.rotate(startArc + arc / 2);
   ctx.textAlign = 'right';
   ctx.textBaseline = 'middle';
   ctx.fillStyle = '#ffffff';
   ctx.font = '600 13px system-ui, sans-serif';
   const label = eligible[i].name.length > 14 ? eligible[i].name.slice(0, 13) + '…' : eligible[i].name;
   ctx.fillText(label, radius - 18, 0);
   ctx.restore();
  }

  // Outer border
  ctx.beginPath();
  ctx.arc(0,0,radius,0,Math.PI*2);
  ctx.strokeStyle = '#173b34';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Center hub
  ctx.beginPath();
  ctx.arc(0,0,26,0,Math.PI*2);
  ctx.fillStyle = '#173b34';
  ctx.fill();
  ctx.strokeStyle = '#c8ee78';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();

  // Top pointer (at 12 o'clock)
  ctx.save();
  ctx.translate(center, 14);
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(10, 0);
  ctx.lineTo(0, 18);
  ctx.closePath();
  ctx.fillStyle = '#173b34';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
 },[eligible]);

 useEffect(()=>{
  drawWheel(angleRef.current);
 },[drawWheel]);

 function spin(){
  if(spinning || eligible.length === 0) return;
  setSpinning(true);
  setWinner(null);

  const count = eligible.length;
  const arc = (Math.PI * 2) / count;

  const targetIndex = Math.floor(Math.random() * count);
  const extraRotations = 6 * Math.PI * 2;
  const targetCenterAngle = targetIndex * arc + arc / 2;
  const finalAngle = extraRotations + (Math.PI * 1.5 - targetCenterAngle);
  const startAngle = angleRef.current % (Math.PI * 2);
  const totalChange = finalAngle - startAngle;

  const startTime = performance.now();
  const duration = 3400;

  function animate(now:number){
   const elapsed = now - startTime;
   const progress = Math.min(1, elapsed / duration);
   const ease = 1 - Math.pow(1 - progress, 3);
   const currentAngle = startAngle + totalChange * ease;
   angleRef.current = currentAngle;

   const normAngle = (Math.PI * 1.5 - (currentAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
   const currentSlice = Math.floor(normAngle / arc);
   if(currentSlice !== lastTockSlice.current){
    lastTockSlice.current = currentSlice;
    onTock();
   }

   drawWheel(currentAngle);

   if(progress < 1){
    spinAnimRef.current = requestAnimationFrame(animate);
   } else {
    setSpinning(false);
    const chosen = eligible[targetIndex];
    setWinner(chosen);
    onWinner(chosen);
    onCelebrate();
   }
  }

  spinAnimRef.current = requestAnimationFrame(animate);
 }

 return (
  <div className="cr-wheel-container">
   <div className="cr-wheel-stage">
    <canvas 
     ref={canvasRef} 
     width={340} 
     height={340} 
     className="cr-wheel-canvas" 
     aria-label="Selection wheel of present students"
    />
    <button 
     className="cr-wheel-spin-btn" 
     disabled={spinning || eligible.length === 0} 
     onClick={spin}
     aria-label="Spin selection wheel"
    >
     {spinning ? '…' : 'Spin'}
    </button>
   </div>

   {winner && (
    <div className="cr-wheel-winner" role="status">
     <span className="cr-eyebrow">SELECTED STUDENT</span>
     <strong>{winner.name}</strong>
     <small>Turn drawn from active roster</small>
    </div>
   )}

   {eligible.length === 0 && (
    <p className="cr-wheel-hint">Mark students present to draw a student.</p>
   )}
  </div>
 );
}
