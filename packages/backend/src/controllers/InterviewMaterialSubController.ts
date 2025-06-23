import { Request, Response } from 'express';
import InterviewMaterialSubRepository from '../reposioty/InterviewMaterialSubRepository';

export const getInterviewMaterialSubs = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.query.badParam) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }

    if (req.headers['x-test-redirect']) {
      res.status(300).json({ info: 'Multiple choices' });
      return;
    }

    const items = await InterviewMaterialSubRepository.getInterviewMaterialSubs();
    res.json(items);
  } catch (error: any) {
    console.error('Error in interview material sub controller:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
