/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-quiz
 * Base block: columns
 * Selector: .abbv-row-container.background-off-white.rounded-corners.image-text-wrapper.margin-top-80.tablet-tout-row
 * Description: 2-column layout — left column has lifestyle image with "Actor Portrayal" overlay,
 *              right column has heading, description, and CTA link.
 * Generated: 2026-05-14
 */
export default function parse(element, { document }) {
  // --- Left column: image + overlay text ---
  const leftCol = element.querySelector('.abbv-col:first-child, .abbv-col-6:first-of-type');
  const image = leftCol ? leftCol.querySelector('img') : element.querySelector('img');
  const overlayText = leftCol
    ? leftCol.querySelector('.tout-overlay, .abbv-image-text-content-v2 p')
    : element.querySelector('.tout-overlay');

  // Build left cell content
  const leftCell = [];
  if (image) {
    leftCell.push(image);
  }
  if (overlayText) {
    // Create a clean paragraph for overlay text
    const overlayP = document.createElement('p');
    overlayP.textContent = overlayText.textContent.replace(/\s+/g, ' ').trim();
    leftCell.push(overlayP);
  }

  // --- Right column: heading + description + CTA ---
  const rightCol = leftCol
    ? leftCol.nextElementSibling
    : element.querySelector('.abbv-col:nth-child(2), .abbv-col-6:nth-of-type(2)');

  const heading = rightCol
    ? rightCol.querySelector('.heading-2, h2, [class*="heading"]')
    : element.querySelector('.heading-2, h2');
  const description = rightCol
    ? rightCol.querySelector('.abbv-rich-text p:not(.heading-2), .abbv-rich-text-common p:not([class*="heading"])')
    : null;
  const ctaLink = rightCol
    ? rightCol.querySelector('.cta a, a.abbv-button-primary, a[href*="gutcheck"]')
    : element.querySelector('.cta a, a.abbv-button-primary');

  // Build right cell content
  const rightCell = [];
  if (heading) {
    // Preserve as proper heading element
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    rightCell.push(h2);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    rightCell.push(p);
  }
  if (ctaLink) {
    // Preserve the link with its href and text
    const link = document.createElement('a');
    link.href = ctaLink.getAttribute('href') || '';
    link.textContent = ctaLink.textContent.trim();
    rightCell.push(link);
  }

  // --- Build cells array: single row with 2 columns ---
  // Columns blocks do not require field hints (xwalk exception per hinting rules)
  const cells = [
    [leftCell, rightCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-quiz', cells });
  element.replaceWith(block);
}
