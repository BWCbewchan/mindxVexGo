'use client';
import { useEffect, useState, type RefObject } from 'react';

type Measurement = { connected: boolean; fresh: boolean; distanceMm: number | null; turnDegrees: number | null };
const empty: Measurement = { connected: false, fresh: false, distanceMm: null, turnDegrees: null };

export default function RobotMovement({ frame, open, onClose }: {
  frame: RefObject<HTMLIFrameElement | null>; open: boolean; onClose: () => void;
}) {
  const [data, setData] = useState<Measurement>(empty);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const receive = (event: MessageEvent) => {
      // WebKit can attribute a same-origin child postMessage to the receiving window.
      // Accept that case only for these read-only measurements, never robot commands.
      if (event.origin !== location.origin || (event.source !== frame.current?.contentWindow && event.source !== window) || event.data?.type !== 'vex-movement-state') return;
      const value = event.data;
      setData({ connected: value.connected === true, fresh: value.fresh === true,
        distanceMm: Number.isFinite(value.distanceMm) ? value.distanceMm : null,
        turnDegrees: Number.isFinite(value.turnDegrees) ? value.turnDegrees : null });
      clearTimeout(timeout);
      timeout = setTimeout(() => setData(current => ({ ...current, fresh: false, distanceMm: null, turnDegrees: null })), 2500);
    };
    window.addEventListener('message', receive);
    return () => { window.removeEventListener('message', receive); clearTimeout(timeout); };
  }, [frame]);
  const format = (value: number | null) => data.fresh && value !== null ? value.toLocaleString('en-US', { maximumFractionDigits: 1 }) : '—';
  return <aside hidden={!open} className="robot-movement" aria-label="Robot movement">
    <header><h2>Robot movement</h2><button onClick={onClose} aria-label="Close robot movement">×</button></header>
    <p role="status">{!data.connected ? 'Connect a Brain to see measurements' : data.fresh ? 'Live · since reset' : 'Waiting for robot data…'}</p>
    <dl><div><dt>Wheel travel</dt><dd data-testid="movement-distance">{format(data.distanceMm)} <small>mm</small></dd></div><div><dt>Rotation</dt><dd data-testid="movement-turn">{format(data.turnDegrees)} <small>°</small></dd></div></dl>
    <p>Distance is estimated from both wheels and includes turns. Rotation is signed. Missing sensor data appears as —.</p>
    <button className="movement-reset" onClick={() => {
      setData(current => ({ ...current, fresh: false, distanceMm: null, turnDegrees: null }));
      frame.current?.contentWindow?.postMessage({ type: 'vex-movement-reset' }, location.origin);
    }}>Reset measurements</button>
  </aside>;
}
