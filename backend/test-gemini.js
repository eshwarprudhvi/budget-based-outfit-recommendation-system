import { callGeminiWithBuilder } from "./controllers/gemini.js";

// Sample test data
const testData = {
  occasion: "casual",
  gender: "male",
  budget: 3000,
  preferences: [
    { item: "shirt", weight: 50 },
    { item: "pant", weight: 30 },
    { item: "shoes", weight: 20 }
  ],
  colors: ["blue", "black"],
  optional_items: ["belt"]
};

console.log("Running Gemini test with promptbuilder...\n");

callGeminiWithBuilder(testData)
  .then((result) => {
    console.log("✅ Gemini Response:\n");
    console.log(result);
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
  });
