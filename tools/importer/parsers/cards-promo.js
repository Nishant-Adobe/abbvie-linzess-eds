/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo
 * Base block: cards
 * Source: https://www.linzess.com/
 * Generated: 2026-05-14
 *
 * Handles two source DOM patterns:
 * 1. .eligible-tout.tablet-tout-row — single savings eligibility card (image + heading + CTA)
 * 2. .flexbox-cards.margin-top-110 — two side-by-side promo cards (image + heading + description + CTA)
 *
 * UE Model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Determine which instance we are parsing
  const isEligibleTout = element.classList.contains('eligible-tout');
  const isFlexboxCards = element.classList.contains('flexbox-cards');

  if (isEligibleTout) {
    // Single card: savings eligibility promo
    const image = element.querySelector('.abbv-image-content-container-v2 img');
    const heading = element.querySelector('.heading-2, h2');
    const cta = element.querySelector('.cta a, a.abbv-button-primary');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (image) imageCell.appendChild(image);

    // Build text cell with field hint
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (heading) textCell.appendChild(heading);
    if (cta) textCell.appendChild(cta);

    cells.push([imageCell, textCell]);
  } else if (isFlexboxCards) {
    // Multiple cards from flexbox container
    const cardItems = element.querySelectorAll('.flexboxitem-v2 > .abbv-flex-item-v2');

    cardItems.forEach((card) => {
      const image = card.querySelector('.abbv-image-content-container-v2 img');
      const heading = card.querySelector('.heading-2, h2');
      const description = card.querySelector('.abbv-stretched-card-body p:not(.heading-2), .abbv-image-text-display-v2 p:not(.heading-2)');
      const cta = card.querySelector('.cta a, a.abbv-button-primary, a.abbv-button-secondary');

      // Build image cell with field hint
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      if (image) imageCell.appendChild(image);

      // Build text cell with field hint
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      if (heading) textCell.appendChild(heading);
      if (description) textCell.appendChild(description);
      if (cta) textCell.appendChild(cta);

      cells.push([imageCell, textCell]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
