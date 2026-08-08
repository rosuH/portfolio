import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";
import { loadOgFonts } from "@/lib/og-fonts";
import { loadOgDither, OG_SIZE } from "@/lib/og-dither";
import { OgFrame, ogFonts, ogText } from "@/lib/og-frame";

export const runtime = "nodejs";

export const alt = `${DATA.name} — software engineer / creative agents`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  try {
    const [fontData, dither] = await Promise.all([
      loadOgFonts(),
      loadOgDither(),
    ]);

    return new ImageResponse(
      (
        <OgFrame dither={dither}>
          <div style={ogText.kicker}>
            SOFTWARE ENGINEER / CREATIVE AGENTS
          </div>
          <div style={ogText.title}>{DATA.name}</div>
          {DATA.description ? (
            <div style={ogText.description}>{DATA.description}</div>
          ) : null}
          <div style={ogText.meta}>rosuh.me</div>
        </OgFrame>
      ),
      {
        ...size,
        fonts: ogFonts(fontData),
      },
    );
  } catch (error) {
    console.error("Error generating OpenGraph image:", error);
    return new Response(
      `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 },
    );
  }
}
