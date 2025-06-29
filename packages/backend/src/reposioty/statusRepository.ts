import { pool } from '../config/dbConnection';

import {Status} from '../interfaces/entities/status';
const getStatusByUserId = async (id: string): Promise<Status[]> => {
  try {
    const query = `
      SELECT answered
      FROM "status"
      WHERE user_id = $1
    `;
    // const query = `
    //   SELECT * FROM "questions"
    // `;
const result = await pool.query(query, [id]);
    return result.rows as Status[];
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    throw error;
  }
};

export default { getStatusByUserId };


