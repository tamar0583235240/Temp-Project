import { Request, Response } from 'express';
// import questionRepository from '../reposioty/questionRepository'

export const questionController = async (req: Request, res: Response): Promise<void> => {

  console.log('questionController called');
    try {
    // const items = await questionRepository.getAllQuestionById(req.params.question_id);
    // res.json(items);
  } catch (error) {
    console.error('Error in questionController:', error);
    res.status(500).json({ error });
  }
};
