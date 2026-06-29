"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import { mountRosuFx } from "./rosu-fx";
import RosuDot from "./rosu-dot";
import RosuMap from "./rosu-map";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

// muted secondary year color, reused across rows
const dim = "rgba(23,24,27,0.5)";
const desc: CSSProperties = { color: "rgba(23,24,27,0.55)", fontSize: 13, marginLeft: 12 };
const org: CSSProperties = { fontSize: 17, fontWeight: 500 };

export default function RosuHome() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountRosuFx(root);
  }, []);

  return (
    <div
      ref={rootRef}
      data-site
      className={`rosu-site ${plexMono.variable}`}
      style={{ position: "relative", minHeight: "100vh", background: "#E9E7E0", color: "#17181B" }}
    >
      <canvas data-dots style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
      <canvas data-fxc style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }} />

      <div data-cursor style={{ position: "fixed", left: 0, top: 0, zIndex: 60, pointerEvents: "none", mixBlendMode: "difference", willChange: "transform" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 24, height: 24, border: "1.5px solid #fff", borderRadius: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 4, height: 4, background: "#fff", borderRadius: "50%", transform: "translate(-50%,-50%)" }} />
      </div>

      <main style={{ position: "relative", zIndex: 10, maxWidth: 1020, margin: "0 auto", padding: "0 clamp(16px,4vw,40px)" }}>
        <section style={{ position: "relative", padding: "12vh 0 12vh" }}>
          <RosuMap />
          <div style={{ fontSize: 11, letterSpacing: ".32em", color: dim }}>SOFTWARE ENGINEER&nbsp;/&nbsp;CREATIVE AGENTS</div>
          <h1 style={{ fontSize: "clamp(68px,14vw,168px)", fontWeight: 500, letterSpacing: "-.05em", lineHeight: 0.86, margin: "30px 0 0" }}>rosu<RosuDot /></h1>
          <p style={{ maxWidth: "52ch", fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.7, color: "rgba(23,24,27,0.66)", margin: "34px 0 0" }}>I build Android products &mdash; live streaming, RTC, Kotlin Multiplatform &mdash; and now the backend behind creative-agent systems. Kotlin since 2018. KUG Shenzhen speaker.</p>
        </section>

        <section style={{ padding: "6vh 0" }}>
          <div style={{ fontSize: 11, letterSpacing: ".28em", color: dim, padding: "0 14px 6px" }}>WORK</div>

          <a className="row" href="https://www.tiktok.com/" target="_blank" rel="noopener" data-fx="glitch" data-c="#25F4EE" style={{ "--accent": "#E1244D" } as CSSProperties}>
            <span style={{ fontVariantNumeric: "tabular-nums", color: "#2E3E86" }}>2026</span>
            <span><span className="org" style={org}>TikTok</span><span style={desc}>Senior Engineer &mdash; Creative Agent Systems</span></span>
            <span className="arw">&rarr;</span>
          </a>

          <a className="row" href="https://www.tencentmusic.com/" target="_blank" rel="noopener" data-fx="pk" data-c="#267CF8" style={{ "--accent": "#1E5FBF" } as CSSProperties}>
            <span style={{ fontVariantNumeric: "tabular-nums", color: dim }}>2021</span>
            <span><span className="org" style={org}>Tencent Music</span><span style={desc}>Senior Android &mdash; live &middot; RTC &middot; A/V</span></span>
            <span className="arw">&rarr;</span>
          </a>

          <a className="row" href="https://www.tenclass.com/" target="_blank" rel="noopener" data-fx="edu" data-c="#FF541E" style={{ "--accent": "#D8431A" } as CSSProperties}>
            <span style={{ fontVariantNumeric: "tabular-nums", color: dim }}>2019</span>
            <span><span className="org" style={org}>Shifang Ronghai</span><span style={desc}>Android &mdash; A/V &middot; CI &middot; coroutines</span></span>
            <span className="arw">&rarr;</span>
          </a>

          <div className="row" data-fx="detect" data-c="#202225" style={{ cursor: "default", "--accent": "#202225" } as CSSProperties}>
            <span style={{ fontVariantNumeric: "tabular-nums", color: dim }}>2018</span>
            <span><span className="org" style={org}>Tuputech</span><span style={desc}>Android Intern &mdash; vision</span></span>
            <span></span>
          </div>
        </section>

        <section style={{ padding: "6vh 0" }}>
          <div style={{ fontSize: 11, letterSpacing: ".28em", color: dim, padding: "0 14px 6px" }}>SELECTED WORK</div>

          <a className="row" href="https://ysl.rosuh.me/atlas/" target="_blank" rel="noopener" data-fx="atlas" data-c="#4E7A53" style={{ "--accent": "#3C6341" } as CSSProperties}>
            <span data-since="2021" style={{ fontVariantNumeric: "tabular-nums", color: "#2E3E86" }}>2021&ndash;26</span>
            <span><span className="org" style={org}>YSL &mdash; Listening Atlas</span><span style={desc}>Python &middot; crawler + archive + static UI</span></span>
            <span className="arw">&rarr;</span>
          </a>

          <a className="row" href="https://github.com/rosuH/EasyWatermark" target="_blank" rel="noopener" data-fx="tiles" data-c="#3E63B0" style={{ "--accent": "#34539A" } as CSSProperties}>
            <span data-since="2020" style={{ fontVariantNumeric: "tabular-nums", color: dim }}>2020&ndash;26</span>
            <span><span className="org" style={org}>Easy Watermark</span><span style={desc}>Kotlin &middot; Android &middot; privacy</span></span>
            <span className="arw">&rarr;</span>
          </a>

          <a className="row" href="http://aicommit.app/" target="_blank" rel="noopener" data-fx="hub" data-c="#2E7CF6" style={{ "--accent": "#2E7CF6" } as CSSProperties}>
            <span data-since="2023" style={{ fontVariantNumeric: "tabular-nums", color: dim }}>2023&ndash;26</span>
            <span><span className="org" style={org}>AICommit</span><span style={desc}>Kotlin &middot; AI &middot; IntelliJ plugin</span></span>
            <span className="arw">&rarr;</span>
          </a>

          <a className="row" href="https://github.com/rosuH/AndroidFilePicker" target="_blank" rel="noopener" data-fx="files" data-c="#34C36E" style={{ "--accent": "#1F9E55" } as CSSProperties}>
            <span data-since="2018" style={{ fontVariantNumeric: "tabular-nums", color: dim }}>2018&ndash;26</span>
            <span><span className="org" style={org}>AndroidFilePicker</span><span style={desc}>Kotlin &middot; smooth file picker</span></span>
            <span className="arw">&rarr;</span>
          </a>
        </section>

        <section style={{ padding: "8vh 0 16vh", borderTop: "1px solid rgba(23,24,27,0.14)", marginTop: "5vh", display: "flex", flexWrap: "wrap", gap: 26, alignItems: "baseline", fontSize: 13 }}>
          <a href="mailto:hi@rosuh.me" style={{ borderBottom: "1px solid rgba(23,24,27,0.25)", paddingBottom: 2 }}>hi@rosuh.me</a>
          <a href="https://github.com/rosuH" target="_blank" rel="noopener" style={{ borderBottom: "1px solid rgba(23,24,27,0.25)", paddingBottom: 2 }}>github/rosuH</a>
          <a href="https://x.com/rosu_h" target="_blank" rel="noopener" style={{ borderBottom: "1px solid rgba(23,24,27,0.25)", paddingBottom: 2 }}>x/rosu_h</a>
          <span style={{ marginLeft: "auto", color: "rgba(23,24,27,0.4)", fontSize: 11, letterSpacing: ".14em" }}>&copy; 2026 &mdash; BUILT FROM SCRATCH</span>
        </section>
      </main>
    </div>
  );
}
