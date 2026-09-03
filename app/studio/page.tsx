'use client';
import { useEffect, useRef, useState } from 'react';
import ControllerPanel from './controller-panel';
import PermissionSetup from './permission-setup';
import './controller.css';

export default function Studio() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [help, setHelp] = useState(false);
  const [controls, setControls] = useState(false);
  const [dock, setDock] = useState(true);
  const [permissions,setPermissions] = useState(true);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === 'vex-editor-ready') {
        setReady(true);
      } else if (event.data?.type === 'vex-toolbar-action') {
        if (event.data.action === 'controls') setControls(value => !value);
        if (event.data.action === 'help') setHelp(value => !value);
        if (event.data.action === 'dock') setDock(value => !value);
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
    {help && <aside className="help"><div><strong>Lập trình trên mọi màn hình</strong><p>Kéo khối lệnh từ danh mục vào vùng làm việc. Dùng menu File để mở hoặc lưu dự án. Trên điện thoại, xoay ngang để có thêm không gian.</p></div><div><strong>Kết nối VEX GO</strong><p>Bật robot và Bluetooth, sau đó dùng nút Brain trong bộ soạn thảo. Kết nối thực tế cần trình duyệt hỗ trợ và HTTPS/localhost; chưa xác minh với robot vật lý.</p></div><button onClick={() => setHelp(false)} aria-label="Đóng hướng dẫn">×</button></aside>}
    <div className="studio-workspace"><div className="editor-container"><iframe ref={frame} src="/editor/index.html" title="Bộ lập trình VEXcode GO" allow="bluetooth; fullscreen"/>{!ready && <div className="loading"><div className="spinner"/><h2>Đang mở không gian sáng tạo…</h2><p>{slow ? 'Lần đầu tải có thể lâu hơn vì bộ soạn thảo gốc khá lớn.' : 'Đang tải các khối lệnh VEX GO'}</p>{slow && <button onClick={() => { if(frame.current) frame.current.src='/editor/index.html'; }}>Tải lại bộ soạn thảo</button>}</div>}</div><ControllerPanel frame={frame} dockVisible={dock} onHideDock={()=>setDock(false)} open={controls} onOpen={()=>setControls(true)} onClose={()=>setControls(false)}/></div>
    <div className="studio-footer"><span>VEXcode GO 3.0.3</span><span className="rotate-note">Mẹo: xoay ngang điện thoại để lập trình thoải mái hơn.</span><span>{ready ? 'Bộ soạn thảo đã sẵn sàng' : 'Đang tải…'}</span></div>
  </main>;
}


