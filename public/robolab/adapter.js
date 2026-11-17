(() => {
 const parentOrigin=location.origin;
 let initialized=false;
 function ready(){
  if(!window.__wb||!window.__cad){window.parent.postMessage({type:'robolab-error',message:'Không khởi động được bộ mô phỏng.'},parentOrigin);return;}
  const lang=document.getElementById('langSel');if(lang&&lang.value!=='en'){lang.value='en';lang.dispatchEvent(new Event('change',{bubbles:true}));}
  if(window.Blockly?.dialog){
   Blockly.dialog.setAlert((message,callback)=>window.robolabDialogs.alert(message).then(()=>callback?.()));
   Blockly.dialog.setConfirm((message,callback)=>window.robolabDialogs.confirm(message).then(value=>callback?.(value)));
   Blockly.dialog.setPrompt((message,value,callback)=>window.robolabDialogs.input(message,value).then(result=>callback?.(result)));
  }
  if(new URLSearchParams(location.search).get('view')!=='cad')window.__wb.enterSim();
  initialized=true;
  window.parent.postMessage({type:'robolab-ready'},parentOrigin);
 }
 if(document.readyState==='complete')ready();else addEventListener('load',ready,{once:true});
 addEventListener('message',event=>{if(event.origin===parentOrigin&&event.source===window.parent&&event.data?.type==='robolab-ping'&&initialized)window.parent.postMessage({type:'robolab-ready'},parentOrigin);});
})();
