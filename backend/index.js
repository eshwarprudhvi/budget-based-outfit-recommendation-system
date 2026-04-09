import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cors from "cors";
import { callGemini } from "./controllers/gemini.js";
import buildPrompt from "./promptbuilder.js";
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // ← allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

// ── TEST ROUTE ──
app.get("/", (req, res) => {
  res.json({ message: "🚀 Outfit API running!" });
});

app.post("/test-outfit", async (req, res) => {
  try {
    const prompt = buildPrompt(req.body);

    console.log("PROMPT:\n", prompt);

    const output = await callGemini(prompt);

    res.json({
      success: true,
      raw_output: output
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ── 404 HANDLER ──
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

app.listen(PORT, () => {
  console.log(`app is listening on the port ${PORT}`);
});
