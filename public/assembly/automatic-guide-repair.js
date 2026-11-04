// Repair once per stable model state; never fight gestures, Undo or released joints.
export function installAutomaticGuideRepair({key,blocked,run,onError=()=>{},delay=200}){
 const attempted=new Set();let timer=null,running=false,disposed=false;
 const remember=value=>{attempted.add(value);if(attempted.size>24)attempted.delete(attempted.values().next().value);};
 async function tick(){
  timer=null;if(disposed||running)return;
  if(blocked()){timer=setTimeout(tick,delay);return;}
  const before=key();if(attempted.has(before))return;remember(before);running=true;
  try{await run();}catch(error){onError(error);}finally{remember(key());running=false;}
 }
 return {schedule(){if(disposed||running)return;clearTimeout(timer);timer=null;if(!attempted.has(key()))timer=setTimeout(tick,delay);},active:()=>running,dispose(){disposed=true;clearTimeout(timer);}};
}
