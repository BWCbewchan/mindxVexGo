export const portsFor=sku=>sku==='269-6686-000'?['battery']:sku==='269-6695-000'?['eye']:['269-6690-000','269-6696-000','269-6702-000'].includes(sku)?['1','2','3','4']:[];
export function wiringError(parts,deviceId,brainId,port){
 const device=parts.find(p=>p.id===deviceId),brain=parts.find(p=>p.id===brainId);
 if(!device||brain?.sku!=='269-6685-000')return 'Chọn thiết bị và Brain có trong mô hình.';
 if(!portsFor(device.sku).includes(port))return 'Sai cổng: pin dùng cổng cam, Eye Sensor dùng cổng xanh lam–lục.';
 if(parts.some(p=>p.id!==deviceId&&p.wiring?.brain===brainId&&p.wiring.port===port))return 'Cổng này đã có thiết bị. Chọn cổng trống hoặc tháo dây cũ.';
 return null;
}
export function installWiring(api){
 const button=document.createElement('button');button.textContent='🔌 Nối dây';button.id='wiring-open';document.querySelector('nav').append(button);
 const toggle=document.createElement('button');toggle.id='wiring-visibility';const sync=()=>{toggle.textContent=api.project().hideCables?'◉ Hiện dây':'○ Ẩn dây';toggle.setAttribute('aria-pressed',String(!api.project().hideCables));};sync();toggle.onclick=()=>{if(api.busy())return;api.checkpoint();api.project().hideCables=!api.project().hideCables;api.save(false);sync();};document.querySelector('nav').append(toggle);setInterval(sync,500);
 const dialog=document.createElement('dialog');dialog.setAttribute('aria-labelledby','wiring-title');dialog.innerHTML='<h2 id="wiring-title">Nối dây vào Brain</h2><p>🟠 Pin → cổng cam · 🟦 Eye Sensor → cổng xanh lam–lục. Motor, LED Bumper và Electromagnet → 1–4.</p><label>Brain<select id="wiring-brain"></select></label><div id="wiring-devices"></div><p id="wiring-status" role="status"></p><button id="wiring-close">Đóng</button>';document.body.append(dialog);
 const brains=dialog.querySelector('#wiring-brain'),rows=dialog.querySelector('#wiring-devices'),status=dialog.querySelector('#wiring-status');
 const label=port=>port==='battery'?'🟠 Battery · cam':port==='eye'?'🟦 Eye · xanh lam–lục':`Smart Port ${port}`;
 function render(){rows.replaceChildren();for(const part of api.parts().filter(p=>portsFor(p.sku).length)){
  const row=document.createElement('div');row.className='wiring-row';const image=document.createElement('img');image.src=`parts/${part.sku}/preview.png`;image.alt='';const name=document.createElement('span');name.textContent=api.name(part);const select=document.createElement('select');select.setAttribute('aria-label',`Cổng cho ${api.name(part)}`);const none=document.createElement('option');none.value='';none.textContent='Chưa cắm / tháo dây';select.append(none);
  for(const port of portsFor(part.sku)){const option=document.createElement('option');option.value=port;option.textContent=label(port);option.disabled=api.parts().some(p=>p.id!==part.id&&p.wiring?.brain===brains.value&&p.wiring.port===port);select.append(option);}
  select.value=part.wiring?.brain===brains.value?part.wiring.port:'';select.disabled=!brains.value||api.locked(part);select.onchange=()=>{const error=select.value?wiringError(api.parts(),part.id,brains.value,select.value):null;if(error){status.textContent=error;render();return;}api.checkpoint();if(select.value)part.wiring={brain:brains.value,port:select.value};else delete part.wiring;api.save(false);status.textContent=select.value?`${api.name(part)} → ${label(select.value)}. Đã lưu.`:'Đã tháo dây.';render();};row.append(image,name,select);rows.append(row);
 }if(!brains.value)status.textContent='Thêm Brain vào mô hình để nối dây.';}
 button.onclick=()=>{if(api.busy())return;brains.replaceChildren();for(const brain of api.parts().filter(p=>p.sku==='269-6685-000')){const option=document.createElement('option');option.value=brain.id;option.textContent=api.name(brain);brains.append(option);}status.textContent='';render();dialog.showModal();};brains.onchange=render;dialog.querySelector('#wiring-close').onclick=()=>dialog.close();
}
