import { Request, Response } from 'express';
import {
  createAnswer,
  getAllAnswers,
  deleteAnswer,
  updateAnswer,
  getAnswerById,
} from '../reposioty/answerRepository';

export const createAnswerController = async (req: Request, res: Response) => {
  const userId = req.body.userId || req.body.user_id;
  const questionId = req.body.questionId || req.body.question_id;
  const fileUrl = req.body.fileUrl;

  if (!userId || !questionId || !fileUrl) {
    console.error('❌ Missing fields:', { userId, questionId, fileUrl });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('✅ Creating answer with:', { userId, questionId, fileUrl });

  try {
    const newAnswer = await createAnswer(userId, questionId, fileUrl);
    res.json(newAnswer);
  } catch (error: any) {
    console.error('❌ Error creating answer:', error.message || error);
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

  const userId = req.body.userId || req.body.user_id;
  const questionId = req.body.questionId || req.body.question_id;
  const fileUrl = req.body.fileUrl || req.body.file_url;

  const updates: any = {};

  if (userId !== undefined) updates.user_id = userId;
  if (questionId !== undefined) updates.question_id = questionId;
  if (fileUrl !== undefined) updates.file_url = fileUrl;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields provided to update' });
  }

  try {
    const updated = await updateAnswer(id, updates);
    res.json(updated);
  } catch (error: any) {
    console.error('❌ Error updating answer:', error.message || error);
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
