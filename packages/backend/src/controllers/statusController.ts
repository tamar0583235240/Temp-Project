import { Request, Response } from 'express';
import statusRepository from '../reposioty/statusRepository';

export const getUserAnsweredQuestionsControler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const category = req.query.category as string;

    if (!userId || !category) {
      return res.status(400).json({ message: 'Missing userId or category' });
    }

    const questions = await statusRepository.getUserAnsweredQuestions(userId, category);

    return res.status(200).json(questions);
  } catch (error) {
    console.error(":x: Error saving status:", error);
    throw error;
  }
};
// Define or import these functions before exporting
const getStatusByUserId = async (req: Request, res: Response) => {
  // TODO: Implement this function
  res.status(501).json({ message: 'Not implemented' });
};

const saveOrUpdateStatus = async (req: Request, res: Response) => {
  // TODO: Implement this function
  res.status(501).json({ message: 'Not implemented' });
};

export default { getStatusByUserId, saveOrUpdateStatus };