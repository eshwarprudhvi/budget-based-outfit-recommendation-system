import axios from "axios";
import dotenv from "dotenv";
import buildPrompt from "../promptbuilder.js";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();

console.log("API Key exists:", !!GEMINI_API_KEY);

/**
 * Call Gemini API with raw prompt string
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function callGemini(prompt) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error("Gemini API failed");
  }
}

/**
 * Call Gemini API using the prompt builder
 * @param {object} data - User input data for buildPrompt
 * @returns {Promise<string>}
 */
export async function callGeminiWithBuilder(data) {
  const prompt = buildPrompt(data);
  return callGemini(prompt);
}