import { Request, Response } from 'express';
import questionRepository from '../reposioty/questionRepository';


export const questionStatsController = async (req: Request, res: Response): Promise<void> => {

  console.log('questionStatsController called');
    try {
    const amounts = await questionRepository.getStatsQuwestionsByUserId;
    res.json(amounts);
  } catch (error) {
    console.error('Error in questionStatsController:', error);
    res.status(500).json({ error });
  }
};