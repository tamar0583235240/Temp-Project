
import { addInterviewExperiences, getAllInterviewExperiences } from '../controllers/interviewExperiencesController';
import { Router } from 'express';

const interviewExperiencesRouter = Router();

interviewExperiencesRouter.get('/getAllInterviewExperiences', getAllInterviewExperiences);  
interviewExperiencesRouter.post('/addInterviewExperiences', addInterviewExperiences);  
export default interviewExperiencesRouter;