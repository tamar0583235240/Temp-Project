import { Router } from 'express';
import { answerController } from '../controllers/answerController';

const router = Router();
router.get('/getAllAnswersByIdUser/:user_id' ,answerController);

export default router;