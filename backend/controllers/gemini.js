import { GoogleGenAI } from '@google/genai';
import buildPrompt from '../promptbuilder.js';

export const callGeminiWithBuilder = async (data) => {
  // Client is created here (not at module load time) so that
  // dotenv.config() in index.js has already set GEMINI_API_KEY
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = buildPrompt(data);

  const response = await client.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};