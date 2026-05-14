/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-home
 * Base block: hero
 * Source: https://www.linzess.com/
 * Selector: .hero-container.Linzess-home-hero-belly-bnr
 * Generated: 2026-05-14
 *
 * Target structure (from block library):
 *   Row 1: block name
 *   Row 2: background image
 *   Row 3: text content (eyebrow, heading, subtitle, CTA)
 *
 * UE Model fields: image (reference), imageAlt (text), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract background image - use the picture element for full responsive support,
  // fall back to img if picture not found
  const bgImage = element.querySelector('.abbv-image-content-container-v2 picture, picture');
  const bgImgFallback = !bgImage ? element.querySelector('.abbv-image-content-container-v2 img, img') : null;
  const imageEl = bgImage || bgImgFallback;

  // Extract text content from the hero body
  const cardBody = element.querySelector('.abbv-stretched-card-body, .abbv-image-text-display-v2, .abbv-image-text-content-v2');

  // Build text content cell with all text elements combined in one cell
  const textContent = [];

  if (cardBody) {
    // Eyebrow paragraph (first p before h1)
    const eyebrow = cardBody.querySelector('p.tl-m, p:first-child');
    if (eyebrow) {
      textContent.push(eyebrow);
    }

    // Main heading (h1)
    const heading = cardBody.querySelector('h1.home-hero-title, h1, h2');
    if (heading) {
      textContent.push(heading);
    }

    // Subtitle paragraph (after heading, before CTA)
    const paragraphs = cardBody.querySelectorAll('p');
    paragraphs.forEach((p) => {
      // Skip the eyebrow (already added) and include subtitle
      if (p !== eyebrow && !p.querySelector('a')) {
        textContent.push(p);
      }
    });

    // CTA link(s)
    const ctas = cardBody.querySelectorAll('a.abbv-button-primary, a.abbv-button-secondary, a[class*="abbv-button"]');
    ctas.forEach((cta) => {
      // Wrap standalone anchor in a paragraph for proper block rendering
      const p = document.createElement('p');
      p.appendChild(cta);
      textContent.push(p);
    });
  }

  // Build cells array matching block library structure:
  // Each entry in cells is a row; each row is an array of cell contents.
  // A single-column row with multiple elements uses [[el1, el2, ...]]
  const cells = [];

  // Row 2: background image (single cell)
  if (imageEl) {
    cells.push([imageEl]);
  }

  // Row 3: text content in a single cell (eyebrow, heading, subtitle, CTA)
  if (textContent.length > 0) {
    cells.push([textContent]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-home', cells });
  element.replaceWith(block);
}
