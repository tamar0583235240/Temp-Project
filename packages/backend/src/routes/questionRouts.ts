import { Router } from "express";
import { adminqQuestionController, deleteQuestionController, questionController } from "../controllers/questionController";

const router = Router();
router.get('/getAllQuestionById/:question_id', questionController );
router.get('/getAllQuestions', adminqQuestionController );
//router.delete('/deleteQuestionById/:question_id', deleteQuestionController);
export default router;
