export class DataRenderer{
 constructor(){this.isDataRenderer=true;this.domElement=document.createElement('canvas');this.domElement.setAttribute('aria-hidden','true');this.domElement.style.cssText='position:absolute;inset:0;opacity:0;pointer-events:none';this.shadowMap={enabled:false};}
 setPixelRatio(){}
 setSize(width,height){this.domElement.width=width;this.domElement.height=height;this.domElement.style.width=width+'px';this.domElement.style.height=height+'px';}
 render(scene){scene.updateMatrixWorld(true);}
}
export function installDataView(viewport,api){
 const root=document.createElement('section');root.id='ai-data-fallback-view';root.className='data-fallback-view';root.setAttribute('aria-label','2D / Data Fallback View');viewport.append(root);
 let stamp='';
 function render(){
  const project=api.project(),guide=api.guide(),next=JSON.stringify([project.parts,guide.steps?.length,guide.blockers,api.selected()]);if(next===stamp)return;stamp=next;root.replaceChildren();
  const node=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
  root.append(node('h2','2D / Data Fallback View'),node('p','Không có WebGL. Bạn vẫn có thể thêm/lắp linh kiện bằng JSON, API, Library và các ô tọa độ. Dữ liệu CAD và kiểm tra khớp chạy trên CPU.'));
  const table=node('table'),head=node('tr');for(const label of ['Chi tiết','ID / partId','Vị trí (mm)','Góc (độ)','Liên kết'])head.append(node('th',label));const thead=node('thead');thead.append(head);table.append(thead);const body=node('tbody');
  for(const part of project.parts){const tr=node('tr'),cell=node('td'),select=node('button',part.label);select.type='button';select.onclick=()=>api.select(part.id);select.setAttribute('aria-pressed',String(api.selected()===part.id));cell.append(select);tr.append(cell,node('td',part.id+' / '+part.sku),node('td',part.position.map(n=>+n.toFixed(3)).join(', ')),node('td',part.rotation.map(n=>+n.toFixed(2)).join(', ')),node('td',part.mate?`${part.mate.target} · ${part.mate.sourceRef} → ${part.mate.targetRef}`:'Chưa liên kết'));body.append(tr);}
  table.append(body);root.append(node('p',`${project.parts.length} linh kiện · ${project.groups.length} group`),table);if(!project.parts.length)root.append(node('p','Mở Help → AI / API & MCP để dán JSON, hoặc thêm chi tiết từ Parts library.'));
  root.append(node('h3','Student build guide'));if(!guide.ready)root.append(node('p',(guide.blockers||[]).join(' ')||'Thêm và kết nối các chi tiết để sinh hướng dẫn.'));else{const list=node('ol');for(const step of guide.steps)list.append(node('li',step.title));root.append(list);}
 }
 return {render};
}
