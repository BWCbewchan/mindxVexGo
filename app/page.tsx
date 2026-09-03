import Link from 'next/link';

export default function Home() {
  return <main className="landing">
    <header className="nav"><Link href="/" className="brand">mind<span>X</span><i>/</i><small>ROBOTICS LAB</small></Link><span className="edition">VEX GO · WEB EDITION</span><Link className="nav-link" href="/studio">Open studio ↗</Link></header>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><span/> EXPLORE · PROGRAM · CREATE</div><h1>Small ideas.<br/><em>Big</em> motion.</h1><p>Turn blocks into action. Your VEX GO programming workspace, directly in the browser.</p><Link href="/studio" className="primary">Start programming <span>↗</span></Link><div className="hero-note">No APK required <b>·</b> Desktop, tablet & phone</div></div>
      <div className="illustration" aria-label="Robot program illustration: start, drive and turn right"><div className="canvas-label"><span className="live-dot"/> YOUR NEXT BIG IDEA</div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="code-stack"><div className="demo-block event">⚑ when started</div><div className="demo-block motion">drive forward <b>200</b> mm</div><div className="demo-block motion">turn right <b>90</b> degrees</div><div className="demo-block control">repeat <b>4</b> times <span>↻</span></div></div><div className="robot-tile"><div className="robot-face"><i/><i/></div><div className="robot-wheel left"/><div className="robot-wheel right"/><div className="robot-name">GO!</div></div><span className="canvas-caption">One block. One new discovery.</span><span className="canvas-number">01 / CREATE</span></div>
    </section>
    <section className="features"><article><span className="feature-index">01 — BUILD</span><h2>Drag. Drop. Test.</h2><p>The Blockly workspace and VEXcode GO blocks are preserved from the original app.</p></article><article><span className="feature-index">02 — KEEP</span><h2>Your ideas stay with you.</h2><p>Open and save project files on your device, then continue your lesson later.</p></article><article><span className="feature-index">03 — CONNECT</span><h2>Ready for your robot.</h2><p>Connection requires Web Bluetooth and HTTPS or localhost. Support depends on the device and browser.</p></article></section>
    <footer><span>mindX Robotics Lab</span><span>Based on VEXcode GO 3.0.3 · VEX Robotics</span><Link href="/studio">Create motion ↗</Link></footer>
  </main>;
}
