import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

import { searchAmazon } from "./amazon.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://eshwarprudhvi-budget-based-ai-outfit-generator-2-c55fenziq.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ── ROUTES ──
app.use("/api/auth", authRoutes);
app.use("/api/recommend", recommendationRoutes);

// ── HEALTH CHECK ──
app.get("/", (req, res) => {
  res.json({ message: "🚀 Outfit API running!" });
});

// ── 404 HANDLER ──
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
