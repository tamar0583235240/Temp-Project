import { Router } from 'express';
import { answerController } from '../controllers/answerController';
//import { exampleMiddleware } from '../middlewares/exampleMiddlewares';

const router = Router();
router.get('/exampleURL', answerController);///////////////////////

export default router;


// router.get('/', getAllQuestionsController);