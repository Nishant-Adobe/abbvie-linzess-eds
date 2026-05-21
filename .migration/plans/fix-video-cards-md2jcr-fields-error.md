# Fix Video Cards md2jcr Error in index.plain.html

## Problem

`content/index.plain.html` video-cards block has **4 columns per row** (image | title | description | link) but the `_video-cards.json` model only defines **2 fields** (`image` + `text`). md2jcr tries to look up fields by column index and fails with "Cannot read properties of undefined (reading 'fields')".

## Current State (Broken — 4 columns per row)

```html
<div class="video-cards">
  <div>
    <div><picture><img ...></picture></div>          <!-- col 1: image -->
    <div>DIAN'S LINZESS STORY</div>                  <!-- col 2: title (no matching field!) -->
    <div>"You're not alone..."</div>                 <!-- col 3: description (no matching field!) -->
    <div><a href="...">transcript link</a></div>     <!-- col 4: link (no matching field!) -->
  </div>
</div>
```

## Required Fix (2 columns per row)

```html
<div class="video-cards">
  <div>
    <div><!-- field:image --><picture><img ...></picture></div>
    <div><!-- field:text --><h3>DIAN'S LINZESS STORY</h3><p>"You're not alone..."</p><p><a href="...">View Transcript</a></p></div>
  </div>
</div>
```

## Checklist

- [ ] Fix `content/index.plain.html`: merge video-cards columns 2-4 into single richtext cell with `<!-- field:text -->` hint
- [ ] Add `<!-- field:image -->` hint to column 1
- [ ] Verify each row has exactly 2 `<div>` children
- [ ] Test upload again

---

> **To proceed with the fix, switch to Execute mode.**
