# Linzess Homepage Migration Plan (`https://www.linzess.com/`)

## Overview

The Linzess homepage is a content-rich pharmaceutical landing page with multiple distinct sections including a hero banner, promotional cards, statistics, video testimonials, a savings CTA, and required ISI (Important Safety Information). The current `content/index.plain.html` contains boilerplate placeholder content that needs to be fully replaced.

**Current state:** The project has 6 existing blocks (hero, cards, columns, header, footer, fragment) with boilerplate CSS. Previous migration work analyzed the FAQs page but did not touch the homepage. Brand tokens (fonts, colors) are already extracted in `migration-work/brand.json` and applied to `styles/styles.css`.

**ISI Note:** The ISI sticky bar is excluded from this migration scope. ISI content will be rendered as default content (headings, paragraphs, lists) without sticky/collapse behavior.

---

## Page Sections Identified (8 Sections)

| # | Section | Content | Block(s) Needed | Status |
|---|---------|---------|-----------------|--------|
| 1 | **Hero Banner** | "Get Ahead of Your Returning IBS-C Symptoms" + background image + CTA | `hero` (variant: `hero-home`) | Existing block, needs variant styling |
| 2 | **Promo Cards Row** | Savings card + "#1 Prescribed" card + "Talk to Doctor" card | `cards` (variant: `cards-promo`) | Existing block, needs variant |
| 3 | **Gut Check Quiz CTA** | "Take the Gut Check Quiz" with actor portrayal note + CTA | `columns` (variant: `columns-quiz`) | Existing block, needs variant |
| 4 | **Statistics & Community** | "You're not alone" intro + 3 stat counters (11.5M, 28.5M, 18M) | `stats` (**new block**) | New block needed |
| 5 | **Patient Video Testimonials** | 3 Brightcove video cards (Dian, Nan, Julie) + "See All" CTA | `video-cards` (**new block**) | New block needed |
| 6 | **Savings Offer** | "$30 savings" banner with image + sign-up CTA + disclaimer | `columns` (variant: `columns-savings`) | Existing block, needs variant |
| 7 | **ISI (Important Safety Information)** | USES + IMPORTANT RISK INFORMATION (regulatory text) | Default content only | No block — plain headings, paragraphs, lists |
| 8 | **Footer** | Site-wide navigation, legal links, copyright | `footer` (fragment) | Already exists |

---

## Block Inventory & Development Needs

### Existing Blocks to Extend (3 variants)

1. **`hero` → variant `hero-home`**
   - Full-width background image with overlay text
   - Eyebrow text ("Constipation with belly pain keep coming back?")
   - H1 heading with line breaks
   - Subtitle paragraph
   - CTA button (orange/accent colored)
   - Desktop: text left-aligned over image; Mobile: stacked

2. **`cards` → variant `cards-promo`**
   - 3-card horizontal layout (not the current image+text grid)
   - Card 1: Savings eligibility with "Learn More" CTA
   - Card 2: "#1 Prescribed" stat with "How LINZESS Works" CTA
   - Card 3: "Talking to Your Doctor" with "Prepare for Your Visit" CTA
   - Background images per card, white text overlay
   - Desktop: 3-across; Mobile: stacked

3. **`columns` → variant `columns-savings`**
   - Left: product image ("90 days for $30")
   - Right: heading, description, "Sign Up Now" CTA, secondary link
   - Disclaimer text below
   - Section background: purple gradient/accent bar at top

### New Blocks to Build (2 blocks)

4. **`stats` (new block)**
   - Intro text ("Trying to figure out IBS-C or CIC? You're not alone.")
   - 3 animated/styled stat counters in a row
   - Each: large number + "million" + description
   - Footnote/disclaimer text below
   - Background: light/off-white section

5. **`video-cards` (new block)**
   - 3 Brightcove video embeds in horizontal row
   - Each: video player + title (H3) + "View Transcript" link
   - "See All Patient Videos" CTA link below
   - Requires Brightcove player integration (JS)
   - Desktop: 3-across; Mobile: stacked or carousel

### Shared Components (already exist)
- **Header/Nav** — `header` block (utility bar + main nav with mobile hamburger)
- **Footer** — `footer` block (6-column link lists, legal section, logos)

---

## Block Count Summary

| Category | Count | Blocks |
|----------|-------|--------|
| Existing blocks with new variants | 3 | `hero-home`, `cards-promo`, `columns-savings` |
| New blocks to create | 2 | `stats`, `video-cards` |
| Default content (no block) | 1 | ISI regulatory text (headings + paragraphs + lists) |
| Shared/already working | 3 | `header`, `footer`, `fragment` |
| **Total blocks involved** | **8** | |

---

## Checklist

### Phase 1: Site Analysis & Infrastructure
- [ ] Run page analysis on `https://www.linzess.com/` to produce structured artifacts
- [ ] Create/update page templates in `migration-work/page-templates.json` for the homepage
- [ ] Download and catalog all homepage images (hero background, card backgrounds, savings image, logos)
- [ ] Extract brand design tokens specific to the homepage (gradients, card styles, stat counter styles)

### Phase 2: Block Development (Existing Blocks — Variants)
- [ ] **Hero block (`hero-home` variant):** Add CSS for eyebrow text, multi-line heading, subtitle, CTA button styling, background overlay gradient
- [ ] **Cards block (`cards-promo` variant):** Add CSS/JS for 3-card promo layout with background images and overlay text
- [ ] **Columns block (`columns-savings` variant):** Add CSS for savings section with image + CTA + disclaimer layout

### Phase 3: Block Development (New Blocks)
- [ ] **Stats block:** Create `blocks/stats/stats.js` + `stats.css` — decoration for 3-column stat counters with large numbers
- [ ] **Video Cards block:** Create `blocks/video-cards/video-cards.js` + `video-cards.css` — Brightcove embed integration with 3-up layout

### Phase 4: Import Infrastructure
- [ ] Build block parsers for each new/variant block (hero-home, cards-promo, columns-savings, stats, video-cards)
- [ ] Build page transformer for the homepage template
- [ ] Create import script combining parsers + transformer

### Phase 5: Content Import & Styling
- [ ] Run import script to generate `content/index.plain.html` from source page
- [ ] Verify content renders correctly in local preview
- [ ] Apply design critique — compare migrated page against original for visual fidelity
- [ ] Iterate on CSS fixes until pixel-perfect match

### Phase 6: Validation & QA
- [ ] Run `npm run lint` — all JS/CSS passes
- [ ] Verify responsive behavior (mobile ↔ desktop at 900px breakpoint)
- [ ] Verify all links resolve correctly
- [ ] Verify images load with proper optimization (WebP + fallback)
- [ ] Check Lighthouse score (target: 100 performance)
- [ ] Verify all content present — no text, links, or images missing vs. original

---

## Execution Prompt

Copy and paste the following prompt to execute this migration:

---

```
Migrate the Linzess homepage from https://www.linzess.com/ to AEM Edge Delivery Services. This must be pixel-perfect with zero content missed.

## Source URL
https://www.linzess.com/

## Project Context
- This is an AEM EDS XWalk project at /workspace
- Existing blocks: hero, cards, columns, header, footer, fragment (all boilerplate)
- Brand tokens already in styles/styles.css (Bebas Neue headings, Lato body, purple #422e83 brand color, orange #faa633 accent)
- Current content/index.plain.html has placeholder content — it must be fully replaced with the real homepage
- Previous migration work exists in migration-work/ for the FAQs page — do NOT overwrite those artifacts

## Page Structure — 7 Sections (All Must Be Migrated)

### Section 1: Hero Banner
- Full-width background image with dark overlay gradient
- Eyebrow text: "Constipation with belly pain keep coming back?"
- H1: "Get Ahead of Your Returning IBS‑C Symptoms" (with line breaks)
- Subtitle: "Talk to your doctor about LINZESS."
- Orange CTA button: "See How LINZESS Can Help" → /why-linzess#howlinzesscanhelp
- Use existing `hero` block with variant `hero-home`

### Section 2: Promo Cards Row (3 cards)
- Card 1: "Are You Eligible to Save on LINZESS?" + "Learn More" CTA → /savings-and-support
- Card 2: "LINZESS is the #1 Prescribed IBS-C/CIC Branded Treatment" + paragraph + "How LINZESS Works" CTA → /why-linzess#howlinzessworks
- Card 3: "Talking to Your Doctor is Your First Step" + paragraph + "Prepare for Your Visit" CTA → /find-relief#talktoadoctor
- Cards have background images and white text overlay
- Desktop: 3-across; Mobile: stacked
- Use existing `cards` block with variant `cards-promo`

### Section 3: Gut Check Quiz CTA
- "Actor Portrayal" disclaimer text (small, top)
- Left side: background image area
- Right side: "Take the Gut Check Quiz" heading + description paragraph + "Check My Symptoms" CTA → /find-relief/gutcheck
- Use existing `columns` block with variant `columns-quiz`

### Section 4: Statistics & Community Section
- Intro heading: "Trying to figure out IBS-C or CIC? You're not alone."
- Intro paragraph with link to /savings-and-support
- 3 stat counters in a row:
  - "11.5 million" — people suffer from IBS-C*
  - "28.5 million" — people suffer from CIC*
  - "18 million" — people not satisfied with OTC treatments†
- Footnote disclaimers below (* and † references)
- Then: H2 "LINZESS Patient Experiences" + intro paragraph
- NEW block: `stats`

### Section 5: Patient Video Testimonials
- 3 Brightcove video cards in a row:
  - Dian's LINZESS Story (ID: 6391876000112) + "View Transcript" → /why-linzess/linzess-patient-experiences/dian-transcripts
  - Nan's LINZESS Story (ID: 6391877481112) + "View Transcript" → /why-linzess/linzess-patient-experiences/nan-transcripts
  - Julie's LINZESS Story (ID: 6391878649112) + "View Transcript" → /why-linzess/linzess-patient-experiences/julie-transcripts
- "See All Patient Videos" CTA → /why-linzess#patientexperiences
- Desktop: 3-across; Mobile: stacked
- NEW block: `video-cards`

### Section 6: Savings Offer
- Purple accent bar at top: "YOU COULD PAY AS LITTLE AS $30‡"
- Left: Product savings image ("90 days for $30")
- Right: "You Could Pay as Little as $30 for a 30-day or 90-day Prescription‡" heading
- Description paragraph about the LINZESS savings card
- "Sign Up Now" CTA → /savings-card
- "Already have a savings card? Activate now." secondary link → /savings-card
- Disclaimer paragraph (‡ terms and conditions with link to /savings-and-support#expand)
- Use existing `columns` block with variant `columns-savings`

### Section 7: ISI (Important Safety Information) — DEFAULT CONTENT ONLY
- NO sticky bar, NO collapse/expand behavior — just render as plain content
- H3 "USES" + paragraph about LINZESS indications (includes ® superscript, age restrictions)
- H3 "IMPORTANT RISK INFORMATION" + bullet list (children under 2 warning, bowel blockage warning)
- "Before you take LINZESS" paragraph + bullet list (pregnancy, breastfeeding)
- "Side Effects" bold label + paragraphs about diarrhea, common side effects, emergency warnings
- FDA reporting link: www.fda.gov/medwatch + phone 1-800-FDA-1088
- AbbVie patient support link
- Prescribing Information + Medication Guide links
- Reference number: US-LIN-250121
- ALL regulatory text must be preserved exactly — every word, superscript, bold, link

## Critical Requirements
1. PIXEL-PERFECT: Extract exact computed styles from the source page for every block. Match colors, fonts, spacing, borders, shadows, gradients, and responsive behavior.
2. ZERO CONTENT LOSS: Every heading, paragraph, link, image, superscript, disclaimer, and footnote from the original page must appear in the migrated version.
3. ALL IMAGES: Download every image from the source and import them. Hero background, card backgrounds, savings product image, decorative dividers — nothing skipped.
4. ALL LINKS: Every CTA button, inline link, and navigation link must have the correct href preserved.
5. RESPONSIVE: Desktop layout at ≥900px, mobile below. Match the original breakpoint behavior.
6. SUPERSCRIPTS & SPECIAL CHARS: Preserve ®, ‡, †, *, ‑ (non-breaking hyphens), ‍ (zero-width joiners) exactly as they appear.
7. Use the site migration skill to orchestrate the full workflow from analysis through content import and design matching.
```

---

## Risks & Open Questions

1. **Brightcove video IDs** — The source page embeds 3 Brightcove videos (IDs: 6391876000112, 6391877481112, 6391878649112). These may need a Brightcove account/player key to render in EDS.
2. **Animated stats** — The stat counters may have count-up animations on the original site. Need to decide if we replicate this or use static numbers.
3. **Cookie consent banner** — OneTrust integration is separate from the page migration and handled at the site config level.

---

> **To proceed with implementation, switch from Plan mode to Execute mode and paste the prompt from the "Execution Prompt" section above.**
