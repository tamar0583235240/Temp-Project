import { Request, Response } from 'express';
//import aiInsigthRepository from '../reposioty/aiInsigthRepository';
import aiInsigthRepository from '../reposioty/aIInsigthRepository';

export const getAiInsigths = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await aiInsigthRepository.getAiInsights();
        res.json(items);
    } catch (error) {
        console.error('Error in ai insigth controller:', error);
        res.status(500).json({ error });
    }
};