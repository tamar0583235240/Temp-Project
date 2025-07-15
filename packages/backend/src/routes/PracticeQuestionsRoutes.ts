import { Router } from 'express';
import {getallPracticeQuestions,createPracticeQuestionController} from '../controllers/PracticeQuestionsController';

const router = Router();

router.get('/', getallPracticeQuestions);
router.post('/', createPracticeQuestionController);

export default router;