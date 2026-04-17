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

    // 🔥 AMAZON INTEGRATION — Staggered parallel scraping
    // Step 1: Collect all unique search queries across all outfits
    const uniqueQueries = [
      ...new Set(outfits.flatMap((o) => o.items.map((i) => i.search_query))),
    ];

    console.log(`🚀 Firing ${uniqueQueries.length} Amazon searches (staggered)...`);

    // Step 2: Stagger requests by 300ms each to avoid Amazon bot detection
    // e.g. 8 queries → query 0 fires at 0ms, query 7 fires at 2100ms
    // Still ~3x faster than fully sequential (no waiting for each response)
    const STAGGER_MS = 300;
    const searchResults = await Promise.all(
      uniqueQueries.map((query, i) => searchAmazon(query, i * STAGGER_MS))
    );

    // Step 3: Build a cache map from query → results
    const searchCache = new Map(
      uniqueQueries.map((query, i) => [query, searchResults[i]])
    );

    // Step 4: Assemble final results using cached data
    const finalResults = outfits.map((outfit) => ({
      outfit_id: outfit.outfit_id,
      items: outfit.items.map((item) => ({
        ...item,
        products: (searchCache.get(item.search_query) || []).slice(0, 3),
      })),
    }));

    res.status(200).json({
      success: true,
      outfits: finalResults,
    });

  } catch (error) {
    console.error("Recommendation error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};