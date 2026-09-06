'use client';
import CargoShape from './cargo-shape';
import CompetitionPanel from './competition-panel';
import {fieldColor} from './field-model';

import MindxLogo from '../mindx-logo';
import Link from 'next/link';
import missionCatalog from './missions.json';
import solutionCatalog from './solutions.json';
const solutions:Record<string,{title:string;steps:string[];seconds:number;project:string;field:string}>=solutionCatalog;
import RobotIcon from './robot-icon';
import RobotVisual from './robot-visual';
import MovingCargo from './moving-cargo';
import FieldDesigner from './field-designer';
import { useEffect, useRef, useState } from 'react';
import ControllerPanel from '../studio/controller-panel';
import '../studio/controller.css';
import './training.css';

import {initialField,validField,type Field,type Cargo} from './field-model';
type Lesson = { id:string; level:string; description:string; field:Field; custom?:boolean; startEditing?:boolean;focus?:string;hint?:string };
type State = {elapsedMs?:number;x:number;y:number;heading:number;distance:number;rotation:number;collision:boolean;goal:boolean;running:boolean;status:string;logs:string[];path:number[][];checkpointIndex?:number;blocks?:Cargo[];carrying?:string|null;delivered?:number;magnet?:boolean;eye?:{distance:number;found:boolean;color:string;hue:number;brightness:number}};
const lessons:Lesson[]=[...missionCatalog as Lesson[],{id:'custom',level:'YOUR FIELD',description:'Import your own field or design a new layout, then program a route to the target.',field:{...initialField,name:'Your practice field'},custom:true}];
const initialState:State={x:200,y:600,heading:90,distance:0,rotation:0,collision:false,goal:false,running:false,status:'Loading editor…',logs:[],path:[]};
function download(name:string,value:unknown){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
const cargoColors={red:'#df5361',green:'#31965b',blue:'#397fd6'};
function CargoVisual({field,blocks=field.blocks||[],carrying}:{field:Field;blocks?:Cargo[];carrying?:string|null}){
  return <>{field.zones?.map((z,i)=><g key={'zone'+i}><circle cx={z.x} cy={z.y} r={z.radius} fill={fieldColor(z.color)} fillOpacity=".15" stroke={fieldColor(z.color)} strokeWidth="5" strokeDasharray="10 6"/><text x={z.x} y={z.y+8} textAnchor="middle" fontSize="22" fill={fieldColor(z.color)}>{z.color.toUpperCase()}</text></g>)}{blocks.filter(b=>b.id!==carrying).map(b=><g key={b.id}><CargoShape x={b.x} y={b.y} color={b.color} shape={b.shape} width={b.width} height={b.height}/>{b.pushable&&<text x={b.x} y={b.y+8} textAnchor="middle" fontSize="24" fill="white">→</text>}</g>)}</>;
}

function CheckpointVisual({field,completed=0}:{field:Field;completed?:number}){
  return <>{field.checkpoints?.map((c,i)=>{const same=field.checkpoints!.map((p,j)=>({p,j})).filter(({p})=>p.x===c.x&&p.y===c.y);const visible=same.find(({j})=>j>=completed)||same[same.length-1];if(visible.j!==i)return null;return <g key={i}><circle cx={c.x} cy={c.y} r={c.radius} fill={i<completed?'#d6eed7':'#fff5df'} stroke={i<completed?'#33874b':i===completed?'#bc7016':'#d6b783'} strokeWidth="5"/><text x={c.x} y={c.y+10} textAnchor="middle" fontSize="30" fontWeight="bold" fill="#724809">{i+1}</text></g>;})}</>;
}

function FieldPreview({field}:{field:Field}){
  return <svg viewBox={`0 0 ${field.width} ${field.height}`} aria-hidden="true" className="lesson-preview"><rect width={field.width} height={field.height} fill="#e8efe6"/>{field.image&&<image href={field.image} x={field.imageTransform?.x??0} y={field.imageTransform?.y??0} width={field.imageTransform?.width??field.width} height={field.imageTransform?.height??field.height} preserveAspectRatio="none"/>}{field.walls.map((wall,i)=><rect key={i} {...wall} rx="8" fill="#42615a"/>)}{!field.blocks?.length&&<circle cx={field.goal.x} cy={field.goal.y} r={field.goal.radius} fill="#7acb7e" stroke="#34844b" strokeWidth="8"/>}<CheckpointVisual field={field}/><CargoVisual field={field}/><g transform={`translate(${field.start.x} ${field.start.y}) rotate(${field.start.heading})`}><RobotIcon/></g></svg>;
}

export default function Training(){
  const [selected,setSelected]=useState<Lesson|null>(null);
  const [interactive,setInteractive]=useState(false);
  const [custom,setCustom]=useState<Lesson[]>([]);
  const [saved,setSaved]=useState<Record<string,Field>>({});
  const [notice,setNotice]=useState('');
  const [query,setQuery]=useState('');
  const [difficulty,setDifficulty]=useState('ALL');
  const [resourcesOnly,setResourcesOnly]=useState(false);
  const refresh=()=>{
    try{
      const values=JSON.parse(localStorage.getItem('mindx-training-library')||'[]');
      const list:Lesson[]=Array.isArray(values)?values.filter((l:Lesson)=>l&&typeof l.id==='string'&&/^field-[a-z0-9-]+$/.test(l.id)&&validField(l.field)).slice(0,8).map((l:Lesson)=>({...l,level:'YOUR FIELD',description:'Program your robot to reach the target without hitting a wall.',custom:true})):[];
      setCustom(list);
      const fields:Record<string,Field>={};
      for(const l of [...lessons,...list]){try{const f=JSON.parse(localStorage.getItem('mindx-training-field:'+l.id)||'null');if(validField(f))fields[l.id]=f;}catch{}}
      const legacy=JSON.parse(localStorage.getItem('mindx-training-field')||'null');
      if(!fields.custom&&validField(legacy))fields.custom=legacy;
      setSaved(fields);
    }catch{setNotice('Could not restore saved fields. You can still use the practice fields.');}
  };
  useEffect(()=>{refresh();setInteractive(true);},[]);
  function addField(field:Field,startEditing=false){
    if(custom.length>=8){setNotice('Your library holds up to 8 custom fields. You can still import a field inside Your practice field.');return;}
    const lesson:Lesson={id:'field-'+crypto.randomUUID(),level:'YOUR FIELD',description:'Program your robot to reach the target without hitting a wall.',field,custom:true};
    try{
      localStorage.setItem('mindx-training-field:'+lesson.id,JSON.stringify(field));
      localStorage.setItem('mindx-training-library',JSON.stringify([...custom,lesson].map(l=>({...l,field:{...l.field,image:undefined}}))));
      setCustom([...custom,lesson]);setSelected({...lesson,startEditing});
    }catch{try{localStorage.removeItem('mindx-training-field:'+lesson.id);}catch{}setNotice('Storage is full. Export a backup and remove an unused custom field before adding another.');}
  }
  function removeField(id:string){
    if(!confirm('Remove this custom field from the library? Export it first if you need a backup.'))return;
    try{const next=custom.filter(l=>l.id!==id);localStorage.setItem('mindx-training-library',JSON.stringify(next.map(l=>({...l,field:{...l.field,image:undefined}}))));localStorage.removeItem('mindx-training-field:'+id);setCustom(next);}catch{setNotice('Could not update the field library.');}
  }
  if(selected)return <TrainingWorkspace key={selected.id} lesson={selected} onBack={()=>{setSelected(null);refresh();}}/>;
  const visibleLessons=[...lessons,...custom].filter(l=>(!resourcesOnly||!!solutions[l.id])&&(difficulty==='ALL'||(difficulty==='YOUR FIELD'?l.custom:l.level.includes(difficulty)))&&((saved[l.id]||l.field).name+' '+l.description+' '+(l.focus||'')).toLowerCase().includes(query.toLowerCase().trim()));
  return <main className="training-page training-gallery">
    <header className="training-header"><Link href="/" className="training-brand official-brand"><MindxLogo/><span>/ TRAINING</span></Link><span className="training-badge">VIRTUAL ROBOT · NO BRAIN REQUIRED</span><Link href="/studio">Physical robot studio ↗</Link></header>
    <section className="lesson-library" aria-label="Training missions"><div className="library-intro"><div><span className="library-eyebrow">CHOOSE YOUR NEXT MISSION</span><h1>A new field.<br/>A new way to think.</h1><p>Choose a field, write your code and guide the robot to its target. Show or hide the map whenever you need more room to program.</p></div><div className="library-tools"><Link className="create-field-link" href="/training/custom?new=1">+ Create field</Link><label>Import field<input type="file" accept=".json,application/json" onChange={async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>4500000)throw new Error();const data=JSON.parse(await file.text());if(data.version!==1||!validField(data.field))throw new Error();addField(data.field);}catch{setNotice('Choose a valid exported training field JSON.');}}}/></label><span>Custom fields are saved in this browser.</span><div className="library-filter"><label>Find a mission<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search fields or thinking skills…"/></label><span role="status">{visibleLessons.length} fields · {missionCatalog.length} built-in missions</span></div></div></div>
      {notice&&<p role="status">{notice}</p>}
      <fieldset className="difficulty-filter"><legend>Difficulty</legend><div>{[['ALL','All levels'],['BEGINNER','Beginner'],['INTERMEDIATE','Intermediate'],['CHALLENGE','Challenge'],['YOUR FIELD','Your fields']].map(([value,label])=><button type="button" key={value} aria-pressed={difficulty===value} onClick={()=>setDifficulty(value)}>{label}<span>{[...lessons,...custom].filter(l=>value==='ALL'||(value==='YOUR FIELD'?l.custom:l.level.includes(value))).length}</span></button>)}</div></fieldset>
      <div className="resource-filter"><button aria-pressed={resourcesOnly} onClick={()=>setResourcesOnly(v=>!v)}>Worked solutions · {Object.keys(solutions).length}</button><span>Download Blockly code, matching fields and step-by-step solutions.</span></div>
      {!visibleLessons.length&&<p>No fields match this search. Try another name or level.</p>}
      <div className="lesson-grid">{visibleLessons.map(lesson=>{const field=saved[lesson.id]||lesson.field;return <article className="lesson-card" key={lesson.id}><FieldPreview field={field}/><div className="lesson-card-content"><span>{lesson.level}</span><h2>{field.name}</h2>{solutions[lesson.id]&&<span className="solution-badge">Worked solution available</span>}{lesson.focus&&<strong className="lesson-focus">{lesson.focus}</strong>}<p>{lesson.description}</p><div className="lesson-card-bottom"><small>{field.width} × {field.height} mm</small><button disabled={!interactive} onClick={()=>setSelected({...lesson,field})} aria-label={'Practice '+field.name}>Practice ↗</button></div>{lesson.custom&&<Link className="edit-custom-link" href={'/training/custom?id='+encodeURIComponent(lesson.id)}>Edit field ↗</Link>}{lesson.id.startsWith('field-')&&<button className="remove-library-field" onClick={()=>removeField(lesson.id)} aria-label={'Remove '+field.name}>Remove field</button>}</div></article>;})}</div>
    </section>
  </main>;
}

function TrainingWorkspace({lesson,onBack}:{lesson:Lesson;onBack:()=>void}){
  const frame=useRef<HTMLIFrameElement>(null);
  const [ready,setReady]=useState(false);
  const [field,setField]=useState<Field>(lesson.field);
  const [state,setState]=useState<State>(initialState);
  const [controls,setControls]=useState(false);
  const [dock,setDock]=useState(true);
  const [competition,setCompetition]=useState(false);
  const [edit,setEdit]=useState(!!lesson.startEditing);
  const [mapVisible,setMapVisible]=useState(true);
  const [notice,setNotice]=useState('Drag blocks from Drivetrain, Magnet and Sensing. Use File to open your .goblocks project.');
  const [loaded,setLoaded]=useState(false);
  const send=(action:string,extra:Record<string,unknown>={})=>frame.current?.contentWindow?.postMessage({type:'training-command',action,...extra},location.origin);
  useEffect(()=>{
    try{const f=JSON.parse(localStorage.getItem('mindx-training-field:'+lesson.id)||'null');if(validField(f))setField(f);}catch{}
    setLoaded(true);
    const receive=(event:MessageEvent)=>{
      if(event.origin!==location.origin||(event.source!==frame.current?.contentWindow&&event.source!==window))return;
      const data=event.data;
      if(data?.type==='vex-editor-ready')setReady(true);
      if(data?.type==='vex-editor-error')setNotice(data.message);
      if(data?.type==='training-state')setState(data);
      if(data?.type==='vex-toolbar-action'){
        if(data.action==='controls')setControls(v=>!v);
        if(data.action==='dock')setDock(v=>!v);
        if(data.action==='help')setNotice('Use Magnet boost/drop, Eye sensing and Bumper inside if / wait until / loops. The virtual eye looks straight ahead: far 400 mm, near 150 mm. Pickup is at the front of the robot. Heading 0° points up; 90° points right.');
      }
    };
    window.addEventListener('message',receive);
    return()=>window.removeEventListener('message',receive);
  },[]);
  useEffect(()=>{
    if(!loaded)return;
    try{localStorage.setItem('mindx-training-field:'+lesson.id,JSON.stringify(field));}catch{setNotice('Browser storage is full. Export the field to keep a copy.');}
    if(ready)frame.current?.contentWindow?.postMessage({type:'training-command',action:'field',field},location.origin);
  },[field,ready,loaded]);
  const busy=state.running;
  const replaceField=(next:Field)=>{if(validField(next)){setField(next);setNotice('Field updated. Robot reset to its starting position.');}else setNotice('Invalid field. Keep the start, goal and walls inside a 300–5000 mm field.');};
  return <main className="training-page training-focus">
    <header className="mission-bar"><Link href="/" className="focus-brand official-brand" aria-label="mindX home"><MindxLogo compact/></Link><button onClick={()=>{send('stop');frame.current?.contentWindow?.dispatchEvent(new Event('pagehide'));onBack();}}>← All missions</button><div className="mission-description"><strong title={field.name}>{field.name}</strong></div><button aria-controls="training-map-panel" aria-expanded={mapVisible} onClick={()=>{setMapVisible(v=>!v);setEdit(false);}}>{mapVisible?'Hide map':'Show map'}</button><details className="mission-options"><summary>Mission</summary><div><strong>{field.name}</strong><p>{lesson.description}</p><p>{field.width} × {field.height} mm · Virtual robot</p><button disabled={busy} onClick={()=>{setMapVisible(true);setEdit(v=>!v);}} aria-expanded={edit}>{edit?'Finish editing':'Edit field'}</button>{lesson.id==='first-journey'&&<button disabled={!ready||busy} onClick={()=>{if(confirm('Replace the current code with the 700 mm demo? Save your code first if needed.')){replaceField(initialField);send('demo');}}}>Load demo code</button>}{['cargo-1','sensor-bumper-1','sensor-eye-1'].includes(lesson.id)&&<button disabled={!ready||busy} onClick={()=>{if(confirm('Replace the current code and restore this mission field with a sensor example? Save your work first.')){replaceField(lesson.field);send('example',{kind:lesson.id});}}}>Load sensor example</button>}<Link href="/studio">Physical robot studio ↗</Link></div></details><div className="mission-timer" role="timer" aria-label="Mission time"><span>Mission time</span><strong>{Math.floor((state.elapsedMs||0)/60000).toString().padStart(2,'0')}:{Math.floor((state.elapsedMs||0)/1000%60).toString().padStart(2,'0')}.{Math.floor((state.elapsedMs||0)%1000/100)}</strong></div><button aria-pressed={competition} onClick={()=>{setCompetition(v=>!v);setDock(true);}}>Competition</button><div className="training-actions"><button className="training-run" disabled={!ready||busy||edit} onClick={()=>send('run')}>▶ Run code</button><button className="training-stop" disabled={!ready} onClick={()=>send('stop')}>■ Stop</button><button disabled={!ready} onClick={()=>send('reset')}>↺ Reset robot</button></div>{!mapVisible&&<span className="hidden-map-status" role="status">{state.goal?'Goal reached ✓':state.status}</span>}</header>
    {competition&&<CompetitionPanel pose={state} ready={ready} onStop={()=>send('stop')} onControls={()=>{setControls(true);setDock(true);}} onClose={()=>setCompetition(false)}/>}<div className={'training-layout'+(!mapVisible?' map-hidden':'')+(edit?' designing':'')}>
      <section className="training-code" aria-label="Training code editor">
        <div className="studio-workspace"><div className="editor-container"><iframe ref={frame} src={'/editor/index.html?mode=training&lesson='+encodeURIComponent(lesson.id)} title="Training Blockly editor" allow="bluetooth 'none'"/>{!ready&&<div className="loading">Loading Blockly…</div>}</div>
          <ControllerPanel frame={frame} training storageKey={'training:'+lesson.id+':mindx-go-controller-v1'} open={controls} onOpen={()=>setControls(true)} onClose={()=>setControls(false)} dockVisible={dock} onHideDock={()=>setDock(false)} onOpenMovement={()=>{setControls(false);setMapVisible(true);setNotice('Live distance and rotation are shown below the virtual field.');}}/>
        </div>
      </section>
      <section id="training-map-panel" hidden={!mapVisible} className="training-field" aria-label="Virtual field">
        <div className="field-title"><span className={state.goal?'goal-status reached':'goal-status'}>{state.goal?'Goal reached ✓':field.blocks?.length?`Delivered ${state.delivered||0} / ${field.blocks.length}`:'Reach the green target'}</span></div>
        {!!field.checkpoints?.length&&<p className="checkpoint-progress" role="status">Checkpoints: {state.checkpointIndex||0} / {field.checkpoints.length} · Follow the numbers in order before finishing.</p>}
        <details className="mission-guidance"><summary>Hints &amp; resources</summary><div>{!!field.checkpoints?.length&&<details><summary>Route coordinates (mm)</summary><table className="route-coordinates"><thead><tr><th>Stage</th><th>X</th><th>Y</th></tr></thead><tbody><tr><td>Start</td><td>{field.start.x}</td><td>{field.start.y}</td></tr>{field.checkpoints.map((c,i)=><tr key={i}><td>Checkpoint {i+1}</td><td>{c.x}</td><td>{c.y}</td></tr>)}{!field.blocks?.length&&<tr><td>Goal</td><td>{field.goal.x}</td><td>{field.goal.y}</td></tr>}</tbody></table></details>}
        {lesson.hint&&<details className="thinking-hint"><summary>Thinking hint · {lesson.focus}</summary><p>{lesson.hint}</p><p>Try your own solution first. Different correct programs are welcome.</p></details>}
        {solutions[lesson.id]&&<details className="worked-solution"><summary>Worked solution · Blockly download</summary><p>This is one verified route for the original mission field. Try your own approach first. Set drive and turn velocity to 100% to follow the timings below.</p><p><a href={solutions[lesson.id].project} download>Download Blockly project</a> · <a href={solutions[lesson.id].field} download>Download matching field</a></p><p>Import the field here, then use File → Load From Your Device in Blockly. Approximate motion time: {solutions[lesson.id].seconds} seconds.</p><ol>{solutions[lesson.id].steps.map((step,i)=><li key={i}>{step}</li>)}</ol></details>}
        </div></details>
        {edit&&<FieldDesigner field={field} onChange={replaceField} valid={validField} onDone={()=>setEdit(false)} onSave={lesson.custom?()=>{try{if((field.blocks||[]).some(b=>!field.zones?.some(z=>fieldColor(z.color)===fieldColor(b.color))))throw new Error('Add a matching zone for every cargo color.');localStorage.setItem('mindx-training-field:'+lesson.id,JSON.stringify(field));send('stop');frame.current?.contentWindow?.dispatchEvent(new Event('pagehide'));onBack();}catch(error){setNotice(error instanceof Error?error.message:'Could not save field.');}}:undefined}/>}
        <svg style={{display:edit?'none':undefined}} className="field-canvas" viewBox={`0 0 ${field.width} ${field.height}`} role="img" aria-label="Virtual robot field">
          <defs><pattern id="training-grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="#cbd8cf" strokeWidth="2"/></pattern></defs>
          <rect width={field.width} height={field.height} fill="#f0f4ee"/>{field.image&&<image href={field.image} x={field.imageTransform?.x??0} y={field.imageTransform?.y??0} width={field.imageTransform?.width??field.width} height={field.imageTransform?.height??field.height} preserveAspectRatio="none"/>}<rect width={field.width} height={field.height} fill="url(#training-grid)" opacity={field.image?0.25:1}/>
          {!field.blocks?.length&&<><circle cx={field.goal.x} cy={field.goal.y} r={field.goal.radius} fill="#76cc8a55" stroke="#237646" strokeWidth="5"/><text x={field.goal.x} y={field.goal.y+8} textAnchor="middle" fontSize="27" fill="#174e30">GOAL</text></>}
          {field.walls.map((w,i)=><rect key={i} {...w} rx="6" fill="#405b60" stroke="#203b40" strokeWidth="4"/>)}
          <CheckpointVisual field={field} completed={state.checkpointIndex||0}/>
          <CargoVisual field={field} blocks={[]}/>
          <MovingCargo frame={frame} blocks={field.blocks}/>
          <RobotVisual frame={frame} x={field.start.x} y={field.start.y} heading={field.start.heading}/>
        </svg>
        <div className="training-telemetry"><div><span>Distance</span><strong>{state.distance.toFixed(1)} <small>mm</small></strong></div><div><span>Rotation</span><strong>{state.rotation.toFixed(1)} <small>°</small></strong></div><div><span>Heading</span><strong>{(((state.heading%360)+360)%360).toFixed(1)} <small>°</small></strong></div></div>
        <p className="training-status" role="status">{state.status}</p><p className="training-notice">{notice}</p>
        <details className="sensor-panel"><summary>Virtual sensors &amp; magnet</summary><div className="sensor-readings"><span>Bumper: <strong>{state.collision?'Pressed':'Released'}</strong></span><span>Eye object: <strong>{state.eye?.found?'Detected':'None'}</strong></span><span>Eye distance: <strong>{state.eye?.distance??400} mm</strong></span><span>Eye color: <strong>{state.eye?.color||'none'}</strong></span><span>Hue: <strong>{state.eye?.hue||0}°</strong></span><span>Brightness: <strong>{state.eye?.brightness||0}%</strong></span><span>Magnet: <strong>{state.magnet?'Boost':'Off'}</strong></span><span>Cargo: <strong>{state.carrying?'Carrying':'Empty'}</strong></span></div><p>Magnet → boost to pick up a nearby block; drop inside the matching color zone. Eye looks straight ahead (far: 400 mm, near: 150 mm). Bumper detects contact with walls or cargo. These are simplified virtual sensors.</p></details>
        <details><summary>Console ({state.logs.length})</summary><pre>{state.logs.join('\n')||'Print output appears here.'}</pre></details>
        <div className="field-transfer"><button onClick={()=>download('training-field.json',{version:1,field})}>Export field</button><label>Import field<input type="file" accept=".json,application/json" onChange={async e=>{
          const file=e.target.files?.[0];e.target.value='';if(!file)return;
          try{if(file.size>4500000)throw new Error();const data=JSON.parse(await file.text());if(data.version!==1||!validField(data.field))throw new Error();replaceField(data.field);}catch{setNotice('Invalid field file. Choose an exported training-field.json.');}
        }}/></label></div>
        <p className="training-note">Push-only cargo is marked with an arrow and cannot be picked up by the magnet. Simulation uses a 90 mm robot, ideal motion and rectangular walls. It uses simplified pushing, magnet and eye sensing; it does not reproduce wheel slip or articulated arm motors. Save code via File; export the field separately to share the lesson.</p>
      </section>
    </div>
  </main>;
}
