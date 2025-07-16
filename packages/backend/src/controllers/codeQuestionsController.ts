
import { Request, Response } from "express";
import * as codeQuestionsRepository from "../reposioty/codeQuestionsRepository";
// שליפת כל הנושאים
export const getAllTopics = async (req: Request, res: Response): Promise<void> => {
    try {
        const topics = await codeQuestionsRepository.getAllTopicsFromDB();
        res.status(200).json(topics);
    } catch (err) {
        console.error("Error fetching topics", err);
        res.status(500).json({ message: "שגיאה בקבלת נושאים" });
    }
};
// שליפת כל השאלות
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const { topic, level, type } = req.query;
    const questions = await codeQuestionsRepository.getAllQuestionsFromDB(
      topic as string | undefined,
      level as string | undefined,
      type as string | undefined
    );
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
