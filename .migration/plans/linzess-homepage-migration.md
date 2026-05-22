# Hero Home Block Critique

## Overview

The `hero-home` block is used on the homepage (`content/index.plain.html`) to render the main hero banner at `https://www.linzess.com/`. This critique examines the block's current state, identifies issues, and proposes fixes.

---

## Current State: Block Does Not Exist

The `blocks/hero-home/` directory **does not exist on disk**. It has been lost across multiple session transitions. Despite this, the content file `content/index.plain.html` references it via `class="hero-home"`, and the UE component configs do not have it registered.

**Evidence:**
- `blocks/hero-home/` — directory missing
- `component-definition.json` — no `hero-home` entry
- `component-models.json` — no `hero-home` model
- `component-filters.json` — `hero-home` not in section filter
- `models/_section.json` — reverted to only 8 base components, missing `hero-home`

---

## Content Structure (from `index.plain.html`)

```html
<div class="hero-home">
  <div><div><!-- field:image -->
    <p><picture><img src="./media_xxx.jpg" alt=""></picture></p>
  </div></div>
  <div><div><!-- field:text -->
    <p>Constipation with belly pain<br> keep coming back?</p>
    <h1>Get Ahead of<br>Your<br>Returning<br>IBS‑C Symptoms</h1>
    <p>Talk to your doctor about LINZESS.</p>
    <p><a href="/why-linzess#howlinzesscanhelp" title="See How LINZESS Can Help">See How LINZESS Can Help</a></p>
  </div></div>
</div>
```

**Structure:** 2 rows — Row 1: background image, Row 2: text content (eyebrow + H1 + subtitle + CTA). Field hints `field:image` and `field:text` are correct for the xwalk hero model.

---

## Issues Found (7)

### Issue 1: Block Directory Missing (CRITICAL — Blocks Rendering)
- **Impact:** Block renders as unstyled `<div>` — no JS decoration, no CSS
- **Fix:** Recreate `blocks/hero-home/hero-home.js`, `hero-home.css`, `_hero-home.json`

### Issue 2: UE Component Not Registered (CRITICAL — Authoring)
- **Impact:** md2jcr fails: "The component 'Hero Home' does not exist"
- **Fix:** Create `_hero-home.json`, add to section filter, run `npm run build:json`

### Issue 3: Image Paths Are Local Media Hashes (CRITICAL — XMod)
- **Impact:** XMod resolves `./media_xxx.jpg` as `https://www.linzess.com/media_xxx.jpg` → 404
- **Fix:** Replace with original DAM URL: `https://www.linzess.com/content/dam/linzess/images/homepage-hero-desktop.jpg`

### Issue 4: Section Styles Not Registered (HIGH — Authoring)
- **Impact:** Section-metadata values `white-arc`, `dark-purple-arc`, `dark-purple`, `off-white-arc` not available in UE
- **Current:** `models/_section.json` only has `highlight`
- **Fix:** Add all 4 styles to the section model's multiselect options

### Issue 5: Base `styles.css` Uses Boilerplate Tokens (MEDIUM — Design)
- **Impact:** `--body-font-family: roboto`, `--link-color: #3b63fb` — doesn't match Linzess brand
- **Original brand:** Bebas Neue headings, Lato body, purple `#422e83`, orange accent `#faa633`
- **Note:** Brand tokens were set in a prior session but `styles.css` has been reverted to boilerplate

### Issue 6: Hero CSS Needs Pixel-Perfect Extraction (MEDIUM — Design)
- **Gap:** The base `hero.css` is generic boilerplate (300px min-height, basic padding)
- **Original design requires:**
  - Min-height: ~560px desktop / ~480px mobile
  - Dark overlay gradient on background image
  - Arc-shaped bottom edge (CSS clip-path)
  - Eyebrow: Lato, white, ~18px, regular weight
  - H1: Bebas Neue, white, uppercase, ~3.5rem desktop, line-height 1
  - CTA: orange `#faa633` bg, white text, 24px border-radius, 700 weight
  - Content positioned left ~5%

### Issue 7: Block Persistence Problem (META)
- **Pattern:** This block has been created at least 3 times across sessions and keeps getting lost
- **Root cause:** Block files are created in working memory but not committed to git
- **Recommendation:** Commit block files to git after creation to prevent loss

---

## Original vs. Expected Comparison

| Property | Original (linzess.com) | Current (EDS) |
|----------|----------------------|---------------|
| Background image | Full-bleed, dark kitchen photo | ✅ Correct in content HTML |
| Eyebrow text | "Constipation with belly pain keep coming back?" white, Lato | ❌ No CSS — renders unstyled |
| H1 heading | Bebas Neue, white, uppercase, ~56px | ❌ No CSS — renders in body font |
| Subtitle | "Talk to your doctor about LINZESS." white, Lato | ❌ No CSS — renders unstyled |
| CTA button | Orange pill button, white text, arrow icon | ❌ No CSS — renders as plain link |
| Min-height | ~560px desktop | ❌ No CSS — collapses to content height |
| Bottom arc | Curved edge transition to next section | ❌ Not implemented |
| Responsive | Stacked on mobile, left-aligned on desktop | ❌ No CSS — no responsive behavior |

---

## Checklist — Fixes Required

- [ ] **1. Create `blocks/hero-home/` directory** — `hero-home.js`, `hero-home.css`, `_hero-home.json`
- [ ] **2. `hero-home.js`** — Extract background image from row 1, position absolutely. Add `.hero-home-bg` and `.hero-home-content` classes to row 2 content.
- [ ] **3. `hero-home.css`** — Pixel-perfect CSS from original page: full-bleed bg image, eyebrow styling, H1 in Bebas Neue, orange CTA button, min-height, arc bottom edge, responsive breakpoint at 900px
- [ ] **4. `_hero-home.json`** — UE model: `image` (reference), `imageAlt` (text/collapsed), `text` (richtext)
- [ ] **5. Update `models/_section.json`** — Add `hero-home` to section filter, add section styles (`white-arc`, `dark-purple-arc`, `dark-purple`, `off-white-arc`)
- [ ] **6. Run `npm run build:json`** — Regenerate all 3 UE config files
- [ ] **7. Fix `content/index.plain.html` images** — Replace `./media_xxx` with original `https://www.linzess.com/content/dam/...` URLs (same approach as resources page fix)
- [ ] **8. Run block critique skill** — Extract exact computed styles from the live page and compare against the CSS
- [ ] **9. Commit to git** — Prevent block files from being lost again

---

## Recommendation

Use the **block critique skill** in Execute mode to:
1. Recreate the block with proper JS/CSS/JSON
2. Extract exact computed styles from the live `https://www.linzess.com/` hero section
3. Generate pixel-perfect CSS
4. Register in UE configs
5. Fix image paths
6. Iterate until visual match is confirmed

> **To proceed with fixes, switch from Plan mode to Execute mode.**
