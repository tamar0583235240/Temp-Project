import { pool } from '../config/dbConnection';
import { Status } from '../interfaces/entities/Status';

export const getAllStatuses = async (): Promise<Status[]> => {
  const query = `SELECT * FROM status;`;
  const result = await pool.query(query);
  return result.rows;
};

export const insertStatus = async (user_id: string, questionCount: number): Promise<Status> => {
  const answered: boolean[] = Array.from({ length: questionCount }, () => false); // מבטיח שאין undefined/null
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

  let answered = currentStatus.answered;

  if (questionIndex >= answered.length) {
    // מרחיבים את המערך – כל מה שחסר מאותחל ל־false
    const extended = [...answered];
    for (let i = answered.length; i <= questionIndex; i++) {
      extended[i] = false;
    }
    answered = extended;
  }

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

// ✅ פונקציה שהייתה קודם ב-controller
export const saveOrUpdateStatus = async (userId: string, answered: boolean[]) => {
  const sanitized = answered.map(v => v ?? false); // מסיר null/undefined

  const query = `
    INSERT INTO status (user_id, answered)
    VALUES ($1, $2)
    ON CONFLICT (user_id)
    DO UPDATE SET answered = EXCLUDED.answered
  `;
  await pool.query(query, [userId, sanitized]);
};


export default {
  getStatusByUserId,
  updateAnsweredStatus,
  insertStatus,
  getAllStatuses,
  saveOrUpdateStatus,
};
