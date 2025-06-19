import { pool } from '../config/dbConnection';
import { Tips } from '../interfaces/entities/Tips';

const getAllTips = async (): Promise<Tips[]> => {
  try {
    const query = `
      SELECT id, content
      FROM tips
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
