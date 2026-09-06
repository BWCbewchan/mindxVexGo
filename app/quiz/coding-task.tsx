'use client';
import {useEffect,useRef,useState} from 'react';
import RobotVisual from '../training/robot-visual';
import {taskCriteria,grade,type Task,type RunState} from './coding-model';
import './coding.css';
import {checkCode} from './code-check';
import {DeviceReference,Illustration} from './quiz-visuals';
type Result={at:string;outcome:'passed'|'retry'|'checked'|'incomplete'|'error';checks:boolean[];labels?:string[];status:string;seconds:number};
export default function CodingTasks({lessonId,tasks}:{lessonId:string;tasks:Task[]}){
 const [selected,setSelected]=useState(tasks[0].id);
 return <section className="quiz-coding"><div className="coding-task-picker"><label>Choose a task<select value={selected} onChange={e=>setSelected(e.target.value)}>{tasks.map((t,i)=><option key={t.id} value={t.id}>{i+1}. {t.title} · {t.profile==='code-check'?'Code check':'Simulation check'}</option>)}</select></label><span>Code is stored separately for each task. Use Blockly File to download a copy.</span></div><CodingWorkspace key={selected} lessonId={lessonId} task={tasks.find(t=>t.id===selected)!}/></section>;
}
function CodingWorkspace({lessonId,task}:{lessonId:string;task:Task}){
 const frame=useRef<HTMLIFrameElement>(null),pending=useRef<string|null>(null),timeout=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [ready,setReady]=useState(false),[map,setMap]=useState(true),[notice,setNotice]=useState(''),[result,setResult]=useState<Result|null>(null),[checking,setChecking]=useState(false),[scenario,setScenario]=useState('empty');
 const [state,setState]=useState<RunState>({...task.field.start,distance:0,rotation:0,running:false,status:'Loading editor…',goal:false,bumperHits:0,checkpointIndex:0,elapsedMs:0});
 const key=`mindx-quiz-code-result-v2:${lessonId}:${task.id}`;
 const send=(action:string,extra:Record<string,unknown>={})=>frame.current?.contentWindow?.postMessage({type:'training-command',action,...extra},location.origin);
 const field=scenario==='empty'?task.field:{...task.field,...(scenario==='wall'?{walls:[{x:750,y:400,width:50,height:400}]}:{blocks:[{id:'sensor-object',x:750,y:600,color:scenario}],zones:[]})};
 useEffect(()=>{
  let storageValid=true;
  try{const raw=localStorage.getItem(key);if(raw){const r=JSON.parse(raw);if(!r||!['passed','retry','checked','incomplete','error'].includes(r.outcome)||!Array.isArray(r.checks)||!r.checks.every((v:unknown)=>typeof v==='boolean')||typeof r.status!=='string'||typeof r.at!=='string'||!Number.isFinite(r.seconds))throw Error();setResult(r);}}catch{storageValid=false;setNotice('Saved result could not be read; it will not be overwritten.');}
  const receive=(e:MessageEvent)=>{
   if(e.origin!==location.origin||e.source!==frame.current?.contentWindow)return;
   if(e.data?.type==='vex-editor-ready')setReady(true);
   if(e.data?.type==='vex-editor-error')setNotice(e.data.message);
   if(e.data?.type==='quiz-code-inspection'&&pending.current===e.data.attemptId){
    pending.current=null;setChecking(false);if(timeout.current)clearTimeout(timeout.current);
    const checked=checkCode(task,String(e.data.xml||''));
    const r:Result={at:new Date().toISOString(),outcome:!checked.coverage?'incomplete':checked.checks.every(Boolean)?'checked':'retry',checks:checked.checks,labels:checked.labels,status:checked.coverage?'Kiểm tra cấu trúc code. Chưa xác nhận toàn bộ hành vi robot.':'Đề gốc chưa có yêu cầu code đủ cụ thể để xác nhận đúng/sai tự động.',seconds:0};
    setResult(r);setNotice('Automatic code check complete.');
    if(storageValid)try{localStorage.setItem(key,JSON.stringify(r));}catch{setNotice('Result could not be saved in this browser.');}
    return;
   }
   if(e.data?.type!=='training-state')return;
   const s=e.data as RunState;setState(s);
   if(!pending.current||s.assessmentId!==pending.current||s.running)return;
   pending.current=null;setChecking(false);setNotice('Submission complete. The result below belongs to this run.');if(timeout.current)clearTimeout(timeout.current);
   const complete=['Program finished','Program stopped'].includes(s.status),checks=complete?grade(task,s):taskCriteria(task).map(()=>false);
   const r:Result={at:new Date().toISOString(),outcome:!complete?'error':checks.every(Boolean)?'passed':'retry',checks,status:s.status,seconds:s.elapsedMs/1000};setResult(r);
   if(storageValid)try{localStorage.setItem(key,JSON.stringify(r));}catch{setNotice('Result is available for this visit. Browser storage is full.');}
  };
  window.addEventListener('message',receive);
  const editor=frame.current;
  return()=>{pending.current=null;if(timeout.current)clearTimeout(timeout.current);window.removeEventListener('message',receive);editor?.contentWindow?.postMessage({type:'training-command',action:'stop'},location.origin);editor?.contentWindow?.dispatchEvent(new Event('pagehide'));};
 },[key,task]);
 useEffect(()=>{if(ready)send('field',{field});},[ready,scenario]); // The workspace is remounted for each task.
 function stop(){pending.current=null;setChecking(false);if(timeout.current)clearTimeout(timeout.current);send('stop');setNotice('Run cancelled. No new assessment was saved.');}
 function submit(){if(!ready||checking||state.running)return;const id=crypto.randomUUID();pending.current=id;setChecking(true);setNotice(task.profile==='code-check'?'Checking connected code against the displayed criteria…':'Submitting: robot resets and runs your current code.');setResult(null);send(task.profile==='code-check'?'inspect-code':'assess',{attemptId:id,profile:task.profile});timeout.current=setTimeout(()=>{if(pending.current===id){pending.current=null;setChecking(false);send('stop');setResult({at:new Date().toISOString(),outcome:'error',checks:taskCriteria(task).map(()=>false),status:'Time limit reached',seconds:60});setNotice('Time limit reached (60 seconds). Review your loops and stopping condition. This attempt was not saved.');}},60000);}
 return <><div className="coding-brief"><header className="coding-brief-heading"><strong lang="vi">{task.title}</strong><span>{task.profile==='code-check'?'Automatic code check':'Automatic behavior check'}</span></header><p className="coding-requirements" lang="vi">{task.requirements}</p><details><summary>Criteria & illustrations</summary><p className="coding-note" lang="vi">{task.note}</p><ol lang="vi">{taskCriteria(task).map(c=><li key={c}>{c}</li>)}</ol>{!!task.references?.length&&<div className="quiz-visuals"><div>{task.references.map(r=><Illustration key={r.src} src={r.src} caption={r.caption}/>)}</div></div>}</details><DeviceReference/></div><div className="coding-toolbar" role="toolbar" aria-label="Coding controls"><button disabled={!ready||state.running||checking} onClick={()=>{setNotice('Practice run. Submit runs again from the starting position.');send('reset');send('run');}}>▶ Run</button><button disabled={!ready} onClick={stop}>■ Stop</button><button disabled={!ready||checking} onClick={()=>send('reset')}>↺ Reset</button><button onClick={()=>setMap(v=>!v)} aria-expanded={map} aria-controls="quiz-coding-map">{map?'Hide map':'Show map'}</button><span>{(state.elapsedMs/1000).toFixed(1)} s</span><button className="quiz-primary" disabled={!ready||checking||state.running} onClick={submit}>{checking?'Checking…':'Submit code'}</button></div>{notice&&<p className="coding-notice" role="status">{notice}</p>}{result&&<section className={'coding-result '+result.outcome} aria-label="Submission result" role="status"><strong>{result.outcome==='passed'?'✓ Passed':result.outcome==='checked'?'Code criteria met':result.outcome==='incomplete'?'Requirements need clarification':result.outcome==='error'?'Run could not be completed':'Try again'}</strong><small>Last submission · {new Date(result.at).toLocaleString()} · {result.seconds.toFixed(1)} s</small><p>{result.status}</p>{<ul lang="vi">{(result.labels||taskCriteria(task)).map((c,i)=><li key={c}>{result.checks[i]?'✓':'○'} {c}</li>)}</ul>}{task.profile==='code-check'&&<p>Các dấu kiểm xác nhận cấu trúc và thông số đã tìm thấy trong code, không thay thế kiểm chứng toàn bộ hành vi robot. Các khối rời hoặc My Block chưa được gọi không được tính.</p>}</section>}<div className={'coding-workspace'+(!map?' map-hidden':'')}><div className="coding-editor"><iframe ref={frame} src={`/editor/index.html?mode=training&lesson=quiz-${lessonId}-${task.id}${task.profile==='code-check'?'&assessment=code':''}`} title="Homework Blockly editor" allow="bluetooth 'none'"/>{!ready&&<p role="status">Loading Blockly…</p>}</div><aside id="quiz-coding-map" hidden={!map}><header><strong>Virtual field</strong>{task.profile==='code-check'&&<label>Test scene<select disabled={state.running||checking} value={scenario} onChange={e=>setScenario(e.target.value)}><option value="empty">Empty</option><option value="wall">Wall</option><option value="red">Red object</option><option value="green">Green object</option><option value="blue">Blue object</option></select></label>}</header><svg viewBox={`0 0 ${field.width} ${field.height}`} role="img" aria-label="Homework virtual field"><defs><pattern id="quiz-field-grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M100 0H0V100" fill="none" stroke="#d0dbce" strokeWidth="2"/></pattern></defs><rect width={field.width} height={field.height} fill="#eff5e9"/><rect width={field.width} height={field.height} fill="url(#quiz-field-grid)"/>{task.profile!=='code-check'&&<circle cx={field.goal.x} cy={field.goal.y} r={field.goal.radius} fill="#9dd88b" stroke="#40774b" strokeWidth="4"/>}{field.walls.map((w,i)=><rect key={i} {...w} fill="#48665c"/>)}{field.blocks?.map(b=><rect key={b.id} x={b.x-20} y={b.y-20} width="40" height="40" fill={b.color}/>)}{field.checkpoints?.map((c,i)=><g key={i}><circle {...{cx:c.x,cy:c.y,r:c.radius}} fill={(state.checkpointIndex||0)>i?'#a3d88f':'#ffe3a6'}/><text x={c.x} y={c.y+12} fontSize="35" textAnchor="middle">{i+1}</text></g>)}<RobotVisual frame={frame} x={field.start.x} y={field.start.y} heading={field.start.heading}/></svg><div className="coding-telemetry"><span>{state.distance.toFixed(0)} mm</span><span>{state.rotation.toFixed(0)}°</span><span>Eye: {state.eye?.found?state.eye.color==='none'?'object':state.eye.color:'clear'}</span></div><p className="coding-state">{state.status}</p><small>Grid: 100 mm · {field.width} × {field.height} mm</small></aside></div></>;
}

