import { Request, Response } from 'express';
<<<<<<< HEAD
import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';
import { pool } from '../config/dbConnection';


=======
>>>>>>> newTaskG4
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
    const is_active = false;
    await questionRepository.deleteQuestionById(questionId,is_active);
    res.status(200).send("Question deleted successfully"); 
  } catch (error) {
    console.error('Error in deleteQuestionController:', error);
    res.status(500).json({ error });
  }
};