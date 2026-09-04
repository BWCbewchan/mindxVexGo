'use client';
import MindxLogo from '../../mindx-logo';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import FieldDesigner from '../field-designer';
import {fieldColor,initialField,validField,type Field} from '../field-model';
import '../training.css';
export default function CustomTraining(){
 const newDialog=useRef<HTMLDialogElement>(null);const [documentVersion,setDocumentVersion]=useState(0);
 const router=useRouter();const [field,setField]=useState<Field>({...initialField,name:'Untitled field'}),[loaded,setLoaded]=useState(false),[notice,setNotice]=useState('');const id=useRef<string|null>(null);
 function newField(){try{const key='field-'+crypto.randomUUID(),next={...structuredClone(initialField),name:'Untitled field'};localStorage.setItem('mindx-training-field:'+key,JSON.stringify(next));id.current=key;setField(next);setDocumentVersion(v=>v+1);newDialog.current?.close();history.replaceState(null,'','/training/custom?id='+key);setNotice('New field created.');}catch{setNotice('Could not create a field. Export your work to free browser storage.');}}
 useEffect(()=>{
  try{if(new URLSearchParams(location.search).get('new')==='1'){newField();setLoaded(true);return;}const key=new URLSearchParams(location.search).get('id');if(key==='custom'||(key&&/^field-[a-z0-9-]+$/.test(key)))id.current=key;
   const stored=JSON.parse(localStorage.getItem(id.current?'mindx-training-field:'+id.current:'mindx-training-custom-draft')||'null');if(validField(stored))setField(stored);
  }catch{setNotice('Could not restore the saved draft.');}setLoaded(true);
 },[]);
 function update(next:Field){setField(next);try{localStorage.setItem(id.current?'mindx-training-field:'+id.current:'mindx-training-custom-draft',JSON.stringify(next));setNotice('Draft saved in this browser.');}catch{setNotice('Storage is full. Export the field to keep your changes.');}}
 function save(){
  try{
   if(!validField(field))throw new Error('Check the field dimensions and objects.');
   if(field.blocks?.some(b=>!field.zones?.some(z=>fieldColor(z.color)===fieldColor(b.color))))throw new Error('Add a matching delivery zone for each cargo color.');
   const raw=JSON.parse(localStorage.getItem('mindx-training-library')||'[]');const library=Array.isArray(raw)?raw:[];
   const key=id.current||'field-'+crypto.randomUUID();
   if(key!=='custom'&&!library.some(l=>l.id===key)&&library.length>=8)throw new Error('Your library holds 8 custom fields. Export or remove an unused field first.');
   const lesson={id:key,level:'YOUR FIELD',description:'Practice on your custom field.',custom:true,field:{...field,image:undefined}};
   const next=library.filter(l=>l.id!==key);if(key!=='custom')next.push(lesson);
   localStorage.setItem('mindx-training-field:'+key,JSON.stringify(field));localStorage.setItem('mindx-training-library',JSON.stringify(next));id.current=key;localStorage.removeItem('mindx-training-custom-draft');
   history.replaceState(null,'','/training/custom?id='+encodeURIComponent(key));setNotice('Saved to Your fields.');return true;
  }catch(error){setNotice(error instanceof Error?error.message:'Could not save the field.');return false;}
 }
 function download(){const url=URL.createObjectURL(new Blob([JSON.stringify({version:1,field},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='training-field.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 return <main className="training-page custom-designer-page"><header className="training-header"><Link href="/training" className="training-brand official-brand"><MindxLogo inverse/><span>/ CUSTOM FIELD</span></Link><Link href="/training">← Training missions</Link><div className="custom-file-actions"><button onClick={download} disabled={!loaded}>Export field</button><label>Import field<input id="custom-import-file" type="file" accept=".json,application/json" onChange={async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>4500000)throw new Error();const data=JSON.parse(await file.text());if(data.version!==1||!validField(data.field))throw new Error();update(data.field);}catch{setNotice('Choose an exported training field JSON.');}}}/></label></div><div id="custom-designer-header-actions"/></header>
  {loaded?<FieldDesigner key={documentVersion} fileActions={<details className="designer-file-menu" onKeyDown={e=>{if(e.key==='Escape'){e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus();}}}><summary>File</summary><div onClick={e=>{const details=e.currentTarget.closest('details');if(details)details.open=false;}}><button type="button" onClick={()=>newDialog.current?.showModal()}>New field</button><Link href="/training">Open My fields</Link><button type="button" onClick={()=>save()}>Save to My fields</button><hr/><button type="button" onClick={()=>document.getElementById('custom-import-file')?.click()}>Import field…</button><button type="button" onClick={download}>Export field…</button></div></details>} headerTarget="custom-designer-header-actions" status={notice} field={field} onChange={update} valid={validField} onDone={()=>{if(save())router.push('/training');}} onSave={()=>{save();}}/>:<p>Loading field…</p>}
 <dialog ref={newDialog} className="new-field-dialog" aria-labelledby="new-field-title"><h2 id="new-field-title">Save before creating a new field?</h2><p>Save “{field.name}” to My fields before starting a fresh document.</p><p className="new-field-notice" role="status">{notice}</p><div><button autoFocus onClick={()=>newDialog.current?.close()}>Cancel</button><button onClick={newField}>Create without saving</button><button onClick={()=>{if(save())newField();}}>Save &amp; create new</button></div></dialog>
 </main>;
}
