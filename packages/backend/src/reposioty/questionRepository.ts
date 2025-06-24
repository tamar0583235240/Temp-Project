import { pool } from '../config/dbConnection';
import { Questions } from '../interfaces/entities/Questions'

const getAllQuestions = async (): Promise<Questions[]> => {
  try {
    const query = `
      SELECT id, title, description
      FROM questions
    `;

    const result = await pool.query(query);
    return result.rows as Questions[];

  } catch (error) {
    console.error("Error fetching questions from PostgreSQL:", error);
    throw error;
  }
};

export default { getAllQuestions };