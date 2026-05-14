/* eslint-disable */
/* global WebImporter */

import heroResourcesParser from './parsers/hero-resources.js';
import cardsArticleParser from './parsers/cards-article.js';
import cardsTipsParser from './parsers/cards-tips.js';
import columnsDoctorCtaParser from './parsers/columns-doctor-cta.js';
import cardsResourceParser from './parsers/cards-resource.js';
import videoCardsParser from './parsers/video-cards.js';
import columnsSavingsParser from './parsers/columns-savings.js';
import columnsParser from './parsers/columns.js';

import resourcesCleanupTransformer from './transformers/resources-cleanup.js';
import resourcesSectionsTransformer from './transformers/resources-sections.js';

const parsers = {
  'hero-resources': heroResourcesParser,
  'cards-article': cardsArticleParser,
  'cards-tips': cardsTipsParser,
  'columns-doctor-cta': columnsDoctorCtaParser,
  'cards-resource': cardsResourceParser,
  'video-cards': videoCardsParser,
  'columns-savings': columnsSavingsParser,
  'columns': columnsParser,
};

const PAGE_TEMPLATE = {
  name: 'resources',
  description: 'Resources page with healthy routines, wellness tips, community resources, video testimonial, savings offer, and ISI regulatory content',
  urls: ['https://www.linzess.com/resources'],
  blocks: [
    { name: 'hero-resources', instances: ['.hero-container.uppercase'] },
    { name: 'cards-article', instances: ['.flexbox-article-cards.resources-flexbox-column'] },
    { name: 'cards-tips', instances: ['.wellness-tips-cards'] },
    { name: 'columns-doctor-cta', instances: ['.resources-tout'] },
    { name: 'cards-resource', instances: ['.flexbox-cards.resources-page'] },
    { name: 'video-cards', instances: ['.flexbox-video-cards--single'] },
    { name: 'columns-savings', instances: ['.savings-card-tout'] },
    { name: 'columns', instances: ['.bottom-nav .abbv-flex-container-v2'] },
  ],
  sections: [
    { id: 'section-1-hero', name: 'Hero Header', selector: '.hero-container.uppercase', style: null, blocks: ['hero-resources'], defaultContent: [] },
    { id: 'section-2-jumpnav', name: 'Jump Navigation', selector: '.linzess-jump-nav', style: null, blocks: [], defaultContent: [] },
    { id: 'section-3-routines', name: 'Healthy Routines', selector: '.abbv-container.background-white.background-white-arc', style: 'white-arc', blocks: ['cards-article'], defaultContent: [] },
    { id: 'section-4-tips', name: 'Wellness Tips', selector: '.abbv-container.background-dark-purple.background-dark-purple-arc', style: 'dark-purple-arc', blocks: ['cards-tips', 'cards-article', 'columns-doctor-cta'], defaultContent: [] },
    { id: 'section-5-community', name: 'Community Resources', selector: '.abbv-container.background-off-white', style: 'off-white-arc', blocks: ['cards-resource'], defaultContent: [] },
    { id: 'section-6-video', name: 'Video Testimonial', selector: '.flexbox-video-cards--single', style: null, blocks: ['video-cards'], defaultContent: [] },
    { id: 'section-7-savings', name: 'Savings Offer', selector: '.savings-card-tout', style: null, blocks: ['columns-savings'], defaultContent: [] },
    { id: 'section-8-bottomnav', name: 'Bottom Navigation CTAs', selector: '.bottom-nav', style: 'dark-purple-arc', blocks: ['columns'], defaultContent: [] },
    { id: 'section-9-isi', name: 'ISI', selector: '.abbv-inline-use-isi', style: null, blocks: [], defaultContent: ['.linzess-use-statement h3', '.linzess-use-statement p', '.linzess-isi-iri h3', '.linzess-isi-iri ul', '.linzess-isi-iri p'] },
  ],
};

const transformers = [
  resourcesCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [resourcesSectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
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
        pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
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

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

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
