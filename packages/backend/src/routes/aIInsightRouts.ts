import { Router } from 'express';
import { getAiInsigths} from '../controllers/aIInsightController';

const router = Router();

router.get('/',getAiInsigths);

export default router;



