import { pool } from '../config/dbConnection';
import { Status } from '../interfaces/entities/Status';
const getStatusByUserId = async (id: string): Promise<Status[]> => {
  try {
    const query = `
      SELECT user_id, answered
      FROM "status"
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows.map(row => ({
      user_id: row.user_id,
      answered: typeof row.answered === 'string' ? JSON.parse(row.answered) : row.answered
    }));
  } catch (error) {
    console.error(":x: Error fetching status:", error);
    throw error;
  }
};
export default { getStatusByUserId }