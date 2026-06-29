# rosu — portfolio

Personal portfolio site for [rosu](https://rosuh.me), built on Next.js and deployed on Vercel. Forked from [dillionverma/portfolio](https://github.com/dillionverma/portfolio) (Next.js + shadcn/ui + Magic UI).

# Structure

The site is split into two deliberately different surfaces:

- **`/` (homepage)** — a custom, full-bleed single-page design (`src/components/rosu/`):
  - `RosuHome` — hero (`rosu` title + braille dot), intro, **WORK** and **SELECTED WORK** lists, contact footer.
  - `RosuDot` — the perpetual braille spinner behind the title.
  - `RosuMap` — hero dot-matrix map canvas (South China / Southeast Asia with a looping aircraft route).
  - `RosuFx` — canvas FX engine: a pointer-tracking dot grid, a custom cursor, and unique per-row hover effects (glitch, dither imagery, provider logos, etc.).
  - Styles are scoped under `.rosu-site` in `src/app/globals.css` (IBM Plex Mono, Apple-style focus-blur, `prefers-reduced-motion` support).
  - The homepage content (experience, projects) is **hardcoded inline** in `rosu-home.tsx` — it does not read from `resume.ts`.

- **`/blog`** — keeps the original template chrome (`FlickeringGrid` + centered container + bottom `Navbar` dock) via `src/app/blog/layout.tsx`. Blog posts are local MDX.

This split is why the root layout (`src/app/layout.tsx`) only renders children without any template chrome: the homepage needs full-bleed control, and the chrome lives in the `/blog` route group instead.

# Editing

| What | Where |
| :--- | :--- |
| Homepage copy / experience / projects | `src/components/rosu/rosu-home.tsx` (hardcoded inline) |
| Homepage canvas FX | `src/components/rosu/rosu-fx.ts` |
| Site name, URL, description, avatar, social/contact links, blog dock | `src/data/resume.tsx` |
| Blog posts | `src/app/blog/posts/*.mdx` |
| Global styles (incl. `.rosu-site` scope) | `src/app/globals.css` |

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/rosuH/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local server:

   ```bash
   pnpm dev
   ```

# Tech

Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Magic UI, MDX (for the blog).

# License

Licensed under the [MIT license](./LICENSE.md).
