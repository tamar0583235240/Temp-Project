import { pool } from '../config/dbConnection'; 
import { Reminder } from "../interfaces/reminderInterfaces";

const getAllTips = async (): Promise<Reminder[]> => {
  try {
    const query = `
      SELECT *
      FROM tips
    `;

    const result = await pool.query(query);
    return result.rows as Reminder[];

  } catch (error) {
    console.error("Error fetching examples from PostgreSQL:", error);
    throw error;
  }
};

export default { getAllTips };
