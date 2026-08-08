import { readFile } from "node:fs/promises";
import path from "node:path";

/** Homepage paper + ink — match RosuHome light scene. */
export const OG_PAPER = "#E9E7E0";
export const OG_INK = "#17181B";
export const OG_INK_SOFT = "rgba(23, 24, 27, 0.62)";
export const OG_INK_MUTED = "rgba(23, 24, 27, 0.48)";
export const OG_INK_FAINT = "rgba(23, 24, 27, 0.38)";

export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export type OgDitherAssets = {
  cloud: string;
  tree: string;
};

/** Load static dither frames as data URLs for Satori (WebP is unreliable there). */
export async function loadOgDither(): Promise<OgDitherAssets> {
  const root = path.join(process.cwd(), "public/dither/og");
  const [cloud, tree] = await Promise.all([
    readFile(path.join(root, "cloud.png")),
    readFile(path.join(root, "tree.png")),
  ]);
  return {
    cloud: `data:image/png;base64,${cloud.toString("base64")}`,
    tree: `data:image/png;base64,${tree.toString("base64")}`,
  };
}
