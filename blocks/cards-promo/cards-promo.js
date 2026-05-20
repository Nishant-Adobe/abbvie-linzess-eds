import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Detect icon vs. promo-savings variant by reading the original image width attributes
 * before createOptimizedPicture replaces the elements.
 * Icon cards use small images (≤ 200px wide); savings card uses a larger image.
 * Adds 'icon' class to block when all images are small icons.
 */
function detectVariantFromWidths(block) {
  const imgs = [...block.querySelectorAll('img')];
  if (!imgs.length) return;

  const allSmall = imgs.every((img) => {
    // Prefer naturalWidth if already loaded
    if (img.complete && img.naturalWidth > 0) return img.naturalWidth <= 200;
    // Fall back to authored width attribute (EDS always sets this from the document)
    const w = parseInt(img.getAttribute('width') || '0', 10);
    return w > 0 && w <= 200;
  });

  if (allSmall) {
    block.classList.add('icon');
  }
}

export default function decorate(block) {
  // Detect variant BEFORE creating optimized pictures (width attrs are still present)
  detectVariantFromWidths(block);

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-promo-image';
      } else {
        div.className = 'cards-promo-body';
      }
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.replaceChildren(ul);
}
