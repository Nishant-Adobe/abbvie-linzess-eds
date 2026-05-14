# Linzess Sitemap Page Migration Plan (`https://www.linzess.com/sitemap`)

## Overview

The Linzess sitemap page is a simple, text-only navigation page with categorized link lists and the standard ISI (Important Safety Information) regulatory section. Unlike the homepage, this page requires **zero custom blocks** — it is composed entirely of default content (headings, paragraphs, and links).

**Current state:** The project is an XWalk project with 6 base blocks (hero, cards, columns, header, footer, fragment). The homepage has already been migrated. The sitemap page adds a new template type but no new block development.

---

## Page Sections Identified (3 Sections)

| # | Section | Content | Block(s) Needed | Status |
|---|---------|---------|-----------------|--------|
| 1 | **Sitemap Header** | Decorative divider + H1 "Sitemap" | Default content | No block needed |
| 2 | **Sitemap Link Columns** | 6 link groups organized in 2 rows of 3 columns: "Why LINZESS", "Understanding Constipation", "Find Relief", "Resources", "Savings & Support", and misc links (Check My Symptoms, FAQs, Sign Up) | `columns` (existing base block) | Already exists |
| 3 | **ISI (Important Safety Information)** | H3 "USES" + paragraph, H3 "IMPORTANT RISK INFORMATION" + bullet lists + paragraphs + links | Default content | No block needed |

---

## Block Inventory & Development Needs

### Blocks Required: 0 New, 1 Existing

This page needs **no new blocks and no new variants**. The entire page can be built with:

- **Default content** — H1 heading, paragraphs, links (Sections 1 and 3)
- **`columns` (existing)** — The 6 link groups are arranged in a 2-row, 3-column grid layout. The existing base `columns` block already handles this.

### Why No New Blocks?

| Content Pattern | Decision | Reason |
|----------------|----------|--------|
| H1 "Sitemap" heading | Default content | Author types a heading normally |
| Link groups with H2 headings | `columns` block | Side-by-side layout of link lists — standard columns pattern |
| ISI regulatory text | Default content | Headings + paragraphs + lists — author types normally |

---

## Detailed Content Mapping

### Section 1: Sitemap Header
- Decorative divider (optional — can be a styled `<hr>` or omitted)
- **H1:** "Sitemap"
- No section styling needed (white/default background)

### Section 2: Sitemap Link Columns
Two rows of 3 columns each, using the existing `columns` block:

**Row 1 (Columns block):**
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| **H2:** Why LINZESS | **H2:** Understanding Constipation | **H2:** Find Relief |
| How LINZESS Can Help | Types of Constipation | Talk to a Doctor |
| How LINZESS Works | IBS-C & CIC | How to Take LINZESS |
| Side Effects of LINZESS | Constipation Treatment Options | |
| LINZESS Patient Experiences | Pediatric Functional Constipation | |

**Row 2 (Columns block):**
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| **H2:** Resources | **H2:** Savings & Support | Check My Symptoms |
| Healthy Routines | Savings | FAQs |
| Wellness Tips | Financial Support | Sign Up for Updates |
| Community Resources | | |

All links preserved with correct hrefs (anchor links to page sections).

### Section 3: ISI (Default Content Only)
- Same ISI structure as homepage — USES + IMPORTANT RISK INFORMATION
- All regulatory text, superscripts (®), bold warnings, links (FDA, Prescribing Info, Medication Guide) preserved exactly
- Reference: US-LIN-250121

---

## Block Count Summary

| Category | Count | Details |
|----------|-------|---------|
| New blocks to create | **0** | None needed |
| New block variants | **0** | None needed |
| Existing blocks used | **1** | `columns` (base block) |
| Default content sections | **2** | Header + ISI |
| **Total blocks involved** | **1** | |

---

## Checklist

- [ ] **Step 1: Site Analysis** — Add sitemap URL to `page-templates.json` as a new "sitemap" template
- [ ] **Step 2: Page Analysis** — Run page analysis on `https://www.linzess.com/sitemap` to produce structured artifacts (metadata, cleaned HTML, screenshots, page structure, authoring analysis)
- [ ] **Step 3: Block Mapping** — Map the single `columns` block instance to DOM selectors in cleaned HTML; define 2 sections (sitemap content + ISI) with no section styling
- [ ] **Step 4: Import Infrastructure** — Generate a columns parser (if not reusable from base), cleanup transformer, and sections transformer for the sitemap template
- [ ] **Step 5: Import Script** — Generate `tools/importer/import-sitemap.js` combining the parser and transformers
- [ ] **Step 6: Content Import** — Bundle and run the import script to generate `content/sitemap.plain.html`
- [ ] **Step 7: Code Review** — Run code review skill to validate EDS best practices, performance, accessibility, and code quality
- [ ] **Step 8: Verify** — Check the content renders in preview, all links correct, ISI text complete, columns layout working

---

## Execution Prompt

Copy and paste the following prompt to execute this migration:

---

```
Migrate the Linzess sitemap page from https://www.linzess.com/sitemap to AEM Edge Delivery Services. This must be pixel-perfect with zero content missed. Follow /code-review best practices throughout.

## Source URL
https://www.linzess.com/sitemap

## Project Context
- This is an AEM EDS XWalk project at /workspace
- Existing blocks: hero, cards, columns, header, footer, fragment
- Brand tokens already in styles/styles.css (Bebas Neue headings, Lato body, purple #422e83 brand color)
- Homepage already migrated at content/index.plain.html
- Project type: xwalk (from .migration/project.json)
- Do NOT overwrite existing migration artifacts for the homepage

## Page Structure — 3 Sections (All Must Be Migrated)

### Section 1: Sitemap Header
- Decorative divider (small purple line above heading)
- H1: "Sitemap"
- No section styling (white/default background)
- This is DEFAULT CONTENT — no block needed

### Section 2: Sitemap Link Columns (2 Columns blocks)
Two instances of the existing `columns` block, each with 3 columns:

**Columns Block 1 (Row 1):**
- Column 1: H2 "Why LINZESS" + links: "How LINZESS Can Help" → /why-linzess#howlinzesscanhelp, "How LINZESS Works" → /why-linzess#howlinzessworks, "Side Effects of LINZESS" → /why-linzess#sideeffects, "LINZESS Patient Experiences" → /why-linzess#patientexperiences
- Column 2: H2 "Understanding Constipation" + links: "Types of Constipation" → /understanding-constipation#typesofconstipation, "IBS-C & CIC" → /understanding-constipation#ibsccic, "Constipation Treatment Options" → /understanding-constipation#treatmentoptions, "Pediatric Functional Constipation" → /understanding-constipation#pediatric
- Column 3: H2 "Find Relief" + links: "Talk to a Doctor" → /find-relief#talktoadoctor, "How to Take LINZESS" → /find-relief#howtotake

**Columns Block 2 (Row 2):**
- Column 1: H2 "Resources" + links: "Healthy Routines" → /resources#healthyroutines, "Wellness Tips" → /resources#wellnesstips, "Community Resources" → /resources#communityresources
- Column 2: H2 "Savings & Support" + links: "Savings" → /savings-and-support#savings, "Financial Support" → /savings-and-support#financialsupport
- Column 3: Links only (no H2): "Check My Symptoms" → /find-relief/gutcheck, "FAQs" → /savings-and-support/faqs, "Sign Up for Updates" → /savings-and-support/from-the-gut

Use the EXISTING `columns` block — do NOT create a new variant. Columns blocks do NOT require field hint comments (per xwalk hinting Rule 4 exception).

### Section 3: ISI (Important Safety Information) — DEFAULT CONTENT ONLY
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
1. PIXEL-PERFECT: Extract exact computed styles from the source page. Match colors, fonts, spacing, and responsive behavior.
2. ZERO CONTENT LOSS: Every heading, paragraph, link, and superscript from the original must appear in the migrated version.
3. ALL LINKS: Every link must have the correct href preserved — these are all internal anchor links.
4. SUPERSCRIPTS & SPECIAL CHARS: Preserve ® exactly as it appears in ISI.
5. NO NEW BLOCKS: This page uses only the existing `columns` block + default content. Do NOT create new block variants.
6. CODE REVIEW: After migration, run /code-review to validate EDS best practices, performance, accessibility, and code quality. Fix any issues found.
7. Use the site migration skill to orchestrate the full workflow from analysis through content import.

## Code Quality Standards (from /code-review)
- All JS must pass ESLint with no errors
- All CSS must pass Stylelint with no errors (watch for no-descending-specificity)
- No unused variables or imports
- Proper EDS patterns: no direct DOM manipulation outside decorate(), use aem.js helpers
- Accessible markup: semantic HTML, proper heading hierarchy
- Performance: no render-blocking patterns, lazy load where appropriate
```

---

## Estimated Effort

| Phase | Complexity | Notes |
|-------|-----------|-------|
| Analysis & Infrastructure | **Very Low** | Simple page, mostly default content |
| Block Development | **None** | No new blocks needed |
| Import & Content | **Low** | Single page, straightforward content |
| Code Review | **Low** | No new code to review, just content validation |
| Verification | **Low** | Check links and ISI text |
| **Overall** | **Very Low** | Simplest page type — ~15 min estimated |

---

## Risks & Open Questions

1. **Column layout choice** — The sitemap link groups could alternatively be rendered as pure default content (6 separate paragraphs with headings) without using the `columns` block. The `columns` block gives the 3-across desktop layout that matches the original. If a simpler authoring experience is preferred, default content with CSS grid on the section would also work.
2. **Decorative divider** — The original page has a small decorative divider above the H1. This can be handled as a styled `<hr>` in default content or omitted for simplicity.
3. **No section styling** — The sitemap page has no colored backgrounds or arc transitions, so no section-metadata blocks are needed.

---

> **To proceed with implementation, switch from Plan mode to Execute mode and paste the prompt from the "Execution Prompt" section above.**
