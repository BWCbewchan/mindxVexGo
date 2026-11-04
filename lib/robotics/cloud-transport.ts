import {cloudScope} from './cloud-scope';
// Only a confirmed service restriction pauses requests. Ordinary authorization,
// validation and transient network errors retain their normal SDK behavior.
const pauseMs=5*60_000,key='mindx-robotics-service-pause:'+cloudScope();let until=0;
const message=(e:unknown)=>e&&typeof e==='object'&&'message' in e?String(e.message):String(e);
export const isEgressQuotaError=(e:unknown)=>/exceed_egress_quota|ROBOTICS_EGRESS_QUOTA/i.test(message(e));
export function serviceRestricted(){
 if(!until&&typeof window!=='undefined')try{const stored=Number(sessionStorage.getItem(key));if(stored>Date.now()&&stored<=Date.now()+pauseMs)until=stored;}catch{}
 if(until<=Date.now()){until=0;return false;}return true;
}
function notify(){if(typeof window!=='undefined')window.dispatchEvent(new Event('robotics-service-status'));}
export function resetServiceRestriction(){until=0;if(typeof window!=='undefined')try{sessionStorage.removeItem(key);}catch{}notify();}
function restrict(){until=Date.now()+pauseMs;if(typeof window!=='undefined')try{sessionStorage.setItem(key,String(until));}catch{}notify();}
export async function roboticsFetch(input:RequestInfo|URL,init?:RequestInit):Promise<Response>{
 if(serviceRestricted())return new Response(JSON.stringify({message:'ROBOTICS_EGRESS_QUOTA',code:'ROBOTICS_EGRESS_QUOTA'}),{status:503,headers:{'Content-Type':'application/json','Retry-After':'300'}});
 const keepalive=typeof document!=='undefined'&&document.visibilityState==='hidden'&&init?.method?.toUpperCase()==='POST'&&typeof init.body==='string'&&new TextEncoder().encode(init.body).length<48000;
 const response=await fetch(input,keepalive?{...init,keepalive:true}:init);if(!response.ok){const text=await response.clone().text();if(isEgressQuotaError(text))restrict();}return response;
}
