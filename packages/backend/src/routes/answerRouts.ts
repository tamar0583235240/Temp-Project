import express from "express";
import { getProgressStats } from "../controllers/answerController";
// import {someOtherHandler} from "../controllers/answerController"
const router = express.Router();

router.get("/progress/:userId", getProgressStats);
// router.get("/:userId", someOtherHandler);  // אם יש צורך


export default router;
