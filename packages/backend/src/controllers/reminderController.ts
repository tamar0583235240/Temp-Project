import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';

export const reminderController = async (req: Request, res: Response): Promise<void> => {
  console.log('exampleController called');
  try {
    const items = await reminderRepository.getAllTips();
    res.json(items);
  } catch (error: any) {
    console.error('Error in exampleController:', error);

    if (error?.type === 'redirect') {
      res.status(300).json({ message: 'Redirect required', location: '/other-page' });
    }

    else if (error?.type === 'bad_request') {
      res.status(400).json({ error: 'Bad Request' });
    }

    else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
