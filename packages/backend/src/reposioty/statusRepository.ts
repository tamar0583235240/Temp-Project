import { pool } from '../config/dbConnection';
import { Status } from '../interfaces/entities/Status';

export const getAllStatuses = async (): Promise<Status[]> => {
  const query = `SELECT * FROM status;`;
  const result = await pool.query(query);
  return result.rows;
};

export const insertStatus = async (user_id: string): Promise<Status> => {
  // שלב 1: שליפת מספר השאלות מהדאטאבייס
  const countQuery = `SELECT COUNT(*) FROM questions;`;
  const countResult = await pool.query(countQuery);
  const questionCount = parseInt(countResult.rows[0].count, 10);

  // שלב 2: יצירת מערך answered לפי מספר השאלות
  const answered: boolean[] = Array.from({ length: questionCount }, () => false);

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

  if (!Array.isArray(answered)) answered = [];

  // אם צריך להרחיב את המערך
  if (questionIndex >= answered.length) {
    const extra = Array(questionIndex - answered.length + 1).fill(false);
    answered = [...answered, ...extra];
  }

  // מסמן את האינדקס כ-true
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

export const expandStatusLength = async (user_id: string, newCount: number): Promise<Status> => {
  const currentStatus = await getStatusByUserId(user_id);
  if (!currentStatus) throw new Error("User not found");

  const answered = currentStatus.answered || [];
  const currentLength = answered.length;

  // אם צריך להוסיף - נוסיף false עד לגודל המבוקש
  if (newCount > currentLength) {
    const additional = Array(newCount - currentLength).fill(false);
    const updatedArray = [...answered, ...additional];

    const query = `
      UPDATE status
      SET answered = $1
      WHERE user_id = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [updatedArray, user_id]);
    return result.rows[0];
  }

  // אם אין צורך לשנות (כלומר newCount <= currentLength), נחזיר את הקיים
  return currentStatus;
};
export const setQuestionAnswered = async (user_id: string, questionIndex: number): Promise<Status> => {
  const currentStatus = await getStatusByUserId(user_id);
  if (!currentStatus) throw new Error('User not found');

  let answered = currentStatus.answered || [];

  // ודא שהאינדקס קיים במערך
  if (questionIndex < 0 || questionIndex >= answered.length) {
    throw new Error('Invalid question index');
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


export default {
  getStatusByUserId,
  updateAnsweredStatus,
  insertStatus,
  getAllStatuses,
  expandStatusLength,
  setQuestionAnswered
};
