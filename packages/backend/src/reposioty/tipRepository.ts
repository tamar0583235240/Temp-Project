import { pool } from '../config/dbConnection';

export async function getAllTips() {
  const result = await pool.query('SELECT* FROM tips');
  return result.rows;
}