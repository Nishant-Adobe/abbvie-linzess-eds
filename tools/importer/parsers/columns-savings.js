/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-savings
 * Base block: columns
 * Source selector: .savings-card-tout
 * Generated: 2026-05-14
 *
 * Savings offer section with two columns:
 * - Left column: product savings card image
 * - Right column: heading, description, primary CTA, secondary link text
 *
 * Columns blocks do NOT require field hint comments (xwalk Rule 4 exception).
 */
export default function parse(element, { document }) {
  // Left column: extract the savings card image
  const leftCol = element.querySelector('.abbv-col:first-child, .abbv-col-6:first-child');
  const picture = leftCol ? leftCol.querySelector('picture') : element.querySelector('picture');
  const leftContent = [];
  if (picture) {
    leftContent.push(picture);
  } else {
    // Fallback: try standalone img
    const img = leftCol ? leftCol.querySelector('img') : element.querySelector('img');
    if (img) leftContent.push(img);
  }

  // Right column: extract heading, description, CTA, and secondary text
  const rightCol = element.querySelector('.abbv-col:nth-child(2), .abbv-col-6:nth-child(2)');
  const rightContent = [];

  if (rightCol) {
    // Heading (styled as heading-2 class in a <p> tag)
    const heading = rightCol.querySelector('.heading-2, h2, h1, h3');
    if (heading) rightContent.push(heading);

    // Description paragraph (first non-heading paragraph in the rich-text)
    const richTextBlocks = rightCol.querySelectorAll('.abbv-rich-text');
    if (richTextBlocks.length > 0) {
      const firstRichText = richTextBlocks[0];
      const paragraphs = firstRichText.querySelectorAll('p');
      paragraphs.forEach((p) => {
        // Skip the heading paragraph (already captured)
        if (!p.classList.contains('heading-2') && !p.querySelector('h1, h2, h3') && p !== heading) {
          rightContent.push(p);
        }
      });
    }

    // Primary CTA link ("Sign Up Now")
    const ctaLink = rightCol.querySelector('.cta a, a.abbv-button-primary, a.abbv-button-primary-v2');
    if (ctaLink) rightContent.push(ctaLink);

    // Secondary text/link ("Already have a savings card? Activate now")
    if (richTextBlocks.length > 1) {
      const secondaryRichText = richTextBlocks[richTextBlocks.length - 1];
      const secondaryParas = secondaryRichText.querySelectorAll('p');
      secondaryParas.forEach((p) => {
        rightContent.push(p);
      });
    }
  }

  // Build cells: single row with two columns matching the Columns library structure
  const cells = [
    [leftContent, rightContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-savings', cells });
  element.replaceWith(block);
}
