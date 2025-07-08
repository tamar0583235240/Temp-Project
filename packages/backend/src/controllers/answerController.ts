import { Request, Response } from 'express';
import  answerRepository  from '../reposioty/answerRepository';

export const answerController = async (req: Request, res: Response): Promise<void> => {
  console.log('answerController called');
  try {
    const items = await answerRepository.getAllAnswersByIdUser(req.params.user_id);
    res.json(items);
  } catch (error) {
    console.error('Error in answerController:', error);
    res.status(500).json({ error });
  }
};
