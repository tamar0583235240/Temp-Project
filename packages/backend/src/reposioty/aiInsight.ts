import { pool } from '../config/dbConnection';
export async function getAllAiInsights() {
  const result = await pool.query('SELECT * FROM ai_insights');
  return result.rows;
}
