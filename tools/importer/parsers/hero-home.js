/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-home
 * Base block: hero
 * Source: https://www.linzess.com/
 * Selector: .hero-container.Linzess-home-hero-belly-bnr
 * Generated: 2026-05-14
 *
 * Hero block: 1 column, 2 content rows.
 * Row 1 (image): background image
 * Row 2 (text): eyebrow, heading, subtitle, CTA
 *
 * UE Model fields: image (reference), imageAlt (collapsed), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract background image from picture element
  const picture = element.querySelector('picture');

  // Extract eyebrow text (first p with class tl-m before the heading)
  const eyebrow = element.querySelector('.abbv-stretched-card-body > p.tl-m');

  // Extract H1 heading
  const heading = element.querySelector('h1.home-hero-title, h1, h2');

  // Extract subtitle (p after the heading, with class mb15-m)
  const subtitle = element.querySelector('p.mb15-m, .abbv-stretched-card-body > p:last-of-type');

  // Extract CTA link
  const cta = element.querySelector('a.abbv-button-primary, a.abbv-image-text-link, a[class*="abbv-button"]');

  // Build cells matching block library structure:
  // Row 1: background image with field hint
  // Row 2: text content (eyebrow + heading + subtitle + CTA) with field hint
  const cells = [];

  // Row 1: Image cell with field:image hint
  const imageCell = document.createDocumentFragment();
  imageCell.appendChild(document.createComment(' field:image '));
  if (picture) {
    imageCell.appendChild(picture);
  }
  cells.push([imageCell]);

  // Row 2: Text content cell with field:text hint
  const textCell = document.createDocumentFragment();
  textCell.appendChild(document.createComment(' field:text '));
  if (eyebrow) textCell.appendChild(eyebrow);
  if (heading) textCell.appendChild(heading);
  if (subtitle) textCell.appendChild(subtitle);
  if (cta) {
    const p = document.createElement('p');
    p.appendChild(cta);
    textCell.appendChild(p);
  }
  cells.push([textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-home', cells });
  element.replaceWith(block);
}
