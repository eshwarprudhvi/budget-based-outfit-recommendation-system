import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Search Amazon products using axios + cheerio (no browser needed)
 * @param {string} query
 * @returns {Array}
 */
export async function searchAmazon(query) {
  console.log(`🔍 Searching Amazon for: ${query}`);

  const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;

  const results = [];

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(html);

    const cards = $("div.s-main-slot div[data-asin]");

    cards.each((i, el) => {
      if (i >= 10) return false; // limit to 10 results

      const card = $(el);

      const title = card.find("h2 span").text().trim() || null;
      const price = card.find(".a-price-whole").first().text().trim() || null;
      const image = card.find("img.s-image").attr("src") || null;
      const link = card.find("a.a-link-normal").attr("href") || null;

      if (title) {
        results.push({
          title,
          price: price ? `₹${price}` : "N/A",
          image: image || "N/A",
          link: link ? `https://www.amazon.in${link}` : "",
        });
      }
    });
  } catch (err) {
    console.error("Scraping error:", err.message);
  }

  return results;
}