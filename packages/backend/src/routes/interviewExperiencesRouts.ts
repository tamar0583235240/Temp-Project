
import { getAllInterviewExperiences } from '../controllers/interviewExperiencesController';
import { Router } from 'express';

const interviewExperiencesRouter = Router();

interviewExperiencesRouter.get('/getAllInterviewExperiences', getAllInterviewExperiences);  

export default interviewExperiencesRouter;