import { Request, Response } from 'express';
import InterviewExperiencesRepository from '../reposioty/interviewExperiencesRepository';
import { InterviewExperiences } from '@interfaces/entities/InterviewExperiences';

export const getAllInterviewExperiences = async (req: Request, res: Response): Promise<InterviewExperiences[] | void > => {
    try {
        const items = await InterviewExperiencesRepository.getAllInterviewExperiences();
        res.json(items);
    } catch (error) {
        console.error('Error in interview experiences controller by getAllInterviewExperiences:', error);
        res.status(500).json({ error });
    }
};