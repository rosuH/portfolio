"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import {
  Bot,
  FolderOpen,
  GitCommitHorizontal,
  GraduationCap,
  Headphones,
  Music2,
  ScanEye,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { mountRosuFx } from "./rosu-fx";
import RosuDot from "./rosu-dot";
import DitherScene from "./dither-scene";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const linkStyle: CSSProperties = {
  borderBottom: "1px solid color-mix(in srgb, currentColor 28%, transparent)",
  paddingBottom: 2,
};

function RowIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="row-icon" aria-hidden>
      <Icon size={20} strokeWidth={1.75} absoluteStrokeWidth={false} />
    </span>
  );
}

type RowProps = {
  href?: string;
  accent: string;
  /** Canvas FX color (often brighter than accent) */
  fxColor: string;
  fx: string;
  year: ReactNode;
  yearClassName?: string;
  org: string;
  desc: string;
  icon: LucideIcon;
  staticRow?: boolean;
  yearAttrs?: Record<string, string>;
};

function Row({
  href,
  accent,
  fxColor,
  fx,
  year,
  yearClassName = "year",
  org,
  desc,
  icon,
  staticRow,
  yearAttrs,
}: RowProps) {
  const style = { "--accent": accent } as CSSProperties;
  // Exactly 3 grid children: year | body | icon.
  // Hold progress is painted via .row::after (see globals.css) so it never
  // steals a grid track and shoves text right.
  const body = (
    <>
      <span className={yearClassName} {...yearAttrs}>{year}</span>
      <span className="row-body">
        <span className="org">{org}</span>
        <span className="desc">{desc}</span>
      </span>
      <RowIcon icon={icon} />
    </>
  );

  if (staticRow || !href) {
    return (
      <div
        className="row row--static"
        data-fx={fx}
        data-c={fxColor}
        style={style}
      >
        {body}
      </div>
    );
  }

  return (
    <a
      className="row"
      href={href}
      target="_blank"
      rel="noopener"
      data-fx={fx}
      data-c={fxColor}
      style={style}
    >
      {body}
    </a>
  );
}

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
    >
      <canvas data-dots style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
      <DitherScene />
      {/* Row canvas FX — arms after 500ms hold (see mountRosuFx) */}
      <canvas data-fxc style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }} />

      <div data-cursor style={{ position: "fixed", left: 0, top: 0, zIndex: 60, pointerEvents: "none", mixBlendMode: "difference", willChange: "transform" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 24, height: 24, border: "1.5px solid #fff", borderRadius: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 4, height: 4, background: "#fff", borderRadius: "50%", transform: "translate(-50%,-50%)" }} />
      </div>

      {/* Theme control — top-right, always reachable (navbar dock is not on this page) */}
      <div className="rosu-theme-toggle">
        <ModeToggle className="rosu-theme-toggle__btn" />
      </div>

      <main style={{ position: "relative", zIndex: 10, maxWidth: 1020, margin: "0 auto", padding: "0 clamp(16px,4vw,40px)" }}>
        <section style={{ position: "relative", padding: "12vh 0 10vh" }}>
          <div className="rosu-kicker">SOFTWARE ENGINEER&nbsp;/&nbsp;CREATIVE AGENTS</div>
          <h1 style={{ fontSize: "clamp(68px,14vw,168px)", fontWeight: 500, letterSpacing: "-.05em", lineHeight: 0.86, margin: "30px 0 0" }}>rosu<RosuDot /></h1>
          <p className="rosu-lede">
            I build Android products &mdash; live streaming, RTC, Kotlin Multiplatform &mdash; and now the backend behind creative-agent systems. Kotlin since 2018. KUG Shenzhen speaker.
          </p>
          <nav
            aria-label="Contact"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px 22px",
              alignItems: "baseline",
              marginTop: 28,
              fontSize: 13,
            }}
          >
            <a href="mailto:hi@rosuh.me" style={linkStyle}>hi@rosuh.me</a>
            <a href="https://github.com/rosuH" target="_blank" rel="noopener" style={linkStyle}>github/rosuH</a>
            <a href="https://x.com/rosu_h" target="_blank" rel="noopener" style={linkStyle}>x/rosu_h</a>
          </nav>
        </section>

        <section style={{ padding: "4vh 0 6vh" }}>
          <div className="section-label">WORK</div>
          <div className="row-list">
            <Row
              href="https://www.tiktok.com/"
              accent="#E1244D"
              fx="glitch"
              fxColor="#25F4EE"
              year="2026"
              yearClassName="year year--now"
              org="TikTok"
              desc="Senior Engineer — Creative Agent Systems"
              icon={Bot}
            />
            <Row
              href="https://www.tencentmusic.com/"
              accent="#1E5FBF"
              fx="pk"
              fxColor="#267CF8"
              year="2021"
              org="Tencent Music"
              desc="Senior Android — live · RTC · A/V"
              icon={Music2}
            />
            <Row
              href="https://www.tenclass.com/"
              accent="#D8431A"
              fx="edu"
              fxColor="#FF541E"
              year="2019"
              org="Shifang Ronghai"
              desc="Android — A/V · CI · coroutines"
              icon={GraduationCap}
            />
            <Row
              staticRow
              accent="#202225"
              fx="detect"
              fxColor="#202225"
              year="2018"
              org="Tuputech"
              desc="Android Intern — vision"
              icon={ScanEye}
            />
          </div>
        </section>

        <section style={{ padding: "4vh 0 6vh" }}>
          <div className="section-label">SELECTED WORK</div>
          <div className="row-list">
            <Row
              href="https://ysl.rosuh.me/atlas/"
              accent="#3C6341"
              fx="atlas"
              fxColor="#4E7A53"
              year={<>2021&ndash;26</>}
              yearClassName="year year--now"
              yearAttrs={{ "data-since": "2021" }}
              org="YSL — Listening Atlas"
              desc="Python · crawler + archive + static UI"
              icon={Headphones}
            />
            <Row
              href="https://github.com/rosuH/EasyWatermark"
              accent="#34539A"
              fx="tiles"
              fxColor="#3E63B0"
              year={<>2020&ndash;26</>}
              yearAttrs={{ "data-since": "2020" }}
              org="Easy Watermark"
              desc="Kotlin · Android · privacy"
              icon={Stamp}
            />
            <Row
              href="http://aicommit.app/"
              accent="#2E7CF6"
              fx="hub"
              fxColor="#2E7CF6"
              year={<>2023&ndash;26</>}
              yearAttrs={{ "data-since": "2023" }}
              org="AICommit"
              desc="Kotlin · AI · IntelliJ plugin"
              icon={GitCommitHorizontal}
            />
            <Row
              href="https://github.com/rosuH/AndroidFilePicker"
              accent="#1F9E55"
              fx="files"
              fxColor="#34C36E"
              year={<>2018&ndash;26</>}
              yearAttrs={{ "data-since": "2018" }}
              org="AndroidFilePicker"
              desc="Kotlin · smooth file picker"
              icon={FolderOpen}
            />
          </div>
        </section>

        <footer className="rosu-footer">
          <span>&copy; 2026 &mdash; BUILT FROM SCRATCH</span>
        </footer>
      </main>
    </div>
  );
}
