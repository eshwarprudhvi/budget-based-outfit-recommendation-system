import { chromium } from "playwright";

/**
 * Search Amazon products
 * @param {string} query
 * @returns {Array}
 */
export async function searchAmazon(query) {
  console.log(`🔍 Searching Amazon for: ${query}`);

  const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;

  const results = [];

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // mimic real user
  await page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36"
  });

  try {
    await page.goto(url, { timeout: 30000 });

    await page.waitForSelector("div.s-main-slot div[data-asin]", {
      timeout: 15000
    });

    const cards = await page.$$("div.s-main-slot div[data-asin]");

    for (let i = 0; i < Math.min(cards.length, 10); i++) {
      const card = cards[i];

      try {
        const title = await card.$eval("h2 span", el => el.innerText).catch(() => null);
        const price = await card.$eval(".a-price-whole", el => el.innerText).catch(() => null);
        const image = await card.$eval("img.s-image", el => el.src).catch(() => null);
        const link = await card.$eval("a.a-link-normal", el => el.getAttribute("href")).catch(() => null);

        if (title) {
          results.push({
            title,
            price: price ? `₹${price}` : "N/A",
            image: image || "N/A",
            link: link ? `https://www.amazon.in${link}` : ""
          });
        }

      } catch (err) {
        continue;
      }
    }

  } catch (err) {
    console.error("Scraping error:", err.message);
  }

  await browser.close();

  return results;
}