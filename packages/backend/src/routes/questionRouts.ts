import { Router } from "express";
import { questionController } from "../controllers/questionController";
import { questionMiddleware } from "../middlewares/questionMiddleware";

const router = Router();
router.get('/getAllQuestionById/:question_id', questionMiddleware , questionController );
export default router;