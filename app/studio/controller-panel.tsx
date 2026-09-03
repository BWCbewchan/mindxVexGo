'use client';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

type MyBlock = { signature: string; args: { name: string; type: string; value: string | boolean }[] };
type Binding = { id: string; key: string; label: string; signature: string; args: (string | boolean)[] };
type State = { functions: MyBlock[]; connected: boolean; running: boolean };
const storageKey = 'mindx-go-controller-v1';
const keyLabel = (key: string) => ({ArrowUp:'↑',ArrowDown:'↓',ArrowLeft:'←',ArrowRight:'→',Space:'Space'}[key] || key.replace(/^(Key|Digit)/,''));

export default function ControllerPanel({ frame, open, dockVisible, onHideDock, onClose, onOpen }: {frame: RefObject<HTMLIFrameElement | null>; open: boolean; dockVisible: boolean; onHideDock: () => void; onClose: () => void; onOpen: () => void}) {
  const [state,setState]=useState<State>({functions:[],connected:false,running:false});
  const [bindings,setBindings]=useState<Binding[]>([]);
  const [enabled,setEnabled]=useState(false);
  const [tab,setTab]=useState<'setup'|'play'>('setup');
  const [notice,setNotice]=useState('Create a function with My Blocks → Make a Block, then add a binding.');
  const [loaded,setLoaded]=useState(false);
  const [pressed,setPressed]=useState<string[]>([]);
  const sequence=useRef(0);
  const send=useCallback((action: string, payload: Record<string,unknown> = {})=>{
    const id=++sequence.current;
    frame.current?.contentWindow?.postMessage({type:'vex-controller',id,action,...payload},location.origin);
  },[frame]);
  useEffect(()=>{
    try { const data=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(data))setBindings(data.filter(b=>b&&typeof b.id==='string'&&typeof b.key==='string'&&typeof b.signature==='string'&&typeof b.label==='string'&&Array.isArray(b.args)).slice(0,24)); }catch{}
    setLoaded(true);send('snapshot');
    return ()=>{send('enable',{enabled:false});};
  },[send]);
  useEffect(()=>{if(loaded)try{localStorage.setItem(storageKey,JSON.stringify(bindings));}catch{setNotice('Browser storage is unavailable. Keep this page open to retain bindings.');}},[bindings,loaded]);
  useEffect(()=>{send('keys',{keys:bindings.filter(b=>state.functions.some(f=>f.signature===b.signature)).map(b=>b.key)});},[bindings,state.functions,send]);
  const run=useCallback((binding: Binding)=>{
    if(!enabled){setNotice('Enable controls first.');return;}
    if(!state.functions.some(fn=>fn.signature===binding.signature)){setNotice('The assigned function is missing. Choose a My Block in Setup.');return;}
    send('run',{signature:binding.signature,args:binding.args});
  },[enabled,send,state.functions]);
  useEffect(()=>{
    const key=(code:string)=>{
      if(!enabled)return;
      if(code==='Escape'){send('stop');setNotice('Stop requested.');return;}
      const binding=bindings.find(b=>b.key===code);if(binding)run(binding);
    };
    const receive=(event:MessageEvent)=>{
      if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;
      const data=event.data;
      if(data?.type==='vex-controller-state')setState(data);
      if(data?.type==='vex-controller-result'){
        if(!data.ok)setNotice(data.error);
        else if(data.result?.functions)setState(data.result);
        else if(data.result?.signature)setNotice('Running: '+data.result.signature);
        else if(data.result?.stopped)setNotice('Stop requested.');
      }
      if(data?.type==='vex-controller-key'){
        setPressed(keys=>data.down?[...new Set([...keys,data.code])]:keys.filter(k=>k!==data.code));
        if(data.down)key(data.code);
      }
      if(data?.type==='vex-controller-release')setPressed([]);
    };
    const onKey=(event:KeyboardEvent)=>{
      if(event.repeat||event.ctrlKey||event.metaKey||event.altKey||(event.target as HTMLElement)?.closest?.('input,textarea,select,[contenteditable="true"]'))return;
      if(event.code==='Escape'||bindings.some(b=>b.key===event.code)){
        event.preventDefault();setPressed(keys=>[...new Set([...keys,event.code])]);key(event.code);
      }
    };
    const onKeyUp=(event:KeyboardEvent)=>setPressed(keys=>keys.filter(k=>k!==event.code));
    const suspend=()=>{setPressed([]);if(enabled && document.activeElement?.tagName!=='IFRAME'){send('stop');setEnabled(false);send('enable',{enabled:false});}};
    const visibility=()=>{if(document.hidden){setPressed([]);send('stop');setEnabled(false);send('enable',{enabled:false});}};
    window.addEventListener('message',receive);window.addEventListener('keydown',onKey);window.addEventListener('keyup',onKeyUp);window.addEventListener('blur',suspend);document.addEventListener('visibilitychange',visibility);
    return()=>{window.removeEventListener('message',receive);window.removeEventListener('keydown',onKey);window.removeEventListener('keyup',onKeyUp);window.removeEventListener('blur',suspend);document.removeEventListener('visibilitychange',visibility);};
  },[bindings,enabled,frame,run,send]);
  const update=(id:string,patch:Partial<Binding>)=>setBindings(items=>items.map(b=>b.id===id?{...b,...patch}:b));
  function addBinding(){
    if(bindings.length>=24){setNotice('You can assign up to 24 controls.');return;}
    const fn=state.functions[0];const key=['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE','Space'].find(k=>!bindings.some(b=>b.key===k))||'';
    setBindings(items=>[...items,{id:crypto.randomUUID(),key,label:fn?.signature||'New control',signature:fn?.signature||'',args:fn?.args.map(a=>a.value)||[]}]);
  }
  const toggleEnabled=()=>{setEnabled(!enabled);send('enable',{enabled:!enabled});setNotice(!enabled?'Controls enabled. Escape stops the robot.':'Controls disabled.');};
  const assigned=bindings.filter(b=>b.key&&state.functions.some(f=>f.signature===b.signature));
  return <><aside hidden={!open} className="controller-panel" aria-label="Custom controller">
    <div className="controller-title"><div><span className="eyebrow">MY BLOCKS → YOUR CONTROLS</span><h2>Custom controller</h2></div><button onClick={onClose} aria-label="Close controller">×</button></div>
    <div className="controller-tabs"><button className={tab==='setup'?'selected':''} onClick={()=>setTab('setup')}>1. Setup</button><button className={tab==='play'?'selected':''} onClick={()=>setTab('play')}>2. Control pad</button></div>
    <div className="controller-connection"><span className={state.connected?'live-dot':'offline-dot'}/>{state.connected?'Brain connected':'No Brain connected'}<span>{state.running?'Running':'Ready'}</span></div>
    <div className="controller-content">
    {tab==='setup'?<>
      <p className="controller-intro">Assign a key or touch button to a function created with <strong>Make a Block</strong>. No <strong>when started</strong> connection is needed.</p>
      {!state.functions.length&&<div className="controller-empty">No My Blocks yet.<br/>In the editor, open <strong>My Blocks</strong> and choose <strong>Make a Block</strong>. Add your commands under its definition.</div>}
      {bindings.map((binding,index)=>{
        const fn=state.functions.find(f=>f.signature===binding.signature);
        return <section className="binding" key={binding.id}><div className="binding-heading"><span>CONTROL {String(index+1).padStart(2,'0')}</span><button onClick={()=>setBindings(items=>items.filter(b=>b.id!==binding.id))} aria-label={`Remove control ${index+1}`}>Remove</button></div>
          <label>Function<select aria-label={`Function ${index+1}`} value={binding.signature} onChange={e=>{const f=state.functions.find(f=>f.signature===e.target.value);update(binding.id,{signature:e.target.value,label:f?.signature||'',args:f?.args.map(a=>a.value)||[]});}}><option value="">Select a My Block</option>{binding.signature&&!fn&&<option value={binding.signature}>{binding.signature} (missing)</option>}{state.functions.map(f=><option key={f.signature} value={f.signature}>{f.signature}</option>)}</select></label>
          <div className="binding-fields"><label>Button label<input value={binding.label} maxLength={36} onChange={e=>update(binding.id,{label:e.target.value})}/></label><label>Keyboard key<input aria-label={`Keyboard key ${index+1}`} readOnly value={binding.key?keyLabel(binding.key):'Press a key'} onKeyDown={e=>{
            e.preventDefault();e.stopPropagation();
            if(e.key==='Tab'){(e.target as HTMLInputElement).blur();return;}
            if(e.code==='Escape'||e.ctrlKey||e.metaKey||e.altKey||/^(Control|Shift|Alt|Meta)/.test(e.code)){setNotice('Escape is reserved for Stop. Choose a letter, number, arrow or Space.');return;}
            if(bindings.some(b=>b.id!==binding.id&&b.key===e.code)){setNotice('That key is already assigned. Choose another key.');return;}
            update(binding.id,{key:e.code});setNotice('Key assigned: '+keyLabel(e.code));
          }}/></label></div>
          {fn?.args.map((arg,i)=><label key={i}>{arg.name}{arg.type==='boolean'?<select value={String(binding.args[i]??false)} onChange={e=>{const args=[...binding.args];args[i]=e.target.value==='true';update(binding.id,{args});}}><option value="false">False</option><option value="true">True</option></select>:<input type={arg.type==='number'?'number':'text'} value={String(binding.args[i]??'')} onChange={e=>{const args=[...binding.args];args[i]=e.target.value;update(binding.id,{args});}}/>}</label>)}
        </section>;
      })}
      <button className="add-binding" onClick={addBinding}>+ Add control</button><p className="storage-note">Bindings are saved in this browser. After opening another project, check the assigned functions.</p>
    </>:<><p className="controller-intro">Enable controls, then press a key or tap a button. Each press runs its assigned function once.</p><div className="control-pad">{bindings.map(b=><button key={b.id} disabled={!enabled||!state.connected||state.running||!state.functions.some(f=>f.signature===b.signature)} onClick={()=>run(b)}><kbd>{keyLabel(b.key)||'Tap'}</kbd><strong>{b.label||b.signature||'Unassigned'}</strong></button>)}</div>{!bindings.length&&<p className="controller-empty">Add your first control in Setup.</p>}<p className="storage-note">One function runs at a time. Press Stop before switching away from a function that keeps running.</p></>}
    </div>
    <div className="controller-bottom"><label className="enable-controls"><input type="checkbox" checked={enabled} onChange={e=>{setEnabled(e.target.checked);send('enable',{enabled:e.target.checked});setNotice(e.target.checked?'Controls enabled. Escape stops the robot.':'Controls disabled.');}}/>Enable controls</label><button className="stop-control" onClick={()=>send('stop')}>■ Stop <kbd>Esc</kbd></button><p role="status">{notice}</p></div>
  </aside>
  {dockVisible&&assigned.length>0&&<nav className="controller-dock" aria-label="Assigned control keys">
    <div className="dock-tools"><button onClick={onOpen} title="Edit key bindings">⌨ Setup</button><button className={enabled?'dock-enabled':''} onClick={toggleEnabled}>{enabled?'● Enabled':'○ Enable'}</button></div>
    <div className="dock-keys">{assigned.map(b=><button key={b.id} className={`dock-key ${pressed.includes(b.key)?'is-pressed':''}`} aria-label={`${keyLabel(b.key)}: ${b.label||b.signature}`} title={`${b.signature} · ${enabled?'Press to run':'Enable controls to run'}`} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);setPressed(keys=>[...new Set([...keys,b.key])]);}} onPointerUp={()=>setPressed(keys=>keys.filter(k=>k!==b.key))} onPointerCancel={()=>setPressed(keys=>keys.filter(k=>k!==b.key))} onLostPointerCapture={()=>setPressed(keys=>keys.filter(k=>k!==b.key))} onClick={()=>run(b)}><kbd>{keyLabel(b.key)}</kbd><span>{b.label||b.signature}</span></button>)}</div>
    <button className="dock-stop" onClick={()=>{send('stop');setPressed([]);}}>■ Stop<kbd>Esc</kbd></button>
    <button className="dock-hide" onClick={onHideDock} aria-label="Hide dock" title="Hide dock — show again with Dock in the toolbar">⌄</button>
    <p className="dock-notice" role="status">{notice}</p>
  </nav>}
  </>;
}
