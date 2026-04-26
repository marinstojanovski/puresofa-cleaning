#!/usr/bin/env node
/**
 * fetch-images.js
 *
 * Fetches all pages of https://chemiadoprania.pl/brand/global-clean/,
 * extracts the real wp-content/uploads image URLs (not base64 lazy placeholders),
 * matches each scraped product to our catalog by name/code,
 * and writes the updated public/products.json with imageUrl filled in.
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://chemiadoprania.pl/brand/global-clean/";
const PRODUCTS_PATH = path.join(__dirname, "public", "products.json");
const TOTAL_PAGES = 6;

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return fetchUrl(res.headers.location).then(resolve).catch(reject);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      }
    );
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error(`Timeout fetching ${url}`));
    });
  });
}

/**
 * Parse product entries from a page's HTML.
 *
 * The site (WoodMart/WooCommerce theme) renders each product as a div
 * with class "type-product". The product link has an aria-label with the
 * product name, and the thumbnail <img> uses data-src / data-srcset for
 * lazy loading (src is a base64 placeholder).
 *
 * Strategy: find every <a class="wd-product-img-link" aria-label="...">
 * block, extract the name from aria-label and the image from the next
 * data-src / data-srcset attribute.
 */
function parseProducts(html) {
  const products = [];

  // Match product link blocks: <a class="...wd-product-img-link..." aria-label="NAME">...<img data-src="URL".../>
  // We look for each product link anchor then grab the nearby img
  const productLinkRegex =
    /<a[^>]+class="[^"]*wd-product-img-link[^"]*"[^>]+aria-label="([^"]+)"[^>]*>([\s\S]{0,2000}?)<\/a>/gi;

  let m;
  while ((m = productLinkRegex.exec(html)) !== null) {
    const rawName = m[1]
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/&#\d+;/g, "")
      .trim();

    const block = m[2];

    let imageUrl = "";

    // Try data-src
    const dataSrcM =
      block.match(/data-src="([^"]+)"/i) ||
      block.match(/data-lazy-src="([^"]+)"/i);
    if (dataSrcM && !dataSrcM[1].startsWith("data:")) {
      imageUrl = dataSrcM[1];
    }

    // Prefer the largest from data-srcset (highest w descriptor)
    const srcsetM =
      block.match(/data-srcset="([^"]+)"/i) ||
      block.match(/srcset="([^"]+)"/i);
    if (srcsetM) {
      const entries = srcsetM[1].split(",").map((e) => e.trim());
      let bestUrl = imageUrl;
      let bestW = 0;
      for (const entry of entries) {
        const parts = entry.split(/\s+/);
        if (!parts[0] || parts[0].startsWith("data:")) continue;
        const wM = parts[1] ? parts[1].match(/^(\d+)w$/) : null;
        const w = wM ? parseInt(wM[1], 10) : 0;
        if (w > bestW) {
          bestW = w;
          bestUrl = parts[0];
        }
      }
      if (bestUrl) imageUrl = bestUrl;
    }

    // Fallback: extract from src if nothing found yet
    if (!imageUrl) {
      const srcM = block.match(/\bsrc="([^"]+)"/i);
      if (srcM && !srcM[1].startsWith("data:") && srcM[1].includes("wp-content")) {
        imageUrl = srcM[1];
      }
    }

    // Reject non-upload URLs
    if (imageUrl && !imageUrl.includes("wp-content/uploads")) {
      imageUrl = "";
    }

    products.push({ name: rawName, imageUrl });
    console.log(`  Found: "${rawName}" → ${imageUrl || "(no image)"}`);
  }

  return products;
}

/** Normalise string: lowercase, strip punctuation, collapse spaces. */
function normalise(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(str) {
  return new Set(normalise(str).split(" ").filter(Boolean));
}

/**
 * Score a scraped product name against a catalog entry.
 * Higher = better match.
 */
function matchScore(scrapedName, catalogProduct) {
  const sT = tokenSet(scrapedName);
  const cT = tokenSet(`${catalogProduct.name} ${catalogProduct.code}`);

  let score = 0;
  for (const t of sT) {
    if (cT.has(t)) score++;
  }

  // Extra weight for an exact code token match
  const code = normalise(catalogProduct.code).replace(/\s/g, "");
  if (sT.has(code)) score += 3;

  // Extra weight for a code fragment (e.g. "r130" in "power blast r130")
  for (const t of sT) {
    if (code.includes(t) && t.length >= 3) score += 1;
  }

  return score;
}

async function main() {
  console.log("=== PureSofa Cleaning — Image Fetcher ===\n");

  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf-8"));
  console.log(`Loaded ${products.length} products from products.json\n`);

  const allScraped = [];

  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const url =
      page === 1 ? BASE_URL : `${BASE_URL}page/${page}/`;
    console.log(`Fetching page ${page}: ${url}`);

    try {
      const html = await fetchUrl(url);
      const found = parseProducts(html);
      console.log(`  → ${found.length} products on page ${page}\n`);
      allScraped.push(...found);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }

    if (page < TOTAL_PAGES) await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\nTotal scraped entries: ${allScraped.length}`);
  if (allScraped.length === 0) {
    console.error("No products scraped — site may have changed structure.");
    process.exit(1);
  }

  console.log("\nMatching to catalog...\n");

  let matched = 0;
  let skipped = 0;

  for (const product of products) {
    let bestScore = 0;
    let bestScraped = null;

    for (const scraped of allScraped) {
      const score = matchScore(scraped.name, product);
      if (score > bestScore) {
        bestScore = score;
        bestScraped = scraped;
      }
    }

    if (bestScraped && bestScraped.imageUrl && bestScore >= 2) {
      product.imageUrl = bestScraped.imageUrl;
      console.log(
        `✓ ${product.name} ${product.size}\n  ← "${bestScraped.name}" (score ${bestScore})\n  → ${product.imageUrl}\n`
      );
      matched++;
    } else {
      console.log(
        `✗ ${product.name} ${product.size} — no match` +
          (bestScraped ? ` (best: "${bestScraped.name}", score ${bestScore})` : "") +
          "\n"
      );
      skipped++;
    }
  }

  console.log(`✓ Matched: ${matched}  ✗ Unmatched: ${skipped}`);

  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2), "utf-8");
  console.log(`\nWrote updated products.json → ${PRODUCTS_PATH}`);
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
