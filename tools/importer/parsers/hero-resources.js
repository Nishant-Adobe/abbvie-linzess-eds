/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-resources
 * Base block: hero
 * Source selector: .hero-container.uppercase
 * UE Model fields: image (reference), imageAlt (collapsed), text (richtext)
 * Generated: 2026-05-14
 */
export default function parse(element, { document }) {
  // --- Row 1: Background image (field: image) ---
  const picture = element.querySelector('picture');
  const img = element.querySelector('img');

  const imageCell = [];
  if (picture || img) {
    const imageEl = picture || img;
    const imageHint = document.createComment(' field:image ');
    const frag = document.createDocumentFragment();
    frag.appendChild(imageHint);
    frag.appendChild(imageEl);
    imageCell.push(frag);
  }

  // --- Row 2: Text content (field: text) ---
  // Source has: eyebrow (p.eyebrow), divider (span.divider), and h1 heading
  const contentContainer = element.querySelector(
    '.abbv-stretched-card-body, .abbv-image-text-content-v2, .abbv-image-text-display-v2'
  );

  const textCell = [];
  const textFrag = document.createDocumentFragment();
  const textHint = document.createComment(' field:text ');
  textFrag.appendChild(textHint);

  if (contentContainer) {
    // Extract eyebrow text
    const eyebrow = contentContainer.querySelector('p.eyebrow, p[class*="eyebrow"]');
    if (eyebrow) {
      textFrag.appendChild(eyebrow);
    }

    // Extract divider
    const dividerP = contentContainer.querySelector('p:has(span.divider), p:has([class*="divider"])');
    if (dividerP) {
      textFrag.appendChild(dividerP);
    }

    // Extract heading (h1, h2, h3 fallback)
    const heading = contentContainer.querySelector('h1, h2, h3');
    if (heading) {
      textFrag.appendChild(heading);
    }

    // Extract any CTA links if present (fallback for variations)
    const ctas = contentContainer.querySelectorAll('a.cta, a.button, a[class*="cta"], a[class*="button"]');
    ctas.forEach((cta) => textFrag.appendChild(cta));
  } else {
    // Fallback: extract directly from element
    const eyebrow = element.querySelector('p.eyebrow, p[class*="eyebrow"]');
    if (eyebrow) textFrag.appendChild(eyebrow);

    const heading = element.querySelector('h1, h2, h3');
    if (heading) textFrag.appendChild(heading);
  }

  textCell.push(textFrag);

  // --- Build cells array matching block library structure ---
  // Row 1: background image (field: image)
  // Row 2: text content - eyebrow, divider, heading (field: text)
  const cells = [];
  if (imageCell.length > 0) {
    cells.push(imageCell);
  }
  cells.push(textCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-resources', cells });
  element.replaceWith(block);
}
