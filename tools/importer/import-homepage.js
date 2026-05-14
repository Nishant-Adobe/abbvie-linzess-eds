/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroHomeParser from './parsers/hero-home.js';
import cardsPromoParser from './parsers/cards-promo.js';
import columnsQuizParser from './parsers/columns-quiz.js';
import statsParser from './parsers/stats.js';
import videoCardsParser from './parsers/video-cards.js';
import columnsSavingsParser from './parsers/columns-savings.js';

// TRANSFORMER IMPORTS
import linzessCleanupTransformer from './transformers/linzess-cleanup.js';
import linzessSectionsTransformer from './transformers/linzess-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-home': heroHomeParser,
  'cards-promo': cardsPromoParser,
  'columns-quiz': columnsQuizParser,
  'stats': statsParser,
  'video-cards': videoCardsParser,
  'columns-savings': columnsSavingsParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Linzess homepage with hero banner, promo cards, gut check quiz CTA, statistics section, patient video testimonials, savings offer, and ISI regulatory content',
  urls: [
    'https://www.linzess.com/',
  ],
  blocks: [
    {
      name: 'hero-home',
      instances: ['.hero-container.Linzess-home-hero-belly-bnr'],
    },
    {
      name: 'cards-promo',
      instances: ['.eligible-tout.tablet-tout-row', '.flexbox-cards.margin-top-110'],
    },
    {
      name: 'columns-quiz',
      instances: ['.abbv-row-container.background-off-white.rounded-corners.image-text-wrapper.margin-top-80.tablet-tout-row'],
    },
    {
      name: 'stats',
      instances: ['.flexbox-cards.c-dark-purple.margin-top-80'],
    },
    {
      name: 'video-cards',
      instances: ['.flexbox-video-cards.home-flexbox-column'],
    },
    {
      name: 'columns-savings',
      instances: ['.savings-card-tout'],
    },
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero Banner',
      selector: '.hero-container.Linzess-home-hero-belly-bnr',
      style: null,
      blocks: ['hero-home'],
      defaultContent: [],
    },
    {
      id: 'section-2-promo',
      name: 'Promo Cards Row',
      selector: '.abbv-container.background-white.background-white-arc.home-background-white-arc',
      style: 'white-arc',
      blocks: ['cards-promo', 'columns-quiz'],
      defaultContent: ['.ibs-brief-section .footnote'],
    },
    {
      id: 'section-3-stats',
      name: 'Statistics & Community',
      selector: '.abbv-container.background-dark-purple.background-dark-purple-arc',
      style: 'dark-purple-arc',
      blocks: ['stats'],
      defaultContent: ['.max-690.text-align-center.c-linz-white.mb20-m .heading-1', '.max-690.text-align-center.c-linz-white.mb20-m p', '.footnote-content'],
    },
    {
      id: 'section-4-videos',
      name: 'Patient Video Testimonials',
      selector: '.flexbox-video-cards.home-flexbox-column',
      style: 'dark-purple',
      blocks: ['video-cards'],
      defaultContent: ['.cta.parbase .abbv-button-secondary'],
    },
    {
      id: 'section-5-savings',
      name: 'Savings Offer',
      selector: '.abbv-container.background-white.background-white-arc.pb24-m',
      style: 'white-arc',
      blocks: ['columns-savings'],
      defaultContent: ['.max-690.text-align-center.c-linz-dark-purple .heading-1', '.savings-footnote'],
    },
    {
      id: 'section-6-isi',
      name: 'ISI (Important Safety Information)',
      selector: '.abbv-inline-use-isi',
      style: null,
      blocks: [],
      defaultContent: ['.linzess-use-statement h3', '.linzess-use-statement p', '.linzess-isi-iri h3', '.linzess-isi-iri ul', '.linzess-isi-iri p'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  linzessCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [linzessSectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;
    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers

    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (section breaks + metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
