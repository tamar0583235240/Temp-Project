import { Request, Response } from "express";
import { pool } from "../config/dbConnection";

export const getPopularQuestions = async (req: Request, res: Response) => {
    res.json({ message: "נתוני פעילות נשלפו בהצלחה" });

  }



