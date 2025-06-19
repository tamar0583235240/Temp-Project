import { Router } from 'express';
import { getAllTipsController } from '../controllers/tipsController';

const router = Router();

router.get('/', getAllTipsController);

export default router;