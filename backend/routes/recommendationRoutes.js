import express from "express";
import { generateOutfit } from "../controllers/recommendationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/recommend — protected route
router.post("/", generateOutfit);

export default router;
