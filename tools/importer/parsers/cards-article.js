/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-article
 * Base block: cards
 * Selector: .flexbox-article-cards.resources-flexbox-column
 * Source: https://www.linzess.com/resources
 * Project type: xwalk
 * UE Model: container block with "card" items (fields: image, text)
 * Generated: 2026-05-14
 *
 * Source structure per card:
 *   .flexboxitem-v2 > .abbv-flex-item-v2.background-light-purple
 *     > .image-text-v2 > .abbv-image-text-v2
 *       > .abbv-image-content-container-v2 > img
 *       > .abbv-image-text-content-container-v2
 *         > .abbv-stretched-card-body
 *           > p > b (title)
 *           > p (description)
 *           > a.abbv-button-primary (CTA)
 *
 * Target table (from library example):
 *   | Cards | |
 *   |---|---|
 *   | image | text (title + description + CTA) |
 *   ... (one row per card)
 */
export default function parse(element, { document }) {
  // Find all card items within the container
  const cardItems = element.querySelectorAll('.flexboxitem-v2');

  const cells = [];

  cardItems.forEach((card) => {
    // --- Image cell ---
    const img = card.querySelector('.abbv-image-content-container-v2 img, .abbv-image-text-v2 img, img');

    const imageCell = document.createDocumentFragment();
    if (img) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    // --- Text cell (title + description + CTA) ---
    const textCell = document.createDocumentFragment();
    const cardBody = card.querySelector('.abbv-stretched-card-body');

    if (cardBody) {
      textCell.appendChild(document.createComment(' field:text '));

      // Extract title paragraph (contains <b> tag)
      const titleP = cardBody.querySelector('p b');
      if (titleP && titleP.parentElement) {
        textCell.appendChild(titleP.parentElement);
      }

      // Extract description paragraph(s) - paragraphs without <b> that are not the title
      const allParagraphs = cardBody.querySelectorAll('p');
      allParagraphs.forEach((p) => {
        // Skip the title paragraph (already added above)
        if (!p.querySelector('b')) {
          textCell.appendChild(p);
        }
      });

      // Extract CTA link(s)
      const ctaLinks = cardBody.querySelectorAll('a.abbv-button-primary, a.abbv-image-text-link, a[class*="abbv-button"]');
      ctaLinks.forEach((link) => {
        // Only add if not already inside a paragraph we already appended
        if (!link.closest('p')) {
          textCell.appendChild(link);
        }
      });
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'cards-article',
    cells,
  });

  element.replaceWith(block);
}
