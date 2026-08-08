import { ImageResponse } from "next/og";
import { allPosts } from "content-collections";
import { loadOgFonts } from "@/lib/og-fonts";
import { loadOgDither, OG_SIZE } from "@/lib/og-dither";
import { OgFrame, ogFonts, ogText } from "@/lib/og-frame";

export const runtime = "nodejs";

export const alt = "Blog Post";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const [fontData, dither] = await Promise.all([
      loadOgFonts(),
      loadOgDither(),
    ]);
    const { slug } = await params;
    const post = allPosts.find(
      (p) => p._meta.path.replace(/\.mdx$/, "") === slug,
    );

    if (!post) {
      return new ImageResponse(
        (
          <OgFrame dither={dither}>
            <div style={ogText.kicker}>BLOG</div>
            <div style={ogText.titleCompact}>Post Not Found</div>
          </OgFrame>
        ),
        {
          ...size,
          fonts: ogFonts(fontData),
        },
      );
    }

    const publishedDate = post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })
      : "";

    return new ImageResponse(
      (
        <OgFrame dither={dither}>
          <div style={ogText.kicker}>BLOG</div>
          <div style={ogText.titleCompact}>{post.title}</div>
          {post.summary ? (
            <div style={ogText.description}>{post.summary}</div>
          ) : null}
          {publishedDate ? (
            <div style={ogText.meta}>{publishedDate}</div>
          ) : null}
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
