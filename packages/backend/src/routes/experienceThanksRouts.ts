// בס"ד
import { addExperienceThanks, getAllExperienceThanks } from '../controllers/experienceThanksController';
import { Router } from 'express';

const experienceThanksRouter = Router();

experienceThanksRouter.get('/getAllExperienceThanks', getAllExperienceThanks);  

experienceThanksRouter.post('/addExperienceThanks', addExperienceThanks);

export default experienceThanksRouter;