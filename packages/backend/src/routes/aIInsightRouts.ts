<<<<<<< HEAD
import { Router } from "express";
import { getAiInsights, getAiInsightsByAnswerId } from "../controllers/aIInsightController";

const AiInsightsRouter = Router();

AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
AiInsightsRouter.get('/AiInsights/getAiInsights', getAiInsights);  


export default AiInsightsRouter;
=======
import express from 'express';
import { getAllAiInsights } from '../reposioty/aiInsight';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const insights = await getAllAiInsights();
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});
export default router;
>>>>>>> b9cae16 (AI Insights)
