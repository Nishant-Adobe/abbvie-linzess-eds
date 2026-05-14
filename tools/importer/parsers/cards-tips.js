/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-tips
 * Base block: cards
 * Description: Wellness tip icon cards with SVG icon + bold title + bulleted tips list.
 *   3 cards alternating light-purple/off-white backgrounds.
 *   Container block — each card becomes one row with 2 columns: image | text.
 * UE Model: card (fields: image, text)
 * Source selector: .wellness-tips-cards
 * Generated: 2026-05-14
 */
export default function parse(element, { document }) {
  // Each card is a .flexboxitem-v2 child containing icon + text content
  const cardItems = element.querySelectorAll(':scope > .flexboxitem-v2');

  const cells = [];

  cardItems.forEach((card) => {
    // Column 1: Icon image
    // Validated selector: .abbv-image-content-container-v2 img
    const img = card.querySelector('.abbv-image-content-container-v2 img');

    // Column 2: Text content (bold title + bulleted list)
    // Validated selector: .abbv-stretched-card-body
    const textContainer = card.querySelector('.abbv-stretched-card-body');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    if (img) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    // Build text cell with field hint
    const textCell = document.createDocumentFragment();
    if (textContainer) {
      textCell.appendChild(document.createComment(' field:text '));
      // Append all child nodes from the text container (p with bold title + ul list)
      const children = Array.from(textContainer.children);
      children.forEach((child) => {
        textCell.appendChild(child);
      });
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'cards-tips',
    cells,
  });

  element.replaceWith(block);
}
