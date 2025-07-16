import { Router } from 'express';
import {
  // getQuestionsByTopicController,
  // submitAnswerController,
  runCodeController,           // ודא שייצאת את זה ב-practiceController.ts
} from '../controllers/practiceController';

import {
  validateSubmitAnswer,
  validateGetQuestionsByTopic,
} from '../middlewares/practiceMiddlewares';

import { validateRunCode } from '../middlewares/codeExecutionMiddleware'; // ייבוא middleware לבדיקת runCode
import { getAllQuestions, getAllTopics } from '../controllers/codeQuestionsController'; // ייבוא middleware לבדיקת runCode
// import { getQuestionsByTopic } from 'reposioty/practiceRepository';

const router = Router();
router.get('/getAllQuestions', getAllQuestions);

router.post('/runCode', validateRunCode, runCodeController);
router.get('/getAllQuestions', getAllQuestions);

router.get('/getAllTopics', getAllTopics);

export default router;
