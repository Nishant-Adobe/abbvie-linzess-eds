/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroResourcesParser from './parsers/hero-resources.js';
import columnsSavingsParser from './parsers/columns-savings.js';
import cardsPromoParser from './parsers/cards-promo.js';
import accordionLegalParser from './parsers/accordion-legal.js';
import tableInsuranceParser from './parsers/table-insurance.js';
import cardsResourceParser from './parsers/cards-resource.js';
import columnsDoctorCtaParser from './parsers/columns-doctor-cta.js';
import columnsNavCtaParser from './parsers/columns-nav-cta.js';

// TRANSFORMER IMPORTS
import linzessCleanupTransformer from './transformers/linzess-cleanup.js';
import linzessSectionsTransformer from './transformers/linzess-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-resources': heroResourcesParser,
  'columns-savings': columnsSavingsParser,
  'cards-promo': cardsPromoParser,
  'accordion-legal': accordionLegalParser,
  'table-insurance': tableInsuranceParser,
  'cards-resource': cardsResourceParser,
  'columns-doctor-cta': columnsDoctorCtaParser,
  'columns-nav-cta': columnsNavCtaParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  linzessCleanupTransformer,
  linzessSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'savings-and-support',
  urls: [
    'https://www.linzess.com/savings-and-support'
  ],
  description: 'Savings and support page with cost savings programs, insurance information, patient support resources, and assistance options for Linzess',
  blocks: [
    {
      name: 'hero-resources',
      instances: ['.hero-container.uppercase']
    },
    {
      name: 'columns-savings',
      instances: ['.savings-card-tout']
    },
    {
      name: 'cards-promo',
      instances: ['.savings-card-cards']
    },
    {
      name: 'accordion-legal',
      instances: ['.abbv-accordion-single']
    },
    {
      name: 'table-insurance',
      instances: ['.table-container']
    },
    {
      name: 'cards-resource',
      instances: ['.abbv-container.background-off-white .abbv-flex-container-v2.flexbox-cards']
    },
    {
      name: 'columns-doctor-cta',
      instances: ['.resources-tout']
    },
    {
      name: 'columns-nav-cta',
      instances: ['.bottom-nav .abbv-flex-container-v2']
    }
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero',
      selector: '.hero-container.uppercase',
      style: null,
      blocks: ['hero-resources'],
      defaultContent: []
    },
    {
      id: 'section-2-savings',
      name: 'Savings',
      selector: '.abbv-container.background-white.background-white-arc',
      style: 'white-arc',
      blocks: ['columns-savings', 'cards-promo', 'accordion-legal'],
      defaultContent: ['.abbv-rich-text.text-align-center.narrow-spacing.max-auto.padding-lr-8-m .eyebrow', '.abbv-rich-text.text-align-center.narrow-spacing.max-auto.padding-lr-8-m .divider', '.abbv-rich-text.text-align-center.narrow-spacing.max-auto.padding-lr-8-m .heading-1', '.abbv-rich-text.text-align-center.narrow-spacing.max-auto .heading-2', '.abbv-rich-text.footnote.text-align-left']
    },
    {
      id: 'section-3-financial-support',
      name: 'Financial Support',
      selector: '.abbv-container.background-off-white.background-off-white-arc',
      style: 'off-white-arc',
      blocks: ['table-insurance', 'cards-resource', 'columns-doctor-cta'],
      defaultContent: ['.savings-table .eyebrow', '.savings-table .divider', '.savings-table .heading-1', '.savings-table .mb32', '.savings-table .heading-2', '.abbv-rich-text.footnote.text-align-left.max-auto.mb4']
    },
    {
      id: 'section-4-bottom-nav',
      name: 'Bottom Navigation CTAs',
      selector: '.abbv-container.background-dark-purple.background-dark-purple-arc.bottom-nav',
      style: 'dark-purple-arc',
      blocks: ['columns-nav-cta'],
      defaultContent: []
    },
    {
      id: 'section-5-isi',
      name: 'ISI',
      selector: '.abbv-inline-use-isi',
      style: null,
      blocks: [],
      defaultContent: ['.linzess-use-statement h3', '.linzess-use-statement p', '.linzess-isi-iri h3', '.linzess-isi-iri ul', '.linzess-isi-iri p']
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 */
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

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
    const { document, url, html, params } = payload;

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

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
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
