import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.HOST,     // לדוגמה: 'localhost'
  port: 5432,
  user: process.env.USER,     // לדוגמה: 'postgres'
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// פונקציה ליצירת תשובה
export const createAnswer = async (userId: string, questionId: string, audioUrl: string) => {
  const query = `
    INSERT INTO answers (user_id, question_id, audio_url)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [userId, questionId, audioUrl];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// שליפת כל התשובות
export const getAllAnswers = async () => {
  const { rows } = await pool.query('SELECT * FROM answers;');
  return rows;
};

// שליפת תשובה לפי ID
export const getAnswerById = async (id: string) => {
  const query = `SELECT * FROM answers WHERE id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// עדכון תשובה
export const updateAnswer = async (id: string, updates: any) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setString = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
  const query = `UPDATE answers SET ${setString} WHERE id = $${fields.length + 1} RETURNING *;`;

  const { rows } = await pool.query(query, [...values, id]);
  return rows[0];
};

// מחיקת תשובה
export const deleteAnswer = async (id: string) => {
  await pool.query('DELETE FROM answers WHERE id = $1;', [id]);
};
