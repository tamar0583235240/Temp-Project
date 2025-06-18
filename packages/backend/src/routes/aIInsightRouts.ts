import express from 'express';
import { getAllAiInsights } from '../controllers/aIInsightController';

const router = express.Router();
router.get('/', getAllAiInsights); // GET /api/ai-insights
export default router;

