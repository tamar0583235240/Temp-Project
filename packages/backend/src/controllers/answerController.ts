import { Request, Response } from 'express';
import {
  createAnswer,
  getAllAnswers,
  deleteAnswer,
  updateAnswer,
  getAnswerById,
} from '../reposioty/answerRepository';

export const createAnswerController = async (req: Request, res: Response) => {
  const { user_id, question_id, audio_url } = req.body;
  try {
    const newAnswer = await createAnswer(user_id, question_id, audio_url);
    res.json(newAnswer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
 

export const getAllAnswersController = async (req: Request, res: Response) => {
  try {
    const answers = await getAllAnswers();
    res.json(answers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getAnswerByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const answer = await getAnswerById(id);
    res.json(answer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAnswerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updated = await updateAnswer(id, updates);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnswerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteAnswer(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
