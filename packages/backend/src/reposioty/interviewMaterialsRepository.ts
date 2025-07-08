import { pool } from '../config/dbConnection';

export async function getAllMaterialsFromDb(): Promise<any[]> {
  const result = await pool.query('SELECT * FROM interview_materials_sub');
  return result.rows;
}

export async function getMaterialById(id: string) {
  const result = await pool.query("SELECT * FROM interview_materials WHERE id = $1", [id]);
  return result.rows[0];
}

export async function c(id: string) {
  await pool.query("DELETE FROM interview_materials WHERE id = $1", [id]);
}
