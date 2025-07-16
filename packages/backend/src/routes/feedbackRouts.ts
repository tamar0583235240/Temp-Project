import { Router } from 'express';
import { getFeedbackAverages, getFeedbackesByanswerId ,getAllFeedbacks} from '../controllers/feedbackController';

const feedbackRouter = Router();

feedbackRouter.get('/feedbackes/getFeedbackesByanswerId/:sharedRecordingId', getFeedbackesByanswerId);  
feedbackRouter.get('/admin/feedbackes/averages', getFeedbackAverages);
feedbackRouter.get('/admin/feedbackes/getAllFeedbacks', getAllFeedbacks);

export default feedbackRouter;        