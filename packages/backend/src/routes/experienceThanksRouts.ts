
import { getAllExperienceThanks } from '../controllers/experienceThanksController';
import { Router } from 'express';

const experienceThanksRouter = Router();

experienceThanksRouter.get('/getAllExperienceThanks', getAllExperienceThanks);  

export default experienceThanksRouter;