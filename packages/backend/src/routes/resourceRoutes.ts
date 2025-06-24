import { getAllResources } from '../controllers/resourceController';
import { Router } from 'express';

const router = Router();
router.get('/', getAllResources);

export default router;