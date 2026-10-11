export function installInspectorChrome(){
 const $=id=>document.getElementById(id),inspector=document.querySelector('.inspector');
 inspector.classList.add('studio-inspector');
 const heading=inspector.querySelector('h2');heading.textContent='Inspector';
 const tabs=document.createElement('div');tabs.className='inspector-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Inspector panels');
 const body=document.createElement('div');body.className='inspector-body';
 const partsHeading=$('objects').previousElementSibling,footer=inspector.querySelector(':scope > small'),rule=inspector.querySelector('hr');
 rule?.remove();
 const sections=[['Properties',[$('selection'),$('precision-fields'),inspector.querySelector('.collision-panel'),$('warnings'),footer]],['Layers',[$('layer-panel'),partsHeading,$('objects')]],['Guide',[inspector.querySelector('.student-guide'),$('guide-export')]]];
 const rows=[];
 function activate(index,focus=false){rows.forEach((row,i)=>{const selected=i===index;row.button.setAttribute('aria-selected',String(selected));row.button.tabIndex=selected?0:-1;row.panel.hidden=!selected;});if(focus)rows[index].button.focus();}
 sections.forEach(([name,nodes],index)=>{
  const button=document.createElement('button'),panel=document.createElement('section');
  button.id='inspector-tab-'+index;button.textContent=name;button.setAttribute('role','tab');button.setAttribute('aria-controls','inspector-content-'+index);
  panel.id='inspector-content-'+index;panel.className='inspector-content';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);
  for(const node of nodes)if(node)panel.append(node);
  button.onclick=()=>activate(index);
  button.onkeydown=e=>{let next;if(e.key==='ArrowRight')next=(index+1)%sections.length;else if(e.key==='ArrowLeft')next=(index+sections.length-1)%sections.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=sections.length-1;if(next!==undefined){e.preventDefault();activate(next,true);}};
  rows.push({button,panel});tabs.append(button);body.append(panel);
 });
 inspector.append(tabs,body);$('precision-fields').open=true;
 $('precision-fields').querySelector('summary').textContent='Transform · mm / degrees';
 $('layer-panel').querySelector('.hint').textContent='Ctrl+drag to select · Ctrl+G to group';
 activate(0);
}
