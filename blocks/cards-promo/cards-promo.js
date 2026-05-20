import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Detect whether this cards-promo block uses small icons (≤ ~120px natural width)
 * or a larger promo/savings image. Adds 'icon' class to block for icon variant.
 * Detection runs after images load to read naturalWidth.
 */
function detectVariant(block) {
  const imgs = [...block.querySelectorAll('img')];
  if (!imgs.length) return;

  // If any image has loaded with a natural width > 200px, treat as promo (savings) layout.
  // Icon cards use small images (≈ 106–110px wide).
  const allSmall = imgs.every((img) => {
    if (img.naturalWidth > 0) return img.naturalWidth <= 200;
    // fallback: check rendered width attribute
    const w = parseInt(img.getAttribute('width') || '0', 10);
    return w > 0 && w <= 200;
  });

  if (allSmall) {
    block.classList.add('icon');
  }
}

export default function decorate(block) {
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

  // Detect variant once images have loaded (or immediately if already cached)
  const imgs = [...block.querySelectorAll('img')];
  const loaded = imgs.filter((img) => img.complete && img.naturalWidth > 0);
  if (loaded.length === imgs.length) {
    detectVariant(block);
  } else {
    // Wait for first image to load — enough to determine variant
    const firstImg = imgs[0];
    if (firstImg) {
      firstImg.addEventListener('load', () => detectVariant(block), { once: true });
    }
  }
}
