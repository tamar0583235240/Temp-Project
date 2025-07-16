import { getAllfeedbacksInManagerController, getFeedbackAverages } from '../controllers/feedbacksInManagerController';
import { Router } from 'express';

const feedbacksInManagerRouter = Router();


feedbacksInManagerRouter.get('/admin/feedbackes/averages', getFeedbackAverages);
feedbacksInManagerRouter.get('/admin/feedbackes', getAllfeedbacksInManagerController);

export default feedbacksInManagerRouter;  