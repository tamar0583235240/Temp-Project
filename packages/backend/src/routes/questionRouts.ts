import { Router } from "express";
<<<<<<< HEAD
import { questionController } from "../controllers/questionController";
import { questionMiddleware } from "../middlewares/questionMiddleware";
import { questionStatsController } from "../controllers/questionStatsController";

const router = Router();
router.get('/getAllQuestionById/:question_id', questionMiddleware , questionController );
router.get('/stats',questionStatsController);
=======
import { adminqQuestionController, deleteQuestionController, questionController } from "../controllers/questionController";

const router = Router();

router.get('/getAllQuestionById/:question_id', questionController );
router.get('/getAllQuestions', adminqQuestionController );
router.patch('/deleteQuestionById/:question_id', deleteQuestionController);

>>>>>>> newTaskG4
export default router;
