const express = require('express');
const router = express.Router();
import feedbackRouter from './feedbackRouts';
import AiInsightsRouter from './aIInsightRouts';
import answerRouter from './answerRouts';
import sharedRecrdingRouter from './sharedRecordingRouts';
import questionRoute from './questionRouts';
import sharedRecordingsRoutes from './sharedRecordingRouts';
import materials from './interview-materials-hub'
import userRouts from './userRouts';
import authRouts from './authRouts';

router.use('/api' ,feedbackRouter )
router.use('/api' , AiInsightsRouter ) 
router.use('/api' , sharedRecrdingRouter )  
router.use('/answers', answerRouter);
router.use('/question', questionRoute); 
router.use('/shared-recordings', sharedRecordingsRoutes);
router.use('/auth', authRouts);
router.use('/interview-materials-hub', materials);

export default router;
