import { readFile } from "node:fs/promises";
import path from "node:path";

export async function loadOgFonts() {
  try {
    const [cabinetGrotesk, clashDisplay] = await Promise.all([
      readFile(path.join(process.cwd(), "public/fonts/CabinetGrotesk-Medium.ttf")),
      readFile(path.join(process.cwd(), "public/fonts/ClashDisplay-Semibold.ttf")),
    ]);
    return { cabinetGrotesk, clashDisplay };
  } catch (error) {
    console.error("Failed to load fonts:", error);
    return null;
  }
}
