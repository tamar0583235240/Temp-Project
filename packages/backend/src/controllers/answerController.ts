import { Request, Response } from 'express';
import answerRepositiry from '../reposioty/answerRepositiry';

export const answerController = async (req: Request, res: Response): Promise<void> => {
  console.log('answerController called');
  try {
    const Answer = await answerRepositiry.createAnswer();
    res.json(Answer);
  } catch (error) {
    console.error('Error in answerController:', error);
    res.status(500).json({ error });
  }
};