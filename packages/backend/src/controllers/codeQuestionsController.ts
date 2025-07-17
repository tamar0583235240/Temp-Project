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

// הוספת לייק או דיסלייק
export const setQuestionLike = async (req: Request, res: Response) => {
  const { userId, questionId, liked } = req.body;

  if (!userId || !questionId || liked === undefined) {
    return res.status(400).json({ message: "Missing userId, questionId or liked" });
  }

  try {
    const likeRecord = await codeQuestionsRepository.upsertQuestionLike(userId, questionId, liked);
    res.status(200).json({ success: true, like: likeRecord });
  } catch (error) {
    console.error("Error setting like/dislike:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// שליפת לייקים ודיסלייקים לשאלה
export const getQuestionLikes = async (req: Request, res: Response) => {
  const { questionId } = req.params;

  if (!questionId) {
    return res.status(400).json({ message: "Missing questionId" });
  }

  try {
    const counts = await codeQuestionsRepository.getLikesDislikesByQuestion(questionId);
    res.status(200).json(counts);
  } catch (error) {
    console.error("Error getting likes/dislikes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// שליפת כל הלייקים לכל השאלות
export const getAllLikes = async (req: Request, res: Response) => {
  try {
    const likes = await codeQuestionsRepository.getAllLikes();
    res.status(200).json(likes);
  } catch (error) {
    console.error("Error getting all likes:", error);
    res.status(500).json({ message: "Server error" });
  }
};