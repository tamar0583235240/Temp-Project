import { pool } from "../config/dbConnection";

export const getAllAnswers = async () => {
  const { rows } = await pool.query('SELECT * FROM answers;');
  return rows;
};