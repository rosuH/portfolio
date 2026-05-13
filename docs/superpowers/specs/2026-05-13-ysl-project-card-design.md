# YSL Project Card Design

## Goal

Add a new `YSL` project card to the portfolio projects section using the provided banner artwork and pointing the primary project link to the live Yellowstone Sound Atlas experience.

## Scope

- Add one new project entry to `src/data/resume.tsx`
- Add one local static banner asset under `public/`
- Reuse the existing `ProjectCard` layout and interaction model
- Keep the rest of the projects list unchanged

## Project Summary

`YSL` collects the public Yellowstone National Park sound library and turns it into a browsable, shareable listening atlas. The repository includes the crawler, archived media, route metadata, and a static atlas interface for exploring field recordings as specimen cards.

## Design Decisions

### 1. Primary destination

- The project card `href` should point to the live experience:
  - `https://ysl.rosuh.me/atlas/`
- Rationale: the card should open the product itself first, not the source repository

### 2. Secondary link

- The card should include a `GitHub` secondary link:
  - `https://github.com/rosuH/YSL`
- Rationale: this matches the current portfolio pattern where the main card sells the experience and the badge link exposes the source

### 3. Banner handling

- Use the provided YSL banner artwork as the source image
- Copy it into the portfolio as a local static asset under `public/`
- Downscale or re-encode it only as needed for reasonable web payload while preserving the current composition and legibility of the specimen-card layout shown in the banner

### 4. Card content

- Title: `YSL`
- Dates: use a concise label instead of a fake date range
- Description: summarize the listening-atlas experience, crawler/archive pipeline, and static shareable browsing model in 1-2 sentences
- Technologies: highlight the project as a Python/static web/data-collection workflow rather than over-listing internal details

## Content Direction

Recommended portfolio copy direction:

- Emphasize the listening atlas itself
- Mention the Yellowstone public sound archive as the source material
- Mention that the repo includes both the crawler/archive and the static exploration interface
- Keep the description shorter and more product-facing than the README

## Files

- Modify: `src/data/resume.tsx`
- Create: `public/ysl-banner.(png|webp)`

## Constraints

- Do not redesign `ProjectCard`
- Do not reorder unrelated project entries unless needed for portfolio relevance
- Do not add new runtime dependencies
- Keep the card image compatible with the existing `img`-based project media rendering

## Verification

- Run `pnpm lint`
- Run `pnpm build`
- Confirm the new project card renders with the banner image and both links in local dev
