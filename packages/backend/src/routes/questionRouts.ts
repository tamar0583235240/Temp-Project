import { Router } from "express";
import { adminqQuestionController, deleteQuestionController, questionController, updateQuestionController } from "../controllers/questionController";

const router = Router();
router.get('/getAllQuestionById/:question_id', questionController );
router.get('/getAllQuestions', adminqQuestionController );
router.put('/updateQuestion', updateQuestionController);
router.patch('/deleteQuestionById/:question_id', deleteQuestionController);
export default router;
