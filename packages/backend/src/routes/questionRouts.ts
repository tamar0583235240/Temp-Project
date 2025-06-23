import { Router } from "express";
import { adminqQuestionController, questionController } from "../controllers/questionController";
import { questionMiddleware } from "../middlewares/questionMiddleware";

const router = Router();
router.get('/getAllQuestionById/:question_id', questionMiddleware , questionController );
router.get('/getAllQuestions', adminqQuestionController );
export default router;
