import { Request, Response } from 'express';
import { pool } from "../config/dbConnection";

export const saveTimeSpent = async (req: Request, res: Response) => {
  try {
    const { page, timeSpentSec } = req.body;

    if ( !page || !timeSpentSec) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await pool.query(
      `
      INSERT INTO user_activity ( page, time_spent_sec, timestamp)
      VALUES ($1, $2,  NOW())
      `,
      [ page, timeSpentSec]
    );

    return res.status(201).json({ message: "Time spent recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

  
