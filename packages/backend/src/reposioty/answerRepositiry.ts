import { pool } from '../config/dbConnection'; 
import { Answer } from "../interfaces/entities/Answer";

const createAnswer = async (): Promise<Answer[]> => {
  try {///////////////////////////////////////////////////
    const query = `
      SELECT exampleField1, exampleField2, exampleField3
      FROM examples
    `;

    const result = await pool.query(query);
    return result.rows as Answer[];

  } catch (error) {
    console.error("Error fetching answers from PostgreSQL:", error);
    throw error;
  }
};

 export default { createAnswer };

