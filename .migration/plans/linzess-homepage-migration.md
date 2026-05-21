# Fix Video Cards md2jcr Error

## Problem

The `index.plain.html` upload fails with: **"Video Cards has errors! Cannot read properties of undefined (reading 'fields')"**

This is the same issue fixed previously — the video-cards content HTML has field hints (`field:title`, `field:description`, `field:link`) that don't match the model's 2-field structure (`image` + `text`). The content was fixed before but likely reverted or the file was regenerated.

---

## Root Cause

The `_video-cards.json` model defines 2 fields per item:
- `image` (reference)
- `text` (richtext)

But the content HTML has 4 columns per row with hints for non-existent fields (`field:title`, `field:description`, `field:link`). md2jcr can't find these fields in the model, causing the "Cannot read properties of undefined" error.

---

## Fix Required

The video-cards rows in `content/index.plain.html` need to be **2 columns** (matching the model), not 4:
- Column 1: `<!-- field:image -->` + poster image
- Column 2: `<!-- field:text -->` + title + description + transcript link (all in one richtext cell)

---

## Checklist

- [ ] Check current state of video-cards in `content/index.plain.html` — verify if it has 4 columns or 2
- [ ] If 4 columns: merge columns 2-4 into a single `<!-- field:text -->` cell (same fix as before)
- [ ] Verify the `_video-cards.json` model only has `image` + `text` fields
- [ ] Test upload again after fix

---

> **To proceed with the fix, switch to Execute mode.** This is a 1-minute fix — merge the extra columns back into a single text cell matching the 2-field model.
