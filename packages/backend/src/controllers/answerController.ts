import { Request, Response } from "express";
import pool from "../config/dbConnection"; // ודא שזה הנתיב שלך לחיבור למסד

export const getProgressStats = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // סופרים את כל השאלות הפעילות
    const totalQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM questions WHERE is_active = true`
    );
    const totalQuestions = parseInt(totalQuestionsResult.rows[0].count, 10);

    // סופרים את כל התשובות של המשתמש
    const answeredQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM answers WHERE user_id = $1`,
      [userId]
    );
    const answeredQuestions = parseInt(answeredQuestionsResult.rows[0].count, 10);

    res.json({
      totalQuestions,
      answeredQuestions,
    });

  } catch (error) {
    console.error("שגיאה בשליפת סטטיסטיקות:", error);
    res.status(500).json({ error: "אירעה שגיאה בעת שליפת סטטיסטיקות ההתקדמות" });
  }
};
