import { Router } from 'express';
import { getAllQuestionsController } from '../controllers/questionController';
// import { exampleMiddleware } from '../middlewares/exampleMiddlewares'; // אם יש לך

const router = Router();

router.get('/questions', /* exampleMiddleware, */ getAllQuestionsController);

export default router;