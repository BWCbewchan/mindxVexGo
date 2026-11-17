// Repair once per stable model state; never fight gestures, Undo or released joints.
export function installAutomaticGuideRepair({key,blocked,run,onError=()=>{},delay=200}){
 const attempted=new Set();let timer=null,running=false,disposed=false;
 const remember=value=>{attempted.add(value);if(attempted.size>24)attempted.delete(attempted.values().next().value);};
 async function tick(){
  timer=null;if(disposed||running)return;
  if(blocked()){timer=setTimeout(tick,delay);return;}
  const before=key();if(attempted.has(before))return;remember(before);running=true;
  let current=true;
  try{current=await run()!==false;}catch(error){onError(error);}finally{
   if(current)remember(key());running=false;
   if(!current&&!disposed){attempted.delete(before);timer=setTimeout(tick,delay);}
  }
 }
 return {schedule(){if(disposed||running)return;clearTimeout(timer);timer=null;if(!attempted.has(key()))timer=setTimeout(tick,delay);},active:()=>running,dispose(){disposed=true;clearTimeout(timer);}};
}
