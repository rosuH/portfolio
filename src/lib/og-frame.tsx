import type { ReactNode } from "react";
import {
  OG_INK,
  OG_INK_FAINT,
  OG_INK_MUTED,
  OG_INK_SOFT,
  OG_PAPER,
  type OgDitherAssets,
} from "@/lib/og-dither";

type OgFrameProps = {
  dither: OgDitherAssets;
  children: ReactNode;
};

/**
 * Shared OG chrome: paper field + Bayer-dither cloud (top-left)
 * + palm/sea/sand (bottom-right), matching the live homepage scene.
 *
 * Satori-only styles (flex + absolute). No mix-blend / filters.
 */
export function OgFrame({ dither, children }: OgFrameProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: OG_PAPER,
        color: OG_INK,
      }}
    >
      {/* Cloud — top-left, mirrors .dither-cloud placement */}
      <img
        src={dither.cloud}
        alt=""
        width={720}
        height={573}
        style={{
          position: "absolute",
          top: -36,
          left: -70,
          width: 680,
          height: 541,
          objectFit: "contain",
          opacity: 0.92,
        }}
      />

      {/* Palm + sea + sand — bottom-right, mirrors .dither-tree */}
      <img
        src={dither.tree}
        alt=""
        width={1920}
        height={670}
        style={{
          position: "absolute",
          right: -40,
          bottom: -20,
          width: 860,
          height: 300,
          objectFit: "contain",
          objectPosition: "right bottom",
          opacity: 0.88,
        }}
      />

      {/* Soft paper wash so text stays readable over dither edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "62%",
          background:
            "linear-gradient(90deg, rgba(233,231,224,0.92) 0%, rgba(233,231,224,0.72) 55%, rgba(233,231,224,0) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "38%",
          background:
            "linear-gradient(0deg, rgba(233,231,224,0.55) 0%, rgba(233,231,224,0) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "100%",
          width: "100%",
          padding: "56px 64px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export const ogText = {
  kicker: {
    fontFamily: "Cabinet Grotesk",
    fontSize: 18,
    fontWeight: 400,
    letterSpacing: "0.28em",
    color: OG_INK_MUTED,
    marginBottom: 18,
    textTransform: "uppercase" as const,
  },
  title: {
    fontFamily: "Clash Display",
    fontSize: 72,
    fontWeight: 600,
    lineHeight: 1.02,
    letterSpacing: "-0.04em",
    color: OG_INK,
    marginBottom: 18,
    maxWidth: 820,
  },
  titleCompact: {
    fontFamily: "Clash Display",
    fontSize: 56,
    fontWeight: 600,
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
    color: OG_INK,
    marginBottom: 16,
    maxWidth: 820,
  },
  description: {
    fontFamily: "Cabinet Grotesk",
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.45,
    color: OG_INK_SOFT,
    maxWidth: 720,
    marginBottom: 12,
  },
  meta: {
    fontFamily: "Cabinet Grotesk",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.4,
    color: OG_INK_FAINT,
    marginTop: 8,
  },
} as const;

export function ogFonts(
  fontData: {
    cabinetGrotesk: ArrayBuffer | Buffer;
    clashDisplay: ArrayBuffer | Buffer;
  } | null,
) {
  if (!fontData) return undefined;
  return [
    {
      name: "Cabinet Grotesk",
      data: fontData.cabinetGrotesk,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Cabinet Grotesk",
      data: fontData.cabinetGrotesk,
      weight: 700 as const,
      style: "normal" as const,
    },
    {
      name: "Clash Display",
      data: fontData.clashDisplay,
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}
