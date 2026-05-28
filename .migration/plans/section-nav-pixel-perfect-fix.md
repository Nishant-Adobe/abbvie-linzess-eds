# Cards Promo Block — Pixel-Perfect Fix Plan

## Context

Comparing the `cards-promo` block between the source site (https://www.linzess.com/savings-and-support) and the migrated EDS block at `blocks/cards-promo/`. The source uses `.abbv-flex-container-v2.savings-card-cards` with `.flexboxitem-v2` children containing `.abbv-flex-item-v2.icon-image-card` cards.

## Source Design (from HTML + CSS analysis)

| Property | Source Value | CSS Reference |
|----------|-------------|---------------|
| Container layout | `display: flex`, column on mobile | `.abbv-flex-container-v2` + `.flexbox-column-mobile` |
| Container gap | `80px` on mobile (from `.flexbox-cards:has(.col-2-card)`) | `linzess-global.css` |
| Container gap (desktop) | `16px` | `linzess-global.css` |
| Card padding | `0 24px 40px` (`.col-2-card`) | `linzess-global.css` |
| Card background (1,3) | `#d9d7f9` | `.background-light-purple` |
| Card background (2) | `#422e83` | `.background-dark-purple` |
| Card border-radius | `16px` | `.rounded-corners` |
| Card text-align | `center` | `.text-align-center` |
| Icon images | SVG icons floating above cards with `margin-top: -50px` | `.icon-image-card img` |
| Icon width | `105px` (desktop), `96px` (mobile) | `.icon-image-card img` |
| Heading font | 18px mobile / 24px desktop, weight 700, Lato | `.heading-2` |
| CTA button | Purple bg, white text, `border-radius: 16px`, `padding: 16px 56px 16px 32px`, arrow icon `::after` | `.abbv-button-primary` |
| CTA button (card 2) | White bg, purple text | `.abbv-button-secondary` |
| Desktop layout | 3 columns, flexbox row | `@media(min-width:986px)` |

## Identified Gaps (All to be fixed)

| # | Issue | Severity | Fix Type |
|---|-------|----------|----------|
| 1 | Missing icon SVG images above cards | Critical | Content HTML + CSS |
| 2 | Missing CTA arrow icon (`::after`) | High | CSS |
| 3 | Container gap: `24px` vs `80px` mobile / `16px` desktop | High | CSS |
| 4 | Card padding: uniform `24px` vs `0 24px 40px` | High | CSS |
| 5 | CTA button padding: `12px 28px` vs `16px 56px 16px 32px` | High | CSS |
| 6 | Heading font-size stays 18px vs bumps to 24px on desktop | Medium | CSS |
| 7 | First `.cards-promo-body` (icon area) has unnecessary text padding | Medium | CSS |

## Execution Prompt

Use this single prompt to fix all gaps at once:

---

**Prompt for execution:**

> Fix the `cards-promo` block to pixel-match the source site https://www.linzess.com/savings-and-support. Make these specific changes:
>
> **1. CSS changes in `blocks/cards-promo/cards-promo.css`:**
> - Change container gap from `24px` to `80px` on mobile (column) and `16px` on desktop (row)
> - Change card `<li>` padding to `0 24px 40px` (no top padding — icon floats above)
> - First `.cards-promo-body` (icon container): set `padding: 0; min-height: 55px`
> - Add icon image styles: `.cards-promo .cards-promo-body:first-child img { width: 105px; margin-top: -50px }` and `96px` on mobile
> - Add CTA arrow icon via `::after` pseudo-element (content: "›" or chevron character, positioned absolute right)
> - Update CTA button padding to `16px 56px 16px 32px` desktop, `16px 40px 16px 24px` mobile
> - Bump heading (`p:first-child` in second body) to `24px` on desktop
>
> **2. Content HTML change in `content/savings-and-support.plain.html`:**
> - Add icon image references to the empty `<!-- field:image -->` placeholders in each cards-promo card:
>   - Card 1 (Text): `https://www.linzess.com/content/dam/linzess/images/icon-text-msg.svg`
>   - Card 2 (Call): `https://www.linzess.com/content/dam/linzess/images/icon-daily-reminders.svg`
>   - Card 3 (Click): `https://www.linzess.com/content/dam/linzess/images/icon-web-click.svg`
>
> **Constraints:**
> - Do NOT modify any other block's CSS
> - Do NOT change the HTML structure of the block — only add `<img>` src inside existing `<p>` tags
> - Verify the page still renders all other blocks correctly after changes
> - Run CSS lint to ensure no errors
> - The resources page (`/resources`) does NOT use cards-promo — no regression risk there

---

## Non-Breaking Verification

- All changes scoped to `.cards-promo` selector in `blocks/cards-promo/cards-promo.css`
- Content change is limited to adding `src` attributes to existing empty image placeholders
- No global styles affected
- No other blocks on the page share these selectors
- Resources page does NOT use `cards-promo`

## Checklist

- [ ] Update container gap: `80px` mobile, `16px` desktop
- [ ] Update card `<li>` padding: `0 24px 40px`
- [ ] Update first `.cards-promo-body` padding to `0`, add `min-height: 55px`
- [ ] Add icon image CSS: `width: 105px`, `margin-top: -50px` (96px on mobile)
- [ ] Add CTA arrow `::after` pseudo-element (positioned right, chevron character)
- [ ] Update CTA padding: `16px 56px 16px 32px` desktop, `16px 40px 16px 24px` mobile
- [ ] Bump heading to `24px` on desktop
- [ ] Add icon SVG image URLs to content HTML (3 cards)
- [ ] Verify preview — cards render with icons floating above, arrow on CTAs, proper spacing
- [ ] Verify no regression on rest of savings-and-support page
- [ ] Run CSS lint — no errors

## Execution Note

This plan requires **Execute mode** to modify:
1. `blocks/cards-promo/cards-promo.css` (CSS fixes)
2. `content/savings-and-support.plain.html` (add icon image references)

All changes are isolated to the cards-promo block and will not break any other functionality.
