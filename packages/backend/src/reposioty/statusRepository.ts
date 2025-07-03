import { pool } from '../config/dbConnection';
import { Status } from '../interfaces/entities/Status';
// Removed duplicate getStatusByUserId function to resolve redeclaration error.
export const insertStatus = async (user_id: string, questionCount: number): Promise<Status> => {
  const answered = Array(questionCount).fill(false);
  const query = `
    INSERT INTO status (user_id, answered)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await pool.query(query, [user_id, answered]);
  return result.rows[0];
};
export const getStatusByUserId = async (user_id: string): Promise<Status | null> => {
  const query = `SELECT * FROM status WHERE user_id = $1;`;
  const result = await pool.query(query, [user_id]);
  return result.rows[0] || null;
};
export const updateAnsweredStatus = async (user_id: string, questionIndex: number): Promise<Status> => {
  const currentStatus = await getStatusByUserId(user_id);
  if (!currentStatus) throw new Error('User not found');
  const answered = currentStatus.answered;
  answered[questionIndex] = true;
  const query = `
    UPDATE status
    SET answered = $1
    WHERE user_id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [answered, user_id]);
  return result.rows[0];
};
export default { getStatusByUserId, updateAnsweredStatus, insertStatus };