'use client';
import { useEffect, useRef, useState } from 'react';
import ControllerPanel from './controller-panel';
import PermissionSetup from './permission-setup';
import RobotMovement from './robot-movement';
import './controller.css';

export default function Studio() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [bootError,setBootError] = useState('');
  const [help, setHelp] = useState(false);
  const [controls, setControls] = useState(false);
  const [dock, setDock] = useState(true);
  const [movement, setMovement] = useState(false);
  const [permissions,setPermissions] = useState(true);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === 'vex-editor-ready') {
        setReady(true);
        setBootError('');
      } else if (event.data?.type === 'vex-editor-error' && typeof event.data.message==='string') {
        setBootError(event.data.message);
      } else if (event.data?.type === 'vex-toolbar-action') {
        if (event.data.action === 'controls') setControls(value => !value);
        if (event.data.action === 'help') setHelp(value => !value);
        if (event.data.action === 'dock') setDock(value => !value);
        if (event.data.action === 'permissions') setPermissions(true);
      }
    };
    window.addEventListener('message', receive);
    const timeout = window.setTimeout(() => setSlow(true), 25000);
    return () => { window.removeEventListener('message', receive); clearTimeout(timeout); };
  }, []);
  useEffect(() => {
    frame.current?.contentWindow?.postMessage({type:'vex-toolbar-state',controls,help,dock},location.origin);
  }, [controls,help,dock,ready]);
  return <main className="studio">
    <PermissionSetup frame={frame} ready={ready} open={permissions} onClose={()=>setPermissions(false)}/>
    {help&&<div className="permission-reopen"><button onClick={()=>setPermissions(true)}>App permissions</button></div>}
    {help && <aside className="help"><div><strong>Program on every screen</strong><p>Drag blocks from the toolbox into the workspace. Use File to open or save a project. Rotate a phone for more workspace.</p></div><div><strong>Connect VEX GO</strong><p>Turn on the robot and Bluetooth, then use Brain in the editor. A real connection requires Web Bluetooth and HTTPS or localhost; physical robot execution has not been verified.</p></div><button onClick={() => setHelp(false)} aria-label="Close help">×</button></aside>}
    <div className="studio-workspace"><div className="editor-container"><iframe ref={frame} src="/editor/index.html" title="VEXcode GO editor" allow="bluetooth; fullscreen"/>{!ready && <div className="loading"><div className="spinner"/><h2>Opening your workspace…</h2><p>{bootError || (slow ? 'The original editor is large and its first load can take longer. Check your connection or open this page directly in Safari or Chrome.' : 'Loading VEX GO blocks')}</p>{(slow || bootError) && <button onClick={() => { setBootError(''); if(frame.current) frame.current.src='/editor/index.html'; }}>Retry editor</button>}</div>}</div><RobotMovement frame={frame} open={movement} onClose={()=>setMovement(false)}/><ControllerPanel onOpenMovement={()=>{setMovement(true);setControls(false);}} frame={frame} dockVisible={dock} onHideDock={()=>setDock(false)} open={controls} onOpen={()=>setControls(true)} onClose={()=>setControls(false)}/></div>
    <div className="studio-footer"><span>VEXcode GO 3.0.3</span><span className="rotate-note">Tip: rotate your phone for a larger programming workspace.</span><span>{ready ? 'Editor ready' : 'Loading…'}</span></div>
  </main>;
}


