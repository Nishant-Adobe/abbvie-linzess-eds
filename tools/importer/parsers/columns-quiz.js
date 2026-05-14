/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-quiz
 * Base block: columns
 * Description: 2-column layout - left column has lifestyle image with "Actor Portrayal"
 *   overlay, right column has heading, description paragraph, and CTA button.
 * Source selector: .abbv-row-container.background-off-white.rounded-corners.image-text-wrapper.margin-top-80.tablet-tout-row
 * Generated: 2026-05-14
 */
export default function parse(element, { document }) {
  // --- Column 1: Image with overlay text ---
  const imageContainer = element.querySelector('.abbv-col:first-child');
  const image = imageContainer ? imageContainer.querySelector('picture, img') : null;
  const overlayText = imageContainer ? imageContainer.querySelector('.tout-overlay, .abbv-stretched-card-body p') : null;

  // Build left column cell content
  const leftCell = [];
  if (image) {
    // If we found a <picture>, use it; otherwise use the img directly
    const pictureEl = imageContainer.querySelector('picture');
    if (pictureEl) {
      leftCell.push(pictureEl);
    } else if (image) {
      leftCell.push(image);
    }
  }
  if (overlayText) {
    leftCell.push(overlayText);
  }

  // --- Column 2: Heading, description, CTA ---
  const contentContainer = element.querySelector('.abbv-col:nth-child(2), .abbv-col:last-child');
  const heading = contentContainer ? contentContainer.querySelector('.heading-2, h2, [class*="heading"]') : null;
  const description = contentContainer ? contentContainer.querySelector('.abbv-rich-text p:not([class*="heading"]), .abbv-rich-text-common p:not([class*="heading"])') : null;
  const ctaLink = contentContainer ? contentContainer.querySelector('.cta a, a.abbv-button-primary, a.abbv-button-primary-v2') : null;

  // Build right column cell content
  const rightCell = [];
  if (heading) rightCell.push(heading);
  if (description) rightCell.push(description);
  if (ctaLink) rightCell.push(ctaLink);

  // Build cells array: single row with two columns (no field hints for Columns blocks per xwalk rules)
  const cells = [
    [leftCell.length > 0 ? leftCell : '', rightCell.length > 0 ? rightCell : ''],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-quiz', cells });
  element.replaceWith(block);
}
