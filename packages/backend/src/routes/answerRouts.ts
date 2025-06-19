import express from "express";
import { getProgressStats } from "../controllers/answerController";

const router = express.Router();

router.get("/progress/:userId", getProgressStats);

export default router;