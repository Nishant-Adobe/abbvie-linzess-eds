/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns variant.
 * Base block: columns
 * Source: https://www.linzess.com/sitemap
 * Selector: .abbv-row-container.sitemap-col
 * Generated: 2026-05-14
 *
 * Source structure:
 *   .abbv-row-container.sitemap-col
 *     .abbv-row
 *       .abbv-col.abbv-col-4  (repeated N times)
 *         .rich-text
 *           .abbv-rich-text
 *             h2 + p>a (repeated)
 *
 * Target: Columns block with one row, N cells (one per column).
 * Each cell contains the heading and link paragraphs from that column.
 */
export default function parse(element, { document }) {
  // Extract all column containers - handles 2, 3, or more columns
  const columns = element.querySelectorAll(':scope .abbv-row .abbv-col');

  // Build one row with a cell per column
  const row = [];

  columns.forEach((col) => {
    const cellContent = [];

    // Extract the rich-text content container
    const richText = col.querySelector('.abbv-rich-text');
    if (!richText) return;

    // Extract heading (h2, with fallback to h3 or h1)
    const heading = richText.querySelector('h2, h3, h1');
    if (heading) {
      cellContent.push(heading);
    }

    // Extract all link paragraphs
    const linkParagraphs = richText.querySelectorAll('p');
    linkParagraphs.forEach((p) => {
      cellContent.push(p);
    });

    // Only add cell if it has content
    if (cellContent.length > 0) {
      row.push(cellContent);
    }
  });

  const cells = [];
  if (row.length > 0) {
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
