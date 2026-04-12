# Skill Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add brand-aligned icons for `Kotlin`, `Android`, `Jetpack Compose`, and `Kotlin Multiplatform` in the homepage skills list without changing the existing layout or personal profile content.

**Architecture:** Keep the existing `DATA.skills` config as the single integration point and add four local SVG TSX components under `src/components/ui/svgs/`. Reuse official vector assets where available, hand-normalize them into small React SVG components, and wire them into the existing skill badges.

**Tech Stack:** Next.js 16, React 19, TypeScript, local SVG React components

---

### Task 1: Add the new SVG icon components

**Files:**
- Create: `src/components/ui/svgs/kotlin.tsx`
- Create: `src/components/ui/svgs/android.tsx`
- Create: `src/components/ui/svgs/jetpackCompose.tsx`
- Create: `src/components/ui/svgs/kotlinMultiplatform.tsx`

- [ ] **Step 1: Extract the official source vectors**

Run:

```bash
mkdir -p /tmp/skill-icons
curl -L --silent https://resources.jetbrains.com/storage/products/kotlin/docs/kotlin_logos.zip -o /tmp/skill-icons/kotlin_logos.zip
unzip -o /tmp/skill-icons/kotlin_logos.zip \
  "Kotlin Ecosystem Logos/Kotlin/Primary/Kotlin icon.svg" \
  "Kotlin Ecosystem Logos/Kotlin Multiplatform/Primary/Kotlin Multiplatform icon.svg" \
  -d /tmp/skill-icons
curl -L --silent https://developer.android.com/static/images/brand/android-head_flat.svg -o /tmp/skill-icons/android-head_flat.svg
curl -L --silent https://developer.android.com/static/images/picto-icons/layout.svg -o /tmp/skill-icons/layout.svg
```

Expected: all four upstream SVG sources exist under `/tmp/skill-icons`

- [ ] **Step 2: Add the Kotlin icon component**

Create `src/components/ui/svgs/kotlin.tsx` as a thin React wrapper around the official Kotlin icon SVG with `SVGProps<SVGSVGElement>`.

- [ ] **Step 3: Add the Android icon component**

Create `src/components/ui/svgs/android.tsx` as a thin React wrapper around the official Android head SVG with brand-green fills preserved.

- [ ] **Step 4: Add the Jetpack Compose substitute icon**

Create `src/components/ui/svgs/jetpackCompose.tsx` using the official Android Developers `layout.svg` pictogram as the closest official-system replacement for Compose.

- [ ] **Step 5: Add the Kotlin Multiplatform icon component**

Create `src/components/ui/svgs/kotlinMultiplatform.tsx` as a thin React wrapper around the official Kotlin Multiplatform icon SVG.

- [ ] **Step 6: Verify the new component files compile cleanly**

Run:

```bash
pnpm lint
```

Expected: `eslint` exits with code `0`

### Task 2: Wire the icons into the skills config

**Files:**
- Modify: `src/data/resume.tsx`

- [ ] **Step 1: Import the new icon components**

Add imports for:

```ts
import { Android } from "@/components/ui/svgs/android";
import { JetpackCompose } from "@/components/ui/svgs/jetpackCompose";
import { Kotlin } from "@/components/ui/svgs/kotlin";
import { KotlinMultiplatform } from "@/components/ui/svgs/kotlinMultiplatform";
```

- [ ] **Step 2: Attach icons to the four target skills**

Update the `skills` array so these entries use the new components:

```ts
{ name: "Kotlin", icon: Kotlin },
{ name: "Android", icon: Android },
{ name: "Jetpack Compose", icon: JetpackCompose },
{ name: "Kotlin Multiplatform", icon: KotlinMultiplatform },
```

- [ ] **Step 3: Verify the config change compiles**

Run:

```bash
pnpm lint
pnpm build
```

Expected: both commands exit with code `0`

### Task 3: Visual verification in local dev

**Files:**
- Modify: none

- [ ] **Step 1: Inspect the rendered badges**

Run:

```bash
pnpm dev
```

Expected: the homepage skill badges render all four icons at `http://localhost:3000` without overflow, clipping, or misalignment.

- [ ] **Step 2: Commit the implementation**

Run:

```bash
git add src/data/resume.tsx src/components/ui/svgs/*.tsx docs/superpowers/plans/2026-04-12-skill-icons-implementation.md
git commit -m "feat: add branded skill icons"
```

Expected: a single commit containing the icon components, config wiring, and plan file
