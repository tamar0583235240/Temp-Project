import { Request, Response } from 'express';
import tipRepository from '../reposioty/tipRepository';

export const getAllTipsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const tips = await tipRepository.getAllTips();
    res.json(tips);
  } catch (error) {
    console.error('Error in getAllTipsController:', error);
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
};