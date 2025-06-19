import { Request, Response } from 'express';
import questionRepository from '../repository/questionRepository';

export const getAllQuestionsController = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllQuestionsController called');
  try {
    const questions = await questionRepository.getAllQuestions();
    res.json(questions);
  } catch (error) {
    console.error('Error in getAllQuestionsController:', error);
    res.status(500).json({ error });
  }
};