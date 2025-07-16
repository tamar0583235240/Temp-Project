import { Request, Response } from "express";
<<<<<<< HEAD
import answerRepository from "../reposioty/answerRepository";
import { pool } from "../config/dbConnection";
import { validate as isUuid } from "uuid";

// שליפת כל התשובות לפי מזהה משתמש
export const answerController = async (req: Request, res: Response): Promise<void> => {
  console.log("answerController called");
  try {
    const items = await answerRepository.getAllAnswersByIdUser(req.params.user_id);
    res.json(items);
  } catch (error) {
    console.error("Error in answerController:", error);
    res.status(500).json({ error });
  }
};

// שליפת סטטיסטיקות התקדמות לפי מזהה משתמש
export const getProgressStats = async (req: Request, res: Response): Promise<void> => {
=======
import { pool } from "../config/dbConnection";
import { validate as isUuid } from "uuid";  

export const getProgressStats = async (req: Request, res: Response) => {
>>>>>>> Activity-Monitoring
  try {
    const userId = req.params.userId;

    if (!isUuid(userId)) {
<<<<<<< HEAD
      res.status(400).json({ error: "מזהה משתמש לא תקין (UUID נדרש)" });
      return;
    }

    // בדיקה אם המשתמש קיים
=======
      return res.status(400).json({ error: "מזהה משתמש לא תקין (UUID נדרש)" });
    }

>>>>>>> Activity-Monitoring
    const userExistsResult = await pool.query(
      `SELECT 1 FROM users WHERE id = $1 LIMIT 1`,
      [userId]
    );
<<<<<<< HEAD
    if (userExistsResult.rowCount === 0) {
      res.status(404).json({ error: "משתמש לא נמצא" });
      return;
    }

    // סה"כ שאלות פעילות
=======

    if (userExistsResult.rowCount === 0) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

>>>>>>> Activity-Monitoring
    const totalQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM questions WHERE is_active = true`
    );
    const totalQuestions = parseInt(totalQuestionsResult.rows[0].count, 10);

<<<<<<< HEAD
    // סה"כ תשובות שהמשתמש ענה
=======
>>>>>>> Activity-Monitoring
    const answeredQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM answers WHERE user_id = $1`,
      [userId]
    );
    const answeredQuestions = parseInt(answeredQuestionsResult.rows[0].count, 10);

<<<<<<< HEAD
    const progressPercent = totalQuestions > 0
      ? (answeredQuestions / totalQuestions) * 100
      : 0;
=======
    const progressPercent =
      totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
>>>>>>> Activity-Monitoring

    res.json({
      totalQuestions,
      answeredQuestions,
      progressPercent: Math.round(progressPercent),
    });
<<<<<<< HEAD

  } catch (error) {
    console.error("שגיאה בשליפת סטטיסטיקות:", error);
=======
  } catch (error) {
    console.error("שגיאה בשליפת סטטיסטיקות:");
>>>>>>> Activity-Monitoring
    res.status(500).json({ error: "אירעה שגיאה בעת שליפת סטטיסטיקות ההתקדמות" });
  }
};
