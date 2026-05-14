/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Linzess resources sections.
 * Inserts section breaks (<hr>) and section-metadata blocks based on template sections.
 * All selectors verified against captured DOM (migration-work/cleaned.html).
 *
 * Sections (from page-templates.json):
 *   1. Hero Header       — selector: .hero-container.uppercase             — style: null
 *   2. Jump Navigation   — selector: .linzess-jump-nav                    — style: null
 *   3. Healthy Routines  — selector: .abbv-container.background-white.background-white-arc — style: white-arc
 *   4. Wellness Tips     — selector: .abbv-container.background-dark-purple.background-dark-purple-arc — style: dark-purple-arc
 *   5. Community Resources — selector: .abbv-container.background-off-white — style: off-white-arc
 *   6. Video Testimonial — selector: .flexbox-video-cards--single          — style: null
 *   7. Savings Offer     — selector: .savings-card-tout                    — style: null
 *   8. Bottom Nav CTAs   — selector: .bottom-nav                           — style: dark-purple-arc
 *   9. ISI               — selector: .abbv-inline-use-isi                  — style: null
 *
 * Section breaks: 8 (between each pair of adjacent sections)
 * Section-metadata blocks: 4 (sections 3, 4, 5, 8 which have style)
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const document = element.ownerDocument;

    // Fallback selectors for cases where template selector doesn't match live DOM
    // Verified against captured DOM (migration-work/cleaned.html line 262)
    const selectorFallbacks = {
      '.linzess-jump-nav': '.section-navigation',
    };

    // Process sections in reverse order so DOM insertions don't shift later elements
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      let sectionEl = element.querySelector(section.selector);
      // Try fallback selector if primary doesn't match
      if (!sectionEl && selectorFallbacks[section.selector]) {
        sectionEl = element.querySelector(selectorFallbacks[section.selector]);
      }
      if (!sectionEl) continue;

      // Insert section-metadata block after the section element if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Insert <hr> before every section except the first one
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
