/* eslint-disable */
/* global WebImporter */

/**

 * Parser: video-cards
 * Base block: video-cards
 * Source: https://www.linzess.com/
 * Generated: 2026-05-14
 *
 * Extracts Brightcove video testimonial cards. Each card has:
 * - Video poster image (from video[poster], .vjs-poster img, or background-image)
 * - H3 title (patient name's LINZESS story)
 * - Quote text with patient info (name, age, condition)
 * - View Transcript link
 *
 * Output: One row per card, 2 columns per row:
 *   Col 1: poster image
 *   Col 2: title + quote + transcript link
 */
export default function parse(element, { document }) {
  // Each card is a .flexboxitem-v2 or direct child with .abbv-flex-item-v2
  const cards = element.querySelectorAll('.flexboxitem-v2, :scope > .abbv-flex-item-v2');
  const cells = [];

  cards.forEach((card) => {
    // Column 1: Poster image - try multiple sources for robustness
    let posterSrc = '';

    // Try 1: img element inside .vjs-poster or video container
    const posterImg = card.querySelector('.vjs-poster img, .abbv-video-container img, video-js img');
    if (posterImg && posterImg.getAttribute('src')) {
      posterSrc = posterImg.getAttribute('src');
    }

    // Try 2: video element poster attribute
    if (!posterSrc) {
      const videoEl = card.querySelector('video[poster]');
      if (videoEl) {
        posterSrc = videoEl.getAttribute('poster');
      }
    }

    // Try 3: .vjs-poster background-image style
    if (!posterSrc) {
      const posterDiv = card.querySelector('.vjs-poster');
      if (posterDiv) {
        const style = posterDiv.getAttribute('style') || '';
        const bgMatch = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
        if (bgMatch) {
          posterSrc = bgMatch[1];
        }
      }
    }

    const imageCell = [];
    if (posterSrc) {
      const img = document.createElement('img');
      img.src = posterSrc;
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:image '));
      frag.appendChild(img);
      imageCell.push(frag);
    }

    // Column 2: Content (title, quote, transcript link)
    const contentContainer = card.querySelector('.abbv-video-content');
    const contentCell = [];

    if (contentContainer) {
      // Title (h3)
      const title = contentContainer.querySelector('h3');
      if (title) {
        const titleFrag = document.createDocumentFragment();
        titleFrag.appendChild(document.createComment(' field:title '));
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent.trim();
        titleFrag.appendChild(h3);
        contentCell.push(titleFrag);
      }

      // Quote text with patient info - find paragraphs with actual content
      const paragraphs = contentContainer.querySelectorAll('p');
      let quoteText = '';
      paragraphs.forEach((p) => {
        const text = p.textContent.trim();
        if (text && text.length > 1 && !quoteText) {
          quoteText = text;
        }
      });
      if (quoteText) {
        const quoteFrag = document.createDocumentFragment();
        quoteFrag.appendChild(document.createComment(' field:description '));
        const p = document.createElement('p');
        p.textContent = quoteText;
        quoteFrag.appendChild(p);
        contentCell.push(quoteFrag);
      }

      // Transcript link
      const transcriptLink = contentContainer.querySelector('a.transcript-link, a[href*="transcript"]');
      if (transcriptLink) {
        const linkFrag = document.createDocumentFragment();
        linkFrag.appendChild(document.createComment(' field:link '));
        const a = document.createElement('a');
        a.href = transcriptLink.getAttribute('href') || transcriptLink.href;
        a.textContent = transcriptLink.textContent.trim();
        linkFrag.appendChild(a);
        contentCell.push(linkFrag);
      }
    }

    if (imageCell.length || contentCell.length) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'video-cards', cells });
  element.replaceWith(block);
}
