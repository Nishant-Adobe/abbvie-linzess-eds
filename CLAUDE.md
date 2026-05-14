# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Adobe AEM Edge Delivery Services (EDS)** project built on the AEM Boilerplate with XWalk Components for the AbbVie Linzess brand. Content is authored in AEM and published via Edge Delivery Services.

- **Preview:** `main--abbvie-linzess-eds--{owner}.aem.page/`
- **Live:** `main--abbvie-linzess-eds--{owner}.aem.live/`

## Commands

```bash
# Install dependencies
npm i

# Lint (JS + CSS)
npm run lint

# Lint JavaScript only
npm run lint:js

# Lint CSS only
npm run lint:css

# Auto-fix lint issues
npm run lint:fix

# Rebuild aggregated component model JSONs (runs automatically via pre-commit hook when _*.json files change)
npm run build:json

# Local development (requires AEM CLI installed separately)
aem up
```

## Architecture

### Loading Pipeline

Page load is orchestrated in `scripts/scripts.js` through four phases:

1. **Eager** (`loadEager`) — LCP-critical content: first section, header, footer
2. **Lazy** (`loadLazy`) — remaining sections after LCP
3. **Delayed** (`loadDelayed`) — non-critical enhancements, 3 seconds after load

Core AEM utilities live in `scripts/aem.js` (do not edit lightly — it handles RUM, block loading, image optimization, section decoration, and more).

### Block System

Each block in `blocks/<name>/` has:
- `<name>.js` — decoration function exported as default `export default function decorate(block) {}`
- `<name>.css` — scoped styles
- `_<name>.json` (optional) — AEM authoring model for the block (XWalk)

Blocks are **dynamically loaded** on first use — only import what a block needs, not global utilities.

### Content Models (XWalk Authoring)

Models in `models/` and `blocks/*/_*.json` define AEM authoring fields. The three aggregated files (`component-models.json`, `component-definition.json`, `component-filters.json`) are **auto-generated** by `npm run build:json` and committed. Never edit these directly.

The pre-commit hook detects changes to any `_*.json` file and re-runs `npm run build:json` automatically, then stages the generated outputs.

### Fragment Pattern

The `blocks/fragment/` block loads reusable content from `.plain.html` endpoints. Header and footer are implemented as fragments. Fragments go through the full decoration pipeline after loading.

### Styling

- CSS custom properties are defined in `styles/styles.css` — use these variables, don't hardcode colors/fonts
- Responsive breakpoint: `@media (width >= 900px)` (900px = desktop)
- Font loading uses `sessionStorage` to avoid flash; conditional logic is in `scripts/scripts.js:loadFonts()`

### Image Optimization

Use `createOptimizedPicture()` from `scripts/aem.js` for all images. It generates responsive `<picture>` elements with WebP + fallback formats and proper lazy loading.

## Code Conventions

- ES6 modules throughout — always include `.js` extension in imports (ESLint enforces this)
- Unix line endings enforced by ESLint
- Airbnb base style guide for JavaScript
- AUE (Adobe Universal Editor) instrumentation attributes (`data-aue-*`) are used for authoring — the `moveInstrumentation()` helper in `scripts.js` handles transferring these when blocks restructure DOM

## CI

GitHub Actions (`.github/workflows/main.yaml`) runs `npm ci && npm run lint` on every push with Node.js 24. PRs require a linked GitHub issue (`Fix #<issue-id>`).
