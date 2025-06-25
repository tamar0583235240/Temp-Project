import { Request, Response } from 'express';
import questionRepository from '../reposioty/questionRepository';

export const questionController = async (req: Request, res: Response): Promise<void> => {

  console.log('questionController called');
    try {
    const items = await questionRepository.getAllQuestionById(req.params.question_id);
    res.json(items);
  } catch (error) {
    console.error('Error in questionController:', error);
    res.status(500).json({ error });
  }
};

export const adminqQuestionController = async (req: Request, res: Response): Promise<void> => {

  console.log('adminQuestionController called');
    try {
    const items = await questionRepository.getAllQuestions();
    res.json(items);
  } catch (error) {
    console.error('Error in questionController:', error);
    res.status(500).json({ error });
  }
};

export const deleteQuestionController = async (req: Request, res: Response): Promise<void> => {
  console.log('deleteQuestionController called');
  try {
    const questionId = req.params.question_id;
    const is_active = req.body.is_active;
    await questionRepository.deleteQuestionById(questionId,is_active);
  } catch (error) {
    console.error('Error in deleteQuestionController:', error);
    res.status(500).json({ error });
  }
};