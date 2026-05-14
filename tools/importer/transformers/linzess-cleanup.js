/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Linzess site-wide cleanup.
 * Removes non-authorable content (header, footer, cookie banners, modals, safety bar,
 * recaptcha, SVG defs, empty AEM parsys divs, and other global chrome).
 * All selectors verified against migration-work/cleaned.html captured DOM.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent banner and preference center (OneTrust)
    // Found: <div id="onetrust-consent-sdk"> at line 3416
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
    ]);

    // Remove modals that overlay content and may interfere with block parsing
    // Found: <div class="abbv-modal hcpwol"> at line 2143, and others
    WebImporter.DOMUtils.remove(element, [
      '.abbv-modal',
    ]);

    // Remove recaptcha badge / iframe (non-authorable widget)
    // Found: <div class="grecaptcha-badge"> at line 3403
    WebImporter.DOMUtils.remove(element, [
      '.grecaptcha-badge',
    ]);
  }

  if (hookName === H.after) {
    // Remove header (non-authorable global navigation)
    // Found: <header class="abbv-header-v2 linzess-header ..."> at line 17
    WebImporter.DOMUtils.remove(element, [
      'header.abbv-header-v2',
    ]);

    // Remove the top banner bar (site-wide promo strip, not page content)
    // Found: <div class="abbv-rich-text linzess-top-banner ..."> at line 10
    WebImporter.DOMUtils.remove(element, [
      '.linzess-top-banner',
    ]);

    // Remove footer (non-authorable global footer)
    // Found: <footer class="abbv-footer linzess-footer"> at line 1946
    WebImporter.DOMUtils.remove(element, [
      'footer.abbv-footer',
    ]);

    // Remove the sticky safety bar (duplicate ISI content shown as sticky overlay)
    // Found: <div class="abbv-safety-bar linzess-safety-bar"> at line 3211
    WebImporter.DOMUtils.remove(element, [
      '.abbv-safety-bar',
    ]);

    // Remove empty AEM parsys containers (non-authorable CMS scaffolding)
    // Found: <div class="newpar new section"> and <div class="par iparys_inherited">
    WebImporter.DOMUtils.remove(element, [
      '.newpar',
      '.par.iparys_inherited',
    ]);

    // Remove sticky anchor div (header positioning artifact)
    // Found: <div class="abbv-sticky-anchor"> at line 226
    WebImporter.DOMUtils.remove(element, [
      '.abbv-sticky-anchor',
    ]);

    // Remove inline SVG defs image (decorative gradient definitions)
    // Found: <img src="data:image/svg+xml;base64,..."> at line 3398
    const svgDefs = element.querySelectorAll('img[src^="data:image/svg+xml"]');
    svgDefs.forEach((img) => img.remove());

    // Remove social copy input (non-authorable utility element)
    // Found: <input class="abbv-social-copy"> at line 3400
    WebImporter.DOMUtils.remove(element, [
      '.abbv-social-copy',
    ]);

    // Remove iframes (tracking, recaptcha, third-party embeds)
    // Found: <iframe> elements at lines 3405, 3414
    WebImporter.DOMUtils.remove(element, [
      'iframe',
    ]);

    // Remove header-v2 parbase wrapper (contains the header, already removed above)
    // Found: <div class="header-v2 parbase"> at line 16
    WebImporter.DOMUtils.remove(element, [
      '.header-v2.parbase',
    ]);

    // Remove the footer parbase wrapper
    // Found: <div class="footer parbase"> at line 1944
    WebImporter.DOMUtils.remove(element, [
      '.footer.parbase',
    ]);

    // Remove the safety-bar parbase wrapper
    // Found: <div class="safety-bar parbase"> at line 3209
    WebImporter.DOMUtils.remove(element, [
      '.safety-bar.parbase',
    ]);
  }
}
