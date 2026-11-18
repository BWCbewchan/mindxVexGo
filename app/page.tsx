import Link from 'next/link';
import MindxLogo from './mindx-logo';
import './landing.css';

const nav=[['Lắp ráp','/assembly/projects'],['Lập trình','/simulation'],['Thử thách','/training'],['Thi đấu','/robolab'],['Lớp học','/classroom']] as const;

const stats=[['889','chi tiết CAD VEX GO, IQ, LEGO'],['113','thử thách có sa bàn'],['38','sa bàn FLL / WRO'],['496','câu hỏi ôn tập']] as const;

const zones=[
 {id:'build',no:'01',name:'Lắp ráp',title:'Ý tưởng có hình hài.',text:'Lắp robot từ chi tiết CAD thật, căn chốt và lỗ, giới hạn theo bộ kit, rồi xuất hướng dẫn lắp từng bước.',href:'/assembly/projects',cta:'Bắt đầu lắp ráp',links:[['Dự án của tôi','/assembly/projects'],['Thư viện mẫu','/library']]},
 {id:'code',no:'02',name:'Lập trình',title:'Cho bản lắp chuyển động.',text:'Khối lệnh VEXcode GO trên sân 3D, hoặc nạp thẳng vào VEX GO Brain qua Bluetooth.',href:'/simulation',cta:'Mở robot ảo',links:[['Robot ảo 3D','/simulation'],['RoboCode','/blocky'],['Robot thật','/studio']]},
 {id:'mission',no:'03',name:'Thử thách',title:'Tìm một cách đi khác.',text:'Sa bàn theo cấp độ, có lời giải mẫu, kịch bản STEM và trình tự thiết kế sân của riêng bạn.',href:'/training',cta:'Chọn thử thách',links:[['Nhiệm vụ','/training'],['Tạo sa bàn','/training/custom']]},
 {id:'compete',no:'04',name:'Thi đấu',title:'Sẵn sàng cho sân thi.',text:'Sa bàn FLL và WRO, mỗi sa bàn có robot mindX riêng; lập trình bằng khối hoặc Python.',href:'/robolab?view=competitions',cta:'Vào RoboLab',links:[['Sa bàn FLL / WRO','/robolab?view=competitions'],['Đấu trường','/robolab?tool=arena']]},
 {id:'class',no:'05',name:'Lớp học',title:'Mỗi buổi học thêm động lực.',text:'Quản lý lớp, cộng điểm, giao quiz ôn tập và trình chiếu bảng thành tích trên màn hình lớn.',href:'/classroom',cta:'Mở lớp học',links:[['Lớp của tôi','/classroom'],['Quiz & bài tập','/quiz']]},
] as const;

const steps=[
 ['15 phút','Lắp mô hình','Chọn mẫu trong thư viện hoặc lắp mới, theo hướng dẫn từng bước.'],
 ['20 phút','Viết chương trình','Kéo khối lệnh, chạy thử trên robot ảo trước khi nạp vào robot thật.'],
 ['15 phút','Giải thử thách','Hoàn thành nhiệm vụ trên sa bàn, so với lời giải mẫu.'],
 ['Câu lạc bộ','Luyện thi đấu','Vào sa bàn FLL/WRO với robot đúng luật và đấu trường nhiều robot.'],
] as const;

const allTools=[
 {group:'Thiết kế & lắp ráp',items:[['Lắp ráp · Dự án của tôi','/assembly/projects','Lắp VEX GO / IQ / LEGO, xuất hướng dẫn PDF'],['Lắp ráp · Thư viện mẫu','/library','Mẫu đã duyệt, xem 3D và mở bản sao'],['Cài đặt bộ kit','/assembly/projects','Trong dự án: File → Cài đặt bộ kit'],['API Assembly cho AI','/assembly/api-demo.html','Điều khiển mô hình bằng lệnh'],['Demo xe thi đấu','/assembly/competition-demo.html','Xe 2 motor dựng qua API']]},
 {group:'Lập trình & mô phỏng',items:[['VR Lab','/simulation','Robot tự lắp chạy trên sân 3D'],['Sân robot 3D','/simulation/viewer.html','Xem sân và robot toàn màn hình'],['Lệnh và giới hạn','/simulation/support.html','Tra cứu khối lệnh VR Lab'],['Studio robot thật','/studio','Khối lệnh và kết nối VEX GO'],['RoboCode','/blocky','Khối lệnh, sân 3D, mê cung và bóng đá robot'],['Lắp & lập trình RoboLab','/robolab','Lắp robot, lập trình, mô phỏng']]},
 {group:'Thi đấu FLL / WRO',items:[['Sa bàn FLL / WRO','/robolab?view=competitions','38 sa bàn, robot riêng từng sa bàn'],['Bài luyện tập','/robolab?view=practice','21 bài từ dễ đến khó'],['Thiết kế robot','/robolab?tool=configurator','Tự chọn cảm biến, động cơ, tay gắp'],['Tạo sa bàn thi đấu','/robolab?tool=builder','Dựng thảm, tường và vật thể'],['Đấu trường','/robolab?tool=arena','Tối đa 4 robot thi cùng lúc']]},
 {group:'Học tập & lớp học',items:[['Thử thách nhiệm vụ','/training','Nhiệm vụ điều hướng và cảm biến'],['Tự thiết kế thử thách','/training/custom','Đặt vật cản, vùng đích riêng'],['Quiz & bài tập','/quiz','Ôn tập khối lệnh ở lớp và ở nhà'],['Lớp học','/classroom','Điểm, nhóm và hoạt động lớp'],['8 kịch bản STEM','/simulation/teacher.html','Giáo án, gợi ý và bản in'],['Tài khoản','/account','Đăng nhập và lưu bản lắp']]},
] as const;

function Arrow(){return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>;}

function ZoneArt({id}:{id:string}){
 if(id==='build')return <div className="lp-art lp-art-build" aria-hidden="true"><img src="/assembly/parts/228-2500-001/preview.png" alt=""/><img src="/assembly/parts/269-6690-000/preview.png" alt=""/><img src="/assembly/iq/parts/228-2560/preview.png" alt=""/></div>;
 if(id==='code')return <div className="lp-art lp-art-code" aria-hidden="true"><img src="/robotics-vr-preview.png" alt=""/></div>;
 if(id==='mission')return <div className="lp-art lp-art-mission" aria-hidden="true"><svg viewBox="0 0 300 160"><defs><pattern id="lp-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#d4dcc9"/></pattern></defs><rect width="300" height="160" rx="14" fill="#f4f7ec"/><rect width="300" height="160" rx="14" fill="url(#lp-grid)"/><path d="M40 126H112V46H252" fill="none" stroke="#1f6b5e" strokeWidth="4" strokeDasharray="7 6" strokeLinecap="round"/><rect x="146" y="76" width="26" height="70" rx="5" fill="#3e5c57"/><circle cx="252" cy="46" r="18" fill="#c5f56a" stroke="#6f9a2c" strokeWidth="2"/><image href="/training-robot.png" x="20" y="104" width="42" height="42"/></svg></div>;
 if(id==='compete')return <div className="lp-art lp-art-compete" aria-hidden="true"><img src="/robolab/gears/textures/maps/WRO/WRO-2026-Junior.png" alt=""/></div>;
 return <div className="lp-art lp-art-class" aria-hidden="true"><img src="/classroom/characters/team-concept-v2.png" alt="" loading="lazy"/><span>★ +3 <small>Sáng tạo</small></span></div>;
}

export default function Home(){
 return <main className="lp">
  <a className="lp-skip" href="#khu-vuc">Đến các khu chức năng</a>
  <header className="lp-nav">
   <div className="lp-container lp-nav-row">
    <Link href="/" className="lp-brand" aria-label="mindX Robotics Lab, trang chủ"><MindxLogo/><span className="lp-brand-text">ROBOTICS LAB</span></Link>
    <nav aria-label="Điều hướng chính" className="lp-nav-links">{nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav>
    <div className="lp-nav-end"><a className="lp-nav-all" href="#all-tools">Tất cả chức năng</a><Link className="lp-btn lp-btn-dark lp-btn-sm" href="/account">Đăng nhập</Link></div>
   </div>
  </header>

  <section className="lp-hero lp-container">
   <div className="lp-hero-copy">
    <p className="lp-eyebrow">VEX GO · VEX IQ · LEGO · FLL · WRO</p>
    <h1>Lắp robot, lập trình, rồi mang đi <em>thi đấu.</em></h1>
    <p className="lp-lead">Một nơi cho cả buổi học robotics: lắp mô hình 3D từ chi tiết CAD thật, chạy code trên robot ảo hoặc robot thật, luyện thử thách và vào sa bàn thi đấu.</p>
    <div className="lp-actions"><Link className="lp-btn lp-btn-lime" href="/assembly/projects">Bắt đầu lắp ráp <Arrow/></Link><Link className="lp-btn lp-btn-line" href="/training">Mở thử thách</Link></div>
   </div>
   <div className="lp-hero-visual">
    <figure className="lp-window">
     <div className="lp-window-bar" aria-hidden="true"><i/><i/><i/><span>VR Lab · Robot mẫu</span></div>
     <img src="/robotics-vr-preview.png" alt="Khối lệnh VEXcode GO bên cạnh robot trên sân 3D trong VR Lab"/>
    </figure>
    <div className="lp-float lp-float-part" aria-hidden="true"><img src="/assembly/parts/269-6690-000/preview.png" alt=""/><div><b>Lắp từ CAD thật</b><small>75 chi tiết VEX GO</small></div></div>
    <div className="lp-float lp-float-field" aria-hidden="true"><img src="/robolab/gears/textures/maps/WRO/WRO-2026-Junior.png" alt=""/><div><b>WRO 2026 Junior</b><small>Robot mindX riêng</small></div></div>
   </div>
  </section>

  <section className="lp-container" aria-label="Con số">
   <dl className="lp-stats">{stats.map(([n,label])=><div key={label}><dt>{label}</dt><dd>{n}</dd></div>)}</dl>
  </section>

  <section id="khu-vuc" className="lp-container lp-section" aria-labelledby="zones-title">
   <div className="lp-head"><div><p className="lp-eyebrow">NĂM KHU, MỘT HÀNH TRÌNH</p><h2 id="zones-title">Chọn nơi bắt đầu.</h2></div><p>Mỗi khu gom các công cụ cùng mục đích, từ lần lắp đầu tiên đến ngày thi.</p></div>
   <div className="lp-zones">{zones.map(z=><article key={z.id} className={`lp-zone lp-zone-${z.id}`}>
    <div className="lp-zone-top"><span>{z.no} / {z.name.toUpperCase()}</span></div>
    <ZoneArt id={z.id}/>
    <h3><Link href={z.href} className="lp-zone-link">{z.title}</Link></h3>
    <p>{z.text}</p>
    <ul className="lp-zone-sub" aria-label={`Trong ${z.name}`}>{z.links.map(([label,href])=><li key={label}><Link href={href}>{label}</Link></li>)}</ul>
    <span className="lp-zone-cta" aria-hidden="true">{z.cta} <Arrow/></span>
   </article>)}</div>
  </section>

  <section className="lp-band">
   <div className="lp-container lp-section">
    <div className="lp-head"><div><p className="lp-eyebrow">TỪ LẮP ĐẾN THI</p><h2>Một buổi học điển hình.</h2></div></div>
    <ol className="lp-steps">{steps.map(([time,title,text],i)=><li key={title}><span>Bước {i+1} · {time}</span><b>{title}</b><p>{text}</p></li>)}</ol>
   </div>
  </section>

  <section className="lp-container lp-section">
   <div className="lp-teach">
    <div className="lp-teach-copy"><p className="lp-eyebrow lp-eyebrow-lime">DÀNH CHO GIÁO VIÊN</p><h2>Từ một mô hình đến cả một buổi học.</h2><p>72 bài học gốc và 496 câu hỏi luyện tập theo khóa ARM và PRE, 8 kịch bản STEM có bản in, lớp học với điểm thưởng và trình chiếu.</p></div>
    <ul className="lp-teach-links">
     <li><a href="/simulation/teacher.html"><b>8 kịch bản STEM</b><small>Mục tiêu, hoạt động, gợi ý và bản in</small><Arrow/></a></li>
     <li><Link href="/classroom"><b>Điều hành lớp học</b><small>Điểm, nhóm, trình chiếu thành tích</small><Arrow/></Link></li>
     <li><Link href="/quiz"><b>Quiz & bài tập</b><small>Ôn tập theo từng buổi của khóa học</small><Arrow/></Link></li>
    </ul>
   </div>
  </section>

  <section id="all-tools" className="lp-container lp-section" aria-labelledby="all-tools-title">
   <div className="lp-head"><div><p className="lp-eyebrow">MỌI CÔNG CỤ TRONG MỘT NƠI</p><h2 id="all-tools-title">Tất cả chức năng.</h2></div><p>Đi thẳng tới công cụ bạn cần.</p></div>
   <div className="lp-tools">{allTools.map(col=><div key={col.group}><h3>{col.group}</h3><ul>{col.items.map(([name,href,text])=><li key={name}><Link href={href}><b>{name}</b><small>{text}</small></Link></li>)}</ul></div>)}</div>
  </section>

  <footer className="lp-footer">
   <div className="lp-container lp-footer-row">
    <Link href="/" aria-label="mindX, trang chủ"><MindxLogo inverse/></Link>
    <p>Lắp ráp · Lập trình · Thử thách · Thi đấu · Lớp học</p>
    <p className="lp-footer-note">RoboLab dùng Gears (GPL-3.0). <a href="/robolab">Xem nguồn mở trong RoboLab</a></p>
   </div>
  </footer>
 </main>;
}
