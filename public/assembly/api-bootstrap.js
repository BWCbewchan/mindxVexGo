// Available before the editor imports Three.js or attempts to create a GL context.
(()=>{
 if(window.assemblyAPI)return;
 let resolve,reject,connected=false;
 const ready=new Promise((ok,fail)=>{resolve=ok;reject=fail;});ready.catch(()=>{});
 const api={ready,get connected(){return connected;}};
 for(const name of ['listParts','getState','loadJSON','appendJSON','addPart','clear'])api[name]=(...args)=>ready.then(backend=>backend[name](...args));
 window.assemblyAPI=Object.freeze(api);
 window.addEventListener('assembly-api-ready',event=>{connected=true;resolve(event.detail);},{once:true});
 window.addEventListener('assembly-api-failed',event=>reject(Error(String(event.detail))),{once:true});
 window.addEventListener('error',event=>{if(!connected&&event.error)reject(event.error);});
 window.addEventListener('unhandledrejection',event=>{if(!connected)reject(event.reason instanceof Error?event.reason:Error(String(event.reason)));});
 if(window.parent!==window)try{if(window.parent.location.origin===location.origin){if(!window.parent.assemblyAPI||window.parent.assemblyAPI.connected)window.parent.assemblyAPI=window.assemblyAPI;else ready.then(backend=>window.parent.dispatchEvent(new CustomEvent('assembly-api-ready',{detail:backend}))).catch(error=>window.parent.dispatchEvent(new CustomEvent('assembly-api-failed',{detail:error.message})));}}catch{}
})();
