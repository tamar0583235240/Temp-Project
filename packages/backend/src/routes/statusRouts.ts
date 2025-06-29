import { Router } from 'express';
import { getStatusByUserId } from '../controllers/statusController';
// import { exampleMiddleware } from '../middlewares/exampleMiddlewares'; // אם יש לך

const router = Router();

router.get('/:userId', getStatusByUserId);

export default router;
