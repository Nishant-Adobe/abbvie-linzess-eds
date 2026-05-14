# Linzess Resources Page Migration Plan (`https://www.linzess.com/resources`)

## Overview

The Linzess Resources page is a content-rich informational page with multiple content categories (Healthy Routines, Wellness Tips, Community Resources), article card grids, wellness tip lists, a Brightcove video testimonial, a savings offer CTA, and the standard ISI regulatory section. It features anchor-based jump navigation, section headers with decorative dividers, and a mix of card-based and text-based content.

**Current state:** The project is an XWalk project with 6 base blocks (hero, cards, columns, header, footer, fragment). The homepage and sitemap have already been migrated.

---

## Page Sections Identified (9 Sections)

| # | Section | Content | Block(s) Needed | Status |
|---|---------|---------|-----------------|--------|
| 1 | **Hero Header** | Eyebrow "Resources" + decorative divider + H1 "Helpful Information To Help You Get Started" | `hero` (variant: `hero-resources`) | Needs new variant — eyebrow + heading on white bg, no background image |
| 2 | **Jump Navigation** | Dropdown/anchor nav: "Healthy Routines", "Wellness Tips", "Community Resources" | Default content | Anchor links as styled paragraphs |
| 3 | **Healthy Routines** | Section header (eyebrow + divider + heading + intro paragraph) + 3 article cards (title + description + "Read the article" CTA) | `cards` (variant: `cards-article`) | Needs new variant — text-only cards with CTA link |
| 4 | **Wellness Tips** | Section header + 3 wellness tip cards (icon + title + bullet list) + intro paragraph + 5 article cards + "Ready to Talk to Your Doctor?" CTA tout | `cards` (variant: `cards-tips`), `cards-article` (reuse), `columns` (variant: `columns-doctor-cta`) | Multiple patterns |
| 5 | **Community Resources** | Section header + 2 external resource cards (IBSPatient.org, PatientsLikeMe.com) with logos + "Learn More" CTAs | `cards` (variant: `cards-resource`) | Needs new variant — logo cards with external links |
| 6 | **Video Testimonial** | H2 "Hear REAL Patient STORIES" + 1 Brightcove video + transcript link + description + "More Videos Like This" CTA | `video-cards` (reuse from homepage, single row) | Reuse existing block |
| 7 | **Savings Offer** | Product image + savings heading + description + "Sign Up Now" CTA + "Activate now" link + disclaimer | `columns` (variant: `columns-savings`) | Recreate from homepage pattern |
| 8 | **Bottom Navigation CTAs** | 2 side-by-side CTA cards: "Check My Symptoms" + "Savings & Support" | `columns` (existing base block) | Already exists |
| 9 | **ISI** | USES + IMPORTANT RISK INFORMATION (regulatory text) | Default content | No block needed |

---

## Block Inventory & Development Needs

### New Blocks / Variants Needed (5)

1. **`hero-resources`** (variant of `hero`)
   - White/light background (no background image)
   - Eyebrow text "Resources" above decorative divider
   - H1 "Helpful Information To Help You Get Started"
   - Centered layout, purple heading text

2. **`cards-article`** (variant of `cards`)
   - Text-only cards in a 3-across grid
   - Each card: bold title + description paragraph + "Read the article" CTA link
   - Light background, rounded corners
   - Used in both Healthy Routines (3 cards) and Wellness Tips (5 cards) sections

3. **`cards-tips`** (variant of `cards`)
   - Icon-style cards in a 3-across grid
   - Each card: icon image + bold title + bullet list of tips
   - Used in Wellness Tips section (3 cards: Dietary Changes, Drink Water, Exercise)

4. **`cards-resource`** (variant of `cards`)
   - External resource cards with logo images
   - Each card: logo + title + description + "Learn More" CTA
   - Used in Community Resources section (2 cards)

5. **`columns-doctor-cta`** (variant of `columns`)
   - "Ready to Talk to Your Doctor?" tout: image left + heading + description + CTA right
   - 2-column layout with "Actor Portrayal" overlay on image

### Existing Blocks to Reuse (3)

6. **`columns`** (existing base block) — Bottom navigation CTAs
7. **`columns-savings`** — Savings offer (recreate from homepage pattern)
8. **`video-cards`** — Single video testimonial (reuse from homepage, 1 row)

---

## Block Count Summary

| Category | Count | Details |
|----------|-------|---------|
| New block variants to create | **5** | `hero-resources`, `cards-article`, `cards-tips`, `cards-resource`, `columns-doctor-cta` |
| Existing blocks to reuse | **3** | `columns`, `columns-savings`, `video-cards` |
| Default content sections | **3** | Jump nav, ISI, section headers |
| **Total blocks involved** | **8** | |

---

## Checklist

- [ ] **Step 1: Site Analysis** — Add resources URL to `page-templates.json` as a new "resources" template
- [ ] **Step 2: Page Analysis** — Run page analysis on `https://www.linzess.com/resources` to produce structured artifacts
- [ ] **Step 3: Block Mapping** — Map all block instances to DOM selectors in cleaned HTML
- [ ] **Step 4: Import Infrastructure** — Generate parsers for all variants, cleanup/sections transformers
- [ ] **Step 5: Import Script** — Generate `tools/importer/import-resources.js`
- [ ] **Step 6: Content Import** — Bundle and run import to generate `content/resources.plain.html`
- [ ] **Step 7: UE Component Registration** — Add all new block variants to `_block.json` files, run `npm run build:json`, update section filter
- [ ] **Step 8: Code Review** — Run code review for EDS best practices, lint, accessibility
- [ ] **Step 9: Verify** — Check preview rendering, all links correct, ISI complete, responsive behavior

---

## Execution Prompt

Copy and paste the following prompt to execute this migration:

---

```
Migrate the Linzess resources page from https://www.linzess.com/resources to AEM Edge Delivery Services. This must be pixel-perfect with zero content missed. Follow /code-review best practices throughout.

## Source URL
https://www.linzess.com/resources

## Project Context
- This is an AEM EDS XWalk project at /workspace
- Existing blocks: hero, cards, columns, header, footer, fragment
- Brand tokens already in styles/styles.css (Bebas Neue headings, Lato body, purple #422e83 brand color, orange #faa633 accent)
- Homepage migrated at content/index.plain.html, sitemap at content/sitemap.plain.html
- Project type: xwalk (from .migration/project.json)
- Do NOT overwrite existing migration artifacts for previously migrated pages

## Page Structure — 9 Sections (All Must Be Migrated)

### Section 1: Hero Header
- Eyebrow text: "Resources" (centered, purple)
- Decorative divider (purple line)
- H1: "Helpful Information To Help You Get Started" (centered, purple, uppercase, multi-line)
- White background — NO background image (unlike homepage hero)
- Use `hero` block with NEW variant `hero-resources`

### Section 2: Jump Navigation
- Dropdown-style anchor navigation with 3 options:
  - "Healthy Routines" → #healthyroutines
  - "Wellness Tips" → #wellnesstips
  - "Community Resources" → #communityresources
- Render as DEFAULT CONTENT (styled paragraph links or a simple list). Do NOT create a custom block for this.

### Section 3: Healthy Routines
- Section header: Eyebrow "Healthy Routines" + decorative divider + H2 "Make the Most of Your Treatment" + intro paragraph about IBS-C and CIC
- 3 article cards in a row using NEW variant `cards-article`:
  - Card 1: "OTC & Prescription Treatments" + description + "Read the article" CTA → /starting-linzess/healthy-routines/otc-and-prescription-treatments
  - Card 2: "Tackling IBS-C Triggers" + description + "Read the article" CTA → /starting-linzess/healthy-routines/tackling-ibs-c-triggers
  - Card 3: "Keeping in Touch with Your Doctor" + description + "Read the article" CTA → /starting-linzess/healthy-routines/keeping-in-touch-with-your-doctor
- Each card: text-only (no image), bold title + description paragraph + CTA link
- Section background: off-white with arc transition

### Section 4: Wellness Tips
- Section header: Eyebrow "Wellness Tips" + decorative divider + H2 "Wellness Tips to Help Manage Your Condition" + intro paragraph
- 3 wellness tip icon cards using NEW variant `cards-tips`:
  - Card 1: dietary icon + "Make Dietary Changes" + 3 bullet points about fiber, fatty foods, meal size
  - Card 2: water icon + "Drink More Water" + 2 bullet points about hydration
  - Card 3: exercise icon + "Increase Exercise and Reduce Stress" + 1 bullet point about relaxation
- Transition paragraph: "Check out some articles that may help you form healthy habits:"
- 5 article cards using `cards-article` (same variant as Section 3):
  - "Your Map to a Low FODMAP Diet" → /starting-linzess/wellness-tips/your-map-to-a-low-fodmap-diet
  - "Good for Your Gut—Flavorful Food Swaps" → /starting-linzess/wellness-tips/good-for-your-gut-flavorful-food-swaps
  - "Make a Game Plan for IBS-C" → /starting-linzess/wellness-tips/make-a-game-plan-for-ibs-c
  - "5 Holiday Low FODMAP Recipes" → /starting-linzess/wellness-tips/5-holiday-low-fodmap-recipes
  - "Is Your Pantry FODMAP-Friendly?" → /starting-linzess/wellness-tips/is-your-pantry-fodmap-friendly
- "Ready to Talk to Your Doctor?" CTA tout using NEW variant `columns-doctor-cta`:
  - Left: lifestyle image with "Actor Portrayal" overlay
  - Right: "Ready to Talk to Your Doctor?" heading + description + "Start My Discussion Guide" CTA → /find-relief/gutcheck
- Section background: white with arc transition

### Section 5: Community Resources
- Section header: Eyebrow "Community Resources" + decorative divider + H2 "Access Community Resources" + intro paragraph
- 2 external resource cards using NEW variant `cards-resource`:
  - Card 1: IBSPatient.org logo + "IBSPatient.org" title + description + "Learn More" CTA (external link)
  - Card 2: PatientsLikeMe.com logo + "PatientsLikeMe.com" title + description + "Learn More" CTA (external link)
- Section background: dark purple with arc transition

### Section 6: Video Testimonial
- H2: "Hear REAL Patient STORIES" (centered, white text on dark purple bg)
- Intro paragraph about real patient experiences
- 1 Brightcove video: "SEEKING THE RIGHT TREATMENT" (ID: 6391878936112)
  - Video poster image + player
  - H3 title: "SEEKING THE RIGHT TREATMENT"
  - "View Transcript" link → /why-linzess/linzess-patient-experiences/seeking-the-right-treatment-transcripts
- Description paragraph below video
- "More Videos Like This" CTA → /why-linzess#patientexperiences
- Use `video-cards` block (reuse from homepage, single row)
- Continuation of dark purple background

### Section 7: Savings Offer
- Product savings image ("90 days for $30")
- Heading: "You Could Pay as Little as $30 for a 30-day or 90-day Prescription*"
- Description paragraph about LINZESS savings card
- "Sign Up Now" primary CTA → /savings-card
- "Already have a savings card? Activate now." secondary link → /savings-card
- Disclaimer paragraph (*terms and conditions with link to /savings-and-support#expand)
- Use `columns-savings` variant (recreate from homepage pattern)
- Section background: white with arc transition from purple

### Section 8: Bottom Navigation CTAs
- 2 side-by-side CTA cards on dark purple background:
  - "Check My Symptoms" + "Learn More" → /find-relief/gutcheck
  - "Savings & Support" + "Learn More" → /savings-and-support
- Use existing `columns` base block
- Section background: dark purple with arc transition

### Section 9: ISI (Important Safety Information) — DEFAULT CONTENT ONLY
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
2. ZERO CONTENT LOSS: Every heading, paragraph, link, image, superscript, disclaimer, footnote, and bullet point from the original page must appear in the migrated version.
3. ALL IMAGES: Download every image from the source and import them. Icon images for tip cards, logos for resource cards, lifestyle images, savings product image — nothing skipped.
4. ALL LINKS: Every CTA button, inline link, article link, and navigation link must have the correct href preserved.
5. RESPONSIVE: Desktop layout at ≥900px, mobile below. Match the original breakpoint behavior.
6. SUPERSCRIPTS & SPECIAL CHARS: Preserve ®, *, ‑ (non-breaking hyphens), ‍ (zero-width joiners) exactly as they appear.
7. SECTION STYLING: Alternating white/off-white/dark-purple backgrounds with arc transitions must be captured in section-metadata blocks.
8. UE REGISTRATION: After block development, register all new variants in _block.json files and run npm run build:json. Add to section filter.
9. CODE REVIEW: After migration, validate EDS best practices — all JS passes ESLint, all CSS passes Stylelint (no-descending-specificity), no unused variables, accessible markup, proper heading hierarchy, no render-blocking patterns.
10. Use the site migration skill to orchestrate the full workflow from analysis through content import and UE registration.
```

---

## Estimated Effort

| Phase | Complexity | Notes |
|-------|-----------|-------|
| Analysis & Infrastructure | **Medium** | Multiple content patterns to analyze |
| Block Development | **Medium** | 5 new variants, mostly card-based patterns |
| Import & Content | **Medium** | Multiple block types, video integration |
| UE Registration | **Low** | Same pattern as homepage blocks |
| Code Review & Verification | **Medium** | More blocks to validate |
| **Overall** | **Medium** | More complex than sitemap, comparable to homepage |

---

## Risks & Open Questions

1. **Jump Navigation** — The original page uses a dropdown-style anchor nav. Rendered as default content with styled anchor links for simplicity.
2. **Video approach** — Reusing `video-cards` from homepage with 1 row. If the block code was lost between sessions, it needs to be recreated.
3. **Savings tout reuse** — The savings offer pattern is identical to the homepage `columns-savings`. Needs to be recreated since block files were lost.
4. **Doctor CTA tout** — The "Ready to Talk to Your Doctor?" pattern is similar to `columns-quiz` from the homepage. Creating as `columns-doctor-cta` since the content/layout differs slightly (different image, different CTA text).
5. **External resource links** — IBSPatient.org and PatientsLikeMe.com cards have "Learn More" CTAs that originally open leaving-site modals. In EDS, these render as standard external links.
6. **Section styling** — Multiple sections have alternating white/off-white/dark-purple backgrounds with arc transitions. Section-metadata styles needed: `off-white-arc`, `white-arc`, `dark-purple-arc`, `dark-purple`.

---

> **To proceed with implementation, switch from Plan mode to Execute mode and paste the prompt from the "Execution Prompt" section above.**
