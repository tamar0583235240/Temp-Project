import { Router } from "express";
import { getAiInsightsByAnswerId } from "../controllers/aIInsightController";

const AiInsightsRouter = Router();

AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);  
export default AiInsightsRouter;        
