'use client';
import {useEffect,useLayoutEffect,useRef,useState,type ReactNode,type ButtonHTMLAttributes} from 'react';
import {createPortal} from 'react-dom';
import DesignerIcon from './designer-icon';
function ToolButton({label,icon,...props}:{label:string;icon:string}&ButtonHTMLAttributes<HTMLButtonElement>){return <button type="button" className="designer-icon-button" aria-label={label} title={label} {...props}><DesignerIcon name={icon}/><span className="designer-tooltip" role="tooltip">{label}</span></button>;}
import RobotIcon from './robot-icon';
import LayerPreview from './layer-preview';
import CargoShape from './cargo-shape';
import {fieldColor} from './field-model';
import type {Field} from './field-model';
type Kind='background'|'walls'|'blocks'|'zones'|'checkpoints'|'start'|'goal';
type Selection={kind:Kind;index:number;wholeLayer?:boolean};
type Item={x:number;y:number;width?:number;height?:number;radius?:number;heading?:number;color?:string;shape?:'square'|'circle'|'triangle'|'hexagon';pushable?:boolean;id?:string};
const colors={red:'#df5361',green:'#31965b',blue:'#397fd6'};
const clone=(f:Field):Field=>structuredClone(f);
function get(f:Field,s:Selection):Item|undefined{return s.kind==='background'?f.imageTransform||{x:0,y:0,width:f.width,height:f.height}:s.kind==='start'||s.kind==='goal'?f[s.kind]:(f[s.kind] as Item[]|undefined)?.[s.index];}
function change(f:Field,s:Selection,value:Partial<Item>){const next=clone(f);if(s.kind==='background')next.imageTransform={...get(next,s)!,...value} as NonNullable<Field['imageTransform']>;const item=get(next,s);if(item)Object.assign(item,value);return next;}
export default function FieldDesigner({field,onChange,valid,onDone,onSave,status,headerTarget,fileActions}:{fileActions?:ReactNode;headerTarget?:string;field:Field;status?:string;onChange:(f:Field)=>void;valid:(f:unknown)=>boolean;onDone:()=>void;onSave?:()=>void}){
 const [headerElement,setHeaderElement]=useState<HTMLElement|null>(null);
 useEffect(()=>{setHeaderElement(headerTarget?document.getElementById(headerTarget):null);},[headerTarget]);
 const [draft,setDraft]=useState(field),[selected,setSelectedRaw]=useState<Selection|null>(null),[snap,setSnap]=useState(true),[zoom,setZoom]=useState(100),[error,setError]=useState('');
 const [activeTool,setActiveTool]=useState<'select'|'hand'>('select'),[showGrid,setShowGrid]=useState(true),[shortcutsOpen,setShortcutsOpen]=useState(false);
 const [camera,setCamera]=useState({x:0,y:0});
 const pan=useRef<{x:number;y:number;left:number;top:number;scale:number}|null>(null);
 const [multi,setMulti]=useState<Selection[]>([]),[spaceHeld,setSpaceHeld]=useState(false);
 const marquee=useRef<{x:number;y:number;endX:number;endY:number;click:Selection|null}|null>(null);
 const [selectionBox,setSelectionBox]=useState<{x:number;y:number;width:number;height:number}|null>(null);
 function setSelected(value:Selection|null){setMulti([]);setSelectedRaw(value);}
 const spacePressed=useRef(false);
 useEffect(()=>{
  spacePressed.current=false;setSpaceHeld(false);
  const down=(e:KeyboardEvent)=>{if(e.code!=='Space'||(e.target as HTMLElement).closest('input,textarea,select,[contenteditable=true],dialog'))return;e.preventDefault();e.stopPropagation();spacePressed.current=true;setSpaceHeld(true);};
  const up=(e:KeyboardEvent)=>{if(e.code!=='Space')return;if(spacePressed.current){e.preventDefault();e.stopPropagation();}spacePressed.current=false;setSpaceHeld(false);};
  const blur=()=>{spacePressed.current=false;setSpaceHeld(false);pan.current=null;};
  window.addEventListener('keydown',down,true);window.addEventListener('keyup',up,true);window.addEventListener('blur',blur);
  return()=>{window.removeEventListener('keydown',down,true);window.removeEventListener('keyup',up,true);window.removeEventListener('blur',blur);};
 },[]);
 const imageInput=useRef<HTMLInputElement>(null);
 const svgRef=useRef<SVGSVGElement>(null);const [screenScale,setScreenScale]=useState(1);
 const viewportRef=useRef<HTMLDivElement>(null);
 const [viewportHeight,setViewportHeight]=useState(600);
 useEffect(()=>{const viewport=viewportRef.current;if(!viewport)return;const measure=()=>setViewportHeight(Math.max(1,viewport.clientHeight));const observer=new ResizeObserver(measure);observer.observe(viewport);measure();return()=>observer.disconnect();},[]);
 const zoomAnchor=useRef<{x:number;y:number;clientX:number;clientY:number}|null>(null);
 useEffect(()=>{
  const viewport=viewportRef.current,svg=svgRef.current;if(!viewport||!svg)return;
  const zoomAt=(factor:number,clientX:number,clientY:number)=>{
   if(drag.current)return;
   const matrix=svg.getScreenCTM();if(!matrix)return;
   const p=svg.createSVGPoint();p.x=clientX;p.y=clientY;const world=p.matrixTransform(matrix.inverse());
   zoomAnchor.current={x:world.x,y:world.y,clientX,clientY};
   setZoom(current=>Math.max(10,Math.min(300,current*factor)));
  };
  let gestureScale=1,gesturing=false;
  const wheel=(event:WheelEvent)=>{
   event.preventDefault();
   if(gesturing||!Number.isFinite(event.deltaY)||event.deltaY===0)return;
   const pixels=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?viewport.clientHeight:1);
   zoomAt(Math.exp(Math.max(-8,Math.min(8,-pixels*.002))),event.clientX,event.clientY);
  };
  const gestureStart=(event:Event)=>{event.preventDefault();gesturing=true;gestureScale=1;};
  const gestureChange=(event:Event)=>{
   event.preventDefault();const e=event as Event&{scale:number;clientX?:number;clientY?:number};
   if(!Number.isFinite(e.scale)||e.scale<=0)return;
   const bounds=viewport.getBoundingClientRect();
   zoomAt(e.scale/gestureScale,e.clientX??bounds.x+bounds.width/2,e.clientY??bounds.y+bounds.height/2);gestureScale=e.scale;
  };
  const gestureEnd=()=>{gesturing=false;gestureScale=1;};
  // Native non-passive listeners are required to keep pinch/wheel zoom local
  // to the canvas instead of scrolling or magnifying the document.
  viewport.addEventListener('wheel',wheel,{passive:false});
  viewport.addEventListener('gesturestart',gestureStart,{passive:false});
  viewport.addEventListener('gesturechange',gestureChange,{passive:false});
  viewport.addEventListener('gestureend',gestureEnd);
  return()=>{viewport.removeEventListener('wheel',wheel);viewport.removeEventListener('gesturestart',gestureStart);viewport.removeEventListener('gesturechange',gestureChange);viewport.removeEventListener('gestureend',gestureEnd);};
 },[]);
 useLayoutEffect(()=>{
  const anchor=zoomAnchor.current,svg=svgRef.current,viewport=viewportRef.current;zoomAnchor.current=null;
  if(!anchor||!svg||!viewport)return;const matrix=svg.getScreenCTM();if(!matrix)return;
  const p=svg.createSVGPoint();p.x=anchor.x;p.y=anchor.y;const next=p.matrixTransform(matrix);
  setCamera(c=>({x:c.x+(next.x-anchor.clientX)/matrix.a,y:c.y+(next.y-anchor.clientY)/matrix.d}));
 },[zoom]);
 useLayoutEffect(()=>{const svg=svgRef.current;if(!svg)return;const measure=()=>{const m=svg.getScreenCTM();if(m)setScreenScale(Math.max(.01,Math.hypot(m.a,m.b)));};const observer=new ResizeObserver(measure);observer.observe(svg);measure();return()=>observer.disconnect();},[zoom,draft.width,draft.height,viewportHeight]);
 const layerDrag=useRef<{kind:string;target:string;after:boolean}|null>(null);
 const [layerDrop,setLayerDrop]=useState<{kind:string;after:boolean}|null>(null);
 function dropLayer(){const move=layerDrag.current;layerDrag.current=null;setLayerDrop(null);if(!move||move.kind===move.target)return;const order=[...layers].reverse(),source=order.find(l=>l.kind===move.kind);if(!source)return;const next=order.filter(l=>l.kind!==move.kind),index=next.findIndex(l=>l.kind===move.target);if(index<0)return;next.splice(index+(move.after?1:0),0,source);commit({...draftRef.current,layers:next.reverse()});}
 const [sidebarTab,setSidebarTab]=useState<'properties'|'layers'>('layers');
 const [toolsOpen,setToolsOpen]=useState(true),[propertiesOpen,setPropertiesOpen]=useState(true);
 useEffect(()=>{if(window.matchMedia('(max-width:650px)').matches)setPropertiesOpen(false);},[]);
 const [past,setPast]=useState<Field[]>([]),[future,setFuture]=useState<Field[]>([]);
 const draftRef=useRef(field);const lastSent=useRef(field);
 const drag=useRef<{selection:Selection;members?:Selection[];base:Field;x:number;y:number;resize:boolean}|null>(null);
 useEffect(()=>{draftRef.current=field;setDraft(field);if(lastSent.current!==field){setPast([]);setFuture([]);setSelected(null);}lastSent.current=field;},[field]);
 function preview(next:Field){draftRef.current=next;setDraft(next);}
 function commit(next:Field,base=draftRef.current){
  if(!valid(next)){preview(base);setError('Keep every object inside the field. Cargo dimensions are 20–1000 mm; zone radius is 40–300 mm.');return;}
  if(JSON.stringify(next)===JSON.stringify(base))return;
  setPast(p=>[...p.slice(-49),base]);setFuture([]);setError('');preview(next);lastSent.current=next;onChange(next);
 }
 function undo(){const next=past.at(-1);if(!next)return;setFuture(f=>[draftRef.current,...f]);setPast(p=>p.slice(0,-1));preview(next);lastSent.current=next;onChange(next);setSelected(null);}
 function redo(){const next=future[0];if(!next)return;setPast(p=>[...p,draftRef.current]);setFuture(f=>f.slice(1));preview(next);lastSent.current=next;onChange(next);setSelected(null);}
 function add(kind:Kind,pushable=false){
  setActiveTool('select');setSidebarTab('properties');setPropertiesOpen(true);
  if(kind==='background'||kind==='start'||kind==='goal'){setSelected({kind,index:0});return;}
  const next=clone(draft);let item:Item={x:Math.round(draft.width/2/25)*25,y:Math.round(draft.height/2/25)*25};
  if(kind==='walls')item={...item,width:150,height:100};
  if(kind==='blocks')item={...item,id:'cargo-'+crypto.randomUUID(),color:'red',width:40,height:40,pushable};
  if(kind==='zones')item={...item,radius:90,color:'red'};
  if(kind==='checkpoints')item={...item,radius:45};
  const list=(next[kind]||[]) as Item[];list.push(item);Object.assign(next,{[kind]:list});commit(next);setSelected({kind,index:list.length-1});
 }
 function remove(){
  if(multi.length>1){const next=clone(draft);for(const kind of ['walls','blocks','zones','checkpoints'] as const){if(layers.find(l=>l.kind===kind)?.locked)continue;const indices=new Set(multi.filter(m=>m.kind===kind).map(m=>m.index));Object.assign(next,{[kind]:(next[kind]||[]).filter((_,i)=>!indices.has(i))});}if(multi.some(m=>m.kind==='background')&&!layers.find(l=>l.kind==='background')?.locked){delete next.image;delete next.imageTransform;}commit(next);setSelected(null);return;}
  if(locked||!selected)return;
  if(selected.kind==='start'||selected.kind==='goal'){setError('Robot and Goal are required for training. You can move them or hide their layer.');return;}
  const next=clone(draft);
  if(selected.kind==='background'){delete next.image;delete next.imageTransform;}
  else Object.assign(next,{[selected.kind]:selected.wholeLayer?[]:(next[selected.kind] as Item[]).filter((_,i)=>i!==selected.index)});
  commit(next);setSelected(null);
 }

 function duplicate(){if(locked||!selected||selected.kind==='background'||selected.kind==='start'||selected.kind==='goal')return;const next=clone(draft);const item={...get(next,selected)!};item.x+=50;item.y+=50;if(item.id)item.id='cargo-'+crypto.randomUUID();const list=next[selected.kind] as Item[];list.push(item);commit(next);setSelected({...selected,index:list.length-1});}
 function point(svg:SVGSVGElement,x:number,y:number){const p=svg.createSVGPoint();p.x=x;p.y=y;return p.matrixTransform(svg.getScreenCTM()!.inverse());}
 const layers=(['background','zones','checkpoints','walls','blocks','goal','start'] as Kind[]).map(kind=>draft.layers?.find(l=>l.kind===kind)||{kind}).sort((a,b)=>(draft.layers?.findIndex(l=>l.kind===a.kind)??0)-(draft.layers?.findIndex(l=>l.kind===b.kind)??0));
 const locked=!!layers.find(l=>l.kind===selected?.kind)?.locked;
 const item=selected?get(draft,selected):undefined;
 const size=item?{width:item.width??(item.radius?item.radius*2:40),height:item.height??(item.radius?item.radius*2:40)}:null;
 const handleSize=24/screenScale;
 const handleVisualSize=12/screenScale;
 const origin=item?{x:item.width&&selected?.kind!=='blocks'?item.x:item.x-(size?.width||0)/2,y:item.height&&selected?.kind!=='blocks'?item.y:item.y-(size?.height||0)/2}:null;
 function properties(key:keyof Item,value:Item[keyof Item]){if(selected&&!layers.find(l=>l.kind===selected.kind)?.locked)commit(change(draft,selected,{[key]:value}));}
 return <section className="field-designer" aria-label="Field designer" tabIndex={0} onKeyDown={e=>{
  if((e.target as HTMLElement).closest('input,select,textarea'))return;
  if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&['v','h','g'].includes(e.key.toLowerCase())){e.preventDefault();if(e.key.toLowerCase()==='g')setShowGrid(v=>!v);else setActiveTool(e.key.toLowerCase()==='h'?'hand':'select');return;}
  if(e.key==='Escape'){setShortcutsOpen(false);setSelected(null);return;}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();if(e.shiftKey)redo();else undo();}
  else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='y'){e.preventDefault();redo();}
  else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='d'){e.preventDefault();duplicate();}
  else if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();remove();}
  else if(!locked&&selected&&item&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const d=e.shiftKey?25:1;commit(change(draft,selected,{x:item.x+(e.key==='ArrowLeft'?-d:e.key==='ArrowRight'?d:0),y:item.y+(e.key==='ArrowUp'?-d:e.key==='ArrowDown'?d:0)}));}
 }}>
  {headerTarget?(headerElement?createPortal(<div className="designer-document-header"><p role="status">{error||status||'Changes are saved locally. Use Export field to share the layout.'}</p><div className="designer-document-actions"><button onClick={onDone}>Done editing</button>{onSave&&<button onClick={onSave}>Save to My fields</button>}</div></div>,headerElement):null):<header className="designer-document-header"><p role="status">{error||status||'Changes are saved locally. Use Export field to share the layout.'}</p><div className="designer-document-actions"><button onClick={onDone}>Done editing</button>{onSave&&<button onClick={onSave}>Save to My fields</button>}</div></header>}
  <div className="designer-toolbar designer-actions" role="toolbar" aria-label="Editor actions">{fileActions}<ToolButton label={toolsOpen?'Hide tools':'Show tools'} icon="tools" aria-expanded={toolsOpen} aria-controls="designer-tools" onClick={()=>setToolsOpen(v=>!v)}/><ToolButton label="Undo" icon="undo" disabled={!past.length} onClick={undo}/><ToolButton label="Redo" icon="redo" disabled={!future.length} onClick={redo}/><ToolButton label="Duplicate" icon="duplicate" disabled={locked||!selected||['background','start','goal'].includes(selected.kind)} onClick={duplicate}/><ToolButton label="Delete" icon="delete" disabled={locked||!selected||['start','goal'].includes(selected.kind)} onClick={remove}/><span className="designer-divider"/><ToolButton label="Center horizontally" icon="align-x" disabled={!item||locked} onClick={()=>{if(selected&&item)commit(change(draft,selected,{x:draft.width/2-(['walls','background'].includes(selected.kind)?(item.width||0)/2:0)}));}}/><ToolButton label="Center vertically" icon="align-y" disabled={!item||locked} onClick={()=>{if(selected&&item)commit(change(draft,selected,{y:draft.height/2-(['walls','background'].includes(selected.kind)?(item.height||0)/2:0)}));}}/><span className="designer-divider"/><ToolButton label="Toggle grid (G)" icon="grid" aria-pressed={showGrid} onClick={()=>setShowGrid(v=>!v)}/><ToolButton label="Snap 25 mm" icon="grid" aria-pressed={snap} onClick={()=>setSnap(v=>!v)}/><ToolButton label="Keyboard shortcuts" icon="help" aria-expanded={shortcutsOpen} onClick={()=>setShortcutsOpen(v=>!v)}/><div className="designer-zoom"><ToolButton label="Zoom out" icon="minus" disabled={zoom<=10} onClick={()=>{zoomAnchor.current=null;setZoom(z=>Math.max(10,z-25));}}/><output aria-label="Zoom level">{Math.round(zoom)}%</output><ToolButton label="Zoom in" icon="plus" disabled={zoom>=300} onClick={()=>{zoomAnchor.current=null;setZoom(z=>Math.min(300,z+25));}}/><ToolButton label="Fit field" icon="fit" onClick={()=>{zoomAnchor.current=null;setZoom(100);setCamera({x:0,y:0});const viewport=document.getElementById('designer-viewport');if(viewport){viewport.scrollLeft=0;viewport.scrollTop=0;}}}/></div><ToolButton label={propertiesOpen?'Hide properties':'Show properties'} icon="properties" aria-expanded={propertiesOpen} aria-controls="designer-properties" onClick={()=>setPropertiesOpen(v=>!v)}/></div>
  {shortcutsOpen&&<div className="designer-shortcuts" role="region" aria-label="Keyboard shortcuts"><strong>Work faster</strong><span><kbd>V</kbd> Select</span><span><kbd>H</kbd> Pan</span><span><kbd>Space + drag</kbd> Temporary pan</span><span><kbd>Ctrl / ⌘ + drag</kbd> Select multiple</span><span><kbd>Ctrl / ⌘ + click</kbd> Toggle selection</span><span><kbd>G</kbd> Grid</span><span><kbd>Ctrl / ⌘ Z</kbd> Undo</span><span><kbd>Ctrl / ⌘ D</kbd> Duplicate</span><span><kbd>Shift + arrows</kbd> Move 25 mm</span><button onClick={()=>setShortcutsOpen(false)} aria-label="Close shortcuts">×</button></div>}
  <div className={'designer-body'+(!toolsOpen?' tools-closed':'')+(!propertiesOpen?' properties-closed':'')}><aside id="designer-tools" hidden={!toolsOpen} className="designer-tool-sidebar" role="toolbar" aria-label="Drawing tools" aria-orientation="vertical"><ToolButton label="Select (V)" icon="select" aria-pressed={!spaceHeld&&activeTool==='select'} onClick={()=>setActiveTool('select')}/><ToolButton label="Hand (H)" icon="hand" aria-pressed={spaceHeld||activeTool==='hand'} onClick={()=>setActiveTool('hand')}/><span className="designer-tool-divider"/><ToolButton label="Upload background image" icon="image" onClick={()=>imageInput.current?.click()}/><ToolButton label="Add wall" icon="wall" onClick={()=>add('walls')}/><ToolButton label="Add cargo block" icon="cargo" onClick={()=>add('blocks')}/><ToolButton label="Add push block" icon="push" onClick={()=>add('blocks',true)}/><ToolButton label="Add delivery zone" icon="zone" onClick={()=>add('zones')}/><ToolButton label="Add checkpoint" icon="checkpoint" onClick={()=>add('checkpoints')}/><ToolButton label="Robot" icon="robot" onClick={()=>add('start')}/><ToolButton label="Goal" icon="goal" onClick={()=>add('goal')}/></aside><div ref={viewportRef} id="designer-viewport" className="designer-scroll"><svg ref={svgRef} className={'designer-canvas tool-'+(spaceHeld?'hand':activeTool)+(spaceHeld?' space-grab':'')} aria-label="Editable field canvas" role="img" style={{width:'100%',minWidth:'100%',height:viewportHeight+'px'}} viewBox={`${camera.x+draft.width*(1-100/zoom)/2} ${camera.y+draft.height*(1-100/zoom)/2} ${draft.width*100/zoom} ${draft.height*100/zoom}`} onPointerDown={e=>{
   if(e.button===1||e.button===0&&(activeTool==='hand'||spacePressed.current||spaceHeld)){const viewport=viewportRef.current!;pan.current={x:e.clientX,y:e.clientY,left:camera.x,top:camera.y,scale:e.currentTarget.getScreenCTM()?.a||1};e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault();return;}
   if(e.button!==0)return;
   const target=(e.target as Element).closest('[data-kind]');
   if(e.ctrlKey||e.metaKey){const p=point(e.currentTarget,e.clientX,e.clientY);marquee.current={x:p.x,y:p.y,endX:p.x,endY:p.y,click:target?{kind:target.getAttribute('data-kind') as Kind,index:Number(target.getAttribute('data-index'))}:null};e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault();return;}
   if(!target){setSelected(null);return;}
   const selection={kind:target.getAttribute('data-kind') as Kind,index:Number(target.getAttribute('data-index'))};
   if(layers.find(l=>l.kind===selection.kind)?.locked)return;const p=point(e.currentTarget,e.clientX,e.clientY);const members=multi.some(m=>m.kind===selection.kind&&m.index===selection.index)?multi:[];if(!members.length)setSelected(selection);else setSelectedRaw(selection);drag.current={selection,members,base:draftRef.current,x:p.x,y:p.y,resize:target.hasAttribute('data-resize')};e.currentTarget.setPointerCapture(e.pointerId);e.preventDefault();
  }} onPointerMove={e=>{
   if(marquee.current){const p=point(e.currentTarget,e.clientX,e.clientY),m=marquee.current;m.endX=p.x;m.endY=p.y;setSelectionBox({x:Math.min(m.x,p.x),y:Math.min(m.y,p.y),width:Math.abs(p.x-m.x),height:Math.abs(p.y-m.y)});return;}
   if(pan.current){setCamera({x:pan.current.left+(pan.current.x-e.clientX)/pan.current.scale,y:pan.current.top+(pan.current.y-e.clientY)/pan.current.scale});return;}
   const d=drag.current;if(!d)return;const p=point(e.currentTarget,e.clientX,e.clientY);const item=get(d.base,d.selection);if(!item)return;
   const round=(n:number)=>Math.round(n/(snap?25:1))*(snap?25:1);let value:Partial<Item>;
   if(d.resize){value=item.width||d.selection.kind==='blocks'?{width:Math.max(20,round((item.width??40)+(p.x-d.x)*(d.selection.kind==='blocks'?2:1))),height:Math.max(20,round((item.height??40)+(p.y-d.y)*(d.selection.kind==='blocks'?2:1)))}:{radius:Math.max(20,round(item.radius!+Math.max(p.x-d.x,p.y-d.y)))};}
   else value={x:round(item.x+p.x-d.x),y:round(item.y+p.y-d.y)};
   let next=change(d.base,d.selection,value);
   if(!d.resize&&d.members?.length){next=clone(d.base);for(const member of d.members){if(layers.find(l=>l.kind===member.kind)?.locked)continue;const o=get(d.base,member);if(o)next=change(next,member,{x:o.x+(value.x!-item.x),y:o.y+(value.y!-item.y)});}}
   preview(next);
  }} onPointerUp={e=>{if(marquee.current){const m=marquee.current;marquee.current=null;setSelectionBox(null);let chosen:Selection[]=[];if(Math.hypot(m.endX-m.x,m.endY-m.y)<4){const clicked=m.click;if(clicked&&!layers.find(l=>l.kind===clicked.kind)?.locked){const current=multi.length?multi:selected?[selected]:[];chosen=current.some(c=>c.kind===clicked.kind&&c.index===clicked.index)?current.filter(c=>c.kind!==clicked.kind||c.index!==clicked.index):[...current,clicked];}}else{const left=Math.min(m.x,m.endX),right=Math.max(m.x,m.endX),top=Math.min(m.y,m.endY),bottom=Math.max(m.y,m.endY);for(const layer of layers){if(layer.hidden||layer.locked||layer.kind==='background')continue;const kind=layer.kind as Exclude<Kind,'background'>;const objects=kind==='start'||kind==='goal'?[draft[kind]]:(draft[kind]||[]) as Item[];objects.forEach((o,index)=>{if(o.x>=left&&o.x<=right&&o.y>=top&&o.y<=bottom)chosen.push({kind,index});});}}setMulti(chosen);setSelectedRaw(chosen[0]||null);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);return;}if(pan.current){pan.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);return;}const d=drag.current;if(!d)return;drag.current=null;commit(draftRef.current,d.base);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}} onPointerCancel={()=>{marquee.current=null;setSelectionBox(null);pan.current=null;if(drag.current)preview(drag.current.base);drag.current=null;}}>
   <defs><pattern id="designer-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#cedbd2" strokeWidth="1"/></pattern></defs><rect width={draft.width} height={draft.height} fill="#f6faf5"/><rect width={draft.width} height={draft.height} fill="url(#designer-grid)" visibility={showGrid?'visible':'hidden'} pointerEvents="none"/>
   {layers.filter(l=>!l.hidden).map(layer=>{const kind=layer.kind as Kind;if(kind==='background'){const bounds=draft.imageTransform||{x:0,y:0,width:draft.width,height:draft.height};return draft.image&&<image key={kind} data-kind={kind} data-index={0} href={draft.image} {...bounds} preserveAspectRatio="none" pointerEvents={layer.locked?'none':undefined}/>;}const list=kind==='start'||kind==='goal'?[draft[kind]]:draft[kind]||[];return (list as Item[]).map((o,index)=><g key={kind+index} data-kind={kind} data-index={index} className="designer-object" pointerEvents={layer.locked?'none':undefined}>{kind==='start'?<RobotIcon x={o.x} y={o.y} heading={o.heading}/>:kind==='walls'?<rect x={o.x} y={o.y} width={o.width} height={o.height} fill="#42615a"/>:kind==='blocks'?<><CargoShape x={o.x} y={o.y} color={o.color!} shape={o.shape} width={o.width} height={o.height}/>{o.pushable&&<text x={o.x} y={o.y+9} textAnchor="middle" fontSize="26" fill="white">→</text>}</>:<><circle cx={o.x} cy={o.y} r={o.radius||45} fill={kind==='checkpoints'?'#ffe6a7':kind==='goal'?'#a9dda9':fieldColor(o.color!)} fillOpacity={kind==='zones'?.3:1} stroke="#47745a" strokeWidth="3"/><text x={o.x} y={o.y+8} textAnchor="middle" fontSize="24" fill={'#173e36'}>{kind==='checkpoints'?index+1:kind==='goal'?'G':o.color}</text></>}</g>);})}
   {selectionBox&&<rect {...selectionBox} className="selection-marquee" fill="#2685e522" stroke="#2685e5" strokeWidth="2" vectorEffect="non-scaling-stroke" pointerEvents="none"/>}
   {multi.map(m=>{const o=get(draft,m);if(!o)return null;const w=o.width??(o.radius??20)*2,h=o.height??(o.radius??20)*2;return <rect key={m.kind+m.index} data-multi-selected="true" x={o.x-(['walls','background'].includes(m.kind)?0:w/2)} y={o.y-(['walls','background'].includes(m.kind)?0:h/2)} width={w} height={h} fill="none" stroke="#2685e5" strokeWidth="2" vectorEffect="non-scaling-stroke" pointerEvents="none"/>;})}
   {item&&selected&&size&&origin&&!locked&&!layers.find(l=>l.kind===selected.kind)?.hidden&&<g><rect {...origin} width={size.width} height={size.height} fill="none" stroke="#137ce5" strokeWidth="4" strokeDasharray="8 4" vectorEffect="non-scaling-stroke" pointerEvents="none"/>{(item.width||item.radius||selected.kind==='blocks')&&<><rect x={origin.x+size.width-handleVisualSize/2} y={origin.y+size.height-handleVisualSize/2} width={handleVisualSize} height={handleVisualSize} fill="white" stroke="#137ce5" strokeWidth="2" vectorEffect="non-scaling-stroke" pointerEvents="none" className="resize-handle-visual"/><rect data-kind={selected.kind} data-index={selected.index} data-resize="true" x={origin.x+size.width-handleSize/2} y={origin.y+size.height-handleSize/2} width={handleSize} height={handleSize} fill="transparent" className="resize-handle"/></>}</g>}
  </svg></div><aside id="designer-properties" hidden={!propertiesOpen} className="designer-properties"><div className="designer-sidebar-tabs" role="tablist" aria-label="Designer sidebar">{(['layers','properties'] as const).map(tab=><button type="button" key={tab} role="tab" id={'designer-tab-'+tab} aria-selected={sidebarTab===tab} aria-controls={'designer-panel-'+tab} tabIndex={sidebarTab===tab?0:-1} onClick={()=>setSidebarTab(tab)} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();e.stopPropagation();const next=e.key==='Home'?'layers':e.key==='End'?'properties':tab==='properties'?'layers':'properties';setSidebarTab(next);document.getElementById('designer-tab-'+next)?.focus();}}}>{tab==='properties'?'Field properties':'Layers'}</button>)}</div><div id="designer-panel-layers" role="tabpanel" aria-labelledby="designer-tab-layers" hidden={sidebarTab!=='layers'} className="designer-layers"><small>Visibility and locks apply while editing.</small>{[...layers].reverse().filter(layer=>layer.kind==='background'?!!draft.image:layer.kind==='start'||layer.kind==='goal'||!!(draft as unknown as Record<string,Item[]>)[layer.kind]?.length).map((layer)=><div key={layer.kind} data-layer-kind={layer.kind} className={'designer-layer-group'+(layer.hidden?' is-hidden':'')+(layerDrop?.kind===layer.kind?(layerDrop.after?' drop-after':' drop-before'):'')}><div className="designer-layer"><button aria-label={'Select '+layer.kind+' layer'} aria-pressed={selected?.kind===layer.kind} onClick={()=>setSelected({kind:layer.kind as Kind,index:0,wholeLayer:true})}><LayerPreview field={draft} kind={layer.kind}/><span className="layer-title">{({start:'Robot',goal:'Goal',blocks:'Mission blocks',walls:'Walls',checkpoints:'Checkpoints',zones:'Delivery zones',background:'Background'} as Record<string,string>)[layer.kind]}<small>{layer.locked?'Locked':layer.hidden?'Hidden':'Visible'}</small></span></button><button title={layer.hidden?'Show layer':'Hide layer'} aria-label={(layer.hidden?'Show ':'Hide ')+layer.kind+' layer'} onClick={()=>commit({...draft,layers:layers.map(l=>l.kind===layer.kind?{...l,hidden:!l.hidden}:l)})}><DesignerIcon name={layer.hidden?'eye-off':'eye'}/></button><button aria-label={(layer.locked?'Unlock ':'Lock ')+layer.kind+' layer'} onClick={()=>commit({...draft,layers:layers.map(l=>l.kind===layer.kind?{...l,locked:!l.locked}:l)})}><DesignerIcon name={layer.locked?'lock':'unlock'}/></button><button className="layer-drag-handle" aria-label={'Reorder '+layer.kind+' layer'} title="Drag to reorder. Arrow keys move this layer." onPointerDown={e=>{if(e.button!==0)return;e.preventDefault();e.stopPropagation();layerDrag.current={kind:layer.kind,target:layer.kind,after:false};e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(!layerDrag.current)return;const sidebar=e.currentTarget.closest('.designer-properties')!;const bounds=sidebar.getBoundingClientRect();if(e.clientY<bounds.top+50)sidebar.scrollTop-=18;else if(e.clientY>bounds.bottom-40)sidebar.scrollTop+=18;const row=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-layer-kind]');if(!row)return;const target=row.getAttribute('data-layer-kind')!,after=e.clientY>row.getBoundingClientRect().top+row.getBoundingClientRect().height/2;layerDrag.current={...layerDrag.current,target,after};setLayerDrop({kind:target,after});}} onPointerUp={e=>{dropLayer();if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}} onPointerCancel={()=>{layerDrag.current=null;setLayerDrop(null);}} onKeyDown={e=>{if(!['ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();e.stopPropagation();const next=[...layers],i=next.findIndex(l=>l.kind===layer.kind),j=i+(e.key==='ArrowUp'?1:-1);if(j<0||j>=next.length)return;[next[i],next[j]]=[next[j],next[i]];commit({...draft,layers:next});}}>⠿</button></div>{['blocks','walls','zones','checkpoints'].includes(layer.kind)&&<details className="layer-objects"><summary>{((draft as unknown as Record<string,Item[]>)[layer.kind]||[]).length} objects</summary>{((draft as unknown as Record<string,Item[]>)[layer.kind]||[]).map((object,index)=><button key={index} className="layer-object" aria-label={'Select '+layer.kind+' object '+(index+1)} aria-pressed={selected?.kind===layer.kind&&selected.index===index} onClick={()=>setSelected({kind:layer.kind as Kind,index})}><LayerPreview field={draft} kind={layer.kind} index={index}/><span>{layer.kind==='blocks'?(object.pushable?'Push block':'Cargo'):layer.kind==='walls'?'Wall':layer.kind==='zones'?'Zone':'Checkpoint'} {index+1}<small>{object.color||''}{object.width?' · '+object.width+' × '+object.height+' mm':''}</small></span></button>)}</details>}</div>)}</div><div id="designer-panel-properties" role="tabpanel" aria-labelledby="designer-tab-properties" hidden={sidebarTab!=='properties'}><strong>{selected?'Selected '+selected.kind:'Field properties'}</strong><label>Name<input value={draft.name} maxLength={100} onChange={e=>commit({...draft,name:e.target.value})}/></label>
   {item&&selected?<>{(['x','y',...(item.width||selected.kind==='blocks'?['width','height']:[]),...(item.radius?['radius']:[]),...(item.heading!==undefined?['heading']:[])] as (keyof Item)[]).map(key=><label key={key}>{key.toUpperCase()}<input type="number" aria-label={'Object '+key} key={selected.kind+selected.index+key+item[key]} defaultValue={Number(item[key]??40)} onBlur={e=>properties(key,Number(e.target.value))}/></label>)}{item.color&&<><label>Color<input aria-label="Object color picker" type="color" value={fieldColor(item.color)} onChange={e=>properties('color',e.target.value.toLowerCase())}/></label><label>HEX color<input aria-label="Object HEX color" key={selected.kind+selected.index+item.color} defaultValue={fieldColor(item.color)} maxLength={7} onBlur={e=>{const value=e.target.value.trim().toLowerCase();if(/^#[0-9a-f]{6}$/.test(value))properties('color',value);else{e.target.value=fieldColor(item.color!);setError('Enter a HEX color such as #ff8800.');}}}/></label></>}{selected.kind==='blocks'&&<label>Shape<select aria-label="Object shape" value={item.shape||'square'} onChange={e=>properties('shape',e.target.value as Item['shape'])}><option value="square">Square</option><option value="circle">Circle</option><option value="triangle">Triangle</option><option value="hexagon">Hexagon</option></select></label>}{selected.kind==='blocks'&&<label><input type="checkbox" checked={!!item.pushable} onChange={e=>properties('pushable',e.target.checked)}/>Push-only (no magnet)</label>}</>:<>{(['width','height'] as const).map(key=><label key={key}>Field {key}<input type="number" defaultValue={draft[key]} key={key+draft[key]} onBlur={e=>commit({...draft,[key]:Number(e.target.value)})}/></label>)}<span>Select an object to edit its position and size.</span></>}
  <div className="designer-background"><strong>Background image</strong><input ref={imageInput} aria-label="Background image" type="file" accept="image/png,image/jpeg,image/webp" onChange={async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{setError('');const {prepareBackground}=await import('./prepare-background');const uploaded=await prepareBackground(file);const {fitImageField}=await import('./fit-image-field');commit(fitImageField(draftRef.current,uploaded));setZoom(100);setCamera({x:0,y:0});setSelected({kind:'background',index:0});}catch(error){setError(error instanceof Error?error.message:'Could not load this image.');}}}/>{draft.image&&<><img src={draft.image} alt="Current field background" style={{width:'100%',maxHeight:100,objectFit:'contain'}}/><button onClick={()=>commit({...draft,image:undefined})}>Remove image</button></>}<small>PNG, JPG or WebP. Large images are resized automatically.</small></div>
  </div></aside></div>

 </section>;
}
