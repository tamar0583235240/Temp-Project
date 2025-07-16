import { Request, Response, NextFunction } from 'express';

export const validateGetQuestionsByTopic = (req: Request, res: Response, next: NextFunction) => {
  const { topic_id } = req.params;
  if (!topic_id) {
    return res.status(400).json({ message: 'topic_id חסר בנתיב' });
  }
  next();
};

export const validateSubmitAnswer = (req: Request, res: Response, next: NextFunction) => {
  const { question_id } = req.params;
  const { answer } = req.body;

  if (!question_id) {
    return res.status(400).json({ message: 'question_id חסר בנתיב' });
  }
  if (!answer) {
    return res.status(400).json({ message: 'התשובה חסרה בגוף הבקשה' });
  }
  next();
};
