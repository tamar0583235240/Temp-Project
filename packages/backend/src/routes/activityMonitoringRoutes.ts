import express from 'express';
import { getDummyActivityData } from '../controllers/activityMonitoringController';

const router = express.Router();

router.get('/stats', getDummyActivityData); // /api/activity/stats

export default router;
