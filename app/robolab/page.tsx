'use client';
import {useEffect,useRef,useState} from 'react';
import styles from './robolab.module.css';
import Competitions,{type Mission} from './competitions';

const tools=[['configurator','Thiết kế robot','Tự lắp robot từ cảm biến, động cơ, tay gắp; lưu thành file để nạp vào mô phỏng.'],['builder','Tạo sa bàn','Tự dựng sa bàn: thảm, tường, vật thể; lưu thành file thế giới.'],['arena','Đấu trường','Tối đa 4 robot cùng thi đấu trên một sa bàn.']] as const;
type Tool=typeof tools[number][0];
type RobotInfo={title:string;purpose:string;ports:{port:string;label:string}[]};
export default function RoboLab(){
 const frame=useRef<HTMLIFrameElement>(null),[status,setStatus]=useState('loading'),[error,setError]=useState(''),[revision,setRevision]=useState(0),[help,setHelp]=useState(false);
 const [mission,setMission]=useState<Mission|null>(null),[picker,setPicker]=useState(false),[robot,setRobot]=useState<RobotInfo|null>(null),[ports,setPorts]=useState(false),[tool,setTool]=useState<Tool|null>(null),[toolMenu,setToolMenu]=useState(false);
 useEffect(()=>{
  if(tool)return;
  const ping=setInterval(()=>frame.current?.contentWindow?.postMessage({type:'robolab-ping'},location.origin),1000);
  const timer=setTimeout(()=>{setError('Bộ mô phỏng đang tải lâu hơn dự kiến. Bạn có thể chờ thêm hoặc tải lại.');},45000);
  const receive=(event:MessageEvent)=>{if(event.origin!==location.origin||event.source!==frame.current?.contentWindow)return;if(event.data?.type==='robolab-ready'){clearInterval(ping);clearTimeout(timer);setStatus('ready');setError('');setRobot(event.data.robot??null);}if(event.data?.type==='robolab-error'){clearInterval(ping);clearTimeout(timer);setStatus('error');setError(String(event.data.message));}};
  window.addEventListener('message',receive);return()=>{clearInterval(ping);clearTimeout(timer);window.removeEventListener('message',receive);};
 },[revision,mission,tool]);
 const openTool=(value:Tool)=>{setTool(value);setToolMenu(false);setPicker(false);setMission(null);setRobot(null);setStatus('loading');setError('');setRevision(v=>v+1);};
 const select=(entry:Mission|null)=>{setTool(null);setToolMenu(false);setMission(entry);setPicker(false);setRobot(null);setPorts(false);setStatus('loading');setError('');setRevision(v=>v+1);};
 return <main className={styles.lab}>
  <header className={styles.bar}><a href="/" className={styles.brand}><img src="/mindx-logo-color-mark.png" alt="mindX"/><span>ROBO<span>LAB</span></span></a><span className={styles.tag}>Khu thử nghiệm độc lập</span><nav aria-label="Công cụ RoboLab"><button aria-pressed={!mission&&!tool} onClick={()=>select(null)}>Lắp & lập trình</button><button onClick={()=>setPicker(!picker)} aria-expanded={picker}>FLL / WRO</button><button aria-pressed={!!tool} onClick={()=>setToolMenu(!toolMenu)} aria-expanded={toolMenu}>Công cụ</button><button onClick={()=>setHelp(!help)} aria-expanded={help}>Hướng dẫn & nguồn</button></nav><span className={styles.state} role="status">{status==='ready'?'Sẵn sàng':status==='error'?'Chưa mở được':'Đang tải bộ mô phỏng…'}</span></header>
  {toolMenu&&<aside className={styles.tools} aria-label="Công cụ RoboLab">{tools.map(([value,label,text])=><button key={value} aria-pressed={tool===value} onClick={()=>openTool(value)}><b>{label}</b><small>{text}</small></button>)}</aside>}
  {mission&&<div className={styles.missionBar}><strong>{mission.title}</strong><span>{mission.mode==='objects'?'Có vật thể mô phỏng':'Thảm luyện đường chạy'} · Chưa xác nhận chấm điểm đầy đủ theo luật thi</span>{robot&&<button onClick={()=>setPorts(!ports)} aria-expanded={ports}>Robot: {robot.title}</button>}<button onClick={()=>setPicker(true)}>Đổi sa bàn</button></div>}
  {mission&&robot&&ports&&<aside className={styles.robot} aria-label="Robot của sa bàn"><strong>{robot.title}</strong><p>{robot.purpose}</p><table><tbody>{robot.ports.map(row=><tr key={row.port+row.label}><th>{row.port}</th><td>{row.label}</td></tr>)}</tbody></table><small>Robot được nạp sẵn cho sa bàn này. Có thể đổi trong menu Robot của bộ mô phỏng.</small><button onClick={()=>setPorts(false)}>Đóng</button></aside>}
  {picker&&<Competitions onSelect={select} onClose={()=>setPicker(false)}/>}
  {help&&<aside className={styles.help}><strong>Lắp · Lập trình · Thử nghiệm</strong><p>Chọn sa bàn, kéo khối lệnh và bấm Run. Với FLL/WRO, dùng Blocks hoặc Python và chạy trong Simulator. Hai bộ chạy lưu chương trình riêng, không tự chuyển đổi.</p><p>Sa bàn cộng đồng dùng luyện tập, không phải hệ thống chấm thi chính thức.</p><p>Nguồn: <a href="https://github.com/daewonlee81-glitch/mindstorms-cad" target="_blank" rel="noopener noreferrer">RoboMakers · Daewon Lee</a>; <a href="https://github.com/QuirkyCort/gears" target="_blank" rel="noopener noreferrer">Gears · Cort Wee & cộng đồng</a> (<a href="/robolab/gears/LICENSE.txt" target="_blank">GPL-3.0</a>). <a href="/robolab/gears-source.zip" download>Tải mã nguồn Gears và bản tích hợp</a>.</p><p>Dữ liệu lưu riêng trên trình duyệt. Camera/hub chỉ kết nối khi bạn chọn.</p><button onClick={()=>setHelp(false)}>Đóng hướng dẫn</button></aside>}
  {error&&<section className={styles.error} role="alert">{error}<button onClick={()=>{setStatus('loading');setError('');setRevision(v=>v+1);}}>Tải lại RoboLab</button></section>}
  <iframe key={revision} ref={frame} className={styles.engine} title="RoboLab — mô phỏng, sa bàn và lập trình robot" onLoad={()=>{if(tool){setStatus('ready');setError('');}}} src={tool?`/robolab/gears/${tool}.html`:mission?`/robolab/gears/index.html?mission=${encodeURIComponent(mission.id)}`:'/robolab/runtime/index.html?view=sim'} sandbox="allow-scripts allow-same-origin allow-downloads allow-popups" allow="camera; bluetooth; fullscreen"/>
 </main>;
}
