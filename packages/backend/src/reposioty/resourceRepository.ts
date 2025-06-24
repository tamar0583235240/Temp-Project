import { pool } from '../config/dbConnection';

const enum eFileType {
  pdf = "pdf",
  text = "text",
  link = "link",
}
const selectAllResources = async (): Promise<any[]> => {
  try {
    const query = `SELECT * FROM resources`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching resources from PostgreSQL:", error);
    throw error;
  }
};





export default {selectAllResources};
