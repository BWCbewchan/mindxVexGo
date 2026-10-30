export function printDataGuide(project,guide,container){
 const node=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
 container.replaceChildren();
 const page=title=>{const el=node('article');el.className='guide-page guide-data-page';el.append(node('h1',title));container.append(el);return el;};
 const intro=page(project.title+' · Hướng dẫn dữ liệu');const notice=node('p','Chế độ không có WebGL: bản xuất gồm danh sách linh kiện, tọa độ và liên kết. Bản này không có hình hướng lắp 3D; cần đối chiếu mô hình trước khi dùng làm hướng dẫn lắp thực tế.');notice.className='data-guide-notice';intro.append(notice);
 const table=node('table'),thead=node('thead'),header=node('tr');for(const label of ['Linh kiện','ID / SKU','Vị trí mm','Góc độ','Liên kết'])header.append(node('th',label));thead.append(header);table.append(thead);const body=node('tbody');
 for(const p of project.parts){const tr=node('tr');for(const text of [p.label,p.id+' / '+p.sku,p.position.map(n=>+n.toFixed(3)).join(', '),p.rotation.map(n=>+n.toFixed(2)).join(', '),p.mate?`${p.mate.target} · ${p.mate.sourceRef} → ${p.mate.targetRef}`:'Chi tiết bắt đầu / chưa liên kết'])tr.append(node('td',text));body.append(tr);}table.append(body);intro.append(table);
 for(const [i,step] of guide.steps.entries()){const el=page(`Bước ${i+1}: ${step.title}`);el.append(node('p',step.note));const list=node('ul');for(const part of step.added)list.append(node('li',part.name+' · '+part.sku));el.append(list);}
 window.print();
}
