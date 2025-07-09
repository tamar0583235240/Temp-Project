import { Router } from 'express';
import { deleteFeedbackToSystemController, getFeedbackesToSystemByUserId, updateFeedbackToSystemController } from '../controllers/feedbackToSystemController';

const feedbackToSystemRouter = Router();

feedbackToSystemRouter.get('/getFeedbackesByuserId/:user_id', getFeedbackesToSystemByUserId);
feedbackToSystemRouter.put('/updateFeedbackToSystem', updateFeedbackToSystemController); 
feedbackToSystemRouter.delete('/deleteFeedbackToSystem/:feedback_id', deleteFeedbackToSystemController)  
export default feedbackToSystemRouter; 