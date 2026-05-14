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

  // tools/importer/import-resources.js
  var import_resources_exports = {};
  __export(import_resources_exports, {
    default: () => import_resources_default
  });

  // tools/importer/parsers/hero-resources.js
  function parse(element, { document }) {
    const picture = element.querySelector("picture");
    const img = element.querySelector("img");
    const imageCell = [];
    if (picture || img) {
      const imageEl = picture || img;
      const imageHint = document.createComment(" field:image ");
      const frag = document.createDocumentFragment();
      frag.appendChild(imageHint);
      frag.appendChild(imageEl);
      imageCell.push(frag);
    }
    const contentContainer = element.querySelector(
      ".abbv-stretched-card-body, .abbv-image-text-content-v2, .abbv-image-text-display-v2"
    );
    const textCell = [];
    const textFrag = document.createDocumentFragment();
    const textHint = document.createComment(" field:text ");
    textFrag.appendChild(textHint);
    if (contentContainer) {
      const eyebrow = contentContainer.querySelector('p.eyebrow, p[class*="eyebrow"]');
      if (eyebrow) {
        textFrag.appendChild(eyebrow);
      }
      const dividerP = contentContainer.querySelector('p:has(span.divider), p:has([class*="divider"])');
      if (dividerP) {
        textFrag.appendChild(dividerP);
      }
      const heading = contentContainer.querySelector("h1, h2, h3");
      if (heading) {
        textFrag.appendChild(heading);
      }
      const ctas = contentContainer.querySelectorAll('a.cta, a.button, a[class*="cta"], a[class*="button"]');
      ctas.forEach((cta) => textFrag.appendChild(cta));
    } else {
      const eyebrow = element.querySelector('p.eyebrow, p[class*="eyebrow"]');
      if (eyebrow) textFrag.appendChild(eyebrow);
      const heading = element.querySelector("h1, h2, h3");
      if (heading) textFrag.appendChild(heading);
    }
    textCell.push(textFrag);
    const cells = [];
    if (imageCell.length > 0) {
      cells.push(imageCell);
    }
    cells.push(textCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-resources", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse2(element, { document }) {
    const cardItems = element.querySelectorAll(".flexboxitem-v2");
    const cells = [];
    cardItems.forEach((card) => {
      const img = card.querySelector(".abbv-image-content-container-v2 img, .abbv-image-text-v2 img, img");
      const imageCell = document.createDocumentFragment();
      if (img) {
        imageCell.appendChild(document.createComment(" field:image "));
        imageCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      const cardBody = card.querySelector(".abbv-stretched-card-body");
      if (cardBody) {
        textCell.appendChild(document.createComment(" field:text "));
        const titleP = cardBody.querySelector("p b");
        if (titleP && titleP.parentElement) {
          textCell.appendChild(titleP.parentElement);
        }
        const allParagraphs = cardBody.querySelectorAll("p");
        allParagraphs.forEach((p) => {
          if (!p.querySelector("b")) {
            textCell.appendChild(p);
          }
        });
        const ctaLinks = cardBody.querySelectorAll('a.abbv-button-primary, a.abbv-image-text-link, a[class*="abbv-button"]');
        ctaLinks.forEach((link) => {
          if (!link.closest("p")) {
            textCell.appendChild(link);
          }
        });
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "cards-article",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tips.js
  function parse3(element, { document }) {
    const cardItems = element.querySelectorAll(":scope > .flexboxitem-v2");
    const cells = [];
    cardItems.forEach((card) => {
      const img = card.querySelector(".abbv-image-content-container-v2 img");
      const textContainer = card.querySelector(".abbv-stretched-card-body");
      const imageCell = document.createDocumentFragment();
      if (img) {
        imageCell.appendChild(document.createComment(" field:image "));
        imageCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      if (textContainer) {
        textCell.appendChild(document.createComment(" field:text "));
        const children = Array.from(textContainer.children);
        children.forEach((child) => {
          textCell.appendChild(child);
        });
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "cards-tips",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-doctor-cta.js
  function parse4(element, { document }) {
    const columns = element.querySelectorAll(":scope .abbv-col");
    const leftCol = columns[0];
    const rightCol = columns[1];
    const leftContent = [];
    const picture = leftCol ? leftCol.querySelector("picture") : null;
    if (picture) {
      leftContent.push(picture);
    } else {
      const img = leftCol ? leftCol.querySelector("img") : null;
      if (img) leftContent.push(img);
    }
    const overlayText = leftCol ? leftCol.querySelector("p.tout-overlay, .abbv-stretched-card-body p") : null;
    if (overlayText) {
      leftContent.push(overlayText);
    }
    const rightContent = [];
    const headingEl = rightCol ? rightCol.querySelector("p.heading-2, .abbv-rich-text p.heading-2") : null;
    if (headingEl) {
      const h2 = document.createElement("h2");
      h2.textContent = headingEl.textContent;
      rightContent.push(h2);
    } else {
      const fallbackHeading = rightCol ? rightCol.querySelector("h2, h3, h1") : null;
      if (fallbackHeading) rightContent.push(fallbackHeading);
    }
    if (rightCol) {
      const richTextContainer = rightCol.querySelector(".abbv-rich-text");
      if (richTextContainer) {
        const paragraphs = richTextContainer.querySelectorAll("p:not(.heading-2)");
        paragraphs.forEach((p) => {
          if (p.textContent.trim()) {
            rightContent.push(p);
          }
        });
      } else {
        const paragraphs = rightCol.querySelectorAll("p:not(.heading-2)");
        paragraphs.forEach((p) => {
          if (p.textContent.trim()) {
            rightContent.push(p);
          }
        });
      }
    }
    const ctaLink = rightCol ? rightCol.querySelector("a.abbv-button-primary, a.abbv-button-secondary, .cta a, a[href]") : null;
    if (ctaLink) {
      rightContent.push(ctaLink);
    }
    const cells = [
      [leftContent, rightContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-doctor-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-resource.js
  function parse5(element, { document }) {
    const cardItems = element.querySelectorAll(".flexboxitem-v2");
    const cells = [];
    cardItems.forEach((card) => {
      const img = card.querySelector("picture");
      const imageCell = document.createDocumentFragment();
      if (img) {
        imageCell.appendChild(document.createComment(" field:image "));
        imageCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      const heading = card.querySelector("p.heading-2");
      const description = card.querySelector(".abbv-stretched-card-body p:not(.heading-2)");
      const ctaLink = card.querySelector(".cta a");
      let hasTextContent = false;
      if (heading) {
        const h2 = document.createElement("h2");
        h2.textContent = heading.textContent.trim();
        if (!hasTextContent) {
          textCell.appendChild(document.createComment(" field:text "));
          hasTextContent = true;
        }
        textCell.appendChild(h2);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        if (!hasTextContent) {
          textCell.appendChild(document.createComment(" field:text "));
          hasTextContent = true;
        }
        textCell.appendChild(p);
      }
      if (ctaLink) {
        const a = document.createElement("a");
        a.href = ctaLink.href || "#";
        a.textContent = ctaLink.textContent.trim();
        if (!hasTextContent) {
          textCell.appendChild(document.createComment(" field:text "));
          hasTextContent = true;
        }
        const p = document.createElement("p");
        p.appendChild(a);
        textCell.appendChild(p);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-resource", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/video-cards.js
  function parse6(element, { document }) {
    const cardItems = element.querySelectorAll(".flexboxitem-v2");
    const cells = [];
    cardItems.forEach((card) => {
      const imageCell = document.createDocumentFragment();
      let posterImg = null;
      const videoEl = card.querySelector("video[poster]");
      if (videoEl && videoEl.getAttribute("poster")) {
        posterImg = document.createElement("img");
        posterImg.src = videoEl.getAttribute("poster");
        posterImg.alt = "";
      }
      if (!posterImg) {
        const posterDiv = card.querySelector(".vjs-poster");
        if (posterDiv) {
          const styleAttr = posterDiv.getAttribute("style") || "";
          const bgMatch = styleAttr.match(/url\(["']?([^"')]+)["']?\)/);
          if (bgMatch && bgMatch[1]) {
            posterImg = document.createElement("img");
            posterImg.src = bgMatch[1];
            posterImg.alt = "";
          }
        }
      }
      if (!posterImg) {
        const directImg = card.querySelector(".vjs-poster img");
        if (directImg && directImg.getAttribute("src")) {
          posterImg = directImg;
        }
      }
      if (posterImg) {
        imageCell.appendChild(document.createComment(" field:image "));
        imageCell.appendChild(posterImg);
      }
      const textCell = document.createDocumentFragment();
      const videoContent = card.querySelector(".abbv-video-content");
      if (videoContent) {
        textCell.appendChild(document.createComment(" field:text "));
        const title = videoContent.querySelector("h3, h2, h4");
        if (title) {
          textCell.appendChild(title);
        }
        const paragraphs = videoContent.querySelectorAll("p");
        paragraphs.forEach((p) => {
          if (p.textContent.trim()) {
            textCell.appendChild(p);
          }
        });
        const transcriptLink = videoContent.querySelector('a.transcript-link, a[href*="transcript"]');
        if (transcriptLink) {
          const linkP = document.createElement("p");
          linkP.appendChild(transcriptLink);
          textCell.appendChild(linkP);
        }
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "video-cards",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-savings.js
  function parse7(element, { document }) {
    const leftCol = element.querySelector(".abbv-col:first-child, .abbv-col-6:first-child");
    const picture = leftCol ? leftCol.querySelector("picture") : element.querySelector("picture");
    const leftContent = [];
    if (picture) {
      leftContent.push(picture);
    } else {
      const img = leftCol ? leftCol.querySelector("img") : element.querySelector("img");
      if (img) leftContent.push(img);
    }
    const rightCol = element.querySelector(".abbv-col:nth-child(2), .abbv-col-6:nth-child(2)");
    const rightContent = [];
    if (rightCol) {
      const heading = rightCol.querySelector(".heading-2, h2, h1, h3");
      if (heading) rightContent.push(heading);
      const richTextBlocks = rightCol.querySelectorAll(".abbv-rich-text");
      if (richTextBlocks.length > 0) {
        const firstRichText = richTextBlocks[0];
        const paragraphs = firstRichText.querySelectorAll("p");
        paragraphs.forEach((p) => {
          if (!p.classList.contains("heading-2") && !p.querySelector("h1, h2, h3") && p !== heading) {
            rightContent.push(p);
          }
        });
      }
      const ctaLink = rightCol.querySelector(".cta a, a.abbv-button-primary, a.abbv-button-primary-v2");
      if (ctaLink) rightContent.push(ctaLink);
      if (richTextBlocks.length > 1) {
        const secondaryRichText = richTextBlocks[richTextBlocks.length - 1];
        const secondaryParas = secondaryRichText.querySelectorAll("p");
        secondaryParas.forEach((p) => {
          rightContent.push(p);
        });
      }
    }
    const cells = [
      [leftContent, rightContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-savings", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse8(element, { document }) {
    const flexItems = element.querySelectorAll(":scope .abbv-flex-item-v2");
    const row = [];
    flexItems.forEach((item) => {
      const cellContent = [];
      const heading = item.querySelector("p.heading-2, .abbv-rich-text p, .rich-text p");
      if (heading) {
        const h2 = document.createElement("h2");
        h2.textContent = heading.textContent;
        cellContent.push(h2);
      }
      const ctaLink = item.querySelector(".cta a, a.abbv-button-primary, a[href]");
      if (ctaLink) {
        const link = document.createElement("a");
        link.href = ctaLink.href;
        link.textContent = ctaLink.textContent.trim();
        cellContent.push(link);
      }
      row.push(cellContent);
    });
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/resources-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        ".abbv-modal",
        // All modal dialogs: WOL, HCP, telemed, terms, share, etc.
        "#onetrust-consent-sdk",
        // OneTrust cookie consent banner (line 3007 in captured DOM)
        ".abbv-dimmer"
        // Modal dimmer overlay (line 1554 in captured DOM)
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        // Site header with nav (line 20: header.abbv-header-v2)
        "footer",
        // Site footer (line 1372: footer.abbv-footer)
        ".linzess-top-banner",
        // Top promotional banner (line 13)
        ".abbv-back-to-top",
        // Back to top button (line 1557)
        ".abbv-sticky-anchor",
        // Sticky anchor divs (lines 229, 263)
        "noscript",
        // noscript elements
        "link",
        // link elements
        "source"
        // source elements (inside picture tags, already handled by img)
      ]);
    }
  }

  // tools/importer/transformers/resources-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      const selectorFallbacks = {
        ".linzess-jump-nav": ".section-navigation"
      };
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        let sectionEl = element.querySelector(section.selector);
        if (!sectionEl && selectorFallbacks[section.selector]) {
          sectionEl = element.querySelector(selectorFallbacks[section.selector]);
        }
        if (!sectionEl) continue;
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

  // tools/importer/import-resources.js
  var parsers = {
    "hero-resources": parse,
    "cards-article": parse2,
    "cards-tips": parse3,
    "columns-doctor-cta": parse4,
    "cards-resource": parse5,
    "video-cards": parse6,
    "columns-savings": parse7,
    "columns": parse8
  };
  var PAGE_TEMPLATE = {
    name: "resources",
    description: "Resources page with healthy routines, wellness tips, community resources, video testimonial, savings offer, and ISI regulatory content",
    urls: ["https://www.linzess.com/resources"],
    blocks: [
      { name: "hero-resources", instances: [".hero-container.uppercase"] },
      { name: "cards-article", instances: [".flexbox-article-cards.resources-flexbox-column"] },
      { name: "cards-tips", instances: [".wellness-tips-cards"] },
      { name: "columns-doctor-cta", instances: [".resources-tout"] },
      { name: "cards-resource", instances: [".flexbox-cards.resources-page"] },
      { name: "video-cards", instances: [".flexbox-video-cards--single"] },
      { name: "columns-savings", instances: [".savings-card-tout"] },
      { name: "columns", instances: [".bottom-nav .abbv-flex-container-v2"] }
    ],
    sections: [
      { id: "section-1-hero", name: "Hero Header", selector: ".hero-container.uppercase", style: null, blocks: ["hero-resources"], defaultContent: [] },
      { id: "section-2-jumpnav", name: "Jump Navigation", selector: ".linzess-jump-nav", style: null, blocks: [], defaultContent: [] },
      { id: "section-3-routines", name: "Healthy Routines", selector: ".abbv-container.background-white.background-white-arc", style: "white-arc", blocks: ["cards-article"], defaultContent: [] },
      { id: "section-4-tips", name: "Wellness Tips", selector: ".abbv-container.background-dark-purple.background-dark-purple-arc", style: "dark-purple-arc", blocks: ["cards-tips", "cards-article", "columns-doctor-cta"], defaultContent: [] },
      { id: "section-5-community", name: "Community Resources", selector: ".abbv-container.background-off-white", style: "off-white-arc", blocks: ["cards-resource"], defaultContent: [] },
      { id: "section-6-video", name: "Video Testimonial", selector: ".flexbox-video-cards--single", style: null, blocks: ["video-cards"], defaultContent: [] },
      { id: "section-7-savings", name: "Savings Offer", selector: ".savings-card-tout", style: null, blocks: ["columns-savings"], defaultContent: [] },
      { id: "section-8-bottomnav", name: "Bottom Navigation CTAs", selector: ".bottom-nav", style: "dark-purple-arc", blocks: ["columns"], defaultContent: [] },
      { id: "section-9-isi", name: "ISI", selector: ".abbv-inline-use-isi", style: null, blocks: [], defaultContent: [".linzess-use-statement h3", ".linzess-use-statement p", ".linzess-isi-iri h3", ".linzess-isi-iri ul", ".linzess-isi-iri p"] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
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
  var import_resources_default = {
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
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
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
  return __toCommonJS(import_resources_exports);
})();
