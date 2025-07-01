import { Router } from "express";
import { questionController } from "../controllers/questionController";
import { questionMiddleware } from "../middlewares/questionMiddleware";
import { questionStatsController } from "../controllers/questionStatsController";

const router = Router();
router.get('/getAllQuestionById/:question_id', questionMiddleware , questionController );
router.get('/stats',questionStatsController);
export default router;
