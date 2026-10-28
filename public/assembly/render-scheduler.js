// Keep WebGL asleep until input or scene changes require another frame.
export function createRenderScheduler(draw,{document:doc=document,request=requestAnimationFrame,cancel=cancelAnimationFrame}={}){
 let frame=0,dirty=false,disposed=false;
 function invalidate(){if(disposed)return;dirty=true;if(!doc.hidden&&!frame)frame=request(tick);}
 function tick(time){frame=0;if(disposed||doc.hidden)return;dirty=false;const moving=draw(time);if(moving||dirty)invalidate();}
 const events=['pointerdown','pointermove','pointerup','pointercancel','wheel','keydown','keyup','input','change','click','toggle'];
 // Navigation consumes key events at document capture; wake before that handler.
 const input=doc.defaultView||doc;
 for(const event of events)input.addEventListener(event,invalidate,{capture:true,passive:true});
 const visibility=()=>{if(doc.hidden){if(frame)cancel(frame);frame=0;}else invalidate();};
 doc.addEventListener('visibilitychange',visibility);
 invalidate();
 return {invalidate,dispose(){disposed=true;if(frame)cancel(frame);for(const event of events)input.removeEventListener(event,invalidate,true);doc.removeEventListener('visibilitychange',visibility);}};
}
