import { Router } from 'express';
import { saveTimeSpent} from '../controllers/activity-Monitoring';

const router = Router();
router.post('/',saveTimeSpent)

export default router;