(() => {
 const queue=[];let busy=false;
 function show(message,{confirm=false,value,input=false}={}){return new Promise(resolve=>{queue.push({message,confirm,value,input,resolve});next();});}
 function next(){
  if(busy||!queue.length)return;busy=true;const request=queue.shift(),previous=document.activeElement;
  const dialog=document.createElement('dialog');dialog.style.cssText='max-width:520px;border:1px solid #ccd5d8;border-radius:14px;padding:24px;font:15px system-ui;box-shadow:0 24px 80px #0005';
  const title=document.createElement('h2');title.textContent='RoboLab';title.style.marginTop='0';
  const text=document.createElement('p');text.textContent=String(request.message);dialog.append(title,text);
  if(request.value!==undefined){const input=document.createElement('textarea');input.value=String(request.value);input.readOnly=!request.input;input.style.cssText='width:100%;min-height:90px';input.setAttribute('aria-label',request.input?'Nội dung':'Nội dung cần sao chép');dialog.append(input);}
  const finish=value=>{dialog.close();dialog.remove();previous?.focus();busy=false;request.resolve(value);next();};
  const actions=document.createElement('div');actions.style.cssText='display:flex;justify-content:flex-end;gap:12px;margin-top:20px';
  if(request.confirm||request.input){const cancel=document.createElement('button');cancel.textContent='Hủy';cancel.onclick=()=>finish(request.input?null:false);actions.append(cancel);}
  const accept=document.createElement('button');accept.textContent=request.confirm||request.input?'Tiếp tục':'Đóng';accept.onclick=()=>finish(request.input?dialog.querySelector('textarea').value:true);actions.append(accept);dialog.append(actions);
  dialog.addEventListener('cancel',e=>{e.preventDefault();finish(request.input?null:false);});document.body.append(dialog);dialog.showModal();
  if(request.value!==undefined){dialog.querySelector('textarea').focus();dialog.querySelector('textarea').select();}else accept.focus();
 }
 window.robolabDialogs={confirm:message=>show(message,{confirm:true}),alert:message=>show(message),copy:(message,value)=>show(message,{value}),input:(message,value='')=>show(message,{value,input:true})};
})();
