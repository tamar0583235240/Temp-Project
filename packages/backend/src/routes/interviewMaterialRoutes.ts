import { getAllInterviewMaterials } from '../controllers/interviewMaterialController';
import { Router } from 'express';

const router = Router();
router.get('/', getAllInterviewMaterials);

export default router;