import { pool } from '../config/dbConnection';

export async function getAllAiInsightsRepository() {
  const result = await pool.query('SELECT * FROM ai_insights');
  return result.rows;
}
