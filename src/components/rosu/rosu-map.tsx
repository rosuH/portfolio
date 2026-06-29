"use client";

// Persistent dot-matrix map of the southern-China region, parked in the
// hero's top-right. Faint land dots + Shenzhen / Singapore markers, with a
// plane looping Shenzhen -> Singapore. Decorative (aria-hidden).

import { useEffect, useRef } from "react";

const ACCENT = "#2E3E86";
const INK = (a: number) => `rgba(23,24,27,${a})`;
const BLU = (a: number) => `rgba(46,62,134,${a})`;
const SIZE = 280;

const gauss = (u: number, c: number, w: number) => Math.exp(-Math.pow((u - c) / w, 2));
const isLand = (x: number, y: number) => {
  const u = x / SIZE, v = y / SIZE;
  const coast = 0.26 + 0.075 * Math.sin(u * 5 + 0.5) + 0.03 * Math.sin(u * 11 + 2)
    - 0.05 * gauss(u, 0.15, 0.07) - 0.07 * gauss(u, 0.60, 0.045);
  let land = v > 0.04 && v < coast && u > 0.09 && u < 0.93;       // mainland S. China
  if (Math.hypot(u - 0.25, v - 0.46) < 0.062) land = true;       // Hainan island
  if (u > 0.225 && u < 0.285 && v > 0.30 && v < 0.43) land = true; // Leizhou peninsula
  if (u > 0.03 && u < 0.075 && v > 0.30 && v < 0.68) land = true; // Vietnam coast
  if (u > 0.37 && u < 0.45 && v > 0.58 && v < 0.86) land = true;  // Malay peninsula
  if (v > 0.86 && u > 0.18 && u < 0.66) land = true;             // Sumatra/Borneo hint
  return land;
};

const SZ: [number, number] = [0.605 * SIZE, 0.275 * SIZE]; // Shenzhen
const SG: [number, number] = [0.45 * SIZE, 0.865 * SIZE];  // Singapore
const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);
const at = (u: number): [number, number] => {
  const e = ease(u);
  return [SZ[0] + (SG[0] - SZ[0]) * e + Math.sin(u * Math.PI) * 24, SZ[1] + (SG[1] - SZ[1]) * e];
};

export default function RosuMap() {
  const cvsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = cvsRef.current;
    if (!cvs) return;
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cvs.width = SIZE * dpr; cvs.height = SIZE * dpr;
    const g = cvs.getContext("2d")!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);

    const land: [number, number][] = [];
    for (let gy = 10; gy < SIZE - 8; gy += 12)
      for (let gx = 10; gx < SIZE - 8; gx += 12)
        if (isLand(gx, gy)) land.push([gx, gy]);

    const draw = (t: number) => {
      g.clearRect(0, 0, SIZE, SIZE);
      g.fillStyle = INK(0.22);
      for (const [x, y] of land) { g.beginPath(); g.arc(x, y, 1.4, 0, 7); g.fill(); }

      const FLY = 3.0, CYCLE = 4.2;
      const p = rm ? 1 : Math.max(0, Math.min(1, (t % CYCLE) / FLY));
      g.fillStyle = BLU(0.5);
      for (let i = 0; i <= 30; i++) { const u = i / 30; if (u > p) break; const [x, y] = at(u); g.beginPath(); g.arc(x, y, 1.2, 0, 7); g.fill(); }

      const marker = (pt: [number, number]) => {
        g.fillStyle = ACCENT; g.beginPath(); g.arc(pt[0], pt[1], 3.4, 0, 7); g.fill();
        const pulse = rm ? 0 : (Math.sin(t * 3) * 0.5 + 0.5) * 5;
        g.strokeStyle = BLU(0.32); g.lineWidth = 1; g.beginPath(); g.arc(pt[0], pt[1], 7 + pulse, 0, 7); g.stroke();
      };
      marker(SZ); marker(SG);

      const [px, py] = at(p), [bx, by] = at(Math.max(0, p - 0.02));
      g.save(); g.translate(px, py); g.rotate(Math.atan2(py - by, px - bx)); g.fillStyle = ACCENT;
      g.beginPath(); g.moveTo(7, 0); g.lineTo(-6, 5); g.lineTo(-2, 0); g.lineTo(-6, -5); g.closePath(); g.fill();
      g.restore();
    };

    if (rm) { draw(0); return; }
    let raf = 0; const start = performance.now();
    const loop = (now: number) => { draw((now - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="rosu-map" aria-hidden>
      <canvas ref={cvsRef} style={{ position: "absolute", left: 0, top: 0, width: SIZE, height: SIZE, display: "block" }} />
      {([[SZ, "Shenzhen"], [SG, "Singapore"]] as const).map(([pt, name]) => (
        <span
          key={name}
          style={{
            position: "absolute", left: pt[0] + 12, top: pt[1] - 7,
            fontFamily: "inherit", fontSize: 10, lineHeight: 1, whiteSpace: "nowrap", letterSpacing: "normal",
            color: "rgba(23,24,27,0.7)", background: "rgba(233,231,224,0.75)", padding: "1px 3px", borderRadius: 2,
          }}
        >{name}</span>
      ))}
    </div>
  );
}
