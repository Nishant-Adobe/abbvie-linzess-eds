/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsParser from './parsers/columns.js';

// TRANSFORMER IMPORTS
import sitemapCleanupTransformer from './transformers/sitemap-cleanup.js';
import sitemapSectionsTransformer from './transformers/sitemap-sections.js';

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'sitemap',
  description: 'Sitemap page with categorized navigation links in columns layout and ISI regulatory content',
  urls: [
    'https://www.linzess.com/sitemap',
  ],
  blocks: [
    {
      name: 'columns',
      instances: ['.abbv-row-container.sitemap-col'],
    },
  ],
  sections: [
    {
      id: 'section-1-header',
      name: 'Sitemap Header',
      selector: '.abbv-rich-text.text-align-center',
      style: null,
      blocks: [],
      defaultContent: ['.divider', 'h1.c-linz-dark-purple'],
    },
    {
      id: 'section-2-columns',
      name: 'Sitemap Link Columns',
      selector: '.linzess-sitemap',
      style: null,
      blocks: ['columns'],
      defaultContent: [],
    },
    {
      id: 'section-3-isi',
      name: 'ISI (Important Safety Information)',
      selector: '.abbv-inline-use-isi',
      style: null,
      blocks: [],
      defaultContent: ['.linzess-use-statement h3', '.linzess-use-statement p', '.linzess-isi-iri h3', '.linzess-isi-iri ul', '.linzess-isi-iri p'],
    },
  ],
};

// PARSER REGISTRY
const parsers = {
  'columns': columnsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  sitemapCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sitemapSectionsTransformer] : []),
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

    // 4. Execute afterTransform transformers (section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
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
