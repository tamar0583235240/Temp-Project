import { Router } from 'express';
import {
    getallPracticeQuestions,
    createPracticeQuestionController,
    getAllTopicsController, 
    getPracticeQuestionsByTopicController
} from '../controllers/PracticeQuestionsController';

const router = Router();

router.get('/', getallPracticeQuestions);
router.post('/', createPracticeQuestionController);
router.get('/topics', getAllTopicsController);
router.get('/topic/:topicId', getPracticeQuestionsByTopicController);

export default router;