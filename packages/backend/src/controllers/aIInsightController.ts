import { Request, Response } from 'express';
import { AiInsights } from '../models/entities/AiInsights';
import AiInsightsReposiory from '../reposioty/AiInsightsReposiory';

export const getAiInsightsByAnswerId = async (req: Request, res: Response): Promise<AiInsights | void> => {
    try {
        const answerId = req.params.answerId;
        const AiInsights = await AiInsightsReposiory.getAiInsightsByAnswerId(answerId);
        res.json(AiInsights);
        
    } catch (error) {
        console.error('Error in getAiInsightsByAnswerId:', error);
        res.status(500).json({ error });
    }
};