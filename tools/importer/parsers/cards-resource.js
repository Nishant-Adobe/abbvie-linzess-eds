/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-resource
 * Base block: cards
 * Selector: .flexbox-cards.resources-page
 * Source: https://www.linzess.com/resources
 * Project type: xwalk (field hints enabled)
 *
 * Extracts community resource cards. Each card has:
 *   - Icon/logo image (centered)
 *   - Heading (resource name, e.g. "IBSPatient.org")
 *   - Description paragraph
 *   - "Learn More" CTA link
 *
 * UE Model (card-resource): image (reference), text (richtext)
 * Container block: each card = one row with 2 columns [image, text]
 */
export default function parse(element, { document }) {
  // Select all card items within the container
  const cardItems = element.querySelectorAll('.flexboxitem-v2');

  const cells = [];

  cardItems.forEach((card) => {
    // --- Column 1: Image ---
    const img = card.querySelector('picture');
    const imageCell = document.createDocumentFragment();
    if (img) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    // --- Column 2: Text (heading + description + CTA) ---
    const textCell = document.createDocumentFragment();
    const heading = card.querySelector('p.heading-2');
    const description = card.querySelector('.abbv-stretched-card-body p:not(.heading-2)');
    const ctaLink = card.querySelector('.cta a');

    let hasTextContent = false;

    if (heading) {
      // Convert <p class="heading-2"> to a proper <h2> for semantic preservation
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      if (!hasTextContent) {
        textCell.appendChild(document.createComment(' field:text '));
        hasTextContent = true;
      }
      textCell.appendChild(h2);
    }

    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      if (!hasTextContent) {
        textCell.appendChild(document.createComment(' field:text '));
        hasTextContent = true;
      }
      textCell.appendChild(p);
    }

    if (ctaLink) {
      const a = document.createElement('a');
      a.href = ctaLink.href || '#';
      a.textContent = ctaLink.textContent.trim();
      if (!hasTextContent) {
        textCell.appendChild(document.createComment(' field:text '));
        hasTextContent = true;
      }
      const p = document.createElement('p');
      p.appendChild(a);
      textCell.appendChild(p);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-resource', cells });
  element.replaceWith(block);
}
