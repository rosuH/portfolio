# Skill Icons Design

## Goal

Add icons for the `Kotlin`, `Android`, `Jetpack Compose`, and `Kotlin Multiplatform` skill badges on the homepage while preserving the current layout and the existing personal profile data.

## Scope

- Add local SVG React components under `src/components/ui/svgs/`
- Wire those components into the `skills` array in `src/data/resume.tsx`
- Do not change badge layout, spacing, typography, or any unrelated profile content
- Do not add third-party icon packages or runtime dependencies

## Design Decisions

### 1. Source of truth

- `Kotlin` and `Kotlin Multiplatform` use JetBrains/Kotlin brand-aligned vector artwork as the basis for local SVG components
- `Android` uses Google Android brand-aligned vector artwork as the basis for a local SVG component
- `Jetpack Compose` does not get a fabricated standalone brand mark; it uses the closest official Android/Jetpack visual treatment available in the current brand system

### 2. Local asset strategy

- Keep all icons as local TSX SVG components so they match the repo's existing icon pattern
- Use explicit `viewBox` values and pass through `SVGProps<SVGSVGElement>`
- Preserve official brand colors where the logo depends on color recognition
- Avoid external fetches, image URLs, or inline base64 assets

### 3. Integration point

- `src/data/resume.tsx` remains the single source of truth for skill badge definitions
- The four target skills receive icon references through the `icon` field
- Other profile-content changes should be treated as separate follow-up edits rather than part of the icon rollout itself

## Files

- Create: `src/components/ui/svgs/kotlin.tsx`
- Create: `src/components/ui/svgs/android.tsx`
- Create: `src/components/ui/svgs/jetpackCompose.tsx`
- Create: `src/components/ui/svgs/kotlinMultiplatform.tsx`
- Modify: `src/data/resume.tsx`

## Constraints

- Keep the implementation compatible with the existing badge rendering path
- Prefer crisp, simple SVG paths over oversized or needlessly complex exported markup when hand-cleaning is practical
- If any imported official vector needs simplification, preserve silhouette and brand recognizability before micro-optimizing path count

## Verification

- Run `pnpm lint`
- Run `pnpm build`
- Confirm the homepage skill list renders all four icons without layout breakage in local dev

## Out of Scope

- Redesigning the skills section
- Reordering skills
- Changing copy, summary, work history, or social links
- Adding dark/light icon switching logic unless the official mark strictly requires it
