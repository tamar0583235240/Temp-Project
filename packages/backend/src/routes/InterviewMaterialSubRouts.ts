import { Router } from 'express';
import { getInterviewMaterialSubs } from '../controllers/InterviewMaterialSubController';

const router = Router();

router.get('/', getInterviewMaterialSubs);

export default router;