import { Router } from 'express';
import { addQuestion } from '../controllers/questionController';
import { exampleMiddleware } from '../middlewares/exampleMiddlewares';

const router = Router();

router.post('/exampleURL', exampleMiddleware, addQuestion);

export default router;