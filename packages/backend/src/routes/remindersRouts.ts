import { Router } from 'express';
import { reminderController } from '../controllers/reminderController';

const router = Router();
router.get('/', reminderController);

export default router;