import { Router } from 'express';
import { getFeedbackAverages, getFeedbackesByanswerId } from '../controllers/feedbackController';

const feedbackRouter = Router();

feedbackRouter.get('/feedbackes/getFeedbackesByanswerId/:sharedRecordingId', getFeedbackesByanswerId);  
feedbackRouter.get('/admin/feedbackes/averages', getFeedbackAverages);

export default feedbackRouter;        