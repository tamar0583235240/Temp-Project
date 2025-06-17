import { Router } from 'express';
import { answerController } from '../controllers/answerController';
import { answerMiddleware } from '../middlewares/answerMiddleware';
const router = Router();

router.get('/getAllAnswersById',answerMiddleware ,answerController);

export default router;