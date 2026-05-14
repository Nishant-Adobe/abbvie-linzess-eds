/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-savings
 * Base block: columns
 * Selector: .savings-card-tout
 * Description: 2-column savings offer layout. Left column has product image,
 * right column has heading, description, primary CTA, and secondary link.
 * xwalk project: Columns blocks do NOT require field hint comments per hinting rules.
 * Generated: 2026-05-14
 */
export default function parse(element, { document }) {
  // Left column: product image
  const cols = element.querySelectorAll('.abbv-col, [class*="abbv-col-6"]');
  const leftCol = cols[0];
  const image = leftCol ? leftCol.querySelector('picture, img') : element.querySelector('picture, img');

  // Right column: heading, description, primary CTA, secondary text with link
  const rightCol = cols.length > 1 ? cols[1] : element;

  // Heading: first paragraph with heading-2 class
  const heading = rightCol.querySelector('p.heading-2, .heading-2, h2');

  // Description: paragraph with mt15 class (immediately after heading)
  const description = rightCol.querySelector('p.mt15, p.mb24');

  // Primary CTA: button link in .cta container
  const primaryCta = rightCol.querySelector('.cta a, a.abbv-button-primary, a.abbv-button-primary-v2');

  // Secondary text: paragraph in the last rich-text section containing the "Activate now" link
  const richTextSections = rightCol.querySelectorAll('.rich-text');
  let secondaryText = null;
  if (richTextSections.length > 1) {
    secondaryText = richTextSections[richTextSections.length - 1].querySelector('p');
  } else {
    secondaryText = rightCol.querySelector('p.mb32-m');
  }

  // Build left cell content
  const leftCellContent = [];
  if (image) leftCellContent.push(image);

  // Build right cell content
  const rightCellContent = [];
  if (heading) rightCellContent.push(heading);
  if (description) rightCellContent.push(description);
  if (primaryCta) rightCellContent.push(primaryCta);
  if (secondaryText) rightCellContent.push(secondaryText);

  // Columns block: 1 row with 2 cells (left image, right content)
  // No field hints required for Columns blocks per xwalk hinting rules
  const cells = [
    [leftCellContent, rightCellContent],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-savings', cells });
  element.replaceWith(block);
}
