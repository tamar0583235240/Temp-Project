import { Router } from 'express';
import { getStatusByUserId, createStatus, updateStatus } from '../controllers/statusController';
// import { exampleMiddleware } from '../middlewares/exampleMiddlewares'; // אם יש לך

const router = Router();

router.get('/:userId', getStatusByUserId);
router.post('/', createStatus);
router.put('/', updateStatus);

export default router;
