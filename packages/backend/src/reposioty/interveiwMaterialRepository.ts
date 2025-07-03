import { pool } from '../config/dbConnection';


const selectAllInteveiwMaterials = async (): Promise<any[]> => {
  try {
    const query = `SELECT * FROM interview_materials_sub `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching interview material from PostgreSQL:", error);
    throw error;
  }
};





export default {selectAllInteveiwMaterials};
