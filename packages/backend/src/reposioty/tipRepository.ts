import { pool } from '../config/dbConnection';
import { Tips } from '../interfaces/entities/Tips';

// SELECT id, content
      // FROM tips

const getAllTips = async (): Promise<Tips[]> => {
  try {
    const query = `
       SELECT id,tips
      FROM questions
      WHERE is_active = TRUE
    `;

    const result = await pool.query(query);
    return result.rows as Tips[];
  } catch (error) {
    console.error("Error fetching tips from PostgreSQL:", error);
    throw error;
  }
};

export default {
  getAllTips,
};
