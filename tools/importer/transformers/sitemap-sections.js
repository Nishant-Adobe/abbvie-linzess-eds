/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Linzess sitemap sections.
 * Inserts section breaks (<hr>) between the three page sections.
 * All sections have style: null, so no Section Metadata blocks are needed.
 *
 * Sections (from page-templates.json, selectors verified in cleaned.html):
 *   1. Sitemap Header — selector: .abbv-rich-text.text-align-center (line 238)
 *   2. Sitemap Link Columns — selector: .linzess-sitemap (line 236)
 *   3. ISI — selector: .abbv-inline-use-isi (line 357)
 *
 * Runs in afterTransform only.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    const reversedSections = [...sections].reverse();

    for (const section of reversedSections) {
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Only insert <hr> before non-first sections (skip the first section in original order)
      if (section !== sections[0]) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
