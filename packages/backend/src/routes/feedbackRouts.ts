import { Router } from 'express';
import { getFeedbackesBysharedRecordingId } from '../controllers/feedbackController';

const feedbackRouter = Router();

feedbackRouter.get('/feedbackes/getFeedbackesBysharedRecordingId/:sharedRecordingId', getFeedbackesBysharedRecordingId);  
export default feedbackRouter;        