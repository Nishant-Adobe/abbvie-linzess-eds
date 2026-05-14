/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Linzess site-wide cleanup.
 * Removes non-authorable elements (header, footer, cookie consent, modals, skip nav).
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent overlay (blocks parsing) - found at line 3416 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.onetrust-pc-dark-filter',
    ]);

    // Remove modals that overlay content - found at lines 2143, 2192 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      '.abbv-modal',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove site header - found at lines 10, 17 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      '.linzess-top-banner',
      '.abbv-header-v2',
    ]);

    // Remove skip navigation link - found at line 19 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      '.abbv-skip-to-main-content',
    ]);

    // Remove site footer - found at line 1946 in cleaned.html
    WebImporter.DOMUtils.remove(element, [
      'footer.abbv-footer',
    ]);

    // Remove iframes and link tags (non-authorable)
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
    ]);
  }
}
