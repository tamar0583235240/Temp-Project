
import { Router } from 'express';
import { getAiInsigths} from '../controllers/aIInsightController';

const router = Router();

router.get('/aiInsight',getAiInsigths);

export default router;

