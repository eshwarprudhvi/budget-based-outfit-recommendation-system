from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
from google import genai
from dotenv import load_dotenv
from scraper import scrape_multiple
import os

load_dotenv()

# ── SETUP ──
app = FastAPI()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── REQUEST MODEL ──
class OutfitRequest(BaseModel):
    budget: int
    gender: str
    occasion: str
    style: str
    colors: List[str]
    prompt: Optional[str] = ""
    includes: Dict[str, bool]
    priorities: Dict[str, int]

# ── SCRAPE REQUEST MODEL ──
class ScrapeRequest(BaseModel):
    queries: List[str]
    max_results: Optional[int] = 5

# ── HEALTH CHECK ──
@app.get("/")
def root():
    return {"message": "🐍 ML Service running!"}

@app.get("/models")
async def list_models():
    try:
        models = client.models.list()
        return {"models": [m.name for m in models]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# ── AMAZON SCRAPE ──
@app.post("/scrape")
async def scrape_products(data: ScrapeRequest):
    """
    Accepts a list of search_query strings (from Gemini output).
    Returns Amazon product results for each query:
      { query: [ { title, price, image, link } ] }
    """
    try:
        results = scrape_multiple(data.queries, max_results=data.max_results)
        return { "success": True, "results": results }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── GENERATE OUTFIT ──
@app.post("/generate")
async def generate_outfit(data: OutfitRequest):
    try:
        # Build includes list
        included_items = [
            item for item, included
            in data.includes.items()
            if included
        ]

        # Build priorities text
        priorities_text = "\n".join([
            f"- {item}: {pct}%"
            for item, pct
            in data.priorities.items()
        ])

        # ── BUILD PROMPT ──
        user_prompt = f"""
You are an expert fashion stylist. Generate a detailed outfit recommendation based on:

👤 Gender: {data.gender}
💰 Total Budget: ₹{data.budget}
🎉 Occasion: {data.occasion}
🎨 Style: {data.style}
🌈 Preferred Colors: {', '.join(data.colors) if data.colors else 'No preference'}
💬 User Request: {data.prompt or 'No specific request'}

Include these items: {', '.join(included_items)}

Budget split priorities:
{priorities_text}

Please provide:
1. A complete outfit with specific items
2. Estimated price for each item in ₹
3. Where to buy each item (Myntra, Ajio, Amazon, Zara etc.)
4. Styling tips
5. Total estimated cost

Format the response in a clean readable way with emojis.
        """

        # ── CALL GEMINI ──
        response = client.models.generate_content(
    model="gemini-2.0-flash-lite",
    contents=user_prompt
)

        return {
            "message": "Outfit generated successfully",
            "outfit": response.text
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))