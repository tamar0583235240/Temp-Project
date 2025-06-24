import { Request, Response } from 'express';
import aiInsigthRepository from '../reposioty/aiInsigthRepository';

export const getAiInsigths = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await aiInsigthRepository.getAiInsights();
        res.json(items);
    } catch (error) {
        console.error('Error in AIInsight controller:', error);
        res.status(500).json({ error: 'Failed to retrieve AIInsight from database' });
        
    }
};