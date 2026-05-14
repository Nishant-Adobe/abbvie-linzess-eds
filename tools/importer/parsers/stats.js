/* eslint-disable */
/* global WebImporter */
/**
 * Parser for stats variant.
 * Base block: stats (container block with stat-item children)
 * Source: https://www.linzess.com/
 * Selector: .flexbox-cards.c-dark-purple.margin-top-80
 * Generated: 2026-05-14
 *
 * Each stat card has a circle badge with number + "million" text
 * and a description paragraph. Produces one row per stat item
 * with a single column containing the rich text content.
 */
export default function parse(element, { document }) {
  // Each stat card is inside .flexboxitem-v2 > .abbv-flex-item-v2
  const statCards = element.querySelectorAll('.flexboxitem-v2 .abbv-flex-item-v2');

  const cells = [];

  statCards.forEach((card) => {
    // Extract the rich text container with the stat number and description
    const richTextContainer = card.querySelector('.abbv-rich-text');
    if (!richTextContainer) return;

    // Get the circle badge paragraph (number) and description paragraph
    const circleBadge = richTextContainer.querySelector('p.circle');
    const description = richTextContainer.querySelector('p.mb24-m');

    // Build the cell content with field hint for xwalk
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:text '));

    if (circleBadge) {
      const clonedBadge = circleBadge.cloneNode(true);
      frag.appendChild(clonedBadge);
    }

    if (description) {
      const clonedDesc = description.cloneNode(true);
      frag.appendChild(clonedDesc);
    }

    // Single column per row (container block: each child item = one row)
    cells.push([frag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'stats', cells });
  element.replaceWith(block);
}
