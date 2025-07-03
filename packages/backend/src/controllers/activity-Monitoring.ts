import { Request, Response } from "express";
import { pool } from "../config/dbConnection";

export const getPopularQuestions = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 5;

    const popularQuestionsResult = await pool.query(
      `
      SELECT 
        q.id,
        q.question_text,
        COUNT(a.id) AS answer_count
      FROM questions q
      LEFT JOIN answers a ON q.id = a.question_id
      WHERE q.is_active = true
      GROUP BY q.id, q.question_text
      ORDER BY answer_count DESC
      LIMIT $1
      `,
      [limit]
    );

    res.json(popularQuestionsResult.rows);
  } catch (error) {
    console.error("שגיאה בשליפת שאלות פופולריות:", error);
    res.status(500).json({ error: "אירעה שגיאה בעת שליפת שאלות פופולריות" });
  }
};
