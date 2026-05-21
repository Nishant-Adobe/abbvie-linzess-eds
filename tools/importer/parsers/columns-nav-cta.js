/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-nav-cta
 * Base block: columns
 * Selector: .bottom-nav .abbv-flex-container-v2
 * Source: https://www.linzess.com/savings-and-support
 * Generated: 2026-05-21
 *
 * Bottom navigation CTA columns used on the savings-and-support page.
 * Each column contains a heading (p.heading-2) and a primary CTA link.
 * Maps to a single Columns row with one cell per navigation CTA item.
 *
 * Columns blocks do NOT require field hint comments (xwalk Rule 4 exception).
 */
export default function parse(element, { document }) {
  // Select all flex item containers - each becomes a column cell
  const flexItems = element.querySelectorAll(':scope .abbv-flex-item-v2');

  // Build a single row with one cell per column
  const row = [];

  flexItems.forEach((item) => {
    const cellContent = [];

    // Extract heading - source uses p.heading-2 inside .abbv-rich-text
    const heading = item.querySelector('p.heading-2, .abbv-rich-text p, .rich-text p');
    if (heading) {
      // Convert p.heading-2 to h2 to preserve heading semantics
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      cellContent.push(h2);
    }

    // Extract CTA link - source uses a.abbv-button-primary inside .cta div
    const ctaLink = item.querySelector('.cta a, a.abbv-button-primary, a[href]');
    if (ctaLink) {
      // Create a clean link element preserving href and text
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.textContent = ctaLink.textContent.trim();
      cellContent.push(link);
    }

    row.push(cellContent);
  });

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-nav-cta', cells });
  element.replaceWith(block);
}
