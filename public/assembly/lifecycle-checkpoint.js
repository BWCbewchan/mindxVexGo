// Navigation always keeps the local draft. A bounded acknowledgement lets the
// host finish one database checkpoint before replacing the editor iframe.
export function requestProjectCheckpoint(platform,projectId,{timeout=3500}={}){
 if(!projectId||window.parent===window)return Promise.resolve(true);
 return new Promise(resolve=>{const requestId=crypto.randomUUID();let timer;const done=value=>{clearTimeout(timer);window.removeEventListener('message',receive);resolve(value);};const receive=event=>{if(event.origin===location.origin&&event.source===window.parent&&event.data?.type==='assembly-project-checkpoint-result'&&event.data.requestId===requestId)done(event.data.ok===true);};window.addEventListener('message',receive);timer=setTimeout(()=>done(false),timeout);window.parent.postMessage({type:'assembly-project-checkpoint',requestId,platform,projectId},location.origin);});
}
