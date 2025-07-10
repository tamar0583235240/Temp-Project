import { Router } from 'express';
import {  getAiInsightsByAnswerId ,getAiInsights} from "../controllers/aIInsightController";

const AiInsightsRouter = Router();

AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
AiInsightsRouter.get('/aiInsight',getAiInsights);
export default AiInsightsRouter;        

