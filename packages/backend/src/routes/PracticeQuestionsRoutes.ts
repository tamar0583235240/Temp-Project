import { Router } from 'express';
import {
    getallPracticeQuestions,
    createPracticeQuestionController,
    getPracticeQuestionsByTopicController
} from '../controllers/PracticeQuestionsController';

const router = Router();

router.get('/', getallPracticeQuestions);
router.get('/topic/:topicId', getPracticeQuestionsByTopicController);
router.post('/', createPracticeQuestionController);

export default router;