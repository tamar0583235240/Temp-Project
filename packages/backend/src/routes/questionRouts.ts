import { Router } from 'express';
import { addQuestion } from '../controllers/questionController';
import { addQuestionMiddleware } from '../middlewares/questionMiddlewares';

const questionRouts = Router();

questionRouts.post('/questions/addQuestion', addQuestionMiddleware, addQuestion);

export default questionRouts;