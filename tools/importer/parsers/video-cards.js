/* eslint-disable */
/* global WebImporter */

/**
 * Parser for video-cards variant.
 * Base block: video-cards
 * Source: https://www.linzess.com/
 * Generated: 2026-05-14
 *
 * Extracts Brightcove video testimonial cards from the source DOM.
 * Each card contains a poster image, title, patient quote, and transcript link.
 * Source structure: .flexbox-video-cards.home-flexbox-column > .flexboxitem-v2 > .abbv-flex-item-v2
 *
 * UE Model: video-card (container block)
 *   - image (reference): Video poster image
 *   - text (richtext): Title + quote + transcript link
 */
export default function parse(element, { document }) {
  // Video IDs mapped by title keyword for Brightcove embed URL generation
  const videoMap = {
    dian: { videoId: '6391876000112', account: '1029485116001' },
    nan: { videoId: '6391877481112', account: '1029485116001' },
    julie: { videoId: '6391878649112', account: '1029485116001' },
  };

  // Find all video card items
  const cardItems = element.querySelectorAll('.flexboxitem-v2 .abbv-flex-item-v2');
  const cells = [];

  cardItems.forEach((card) => {
    // Extract poster image - try multiple selectors for Brightcove poster
    const posterImg = card.querySelector('.vjs-poster img, .abbv-video-container img, video-js img');
    // Fallback: try to get poster from video element attribute
    const videoEl = card.querySelector('video-js');

    // Extract content from .abbv-video-content area
    const contentArea = card.querySelector('.abbv-video-content');
    if (!contentArea) return;

    const title = contentArea.querySelector('h3');
    const transcriptLink = contentArea.querySelector('a.transcript-link, a[href*="transcript"]');

    // Determine Brightcove video info from title text
    const titleText = title ? title.textContent.toLowerCase() : '';
    let videoInfo = null;
    for (const [key, info] of Object.entries(videoMap)) {
      if (titleText.includes(key)) {
        videoInfo = info;
        break;
      }
    }

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));

    // Get poster image src - check multiple sources
    let posterSrc = null;
    if (posterImg) {
      posterSrc = posterImg.getAttribute('src') || posterImg.src;
    }

    if (posterSrc && posterSrc !== 'null' && !posterSrc.startsWith('data:')) {
      const img = document.createElement('img');
      img.src = posterSrc;
      img.alt = title ? title.textContent.trim() : 'Video poster';
      if (videoInfo) {
        img.setAttribute('data-video-id', videoInfo.videoId);
        img.setAttribute('data-account', videoInfo.account);
      }
      imageCell.appendChild(img);
    } else if (videoInfo) {
      // No usable poster image found - create with Brightcove video data attributes
      const img = document.createElement('img');
      img.src = `/media/video-poster-${videoInfo.videoId}.jpg`;
      img.alt = title ? title.textContent.trim() : 'Video poster';
      img.setAttribute('data-video-id', videoInfo.videoId);
      img.setAttribute('data-account', videoInfo.account);
      imageCell.appendChild(img);
    }

    // Build text cell with field hint - combines title, quote, and transcript link
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      textCell.appendChild(h3);
    }

    // Extract quote and patient info from .abbv-video-content
    // In the live DOM, the structure is: h3, then <p> elements, then <a>
    // The quote paragraph contains spans with patient name/age and condition.
    // Also check vjs-dock-text for fallback quote content.
    const allParagraphs = contentArea.querySelectorAll('p');
    let quoteFound = false;

    allParagraphs.forEach((p) => {
      if (quoteFound) return;
      const spans = p.querySelectorAll('span');
      const text = p.textContent.trim();
      if (!text) return;

      // Find the paragraph with spans (patient info) - this is our quote paragraph
      if (spans.length > 0) {
        quoteFound = true;
        const para = document.createElement('p');

        // Extract quote text by subtracting span content from full paragraph text
        let quoteText = text;
        spans.forEach((span) => {
          quoteText = quoteText.replace(span.textContent, '');
        });
        quoteText = quoteText.trim();

        if (quoteText) {
          para.appendChild(document.createTextNode(quoteText));
        }

        // Add patient info from spans
        spans.forEach((span) => {
          const spanText = span.textContent.trim();
          if (spanText) {
            para.appendChild(document.createElement('br'));
            para.appendChild(document.createTextNode(spanText));
          }
        });

        if (para.textContent.trim()) {
          textCell.appendChild(para);
        }
      }
    });

    // Fallback: if no quote found in paragraphs, try vjs-dock-text
    if (!quoteFound) {
      const dockDesc = card.querySelector('.vjs-dock-description');
      if (dockDesc) {
        const descText = dockDesc.textContent.trim();
        if (descText) {
          const para = document.createElement('p');
          para.textContent = descText;
          textCell.appendChild(para);
        }
      }
    }

    if (transcriptLink) {
      const link = document.createElement('a');
      link.href = transcriptLink.getAttribute('href');
      link.textContent = transcriptLink.textContent.trim();
      textCell.appendChild(link);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'video-cards', cells });
  element.replaceWith(block);
}
