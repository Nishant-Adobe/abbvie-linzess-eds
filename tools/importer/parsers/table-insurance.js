/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-insurance
 * Base block: table-insurance
 * Source: https://www.linzess.com/savings-and-support
 * Selector: .table-container
 * Generated: 2026-05-21
 *
 * Extracts a 2-column insurance cost table with header row and data rows.
 * Source uses div-based table layout (.table-row > .table-cell).
 * Target: EDS table block with rows/cells structure.
 */
export default function parse(element, { document }) {
  // Extract all table rows from the source
  const rows = element.querySelectorAll(':scope > .table-row');
  const cells = [];

  rows.forEach((row) => {
    const cellElements = row.querySelectorAll(':scope > .table-cell');
    const rowCells = [];

    cellElements.forEach((cell) => {
      // Clone the cell content to preserve rich text (bold, links, superscripts)
      const container = document.createElement('div');
      // Transfer all child nodes preserving semantics
      Array.from(cell.childNodes).forEach((node) => {
        container.appendChild(node.cloneNode(true));
      });
      rowCells.push(container);
    });

    if (rowCells.length > 0) {
      cells.push(rowCells);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-insurance', cells });
  element.replaceWith(block);
}
