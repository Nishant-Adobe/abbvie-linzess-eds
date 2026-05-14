/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-promo
 * Base block: cards
 * Source: https://www.linzess.com/
 * Generated: 2026-05-14
 *
 * Handles two instance types:
 * 1. .eligible-tout.tablet-tout-row - single card in .abbv-row-container layout (image + heading + CTA)
 * 2. .flexbox-cards.margin-top-110 - multiple cards in .abbv-flex-container-v2 layout (icon + heading + description + CTA)
 *
 * UE Model: container block "cards" with child "card" items
 * Each card row: [image cell] [text cell]
 * Fields: image (reference), text (richtext)

 */
export default function parse(element, { document }) {
  const cells = [];

  // Determine which instance type we are parsing
  const isFlexboxCards = element.classList.contains('flexbox-cards') ||
    element.querySelector('.abbv-flex-container-v2');
  const isEligibleTout = element.classList.contains('eligible-tout') ||
    element.querySelector('.abbv-row-container');

  if (isFlexboxCards) {
    // Instance 2: .flexbox-cards.margin-top-110
    // Structure: .abbv-flex-container-v2 > .flexboxitem-v2 (multiple cards)
    const flexContainer = element.classList.contains('abbv-flex-container-v2')
      ? element
      : element.querySelector('.abbv-flex-container-v2');

    const cardItems = flexContainer
      ? Array.from(flexContainer.querySelectorAll(':scope > .flexboxitem-v2'))
      : [];

    cardItems.forEach((item) => {
      // Image: picture element within .abbv-image-content-container-v2
      const picture = item.querySelector('.abbv-image-content-container-v2 picture');

      // Text content: heading, description, CTA
      const heading = item.querySelector('.abbv-stretched-card-body .heading-2, .abbv-stretched-card-body h2');
      const description = item.querySelector('.abbv-stretched-card-body p:not(.heading-2):not([class*="heading"])');
      const cta = item.querySelector('.cta a, a.abbv-button-primary, a.abbv-button-secondary');


      // Build image cell with field hint
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      if (picture) {
        imageCell.appendChild(picture);
      }

      // Build text cell with field hint
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      if (heading) textCell.appendChild(heading);
      if (description) textCell.appendChild(description);
      if (cta) textCell.appendChild(cta);

      cells.push([imageCell, textCell]);
    });
  } else if (isEligibleTout) {
    // Instance 1: .eligible-tout.tablet-tout-row
    // Structure: .abbv-row-container > .abbv-row > .abbv-col (2 columns = 1 card)
    const imageCol = element.querySelector('.abbv-col:first-child, .abbv-col-6:first-child');
    const textCol = element.querySelector('.abbv-col:nth-child(2), .abbv-col-6:nth-child(2), .abbv-col + .abbv-col');

    // Image: picture in first column
    const picture = imageCol ? imageCol.querySelector('picture') : null;

    // Text content: heading and CTA in second column
    const heading = textCol ? textCol.querySelector('.heading-2, h2, p.heading-2') : null;
    const cta = textCol ? textCol.querySelector('.cta a, a.abbv-button-primary') : null;

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (picture) {
      imageCell.appendChild(picture);
    }

    // Build text cell with field hint
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (heading) textCell.appendChild(heading);
    if (cta) textCell.appendChild(cta);

    cells.push([imageCell, textCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
