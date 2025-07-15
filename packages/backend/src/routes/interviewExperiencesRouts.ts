
import { addInterviewExperiences, deleteInterviewExperience, getAllInterviewExperiences } from '../controllers/interviewExperiencesController';
import { Router } from 'express';

const interviewExperiencesRouter = Router();

interviewExperiencesRouter.get('/getAllInterviewExperiences', getAllInterviewExperiences);  
interviewExperiencesRouter.delete('/deleteInterviewExperience/:id', deleteInterviewExperience);
interviewExperiencesRouter.post('/addInterviewExperiences', addInterviewExperiences);  
export default interviewExperiencesRouter;