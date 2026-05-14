/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-savings
 * Base block: columns
 * Selector: .savings-card-tout
 * Description: 2-column savings offer layout with product image (left) and
 *   heading + description + CTA links (right).
 * Generated: 2026-05-14
 */
export default function parse(element, { document }) {
  // Left column: product savings image
  const image = element.querySelector('.abbv-col:first-child img, .abbv-col-6:first-child img');

  // Right column container
  const rightCol = element.querySelector('.abbv-col:nth-child(2), .abbv-col-6:nth-child(2)');

  // Build left cell content
  const leftCell = [];
  if (image) {
    leftCell.push(image);
  }

  // Build right cell content
  const rightCell = [];

  if (rightCol) {
    // Heading (p.heading-2 or similar heading element)
    const heading = rightCol.querySelector('.heading-2, h2, [class*="heading"]');
    if (heading) {
      rightCell.push(heading);
    }

    // Description paragraph (non-heading paragraph within rich-text)
    const paragraphs = rightCol.querySelectorAll('.abbv-rich-text p:not(.heading-2):not([class*="heading"])');
    if (paragraphs.length > 0) {
      // First non-heading paragraph is the description
      rightCell.push(paragraphs[0]);
    }

    // Primary CTA link
    const primaryCta = rightCol.querySelector('a.abbv-button-primary, a.abbv-button-primary-v2, .cta a');
    if (primaryCta) {
      rightCell.push(primaryCta);
    }

    // Secondary text with inline link ("Already have a savings card? Activate now.")
    const secondaryTexts = rightCol.querySelectorAll('.rich-text');
    if (secondaryTexts.length > 1) {
      // Second rich-text block contains the secondary text
      const secondaryP = secondaryTexts[1].querySelector('p');
      if (secondaryP) {
        rightCell.push(secondaryP);
      }
    }
  }

  // Columns block: Row 1 is block name, Row 2 is two cells (left image, right content)
  // Per xwalk hinting rules: Columns blocks do NOT require field comments
  const cells = [
    [leftCell, rightCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-savings', cells });
  element.replaceWith(block);
}
