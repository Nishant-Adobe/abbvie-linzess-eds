/* eslint-disable */
/* global WebImporter */

/**
 * Parser: accordion-legal
 * Base block: accordion
 * Source selector: .abbv-accordion-single
 * Structure: Container block - each row is one accordion item
 *   Column 1: Accordion item label/title
 *   Column 2: Accordion item body content (rich text)
 * Generated: 2026-05-21
 */
export default function parse(element, { document }) {
  // Each accordion blade is one item (row)
  const blades = element.querySelectorAll('.abbv-accordion-blade');
  const cells = [];

  blades.forEach((blade) => {
    // Column 1: Extract the accordion item label/title
    const labelEl = blade.querySelector('.abbv-accordion-blade-text');
    const labelCell = [];
    if (labelEl) {
      // Create a paragraph for the title text
      const titleP = document.createElement('p');
      titleP.innerHTML = labelEl.innerHTML;
      labelCell.push(titleP);
    }

    // Column 2: Extract the accordion item body content
    const bodyEl = blade.querySelector('.abbv-accordion-content');
    const bodyCell = [];
    if (bodyEl) {
      // Get the rich text content within the accordion body
      const richText = bodyEl.querySelector('.abbv-rich-text');
      if (richText) {
        // Extract all child elements (paragraphs, etc.) from rich text
        const children = Array.from(richText.children);
        children.forEach((child) => {
          bodyCell.push(child);
        });
      } else {
        // Fallback: use all direct children of the body
        const children = Array.from(bodyEl.children);
        children.forEach((child) => {
          bodyCell.push(child);
        });
      }
    }

    // Add row: [label, body]
    cells.push([labelCell, bodyCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-legal', cells });
  element.replaceWith(block);
}
