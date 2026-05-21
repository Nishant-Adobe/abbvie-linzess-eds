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

  // tools/importer/import-savings-and-support.js
  var import_savings_and_support_exports = {};
  __export(import_savings_and_support_exports, {
    default: () => import_savings_and_support_default
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

  // tools/importer/parsers/columns-savings.js
  function parse2(element, { document }) {
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

  // tools/importer/parsers/cards-promo.js
  function parse3(element, { document }) {
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

  // tools/importer/parsers/accordion-legal.js
  function parse4(element, { document }) {
    const blades = element.querySelectorAll(".abbv-accordion-blade");
    const cells = [];
    blades.forEach((blade) => {
      const labelEl = blade.querySelector(".abbv-accordion-blade-text");
      const labelCell = [];
      if (labelEl) {
        const titleP = document.createElement("p");
        titleP.innerHTML = labelEl.innerHTML;
        labelCell.push(titleP);
      }
      const bodyEl = blade.querySelector(".abbv-accordion-content");
      const bodyCell = [];
      if (bodyEl) {
        const richText = bodyEl.querySelector(".abbv-rich-text");
        if (richText) {
          const children = Array.from(richText.children);
          children.forEach((child) => {
            bodyCell.push(child);
          });
        } else {
          const children = Array.from(bodyEl.children);
          children.forEach((child) => {
            bodyCell.push(child);
          });
        }
      }
      cells.push([labelCell, bodyCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-legal", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-insurance.js
  function parse5(element, { document }) {
    const rows = element.querySelectorAll(":scope > .table-row");
    const cells = [];
    rows.forEach((row) => {
      const cellElements = row.querySelectorAll(":scope > .table-cell");
      const rowCells = [];
      cellElements.forEach((cell) => {
        const container = document.createElement("div");
        Array.from(cell.childNodes).forEach((node) => {
          container.appendChild(node.cloneNode(true));
        });
        rowCells.push(container);
      });
      if (rowCells.length > 0) {
        cells.push(rowCells);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "table-insurance", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-resource.js
  function parse6(element, { document }) {
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

  // tools/importer/parsers/columns-doctor-cta.js
  function parse7(element, { document }) {
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

  // tools/importer/parsers/columns-nav-cta.js
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
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-nav-cta", cells });
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
      WebImporter.DOMUtils.remove(element, [
        ".abbv-dimmer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-back-to-top"
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

  // tools/importer/import-savings-and-support.js
  var parsers = {
    "hero-resources": parse,
    "columns-savings": parse2,
    "cards-promo": parse3,
    "accordion-legal": parse4,
    "table-insurance": parse5,
    "cards-resource": parse6,
    "columns-doctor-cta": parse7,
    "columns-nav-cta": parse8
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "savings-and-support",
    urls: [
      "https://www.linzess.com/savings-and-support"
    ],
    description: "Savings and support page with cost savings programs, insurance information, patient support resources, and assistance options for Linzess",
    blocks: [
      {
        name: "hero-resources",
        instances: [".hero-container.uppercase"]
      },
      {
        name: "columns-savings",
        instances: [".savings-card-tout"]
      },
      {
        name: "cards-promo",
        instances: [".savings-card-cards"]
      },
      {
        name: "accordion-legal",
        instances: [".abbv-accordion-single"]
      },
      {
        name: "table-insurance",
        instances: [".table-container"]
      },
      {
        name: "cards-resource",
        instances: [".abbv-container.background-off-white .abbv-flex-container-v2.flexbox-cards"]
      },
      {
        name: "columns-doctor-cta",
        instances: [".resources-tout"]
      },
      {
        name: "columns-nav-cta",
        instances: [".bottom-nav .abbv-flex-container-v2"]
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero",
        selector: ".hero-container.uppercase",
        style: null,
        blocks: ["hero-resources"],
        defaultContent: []
      },
      {
        id: "section-2-savings",
        name: "Savings",
        selector: ".abbv-container.background-white.background-white-arc",
        style: "white-arc",
        blocks: ["columns-savings", "cards-promo", "accordion-legal"],
        defaultContent: [".abbv-rich-text.text-align-center.narrow-spacing.max-auto.padding-lr-8-m .eyebrow", ".abbv-rich-text.text-align-center.narrow-spacing.max-auto.padding-lr-8-m .divider", ".abbv-rich-text.text-align-center.narrow-spacing.max-auto.padding-lr-8-m .heading-1", ".abbv-rich-text.text-align-center.narrow-spacing.max-auto .heading-2", ".abbv-rich-text.footnote.text-align-left"]
      },
      {
        id: "section-3-financial-support",
        name: "Financial Support",
        selector: ".abbv-container.background-off-white.background-off-white-arc",
        style: "off-white-arc",
        blocks: ["table-insurance", "cards-resource", "columns-doctor-cta"],
        defaultContent: [".savings-table .eyebrow", ".savings-table .divider", ".savings-table .heading-1", ".savings-table .mb32", ".savings-table .heading-2", ".abbv-rich-text.footnote.text-align-left.max-auto.mb4"]
      },
      {
        id: "section-4-bottom-nav",
        name: "Bottom Navigation CTAs",
        selector: ".abbv-container.background-dark-purple.background-dark-purple-arc.bottom-nav",
        style: "dark-purple-arc",
        blocks: ["columns-nav-cta"],
        defaultContent: []
      },
      {
        id: "section-5-isi",
        name: "ISI",
        selector: ".abbv-inline-use-isi",
        style: null,
        blocks: [],
        defaultContent: [".linzess-use-statement h3", ".linzess-use-statement p", ".linzess-isi-iri h3", ".linzess-isi-iri ul", ".linzess-isi-iri p"]
      }
    ]
  };
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
  var import_savings_and_support_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
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
  return __toCommonJS(import_savings_and_support_exports);
})();
