import {LIBRARY_KITS,libraryView} from './library-catalog.js';
import {IQ_LIBRARY_SOURCE} from './iq/library-reference.js';

export function installPartsLibrary(api){
 const $=id=>document.getElementById(id),root=document.querySelector('.library'),node=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
 const kitLabel=node('label','Bộ linh kiện'),kit=node('select');kit.id='library-kit';kit.setAttribute('aria-label','Bộ linh kiện trong thư viện');kitLabel.className='library-kit-label';kitLabel.append(kit);
 for(const [platform,title] of [['vexgo','VEX GO'],['vexiq','VEX IQ'],['lego','LEGO Robotics']]){const group=node('optgroup');group.label=title;for(const item of LIBRARY_KITS.filter(k=>k.platform===platform)){const option=node('option',item.name);option.value='kit:'+item.id;group.append(option);}kit.append(group);}
 const views=node('optgroup');views.label='Danh mục '+api.platform.toUpperCase();for(const [value,label] of [['project','Theo bộ kit dự án'],['extras','Mở rộng & đời khác'],['all','Tất cả chi tiết CAD']]){const option=node('option',label);option.value=value;views.append(option);}kit.append(views);
 const tabs=node('div');tabs.className='library-scope-tabs';tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Phạm vi linh kiện');
 let scope=null,lastKit=null,changing=false;
 const defaultScope=()=>api.project().kit?.additionalKits?.length?'project':'kit:'+(api.platform==='lego'?api.project().kit?.kitId||'45544-1':api.platform==='vexiq'?'228-7755':'269-6911');
 for(const [value,label] of [['kit','Bộ kit'],['extras','Mở rộng'],['all','Tất cả']]){const b=node('button',label);b.type='button';b.dataset.scope=value;b.onclick=()=>{scope=value==='kit'?lastKit||defaultScope():value;$('category').value='';api.refresh();};tabs.append(b);}
 const description=node('p');description.id='library-description';description.className='library-description';
 const results=node('p');results.id='library-results';results.className='library-results';results.setAttribute('role','status');
 const source=node('a','Đối chiếu bộ chuẩn VEX');source.className='library-source';source.href=api.platform==='vexiq'?IQ_LIBRARY_SOURCE:'https://www.vexrobotics.com/parts/269-6911';source.target='_blank';source.rel='noopener noreferrer';source.hidden=api.platform==='lego';
 $('search').before(kitLabel,tabs,description);$('category').after(results);$('parts').after(source);
 $('search').placeholder='Tìm tên, mã hoặc công dụng…';$('category').setAttribute('aria-label','Nhóm công dụng linh kiện');
 const categoriesLabel=node('label','Nhóm linh kiện');categoriesLabel.className='library-category-label';$('category').before(categoriesLabel);categoriesLabel.append($('category'));
 const openGroups=new Map();
 kit.onchange=async()=>{
  if(changing)return;const value=kit.value,item=LIBRARY_KITS.find(k=>'kit:'+k.id===value);
  if(item&&item.platform!==api.platform&&!api.project().kit?.additionalKits?.some(k=>k.kitId===item.id&&k.platform===item.platform)){changing=true;kit.disabled=true;try{await api.navigateKit(item);}finally{changing=false;kit.disabled=false;kit.value=scope||defaultScope();}return;}
  scope=value;if(item)lastKit=value;$('category').value='';api.refresh();
 };
 function render(){
  const catalog=api.catalog(),current=scope||defaultScope();if(!scope)lastKit=current;
  const query=$('search').value,previousCategory=$('category').value;
  const view=libraryView(catalog,api.platform,{scope:current,profile:api.project().kit,query,category:previousCategory});
  kit.value=current;for(const b of tabs.children)b.setAttribute('aria-pressed',String(b.dataset.scope===(current.startsWith('kit:')||current==='project'?'kit':current)));
  const category=$('category');category.replaceChildren();const all=node('option','Tất cả nhóm');all.value='';category.append(all);for(const group of view.categories){const option=node('option',`${group.title} · ${group.count}`);option.value=group.id;category.append(option);}if(view.categories.some(g=>g.id===previousCategory))category.value=previousCategory;
  const selectedKit=LIBRARY_KITS.find(k=>'kit:'+k.id===current);
  description.textContent=current==='extras'?'Phụ kiện bổ sung, biến thể và thiết bị đời khác.':current==='all'?'Toàn bộ CAD hiện có, bao gồm các chi tiết ngoài bộ chuẩn.':current==='project'?'Danh mục theo số lượng bộ kit đang cấu hình.':selectedKit?.name||'';
  if(api.platform==='lego'&&current.startsWith('kit:')&&api.project().kit?.kitId&&current!=='kit:'+api.project().kit.kitId)description.textContent+=' · Màu và giới hạn lắp theo bộ kit của dự án.';
  results.textContent=`${view.shown} / ${view.total} loại${view.shownMissing?` · ${view.shownMissing} chưa nhập đúng CAD`:''}`;$('count').textContent=String(view.available);
  const list=$('parts');list.replaceChildren();
  for(const group of view.groups){
   const section=node('details');section.className='library-group';section.dataset.group=group.id;const key=current+':'+group.id;section.open=!!query||!!category.value||openGroups.get(key)!==false;
   const heading=node('summary'),title=node('span',group.title),count=node('small',String(group.parts.length)),subtitle=node('small',group.subtitle);title.append(subtitle);heading.append(title,count);section.append(heading);section.addEventListener('toggle',()=>openGroups.set(key,section.open));
   const cards=node('div');cards.className='library-group-parts';
   for(const part of group.parts){
    if(!part.missing){const card=api.card(part);card.dataset.libraryGroup=group.id;if(part.improved){const badge=node('small','Bánh lắp sẵn');badge.className='library-part-tag';card.append(badge);}cards.append(card);}
    else{const card=node('article');card.className='library-missing-part';card.dataset.reference=part.name;const img=node('img');img.src=part.image;img.alt='';img.loading='lazy';const name=node('span',part.name),label=node('small',`${part.kitQuantity} / bộ · Chưa nhập đúng CAD`);card.append(img,name,label);card.title=(part.sku?part.sku+' · ':'')+(part.cadNote||'Có trong bộ chuẩn. Chưa xác minh và nhập CAD đúng mẫu; hình hiện tại dùng để đối chiếu.');cards.append(card);}
   }
   section.append(cards);list.append(section);
  }
  if(!view.shown){const empty=node('div');empty.className='library-empty';empty.append(node('strong','Chưa tìm thấy linh kiện'),node('p','Thử tên ngắn hơn, mã chi tiết hoặc đổi sang Mở rộng / Tất cả.'));const clear=node('button','Xóa bộ lọc');clear.type='button';clear.onclick=()=>{$('search').value='';$('category').value='';api.refresh();};empty.append(clear);list.append(empty);}
  root.dataset.libraryPlatform=api.platform;
  return view;
 }
 return {render,scope:()=>scope||defaultScope(),showProject(){scope='project';api.refresh();}};
}
