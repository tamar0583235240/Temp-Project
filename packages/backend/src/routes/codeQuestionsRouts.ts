import { runCodeController } from "../controllers/runCodeController";
import { getAllQuestions, getAllTopics,setQuestionLike,getQuestionLikes,getAllLikes } from "../controllers/codeQuestionsController";
import express from "express";
import {
 validateRunCode
} from '../middlewares/runCodeMiddlewares';

const router = express.Router();

router.get("/topics", getAllTopics);
router.get("/questions", getAllQuestions);
router.post('/runCode', validateRunCode, runCodeController);
// הוספת לייק או דיסלייק
router.post("/likes", setQuestionLike);

// שליפת ספירת לייקים ודיסלייקים לשאלה
router.get("/likes/:questionId", getQuestionLikes);

// שליפת כל הלייקים לכל השאלות
router.get("/allLikes", getAllLikes);
export default router;