# YSL Project Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `YSL` project card to the portfolio with the live Yellowstone Sound Atlas as the primary destination and the GitHub repository as the secondary link.

**Architecture:** Reuse the existing `projects` config in `src/data/resume.tsx` as the only data integration point. Add one new static banner asset under `public/`, then wire a single new project object into the current portfolio data structure without modifying card rendering code.

**Tech Stack:** Next.js 16, React 19, TypeScript config data, static image assets

---

### Task 1: Add the banner asset

**Files:**
- Create: `public/ysl-banner.png`

- [ ] **Step 1: Copy and resize the provided banner**

Run:

```bash
cp /Users/rosu/Downloads/banner.png /tmp/ysl-banner-source.png
sips -Z 1600 /tmp/ysl-banner-source.png --out public/ysl-banner.png >/dev/null
```

Expected: `public/ysl-banner.png` exists with a smaller web-friendly size than the original source.

- [ ] **Step 2: Verify the asset is usable**

Run:

```bash
file public/ysl-banner.png
ls -lh public/ysl-banner.png
```

Expected: the file is a readable PNG image and has a reasonable on-disk size for a portfolio card image.

### Task 2: Add the YSL project entry

**Files:**
- Modify: `src/data/resume.tsx`

- [ ] **Step 1: Add the new project object**

Insert a new `projects` entry with:

```ts
{
  title: "YSL",
  href: "https://ysl.rosuh.me/atlas/",
  dates: "2025 · Listening Atlas",
  active: true,
  description:
    "A browsable Yellowstone Sound Atlas that turns the park's public sound library into a shareable listening experience. The project includes the crawler, archive pipeline, and a static specimen-style interface for exploring field recordings.",
  technologies: ["Python", "Static Web", "Data Collection"],
  links: [
    {
      type: "GitHub",
      href: "https://github.com/rosuH/YSL",
      icon: <Icons.github className=\"size-3\" />,
    },
  ],
  image: "/ysl-banner.png",
  video: "",
}
```

- [ ] **Step 2: Place the project in the portfolio list**

Keep the existing projects intact and add `YSL` near the top of the list so it reads as a current featured project without reworking the card component.

### Task 3: Verify the portfolio still builds

**Files:**
- Modify: none

- [ ] **Step 1: Run lint**

Run:

```bash
pnpm lint
```

Expected: `eslint` exits with code `0`.

- [ ] **Step 2: Run the production build**

Run:

```bash
pnpm build
```

Expected: the site builds successfully with the new project entry and asset.

- [ ] **Step 3: Confirm the rendered project data is present**

Run:

```bash
curl -s http://localhost:3000 | rg "YSL|ysl-banner.png|ysl.rosuh.me/atlas"
```

Expected: the rendered homepage output contains the new project title, banner image path, and live atlas URL.
