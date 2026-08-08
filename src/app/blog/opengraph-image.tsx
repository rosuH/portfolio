import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-fonts";
import { loadOgDither, OG_SIZE } from "@/lib/og-dither";
import { OgFrame, ogFonts, ogText } from "@/lib/og-frame";

export const runtime = "nodejs";

export const alt = "Blog — rosu";
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
          <div style={ogText.kicker}>BLOG</div>
          <div style={ogText.title}>Writing</div>
          <div style={ogText.description}>
            Thoughts on software development, life, and more.
          </div>
          <div style={ogText.meta}>rosuh.me/blog</div>
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
