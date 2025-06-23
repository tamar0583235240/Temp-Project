import { Request, Response } from 'express';
import InterviewMaterialSubRepository from '../reposioty/InterviewMaterialSubRepository';

export const getInterviewMaterialSubs = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await InterviewMaterialSubRepository.getInterviewMaterialSubs();
        res.json(items);
    } catch (error) {
        console.error('Error in interview material sub controller:', error);
        res.status(500).json({ error });
    }
};