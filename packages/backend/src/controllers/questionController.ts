import { Request, Response } from 'express';
import questionRepository from '../reposioty/questionRepository';
import { Questions } from '../interfaces/entities/Questions';
const addQuestion = async (req: Request, res: Response):Promise<Questions | void> => {
  try {
    const question: Questions = req.body;
    const result = await questionRepository.addQustion(question);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { addQuestion };