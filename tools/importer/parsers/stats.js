/* eslint-disable */
/* global WebImporter */

/**
 * Parser: stats
 * Base block: stats
 * Description: Multiple stat counter cards with circle badge numbers and descriptive text.
 *              Each card becomes one row with a single cell containing the number paragraph
 *              and the description paragraph.
 * Source selector: .flexbox-cards.c-dark-purple.margin-top-80
 * Generated: 2026-05-14
 */
export default function parse(element, { document }) {
  // Each stat card is a .flexboxitem-v2 containing rich text with two paragraphs:
  // 1. p.circle - the badge number (e.g., "11.5 million")
  // 2. p.mb24-m - the descriptive text (e.g., "people suffer from IBS-C...")
  const cards = element.querySelectorAll(':scope > .flexboxitem-v2');

  const cells = [];

  cards.forEach((card) => {
    const richText = card.querySelector('.abbv-rich-text');
    if (!richText) return;

    // Get the circle badge paragraph (number)
    const numberParagraph = richText.querySelector('p.circle, p[class*="circle"]');
    // Get the description paragraph
    const descriptionParagraph = richText.querySelector('p.mb24-m, p:not(.circle):not([class*="circle"])');

    const cellContent = [];

    if (numberParagraph) {
      cellContent.push(numberParagraph);
    }

    if (descriptionParagraph) {
      cellContent.push(descriptionParagraph);
    }

    // Single column per row: both paragraphs in one cell
    if (cellContent.length > 0) {
      cells.push([cellContent]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'stats', cells });
  element.replaceWith(block);
}
