import { callGeminiWithBuilder } from "./gemini.js";
import { searchAmazon } from "../amazon.js";

/**
 * POST /api/recommend
 * Body: { occasion, gender, budget, preferences, colors, optional_items }
 */
export const generateOutfit = async (req, res) => {
  try {
    const rawText = await callGeminiWithBuilder(req.body);

    // Strip markdown code fences if Gemini wraps the JSON
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();

    let outfits;
    try {
      outfits = JSON.parse(cleaned);
    } catch {
      // Return raw text if JSON parse fails (useful for debugging)
      return res.status(200).json({ success: true, raw_output: cleaned });
    }

    // 🔥 AMAZON INTEGRATION
    const finalResults = [];
    const searchCache = new Map(); // avoid duplicate searches

    for (const outfit of outfits) {
      const itemsWithProducts = [];

      for (const item of outfit.items) {
        const query = item.search_query;
        let products;

        if (searchCache.has(query)) {
          products = searchCache.get(query); // reuse cached result
        } else {
          console.log(`🔍 Searching Amazon for: ${query}`);
          products = await searchAmazon(query);
          searchCache.set(query, products); // cache it
        }

        itemsWithProducts.push({
          ...item,
          products: products.slice(0, 3), // top 3
        });
      }

      finalResults.push({
        outfit_id: outfit.outfit_id,
        items: itemsWithProducts,
      });
    }

    res.status(200).json({
      success: true,
      outfits: finalResults,
    });

  } catch (error) {
    console.error("Recommendation error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};