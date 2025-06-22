import { Router } from "express";
import { questionController } from "../controllers/questionController";
<<<<<<< HEAD
import { questionMiddleware } from "../middlewares/questionMiddleware";

const router = Router();
router.get('/getAllQuestionById/:question_id', questionMiddleware , questionController );
export default router;
=======

const router = Router();
router.get('/questionURL', questionController);
>>>>>>> 292850b63ee68c443c1ad15c0acee5afeab2ab93
