import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';

export const reminderController = async (req: Request, res: Response): Promise<void> => {
  console.log('exampleController called');
  try {
    const items = await reminderRepository.getAllTips();
    res.json(items);
  } catch (error) {
    console.error('Error in exampleController:', error);
    res.status(500).json({ error });
  }
};