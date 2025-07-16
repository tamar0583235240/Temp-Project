import { getAllQuestions, getAllTopics } from "../controllers/codeQuestionsController";
import express from "express";


const router = express.Router();

router.get("/topics", getAllTopics);
router.get("/questions", getAllQuestions);


export default router;