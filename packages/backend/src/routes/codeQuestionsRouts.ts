import { runCodeController } from "../controllers/runCodeController";
import { getAllQuestions, getAllTopics } from "../controllers/codeQuestionsController";
import express from "express";
import {
 validateRunCode
} from '../middlewares/runCodeMiddlewares';

const router = express.Router();

router.get("/topics", getAllTopics);
router.get("/questions", getAllQuestions);
router.post('/runCode', validateRunCode, runCodeController);


export default router;