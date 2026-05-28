# Section Navigation Refinement Plan

## Context

The `.hero-resources-container > .default-content-wrapper` element renders as a sticky section navigation bar below the hero. It currently has basic styling that matches ~80% of the source. This plan documents the gaps and the CSS changes needed to achieve exact parity with the source site's `div.section-navigation.parbase` component.

## Current State (Migrated)

| Property | Current Value |
|----------|--------------|
| Background | `rgb(66, 46, 131)` (purple) ✅ |
| Position | `sticky`, `top: 0`, `z-index: 10` ✅ |
| Padding | `12px 24px` |
| Height | `48px` (24px content + 24px padding) |
| `<p>` label | `display: none` ✅ |
| `<ul>` layout | `flex`, `justify-content: center`, `gap: 32px`, no bullets ✅ |
| Link color | White (`rgb(255, 255, 255)`) ✅ |
| Link font | 14px, weight 800 ✅ |
| Link hover | `text-decoration: underline` ✅ |
| Max-width | `1220px` (inherits from wrapper) |
| Full-bleed | No — constrained by `max-width` |

## Source State (Original)

| Property | Source Value |
|----------|-------------|
| Background | `rgb(66, 46, 131)` (purple) ✅ |
| Position | Sticky (via JS class `abbv-sticky` / `abbv-fixed`) |
| Height | `50px` fixed |
| z-index | `100` |
| Container | `max-width: 1220px`, flex, centered |
| List items | `display: inline-block`, `height: 50px`, `padding: 0 25px 0 0` |
| Links | 14px, weight 800, Lato, purple color (`rgb(66, 46, 131)`) — rendered on white pill/tab backgrounds |
| Active link | Has `subnav-active` class with bottom border indicator |
| Mobile | Has dropdown menu (`.mobile-section-navigation`) with prev/next buttons |
| Nav width | Full viewport width (edge-to-edge purple bar) |

## Gap Analysis

| Issue | Priority | Fix Location |
|-------|----------|-------------|
| **Height**: 48px vs 50px | Low | CSS padding adjustment |
| **z-index**: 10 vs 100 | Medium | CSS z-index increase |
| **Max-width constraint**: Bar doesn't span full width because wrapper has `max-width: 1220px` | High | Need to override `max-width` on this wrapper |
| **Link line-height/alignment**: Links not vertically centered in 50px bar | Medium | CSS line-height/flexbox alignment |
| **Active state**: No visual indicator for active section link | Low | CSS `::after` pseudo-element or border-bottom |
| **Link spacing**: `gap: 32px` vs source's `padding: 0 25px 0 0` per item | Low | Minor gap difference — acceptable |
| **No mobile dropdown**: Source has mobile-specific dropdown UI | Low | Acceptable simplification for EDS |

## Proposed Changes

### File: `blocks/hero-resources/hero-resources.css`

Changes to the jump navigation section (lines 61-91):

1. **Add `max-width: unset`** to the wrapper to make it full-bleed
2. **Increase z-index** from 10 to 100
3. **Set fixed height** to 50px with proper vertical centering
4. **Add `align-items: center`** to the flex ul for vertical centering
5. **Add link vertical alignment** via `line-height: 50px` on list items

### Specific CSS Updates

```css
/* Jump navigation bar below hero */
.hero-resources-container > .default-content-wrapper {
  background-color: var(--color-brand-purple);
  padding: 0 24px;              /* Changed: remove vertical padding, use height instead */
  position: sticky;
  top: 0;
  z-index: 100;                 /* Changed: match source z-index */
  max-width: unset;             /* Added: full-bleed, override wrapper max-width */
}

.hero-resources-container > .default-content-wrapper > p {
  display: none;
}

.hero-resources-container > .default-content-wrapper ul {
  display: flex;
  justify-content: center;
  align-items: center;          /* Added: vertical centering */
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 50px;                 /* Added: fixed height matching source */
}

.hero-resources-container > .default-content-wrapper ul a {
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  line-height: 50px;            /* Added: vertically center text in 50px bar */
}

.hero-resources-container > .default-content-wrapper ul a:hover {
  text-decoration: underline;
}
```

## Non-Breaking Verification

- These changes are scoped exclusively to `.hero-resources-container > .default-content-wrapper`
- No global styles affected
- No other blocks share this selector path
- The resources page (`/resources`) also uses `hero-resources-container` — verify it still works after changes
- The `max-width: unset` override only applies to this specific child element, not the block wrapper

## Checklist

- [ ] Extract exact computed styles from source section-navigation
- [ ] Update `.hero-resources-container > .default-content-wrapper` — remove padding, set height 50px
- [ ] Update `ul` — add `align-items: center` and `height: 50px`
- [ ] Update wrapper — add `max-width: unset` for full-bleed
- [ ] Update z-index from 10 to 100
- [ ] Add `line-height: 50px` to links for vertical centering
- [ ] Verify preview renders correctly on savings-and-support page
- [ ] Verify resources page nav still renders correctly (no regression)
- [ ] Run CSS lint (`npm run lint:css`) — no errors

## Execution Note

This plan requires Execute mode to modify `blocks/hero-resources/hero-resources.css`. The changes are isolated to the jump navigation section (lines 61-91) and will not affect any other elements on the page.
