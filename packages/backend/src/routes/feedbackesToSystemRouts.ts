import { Router } from 'express';
import { getFeedbackesToSystemByUserId } from '../controllers/feedbackToSystemController';

const feedbackToSystemRouter = Router();

feedbackToSystemRouter.get('/feedbackesToSystem/getFeedbackesByuserId/:userId', getFeedbackesToSystemByUserId);  
export default feedbackToSystemRouter; 