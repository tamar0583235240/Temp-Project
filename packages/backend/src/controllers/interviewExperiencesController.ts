import { Request, Response } from 'express';
import InterviewExperiencesRepository from '../reposioty/interviewExperiencesRepository';
import { InterviewExperiences } from '../interfaces/entities/InterviewExperiences';

export const getAllInterviewExperiences = async (req: Request, res: Response): Promise<InterviewExperiences[] | void > => {
    try {
        const items = await InterviewExperiencesRepository.getAllInterviewExperiences();
        res.json(items);
    } catch (error) {
        console.error('Error in interview experiences controller by getAllInterviewExperiences:', error);
        res.status(500).json({ error });
    }
};

export const addInterviewExperiences = async (req: Request, res: Response):Promise<InterviewExperiences | void> => {
  try {
    const interviewExperiences: InterviewExperiences = req.body;
    console.log(interviewExperiences);
    console.log("bhjbjb");
    
    const result = await InterviewExperiencesRepository.addInterviewExperiences(interviewExperiences);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding interviewExperiences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



