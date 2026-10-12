export const stepKey=step=>step.added.map(p=>p.id).sort().join('|');
import {PLATFORM_ID} from './platform.js';
// Rebuild snapshots from actions. Never reorder previously captured cumulative images.
export function editGuide(guide,preferences={}){
 if(!guide.ready)return guide;
 const steps=structuredClone(guide.steps),full=steps.at(-1).parts,byId=new Map(full.map(p=>[p.id,p]));
 const order=Array.isArray(preferences.order)?preferences.order:[],position=new Map(order.map((id,i)=>[id,i]));
 steps.sort((a,b)=>(position.get(stepKey(a))??1e6)-(position.get(stepKey(b))??1e6));
 const included=new Set(),owner=new Map();steps.forEach((s,i)=>s.added.forEach(p=>owner.set(p.id,i)));
 const fail=reason=>({...guide,editError:reason});
 for(let i=0;i<steps.length;i++){
  const step=steps[i],added=new Set(step.added.map(p=>p.id));
  if((step.requires||[]).some(id=>!included.has(id)&&!added.has(id)))return fail('Bước này cần chốt, trục hoặc cụm đỡ được lắp trước.');
  for(const item of step.added){const part=byId.get(item.id);if(part.mate?.target&&!included.has(part.mate.target)&&!added.has(part.mate.target))return fail('Không thể đưa bước này lên trước chi tiết đỡ của nó.');}
  // Axial retainers must remain after hubs on the same pin/shaft end.
  for(const item of step.added){const part=byId.get(item.id);if(!(PLATFORM_ID==='vexiq'?part.kind==='retainer':['228-2500-143','228-2500-154'].includes(part.sku))||!part.mate)continue;
   for(const p of full)if(p.id!==part.id&&p.mate?.target===part.mate.target&&p.mate.targetRef===part.mate.targetRef&&p.mate.depth>part.mate.depth+.15&&!included.has(p.id)&&!added.has(p.id))return fail('Lắp chi tiết phía trong trước vòng chặn ngoài trục.');
  }
  step.added.forEach(p=>included.add(p.id));step.parts=full.filter(p=>included.has(p.id)).map(p=>structuredClone(p));
  const edit=preferences.steps?.[stepKey(step)];if(edit){if(typeof edit.title==='string'&&edit.title.trim())step.title=edit.title.slice(0,160);if(typeof edit.note==='string')step.note=edit.note.slice(0,1200);if(['auto','front','rear','left','right','top','bottom'].includes(edit.view))step.view=edit.view;}
 }
 return {...guide,steps,editError:null};
}
