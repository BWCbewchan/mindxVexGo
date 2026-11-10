import {PLATFORM} from './platform.js';
import {kitReport,kitAssemblyReport,parseKitFile,validateKitProfile,totalKitCount} from './kit-policy.js';

export function installKitSettings(api){
 const fileMenu=document.getElementById('new').closest('.app-menu-panel'),settings=document.createElement('button'),importButton=document.createElement('button'),input=document.createElement('input');
 settings.id='kit-settings';settings.textContent='Cài đặt bộ kit…';importButton.id='kit-import';importButton.textContent='Import bộ kit…';input.type='file';input.accept='.json,.csv';input.hidden=true;
 fileMenu.append(importButton,settings);document.body.append(input);
 const badge=document.createElement('button');badge.id='kit-status';badge.className='kit-status';document.querySelector('.library h2').after(badge);
 let modal=null,frame=null,returnFocus=null;
 const blocked=()=>api.busy()||api.preview()||api.gesture();
 function close(){if(!modal)return;modal.close();modal.remove();modal=frame=null;returnFocus?.focus();}
 function open(profile=api.project().kit||null){
  if(blocked()){api.status('Kết thúc thao tác hiện tại trước khi cài đặt bộ kit.');return;}
  api.closePreviews();returnFocus=document.activeElement;modal=document.createElement('dialog');modal.className='kit-settings-dialog';modal.setAttribute('aria-label','Cài đặt bộ kit');
  frame=document.createElement('iframe');frame.title='Cài đặt số lượng bộ kit';frame.src='/assembly/kit-settings';modal.append(frame);document.body.append(modal);modal.addEventListener('cancel',e=>{e.preventDefault();close();});
  modal.showModal();frame.focus();
  const listener=async event=>{
   if(event.origin!==location.origin||event.source!==frame?.contentWindow)return;
   if(event.data?.type==='assembly-kit-ready')frame.contentWindow.postMessage({type:'assembly-kit-init',context:{platform:PLATFORM.id,catalog:api.catalog(),parts:api.project().parts,profile}},location.origin);
   if(event.data?.type==='assembly-kit-cancel')close();
   if(event.data?.type==='assembly-kit-apply'){
    try{await api.prepareKit?.(event.data.profile);const kit=validateKitProfile(event.data.profile,api.catalog(),PLATFORM.id);await api.configure(kit);close();render();}
    catch(error){frame?.contentWindow.postMessage({type:'assembly-kit-error',error:error.message},location.origin);}
   }
  };
  window.addEventListener('message',listener);modal.addEventListener('close',()=>window.removeEventListener('message',listener),{once:true});
 }
 settings.onclick=()=>open();badge.onclick=()=>open();importButton.onclick=()=>{if(!blocked())input.click();};
 input.onchange=async()=>{const file=input.files[0];if(!file)return;try{if(file.size>1e6)throw Error('File bộ kit phải nhỏ hơn 1 MB.');const text=await file.text();if(file.name.toLowerCase().endsWith('.json'))await api.prepareKit?.(JSON.parse(text));open(parseKitFile(text,file.name,api.catalog(),PLATFORM.id));}catch(error){api.status('Không import được bộ kit: '+error.message);}finally{input.value='';}};
 let stockKey='',previousCatalog=null,previousBlocked=null,bySku=new Map();
 function render(force=false){
  const {kit:profile,parts}=api.project(),catalog=api.catalog(),disabled=blocked();
  const key=JSON.stringify([profile,catalog.length,parts.map(part=>part.sku).sort()]);
  const changed=stockKey!==key||previousCatalog!==catalog;
  if(!changed&&!force&&previousBlocked===disabled)return;
  previousBlocked=disabled;
  if(changed){
  stockKey=key;previousCatalog=catalog;
  const rows=profile?kitReport(parts,catalog,profile):[],missing=rows.filter(row=>row.remaining<0);
  const kitNames=profile?.additionalKits?.length?[profile,...profile.additionalKits].map(k=>`${k.count}× ${k.platform==='lego'?k.name.replace(/^LEGO /,'').replace(/ · .*/, ''):k.platform==='vexgo'?'VEX GO':'VEX IQ'}`).join(' + '):profile?.name;
  badge.textContent=profile?`${totalKitCount(profile)} bộ · ${kitNames}${missing.length?` · thiếu ${missing.length} loại`:profile.enforce?' · đang giới hạn':' · chỉ cảnh báo'}`:'Bộ kit: chưa cấu hình · Cài đặt';badge.classList.toggle('kit-missing',missing.length>0);
  const assemblies=profile?kitAssemblyReport(parts,catalog,profile):[];
  bySku=new Map([...rows,...assemblies].flatMap(row=>row.skus.map(sku=>[sku,row])));
  }
  badge.disabled=settings.disabled=importButton.disabled=disabled;
  for(const button of document.querySelectorAll('#parts button[data-sku]')){
   const row=bySku.get(button.dataset.sku);let quota=button.querySelector('.kit-quota');
   if(!profile){quota?.remove();button.disabled=disabled;continue;}
   if(!quota){quota=document.createElement('small');quota.className='kit-quota';button.append(quota);}
   const label=row?`Còn ${Math.max(0,row.remaining)} / ${row.available}`:'Không có trong bộ';if(quota.textContent!==label)quota.textContent=label;
   button.disabled=disabled||profile.enforce&&(!row||row.remaining<=0);if(row)button.title=`${row.name} · dùng ${row.used}/${row.available}${row.remaining<0?` · thiếu ${-row.remaining}`:''}${row.derived?' · Dùng chung tồn kho: '+row.components.map(component=>`${component.quantity}× ${component.name}`).join(' + '):''}`;
  }
 }
 return {open,render,active:()=>!!modal};
}
