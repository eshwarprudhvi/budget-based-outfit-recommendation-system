import axios from "axios";
import * as cheerio from "cheerio";

// Rotate User-Agents to reduce Amazon bot detection
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
];

const getRandomUA = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

/**
 * Search Amazon products using axios + cheerio (no browser needed)
 * @param {string} query
 * @param {number} delayMs - optional stagger delay before firing request
 * @returns {Array}
 */
export async function searchAmazon(query, delayMs = 0) {
  if (delayMs > 0) {
    await new Promise((r) => setTimeout(r, delayMs));
  }

  console.log(`🔍 Searching Amazon for: ${query}`);

  const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}&ref=sr_pg_1`;
  const results = [];

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": getRandomUA(),
        "Accept-Language": "en-IN,en;q=0.9",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
      },
      timeout: 12000,
    });

    const $ = cheerio.load(html);

    // Only select cards with a real ASIN (not ad-only empty slots)
    const cards = $("div.s-main-slot div[data-asin]").filter((_, el) => {
      const asin = $(el).attr("data-asin");
      return asin && asin.trim().length > 0;
    });

    cards.each((i, el) => {
      if (results.length >= 4) return false; // collect up to 4 real products

      const card = $(el);

      // Title — try multiple selectors Amazon uses
      const title =
        card.find("h2 a span").first().text().trim() ||
        card.find("h2 span.a-text-normal").first().text().trim() ||
        card.find("[data-cy='title-recipe'] span").first().text().trim() ||
        card.find("h2 span").first().text().trim() ||
        null;

      // Price — whole number part
      const price =
        card.find(".a-price .a-price-whole").first().text().trim() ||
        card.find(".a-price-whole").first().text().trim() ||
        null;

      // Image
      const image =
        card.find("img.s-image").attr("src") ||
        card.find(".s-image").attr("src") ||
        null;

      // Link — prefer the title link (a.a-link-normal that wraps h2)
      const rawLink =
        card.find("h2 a.a-link-normal").attr("href") ||
        card.find("a.a-link-normal[href*='/dp/']").first().attr("href") ||
        card.find("a.a-link-normal").first().attr("href") ||
        null;

      // Skip cards with no title or image (likely ad/sponsored empty shells)
      if (!title || !image) return;

      results.push({
        title,
        price: price ? `₹${price}` : "N/A",
        image,
        link: rawLink
          ? rawLink.startsWith("http")
            ? rawLink
            : `https://www.amazon.in${rawLink}`
          : "",
      });
    });

    if (results.length === 0) {
      console.warn(`⚠️ No products found for "${query}" — Amazon may have blocked the request.`);
    } else {
      console.log(`✅ Found ${results.length} products for "${query}"`);
    }
  } catch (err) {
    console.error(`❌ Scraping error for "${query}":`, err.message);
  }

  return results;
}