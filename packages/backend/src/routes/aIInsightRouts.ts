// src/routes/aIInsightRouter.ts
import { Router } from "express";
import { getAiInsights, getAiInsightsByAnswerId } from "../controllers/aIInsightController";

const AiInsightsRouter = Router();

// נתיב שמחזיר את כל התובנות
// AiInsightsRouter.get('/AiInsights/getAiInsights', getAiInsights);

// נתיב שמחזיר תובנות לפי מזהה תשובה
// AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);

AiInsightsRouter.get('/getAiInsights', getAiInsights);
AiInsightsRouter.get('/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);

export default AiInsightsRouter;
