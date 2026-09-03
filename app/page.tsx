import Link from 'next/link';

export default function Home() {
  return <main className="landing">
    <header className="nav"><Link href="/" className="brand">mind<span>X</span><i>/</i><small>ROBOTICS LAB</small></Link><span className="edition">VEX GO · WEB EDITION</span><Link className="nav-link" href="/studio">Mở studio ↗</Link></header>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><span/> KHÁM PHÁ · LẬP TRÌNH · SÁNG TẠO</div><h1>Ý tưởng nhỏ.<br/>Chuyển động <em>lớn.</em></h1><p>Biến những khối lệnh thành hành động. Không gian lập trình VEX GO của bạn, ngay trên trình duyệt.</p><Link href="/studio" className="primary">Bắt đầu lập trình <span>↗</span></Link><div className="hero-note">Không cần cài APK <b>·</b> Máy tính, tablet & điện thoại</div></div>
      <div className="illustration" aria-label="Minh họa chương trình robot: bắt đầu, di chuyển và quay phải"><div className="canvas-label"><span className="live-dot"/> YOUR NEXT BIG IDEA</div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="code-stack"><div className="demo-block event">⚑ khi bắt đầu</div><div className="demo-block motion">di chuyển tiến <b>200</b> mm</div><div className="demo-block motion">quay phải <b>90</b> độ</div><div className="demo-block control">lặp lại <b>4</b> lần <span>↻</span></div></div><div className="robot-tile"><div className="robot-face"><i/><i/></div><div className="robot-wheel left"/><div className="robot-wheel right"/><div className="robot-name">GO!</div></div><span className="canvas-caption">Một khối lệnh. Một khám phá mới.</span><span className="canvas-number">01 / CREATE</span></div>
    </section>
    <section className="features"><article><span className="feature-index">01 — BUILD</span><h2>Kéo thả. Thử nghiệm.</h2><p>Bộ soạn thảo Blockly và các khối lệnh VEXcode GO được giữ lại từ ứng dụng gốc.</p></article><article><span className="feature-index">02 — KEEP</span><h2>Ý tưởng luôn bên bạn.</h2><p>Mở dự án và lưu tệp trên thiết bị để tiếp tục bài học vào lần sau.</p></article><article><span className="feature-index">03 — CONNECT</span><h2>Sẵn sàng cho robot.</h2><p>Kết nối cần trình duyệt hỗ trợ Web Bluetooth và HTTPS hoặc localhost. Khả năng hỗ trợ tùy thiết bị.</p></article></section>
    <footer><span>mindX Robotics Lab</span><span>Dựa trên VEXcode GO 3.0.3 · VEX Robotics</span><Link href="/studio">Cùng tạo chuyển động ↗</Link></footer>
  </main>;
}
