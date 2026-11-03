import {installAssemblyHelp} from './help.js';
import {listProjects,platformValid} from './project-store.js';
import {platformName} from './platform-registry.js';
export function installEditorChrome({beforeNavigate}={}){
 const header=document.querySelector('header'),toolbar=document.querySelector('nav'),$=id=>document.getElementById(id);
 header.classList.add('app-menubar');toolbar.classList.add('app-optionsbar');
 const menus=document.createElement('div');menus.className='app-menus';
 let navigating=false;async function navigate(project){if(navigating)return;navigating=true;try{if(beforeNavigate&&await beforeNavigate()===false)return;const request=project?{type:'assembly-navigation-request',platform:project.platform,projectId:project.id}:{type:'assembly-navigation-request',destination:'projects'};if(window.parent!==window)window.parent.postMessage(request,location.origin);else location.assign(project?`/assembly/${project.platform}/${project.id}`:'/assembly/projects');}catch(error){const status=$('status');if(status)status.textContent='Chưa chuyển được dự án: '+error.message;}finally{navigating=false;}}
 const home=header.querySelector('a');if(home){home.href='/assembly/projects';home.title='Về danh sách dự án';home.addEventListener('click',event=>{if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();navigate();});}
 function menu(name,nodes){
  const details=document.createElement('details');details.className='app-menu';
  const summary=document.createElement('summary');summary.textContent=name;
  const panel=document.createElement('div');panel.className='app-menu-panel';
  for(const [node,label,shortcut] of nodes){
   if(!node)continue;
   const input=node.querySelector('input');node.replaceChildren(document.createTextNode(label));if(input)node.append(input);
   if(shortcut){const hint=document.createElement('kbd');hint.textContent=shortcut;node.append(hint);}
   if(node.tagName==='LABEL'){node.tabIndex=0;node.setAttribute('role','button');node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input?.click();}});}
   panel.append(node);
  }
  panel.addEventListener('click',e=>{if(e.target.closest('button,label'))details.open=false;});
  details.addEventListener('toggle',()=>{if(details.open)for(const other of menus.children)if(other!==details)other.open=false;});
  details.append(summary,panel);menus.append(details);
 }
 const projectsButton=document.createElement('button');projectsButton.id='workspace-projects';projectsButton.type='button';projectsButton.onclick=()=>navigate();
 menu('Dự án',[[projectsButton,'Danh sách dự án']]);const projectMenu=menus.lastElementChild,projectPanel=projectMenu.querySelector('.app-menu-panel');
 projectMenu.addEventListener('toggle',()=>{if(!projectMenu.open)return;projectPanel.style.minWidth='0';projectPanel.style.width=Math.max(160,Math.min(340,innerWidth-projectPanel.getBoundingClientRect().left-12))+'px';for(const old of projectPanel.querySelectorAll('[data-recent-project]'))old.remove();const params=new URLSearchParams(location.search),id=params.get('project'),platform=params.get('platform');try{for(const p of listProjects().filter(p=>!p.deletedAt&&platformValid(p.platform)&&(p.id!==id||p.platform!==platform)).slice(0,6)){const item=document.createElement('button');item.type='button';item.dataset.recentProject=p.id;item.textContent=platformName(p.platform)+' · '+p.title;item.title=item.textContent;Object.assign(item.style,{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'});item.onclick=()=>navigate(p);projectPanel.append(item);}}catch{}});
 menu('File',[[$('new'),'New project'],[$('open').closest('label'),'Open project…'],[$('save'),'Save project…','Ctrl+S'],[$('export'),'Export build guide / PDF…']]);
 const groupCommands=[['group','Group','Ctrl+G'],['ungroup','Ungroup','Ctrl+Shift+G']];
 menu('Edit',groupCommands.map(([id,label,key])=>{
  const command=$(id),item=document.createElement('button');
  item.type='button';item.onclick=()=>command.click();item.disabled=command.disabled;
  new MutationObserver(()=>{item.disabled=command.disabled;}).observe(command,{attributes:true,attributeFilter:['disabled']});
  toolbar.insertBefore(command,$('duplicate'));
  return [item,label,key];
 }));
 const view=[];
 for(const [id,label] of [['library-toggle','Parts library'],['panel-toggle','Inspector']]){
  const button=document.createElement('button');button.textContent=label;button.onclick=()=>$(id).click();view.push([button,label]);
 }
 menu('View',view);
 const help=installAssemblyHelp();
 const helpItem=(label,action)=>{const item=document.createElement('button');item.type='button';item.onclick=action;return [item,label];};
 menu('Help',[
  helpItem('Hướng dẫn thao tác',()=>help.open()),
  helpItem('Hướng dẫn nhanh trên app',()=>help.startTour()),
  helpItem('Phím tắt · F1',()=>help.open('shortcuts')),
  helpItem('AI / API & MCP',()=>help.open('ai')),
 ]);
 header.insertBefore(menus,$('title'));header.after(toolbar);
 const specs={move:['↔','Move','V'],rotate:['⟳','Rotate','R'],connect:['⊙','Connect','C'],group:['folder-plus','Group','Ctrl+G'],ungroup:['folder-minus','Ungroup','Ctrl+Shift+G'],duplicate:['⧉','Duplicate','Ctrl+J'],delete:['×','Delete','Delete'],undo:['↶','Undo','Ctrl+Z'],redo:['↷','Redo','Ctrl+Shift+Z'],fit:['⛶','Fit view','F'], 'library-toggle':['▦','Parts',''],'panel-toggle':['☷','Inspector','']};
 function decorate(){for(const [id,[icon,label,key]] of Object.entries(specs)){
  const button=$(id);if(!button||button.dataset.chrome)continue;button.dataset.chrome='true';
  button.title=label+(key?' · '+key:'');button.setAttribute('aria-label',button.title);
  const glyph=document.createElement('span');glyph.className='tool-glyph';glyph.setAttribute('aria-hidden','true');
  if(id==='group'||id==='ungroup'){const symbol=document.createElement('i');symbol.dataset.lucide=icon;glyph.append(symbol);}else glyph.textContent=icon;
  const text=document.createElement('span');text.className='tool-label';text.textContent=label;
  button.replaceChildren(glyph,text);
  if(key){const shortcut=document.createElement('kbd');shortcut.className='tool-shortcut';shortcut.textContent=key;button.append(shortcut);}
 }globalThis.lucide?.createIcons({root:toolbar});}
 decorate();new MutationObserver(decorate).observe(toolbar,{childList:true});
 function close(){for(const details of menus.children)details.open=false;}
 document.addEventListener('pointerdown',e=>{if(!menus.contains(e.target))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=[...menus.children].find(d=>d.open);if(open){e.preventDefault();e.stopImmediatePropagation();close();open.querySelector('summary').focus();}}},true);
}
