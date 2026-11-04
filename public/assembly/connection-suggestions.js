import {assemblyMatingContext,occupiedAssemblyReferences} from './assembly-mating.js';
import {compatibleReferences} from './connector-policy.js';

// Read-only diagnostic: geometry establishes components, never group membership.
export function suggestAssemblyConnections(parts,references,{isLocked=()=>false,limit=12}={}){
 const context=assemblyMatingContext(parts,references),seen=new Set(),components=[],componentOf=new Map();
 for(const p of parts){if(seen.has(p.id))continue;const ids=[p.id];seen.add(p.id);for(const id of ids)for(const edge of context.links.get(id)||[]){const next=edge.part===id?edge.target:edge.part;if(!seen.has(next)){seen.add(next);ids.push(next);}}components.push(ids);}
 components.sort((a,b)=>b.length-a.length);components.forEach((ids,i)=>ids.forEach(id=>componentOf.set(id,i)));
 if(components.length<2)return {components,candidates:[],holes:[]};
 const occupied=occupiedAssemblyReferences(context),rows=context.world.filter(r=>!occupied.has(r.part.id+'|'+r.ref.id)&&!isLocked(r.part.id));
 // Spatial search avoids the quadratic port-pair scan on large assemblies.
 const build=(items,depth=0)=>{if(!items.length)return null;const axis=depth%3,dim=['x','y','z'][axis];items.sort((a,b)=>a.point[dim]-b.point[dim]);const i=items.length>>1;return {row:items[i],dim,left:build(items.slice(0,i),depth+1),right:build(items.slice(i+1),depth+1)};};
 const trees={pin:build(rows.filter(r=>r.ref.kind==='pin')),hole:build(rows.filter(r=>r.ref.kind==='hole'))};
 const nearest=(tree,source)=>{let best=null,bestD=Infinity;const visit=node=>{if(!node)return;const delta=source.point[node.dim]-node.row.point[node.dim],first=delta<0?node.left:node.right,second=delta<0?node.right:node.left;visit(first);const r=node.row,d=source.point.distanceToSquared(r.point);if(d<bestD&&componentOf.get(source.part.id)!==componentOf.get(r.part.id)&&compatibleReferences(source.ref,r.ref,source.part.sku,r.part.sku)){best=r;bestD=d;}if(delta*delta<=bestD)visit(second);};visit(tree);return best?{target:best,distance:Math.sqrt(bestD)}:null;};
 const pairs=new Map();for(const source of rows){const match=nearest(trees[source.ref.kind==='pin'?'hole':'pin'],source);if(!match)continue;const target=match.target,a=componentOf.get(source.part.id),b=componentOf.get(target.part.id);if(a===0&&b!==0)continue;const key=[source.part.id,target.part.id].sort().join('|'),candidate={sourceId:source.part.id,targetId:target.part.id,sourceRef:source.ref.id,targetRef:target.ref.id,distance:match.distance,sourceComponent:a,targetComponent:b};if(!pairs.has(key)||pairs.get(key).distance>candidate.distance)pairs.set(key,candidate);}
 const candidates=[...pairs.values()].sort((a,b)=>a.distance-b.distance),selected=[],counts=new Map();for(const c of candidates){const key=[c.sourceComponent,c.targetComponent].sort().join('|');if((counts.get(key)||0)>=2)continue;counts.set(key,(counts.get(key)||0)+1);selected.push(c);if(selected.length>=limit)break;}
 const connected=new Set(selected.flatMap(c=>[c.sourceComponent,c.targetComponent]));const holes=[];for(let i=1;i<components.length;i++){if(connected.has(i))continue;const row=rows.find(r=>componentOf.get(r.part.id)===i&&r.ref.kind==='hole');if(row)holes.push({partId:row.part.id,refId:row.ref.id,component:i});}
 return {components,candidates:selected,holes};
}

export function installConnectionSuggestions(api){
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const dialog=el('dialog');dialog.id='connection-suggestions';dialog.className='connection-suggestions';dialog.setAttribute('aria-labelledby','connection-suggestions-title');const header=el('header'),title=el('h2','Gợi ý nối các cụm rời');title.id='connection-suggestions-title';const close=el('button','Đóng');close.type='button';close.onclick=()=>dialog.close();header.append(title,close);const content=el('div');content.className='connection-suggestions-body';dialog.append(header,content);document.body.append(dialog);
 const button=(text,fn)=>{const b=el('button',text);b.type='button';b.onclick=fn;return b;};
 const picture=p=>{const box=el('figure'),img=el('img');img.src=api.preview(p);img.alt='';const name=el('figcaption',api.name(p));box.append(img,name);return box;};
 async function open(){if(api.blocked())return;api.closePreviews();content.replaceChildren(el('p','Đang tìm điểm nối tương thích…'));dialog.showModal();await new Promise(requestAnimationFrame);await new Promise(r=>setTimeout(r,0));if(!dialog.open)return;try{
  const parts=api.parts(),byId=new Map(parts.map(p=>[p.id,p])),result=suggestAssemblyConnections(parts,api.references,{isLocked:api.isLocked});content.replaceChildren(el('p',`Tìm thấy ${result.components.length} cụm theo các khớp CAD. Gợi ý bên dưới chưa kiểm tra va chạm; xem trước và kiểm tra hướng trước khi áp dụng.`));
  if(result.components.length<2){content.append(el('p','Các chi tiết đã thuộc cùng một cụm. Hãy kiểm tra lại hướng dẫn hoặc các liên kết thiếu.'));return;}
  for(const c of result.candidates){const a=byId.get(c.sourceId),b=byId.get(c.targetId),card=el('article');card.className='connection-suggestion';card.dataset.sourceId=a.id;card.dataset.targetId=b.id;const pair=el('div');pair.className='connection-suggestion-pair';pair.append(picture(a),el('span','↔'),picture(b));card.append(pair,el('p',`Điểm ${c.sourceRef} ↔ ${c.targetRef} · cách ${c.distance.toFixed(1)} mm`),button('Xem hai chi tiết',()=>{dialog.close();api.locate([a.id,b.id]);}),button('Xem trước ghép cụm',()=>{dialog.close();api.connect(c);}));content.append(card);}
  for(const hole of result.holes){const part=byId.get(hole.partId),card=el('article');card.className='connection-suggestion';card.append(picture(part),el('p','Chưa tìm thấy đầu chốt/trục tự do tương thích để ghép cụm này. Có thể cần thêm chốt trung gian.'),button('Chọn chốt cho lỗ này',()=>{dialog.close();api.choose(hole.partId,hole.refId);}));content.append(card);}
  const list=el('details');list.append(el('summary','Xem các cụm đang rời'));for(const ids of result.components){const p=byId.get(ids[0]);list.append(button(`${ids.length} chi tiết · ${api.name(p)}`,()=>{dialog.close();api.locate(ids);}));}content.append(list);
  if(!result.candidates.length&&!result.holes.length)content.append(el('p','Chưa có điểm nối tự do. Kiểm tra layer bị khóa, các lỗ đã có chốt hoặc chi tiết chưa có điểm nối CAD.'));
 }catch(error){content.replaceChildren(el('p','Chưa tìm được gợi ý: '+error.message));}}
 return {open,dispose:()=>dialog.remove()};
}
