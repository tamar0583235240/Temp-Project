import { Router } from "express";
import { questionController } from "../controllers/questionController";

const router = Router();
router.get('/questionURL', questionController);