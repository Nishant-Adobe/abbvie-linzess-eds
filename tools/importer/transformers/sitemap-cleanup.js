/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Linzess sitemap cleanup.
 * Removes non-authorable site chrome (header, footer, cookie consent,
 * modals, promotional banners, utility elements) so only page content remains.
 *
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // OneTrust cookie consent banner (line 1511 in cleaned.html: <div id="onetrust-consent-sdk">)
    // Modal overlays that may interfere with parsing (lines 639, 688: <div class="abbv-modal ...">)
    // reCAPTCHA and other iframes (lines 1122, 1130, 1500, 1509, 1752)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.abbv-modal',
      'iframe',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Site header (line 20: <header class="abbv-header-v2 linzess-header ...">)
    // Site footer (line 442: <footer class="abbv-footer linzess-footer">)
    // Promotional top banner (line 13: <div class="abbv-rich-text linzess-top-banner ...">)
    // Sticky anchor placeholder (line 229: <div class="abbv-sticky-anchor">)
    // Page dimmer overlay (line 624: <div class="abbv-dimmer">)
    // Back-to-top button (line 627: <button class="abbv-back-to-top ...">)
    // Remaining non-content elements
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      '.linzess-top-banner',
      '.abbv-sticky-anchor',
      '.abbv-dimmer',
      '.abbv-back-to-top',
      'link',
      'noscript',
    ]);
  }
}
