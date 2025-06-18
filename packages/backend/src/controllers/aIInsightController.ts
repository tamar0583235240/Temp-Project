import { Request, Response } from 'express';
import { getAllAiInsightsRepository } from '../reposioty/aiInsight';

export const getAllAiInsights = async (_: Request, res: Response) => {
  try {
    const aiInsights = await getAllAiInsightsRepository();
    res.status(200).json(aiInsights);
  } catch (error) {
    console.error('Error getting AI insights:', error);
    res.status(500).json({ error: 'Failed to fetch AI insights' });
  }
};

