'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';

type Measurement = { connected: boolean; fresh: boolean; distanceMm: number | null; turnDegrees: number | null };
const empty: Measurement = { connected: false, fresh: false, distanceMm: null, turnDegrees: null };

export default function RobotMovement({ frame, open, onClose }: {
  frame: RefObject<HTMLIFrameElement | null>; open: boolean; onClose: () => void;
}) {
  const [data, setData] = useState<Measurement>(empty);
  const panel = useRef<HTMLElement>(null);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  function move(left: number, top: number) {
    const element = panel.current;
    const parent = element?.parentElement;
    if (!element || !parent) return;
    setPosition({
      left: Math.max(0, Math.min(left, parent.clientWidth - element.offsetWidth)),
      top: Math.max(0, Math.min(top, parent.clientHeight - element.offsetHeight)),
    });
  }
  useEffect(() => {
    if (!open || !panel.current) return;
    const element = panel.current;
    const observer = new ResizeObserver(() => {
      if (element.style.left) move(element.offsetLeft, element.offsetTop);
    });
    observer.observe(element);
    if (element.parentElement) observer.observe(element.parentElement);
    return () => observer.disconnect();
  }, [open]);
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
  return <aside ref={panel} hidden={!open} style={position ?? undefined} className="robot-movement" aria-label="Robot movement">
    <header><h2 className="movement-drag" tabIndex={0} aria-label="Move robot movement window" title="Drag to move, or use arrow keys"
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0 || !panel.current) return;
        drag.current = { id: event.pointerId, x: event.clientX - panel.current.offsetLeft, y: event.clientY - panel.current.offsetTop };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event => {
        if (drag.current?.id === event.pointerId) move(event.clientX - drag.current.x, event.clientY - drag.current.y);
      }}
      onPointerUp={() => { drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }}
      onKeyDown={event => {
        const delta: Record<string, [number, number]> = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
        const step = delta[event.key];
        if (!step || !panel.current) return;
        event.preventDefault(); event.stopPropagation();
        move(panel.current.offsetLeft + step[0], panel.current.offsetTop + step[1]);
      }}>Robot movement</h2><button onClick={onClose} aria-label="Close robot movement">×</button></header>
    <p role="status">{!data.connected ? 'Connect a Brain to see measurements' : data.fresh ? 'Live · since reset' : 'Waiting for robot data…'}</p>
    <dl><div><dt>Wheel travel</dt><dd data-testid="movement-distance">{format(data.distanceMm)} <small>mm</small></dd></div><div><dt>Rotation</dt><dd data-testid="movement-turn">{format(data.turnDegrees)} <small>°</small></dd></div></dl>
    <p>Distance is estimated from both wheels and includes turns. Rotation is signed. Missing sensor data appears as —.</p>
    <button className="movement-reset" onClick={() => {
      setData(current => ({ ...current, fresh: false, distanceMm: null, turnDegrees: null }));
      frame.current?.contentWindow?.postMessage({ type: 'vex-movement-reset' }, location.origin);
    }}>Reset measurements</button>
  </aside>;
}
