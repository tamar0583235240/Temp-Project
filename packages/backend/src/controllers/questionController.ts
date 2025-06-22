import { Request, Response } from 'express';
import questionRepository from '../reposioty/questionRepository';

export const getAllQuestionsController = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllQuestionsController called');
  try {
    
    const questions = await questionRepository.getAllQuestions();
    console.log('✅ Questions fetched successfully:', questions.length);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error });
  }
};