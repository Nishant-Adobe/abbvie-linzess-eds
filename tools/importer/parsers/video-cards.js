/* eslint-disable */
/* global WebImporter */

/**
 * Parser: video-cards
 * Base block: video-cards
 * Selector: .flexbox-video-cards--single
 * Source: https://www.linzess.com/resources
 * Project type: xwalk
 * UE Model: container block with "video-card" items (fields: image, text)
 * Generated: 2026-05-14
 *
 * Source structure per card:
 *   .flexboxitem-v2 > .abbv-flex-item-v2
 *     > .video-player > div > .abbv-video-player
 *       > .abbv-row-container > .abbv-row-flush > .abbv-col
 *         > .abbv-video-container > video-js > .vjs-poster > img (poster image)
 *         > .abbv-video-content
 *           > h3 (title, e.g. "SEEKING THE RIGHT TREATMENT")
 *           > p (description/quote text with spans)
 *           > a.transcript-link (transcript link)
 *
 * Target table (from UE model - container block):
 *   | Video Cards |   |
 *   |-------------|---|
 *   | image       | text (title + description + link) |
 *   ... (one row per video card)
 */
export default function parse(element, { document }) {
  // Find all video card items within the container
  const cardItems = element.querySelectorAll('.flexboxitem-v2');

  const cells = [];

  cardItems.forEach((card) => {
    // --- Image cell (video poster) ---
    const imageCell = document.createDocumentFragment();
    let posterImg = null;

    // Strategy 1: poster attribute on <video> element (most reliable on live Brightcove pages)
    const videoEl = card.querySelector('video[poster]');
    if (videoEl && videoEl.getAttribute('poster')) {
      posterImg = document.createElement('img');
      posterImg.src = videoEl.getAttribute('poster');
      posterImg.alt = '';
    }

    // Strategy 2: background-image on .vjs-poster div (Brightcove dynamic rendering)
    if (!posterImg) {
      const posterDiv = card.querySelector('.vjs-poster');
      if (posterDiv) {
        const styleAttr = posterDiv.getAttribute('style') || '';
        const bgMatch = styleAttr.match(/url\(["']?([^"')]+)["']?\)/);
        if (bgMatch && bgMatch[1]) {
          posterImg = document.createElement('img');
          posterImg.src = bgMatch[1];
          posterImg.alt = '';
        }
      }
    }

    // Strategy 3: direct img in .vjs-poster (static/cached HTML)
    if (!posterImg) {
      const directImg = card.querySelector('.vjs-poster img');
      if (directImg && directImg.getAttribute('src')) {
        posterImg = directImg;
      }
    }

    if (posterImg) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(posterImg);
    }

    // --- Text cell (title + description + transcript link) ---
    const textCell = document.createDocumentFragment();
    const videoContent = card.querySelector('.abbv-video-content');

    if (videoContent) {
      textCell.appendChild(document.createComment(' field:text '));

      // Extract title (h3)
      const title = videoContent.querySelector('h3, h2, h4');
      if (title) {
        textCell.appendChild(title);
      }

      // Extract description paragraphs (quote text with patient info)
      const paragraphs = videoContent.querySelectorAll('p');
      paragraphs.forEach((p) => {
        // Only add non-empty paragraphs
        if (p.textContent.trim()) {
          textCell.appendChild(p);
        }
      });

      // Extract transcript link
      const transcriptLink = videoContent.querySelector('a.transcript-link, a[href*="transcript"]');
      if (transcriptLink) {
        // Wrap in a paragraph for proper block rendering
        const linkP = document.createElement('p');
        linkP.appendChild(transcriptLink);
        textCell.appendChild(linkP);
      }
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'video-cards',
    cells,
  });

  element.replaceWith(block);
}
