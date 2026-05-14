/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns
 * Base block: columns
 * Source: https://www.linzess.com/resources
 * Selector: .bottom-nav .abbv-flex-container-v2
 * Generated: 2026-05-14
 *
 * Bottom navigation CTA columns. Each column contains a heading and a CTA link.
 * Source has 2 flex items (.abbv-flex-item-v2), each with a heading (p.heading-2)
 * and a CTA anchor (.abbv-button-primary). Maps to a single Columns row with
 * 2 cells side by side.
 *
 * No field hint comments required (columns is a structural container block
 * with child component filters, not field-mapped).
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
      // Convert the p.heading-2 to an h2 to preserve heading semantics
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      cellContent.push(h2);
    }

    // Extract CTA link - source uses a.abbv-button-primary inside .cta
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
