/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Linzess resources cleanup.
 * Removes non-authorable site-wide elements from the DOM.
 * All selectors verified against captured DOM (migration-work/cleaned.html).
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove modal overlays that block parsing (found in captured DOM: .abbv-modal, multiple instances)
    WebImporter.DOMUtils.remove(element, [
      '.abbv-modal',           // All modal dialogs: WOL, HCP, telemed, terms, share, etc.
      '#onetrust-consent-sdk',  // OneTrust cookie consent banner (line 3007 in captured DOM)
      '.abbv-dimmer',           // Modal dimmer overlay (line 1554 in captured DOM)
    ]);
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome (verified in captured DOM)
    WebImporter.DOMUtils.remove(element, [
      'header',                     // Site header with nav (line 20: header.abbv-header-v2)
      'footer',                     // Site footer (line 1372: footer.abbv-footer)
      '.linzess-top-banner',        // Top promotional banner (line 13)
      '.abbv-back-to-top',          // Back to top button (line 1557)
      '.abbv-sticky-anchor',        // Sticky anchor divs (lines 229, 263)
      'noscript',                   // noscript elements
      'link',                       // link elements
      'source',                     // source elements (inside picture tags, already handled by img)
    ]);
  }
}
