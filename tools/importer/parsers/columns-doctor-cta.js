/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-doctor-cta
 * Base block: columns
 * Selector: .resources-tout
 * Source: https://www.linzess.com/resources
 *
 * Two-column layout:
 *   Left column: lifestyle image with "Actor Portrayal" overlay text
 *   Right column: heading, description paragraph, CTA button
 *
 * Columns blocks do NOT require field hint comments (xwalk Rule 4 exception).
 */
export default function parse(element, { document }) {
  // Get the two column containers
  const columns = element.querySelectorAll(':scope .abbv-col');
  const leftCol = columns[0];
  const rightCol = columns[1];

  // --- Left column: image + overlay text ---
  const leftContent = [];

  // Extract the image
  const picture = leftCol ? leftCol.querySelector('picture') : null;
  if (picture) {
    leftContent.push(picture);
  } else {
    // Fallback: try standalone img
    const img = leftCol ? leftCol.querySelector('img') : null;
    if (img) leftContent.push(img);
  }

  // Extract the overlay text (e.g. "Actor Portrayal")
  const overlayText = leftCol ? leftCol.querySelector('p.tout-overlay, .abbv-stretched-card-body p') : null;
  if (overlayText) {
    leftContent.push(overlayText);
  }

  // --- Right column: heading + description + CTA ---
  const rightContent = [];

  // Extract heading - source uses p.heading-2, convert to h2 for semantic correctness
  const headingEl = rightCol ? rightCol.querySelector('p.heading-2, .abbv-rich-text p.heading-2') : null;
  if (headingEl) {
    const h2 = document.createElement('h2');
    h2.textContent = headingEl.textContent;
    rightContent.push(h2);
  } else {
    // Fallback: try h2, h3 directly
    const fallbackHeading = rightCol ? rightCol.querySelector('h2, h3, h1') : null;
    if (fallbackHeading) rightContent.push(fallbackHeading);
  }

  // Extract description paragraph(s) - skip the heading paragraph
  if (rightCol) {
    const richTextContainer = rightCol.querySelector('.abbv-rich-text');
    if (richTextContainer) {
      const paragraphs = richTextContainer.querySelectorAll('p:not(.heading-2)');
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) {
          rightContent.push(p);
        }
      });
    } else {
      // Fallback: get paragraphs directly from right column, skip heading
      const paragraphs = rightCol.querySelectorAll('p:not(.heading-2)');
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) {
          rightContent.push(p);
        }
      });
    }
  }

  // Extract CTA button/link
  const ctaLink = rightCol ? rightCol.querySelector('a.abbv-button-primary, a.abbv-button-secondary, .cta a, a[href]') : null;
  if (ctaLink) {
    rightContent.push(ctaLink);
  }

  // Build cells: single row with two content columns
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-doctor-cta', cells });
  element.replaceWith(block);
}
