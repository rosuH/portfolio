"use client";

// The "." after rosu: a braille spinner (⠋⠙⠹⠸⠼…) that loops forever — a
// perpetual "loading" mark. The dot-matrix map lives on the right (rosu-map.tsx).

import { useEffect, useRef } from "react";

const ACCENT = "#2E3E86";
const SPIN = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export default function RosuDot() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; // leave the static frame
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      pre.textContent = SPIN[Math.floor((now - start) / 90) % SPIN.length];
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span style={{ position: "relative", display: "inline-block", width: 0, verticalAlign: "baseline" }}>
      <pre
        ref={preRef}
        aria-hidden
        style={{
          position: "absolute", left: "0.04em", bottom: "0.06em", margin: 0,
          fontFamily: "inherit", lineHeight: 1.05, fontSize: "0.16em", color: ACCENT,
          whiteSpace: "pre", letterSpacing: "normal", pointerEvents: "none",
        }}
      >{SPIN[4]}</pre>
    </span>
  );
}
