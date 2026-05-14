/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-home.js
  function parse(element, { document }) {
    const picture = element.querySelector("picture");
    const eyebrow = element.querySelector(".abbv-stretched-card-body > p.tl-m");
    const heading = element.querySelector("h1.home-hero-title, h1, h2");
    const subtitle = element.querySelector("p.mb15-m, .abbv-stretched-card-body > p:last-of-type");
    const cta = element.querySelector('a.abbv-button-primary, a.abbv-image-text-link, a[class*="abbv-button"]');
    const cells = [];
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(" field:image "));
    if (picture) {
      imageCell.appendChild(picture);
    }
    cells.push([imageCell]);
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(" field:text "));
    if (eyebrow) textCell.appendChild(eyebrow);
    if (heading) textCell.appendChild(heading);
    if (subtitle) textCell.appendChild(subtitle);
    if (cta) {
      const p = document.createElement("p");
      p.appendChild(cta);
      textCell.appendChild(p);
    }
    cells.push([textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-home", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse2(element, { document }) {
    const cells = [];
    const isFlexboxCards = element.classList.contains("flexbox-cards") || element.querySelector(".abbv-flex-container-v2");
    const isEligibleTout = element.classList.contains("eligible-tout") || element.querySelector(".abbv-row-container");
    if (isFlexboxCards) {
      const flexContainer = element.classList.contains("abbv-flex-container-v2") ? element : element.querySelector(".abbv-flex-container-v2");
      const cardItems = flexContainer ? Array.from(flexContainer.querySelectorAll(":scope > .flexboxitem-v2")) : [];
      cardItems.forEach((item) => {
        const picture = item.querySelector(".abbv-image-content-container-v2 picture");
        const heading = item.querySelector(".abbv-stretched-card-body .heading-2, .abbv-stretched-card-body h2");
        const description = item.querySelector('.abbv-stretched-card-body p:not(.heading-2):not([class*="heading"])');
        const cta = item.querySelector(".cta a, a.abbv-button-primary, a.abbv-button-secondary");
        const imageCell = document.createDocumentFragment();
        imageCell.appendChild(document.createComment(" field:image "));
        if (picture) {
          imageCell.appendChild(picture);
        }
        const textCell = document.createDocumentFragment();
        textCell.appendChild(document.createComment(" field:text "));
        if (heading) textCell.appendChild(heading);
        if (description) textCell.appendChild(description);
        if (cta) textCell.appendChild(cta);
        cells.push([imageCell, textCell]);
      });
    } else if (isEligibleTout) {
      const imageCol = element.querySelector(".abbv-col:first-child, .abbv-col-6:first-child");
      const textCol = element.querySelector(".abbv-col:nth-child(2), .abbv-col-6:nth-child(2), .abbv-col + .abbv-col");
      const picture = imageCol ? imageCol.querySelector("picture") : null;
      const heading = textCol ? textCol.querySelector(".heading-2, h2, p.heading-2") : null;
      const cta = textCol ? textCol.querySelector(".cta a, a.abbv-button-primary") : null;
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      if (picture) {
        imageCell.appendChild(picture);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (heading) textCell.appendChild(heading);
      if (cta) textCell.appendChild(cta);
      cells.push([imageCell, textCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-quiz.js
  function parse3(element, { document }) {
    const imageContainer = element.querySelector(".abbv-col:first-child");
    const image = imageContainer ? imageContainer.querySelector("picture, img") : null;
    const overlayText = imageContainer ? imageContainer.querySelector(".tout-overlay, .abbv-stretched-card-body p") : null;
    const leftCell = [];
    if (image) {
      const pictureEl = imageContainer.querySelector("picture");
      if (pictureEl) {
        leftCell.push(pictureEl);
      } else if (image) {
        leftCell.push(image);
      }
    }
    if (overlayText) {
      leftCell.push(overlayText);
    }
    const contentContainer = element.querySelector(".abbv-col:nth-child(2), .abbv-col:last-child");
    const heading = contentContainer ? contentContainer.querySelector('.heading-2, h2, [class*="heading"]') : null;
    const description = contentContainer ? contentContainer.querySelector('.abbv-rich-text p:not([class*="heading"]), .abbv-rich-text-common p:not([class*="heading"])') : null;
    const ctaLink = contentContainer ? contentContainer.querySelector(".cta a, a.abbv-button-primary, a.abbv-button-primary-v2") : null;
    const rightCell = [];
    if (heading) rightCell.push(heading);
    if (description) rightCell.push(description);
    if (ctaLink) rightCell.push(ctaLink);
    const cells = [
      [leftCell.length > 0 ? leftCell : "", rightCell.length > 0 ? rightCell : ""]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-quiz", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/stats.js
  function parse4(element, { document }) {
    const cards = element.querySelectorAll(":scope > .flexboxitem-v2");
    const cells = [];
    cards.forEach((card) => {
      const richText = card.querySelector(".abbv-rich-text");
      if (!richText) return;
      const numberParagraph = richText.querySelector('p.circle, p[class*="circle"]');
      const descriptionParagraph = richText.querySelector('p.mb24-m, p:not(.circle):not([class*="circle"])');
      const cellContent = [];
      if (numberParagraph) {
        cellContent.push(numberParagraph);
      }
      if (descriptionParagraph) {
        cellContent.push(descriptionParagraph);
      }
      if (cellContent.length > 0) {
        cells.push([cellContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/video-cards.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(".flexboxitem-v2, :scope > .abbv-flex-item-v2");
    const cells = [];
    cards.forEach((card) => {
      let posterSrc = "";
      const posterImg = card.querySelector(".vjs-poster img, .abbv-video-container img, video-js img");
      if (posterImg && posterImg.getAttribute("src")) {
        posterSrc = posterImg.getAttribute("src");
      }
      if (!posterSrc) {
        const videoEl = card.querySelector("video[poster]");
        if (videoEl) {
          posterSrc = videoEl.getAttribute("poster");
        }
      }
      if (!posterSrc) {
        const posterDiv = card.querySelector(".vjs-poster");
        if (posterDiv) {
          const style = posterDiv.getAttribute("style") || "";
          const bgMatch = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
          if (bgMatch) {
            posterSrc = bgMatch[1];
          }
        }
      }
      const imageCell = [];
      if (posterSrc) {
        const img = document.createElement("img");
        img.src = posterSrc;
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createComment(" field:image "));
        frag.appendChild(img);
        imageCell.push(frag);
      }
      const contentContainer = card.querySelector(".abbv-video-content");
      const contentCell = [];
      if (contentContainer) {
        const title = contentContainer.querySelector("h3");
        if (title) {
          const titleFrag = document.createDocumentFragment();
          titleFrag.appendChild(document.createComment(" field:title "));
          const h3 = document.createElement("h3");
          h3.textContent = title.textContent.trim();
          titleFrag.appendChild(h3);
          contentCell.push(titleFrag);
        }
        const paragraphs = contentContainer.querySelectorAll("p");
        let quoteText = "";
        paragraphs.forEach((p) => {
          const text = p.textContent.trim();
          if (text && text.length > 1 && !quoteText) {
            quoteText = text;
          }
        });
        if (quoteText) {
          const quoteFrag = document.createDocumentFragment();
          quoteFrag.appendChild(document.createComment(" field:description "));
          const p = document.createElement("p");
          p.textContent = quoteText;
          quoteFrag.appendChild(p);
          contentCell.push(quoteFrag);
        }
        const transcriptLink = contentContainer.querySelector('a.transcript-link, a[href*="transcript"]');
        if (transcriptLink) {
          const linkFrag = document.createDocumentFragment();
          linkFrag.appendChild(document.createComment(" field:link "));
          const a = document.createElement("a");
          a.href = transcriptLink.getAttribute("href") || transcriptLink.href;
          a.textContent = transcriptLink.textContent.trim();
          linkFrag.appendChild(a);
          contentCell.push(linkFrag);
        }
      }
      if (imageCell.length || contentCell.length) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "video-cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-savings.js
  function parse6(element, { document }) {
    const cols = element.querySelectorAll('.abbv-col, [class*="abbv-col-6"]');
    const leftCol = cols[0];
    const image = leftCol ? leftCol.querySelector("picture, img") : element.querySelector("picture, img");
    const rightCol = cols.length > 1 ? cols[1] : element;
    const heading = rightCol.querySelector("p.heading-2, .heading-2, h2");
    const description = rightCol.querySelector("p.mt15, p.mb24");
    const primaryCta = rightCol.querySelector(".cta a, a.abbv-button-primary, a.abbv-button-primary-v2");
    const richTextSections = rightCol.querySelectorAll(".rich-text");
    let secondaryText = null;
    if (richTextSections.length > 1) {
      secondaryText = richTextSections[richTextSections.length - 1].querySelector("p");
    } else {
      secondaryText = rightCol.querySelector("p.mb32-m");
    }
    const leftCellContent = [];
    if (image) leftCellContent.push(image);
    const rightCellContent = [];
    if (heading) rightCellContent.push(heading);
    if (description) rightCellContent.push(description);
    if (primaryCta) rightCellContent.push(primaryCta);
    if (secondaryText) rightCellContent.push(secondaryText);
    const cells = [
      [leftCellContent, rightCellContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-savings", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/linzess-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-modal"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".grecaptcha-badge"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header.abbv-header-v2"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".linzess-top-banner"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "footer.abbv-footer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-safety-bar"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".newpar",
        ".par.iparys_inherited"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-sticky-anchor"
      ]);
      const svgDefs = element.querySelectorAll('img[src^="data:image/svg+xml"]');
      svgDefs.forEach((img) => img.remove());
      WebImporter.DOMUtils.remove(element, [
        ".abbv-social-copy"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".header-v2.parbase"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".footer.parbase"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".safety-bar.parbase"
      ]);
    }
  }

  // tools/importer/transformers/linzess-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = payload;
      const template = payload.template;
      if (!template || !template.sections || template.sections.length < 2) {
        return;
      }
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) {
          continue;
        }
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-home": parse,
    "cards-promo": parse2,
    "columns-quiz": parse3,
    "stats": parse4,
    "video-cards": parse5,
    "columns-savings": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Linzess homepage with hero banner, promo cards, gut check quiz CTA, statistics section, patient video testimonials, savings offer, and ISI regulatory content",
    urls: [
      "https://www.linzess.com/"
    ],
    blocks: [
      {
        name: "hero-home",
        instances: [".hero-container.Linzess-home-hero-belly-bnr"]
      },
      {
        name: "cards-promo",
        instances: [".eligible-tout.tablet-tout-row", ".flexbox-cards.margin-top-110"]
      },
      {
        name: "columns-quiz",
        instances: [".abbv-row-container.background-off-white.rounded-corners.image-text-wrapper.margin-top-80.tablet-tout-row"]
      },
      {
        name: "stats",
        instances: [".flexbox-cards.c-dark-purple.margin-top-80"]
      },
      {
        name: "video-cards",
        instances: [".flexbox-video-cards.home-flexbox-column"]
      },
      {
        name: "columns-savings",
        instances: [".savings-card-tout"]
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero Banner",
        selector: ".hero-container.Linzess-home-hero-belly-bnr",
        style: null,
        blocks: ["hero-home"],
        defaultContent: []
      },
      {
        id: "section-2-promo",
        name: "Promo Cards Row",
        selector: ".abbv-container.background-white.background-white-arc.home-background-white-arc",
        style: "white-arc",
        blocks: ["cards-promo", "columns-quiz"],
        defaultContent: [".ibs-brief-section .footnote"]
      },
      {
        id: "section-3-stats",
        name: "Statistics & Community",
        selector: ".abbv-container.background-dark-purple.background-dark-purple-arc",
        style: "dark-purple-arc",
        blocks: ["stats"],
        defaultContent: [".max-690.text-align-center.c-linz-white.mb20-m .heading-1", ".max-690.text-align-center.c-linz-white.mb20-m p", ".footnote-content"]
      },
      {
        id: "section-4-videos",
        name: "Patient Video Testimonials",
        selector: ".flexbox-video-cards.home-flexbox-column",
        style: "dark-purple",
        blocks: ["video-cards"],
        defaultContent: [".cta.parbase .abbv-button-secondary"]
      },
      {
        id: "section-5-savings",
        name: "Savings Offer",
        selector: ".abbv-container.background-white.background-white-arc.pb24-m",
        style: "white-arc",
        blocks: ["columns-savings"],
        defaultContent: [".max-690.text-align-center.c-linz-dark-purple .heading-1", ".savings-footnote"]
      },
      {
        id: "section-6-isi",
        name: "ISI (Important Safety Information)",
        selector: ".abbv-inline-use-isi",
        style: null,
        blocks: [],
        defaultContent: [".linzess-use-statement h3", ".linzess-use-statement p", ".linzess-isi-iri h3", ".linzess-isi-iri ul", ".linzess-isi-iri p"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
