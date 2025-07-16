import { Router } from 'express';
import {
    getallPracticeQuestions,
    createPracticeQuestionController,
    getAllTopicsController 
} from '../controllers/PracticeQuestionsController';

const router = Router();

router.get('/', getallPracticeQuestions);
router.post('/', createPracticeQuestionController);
router.get('/topics', getAllTopicsController);

export default router;