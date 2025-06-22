import { Router } from 'express';
import { answerController } from '../controllers/answerController';
import { answerMiddleware } from '../middlewares/answerMiddleware';
<<<<<<< HEAD

=======
>>>>>>> 292850b63ee68c443c1ad15c0acee5afeab2ab93
const router = Router();

router.get('/getAllAnswersByIdUser/:user_id',answerMiddleware ,answerController);

export default router;