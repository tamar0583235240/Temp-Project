import { pool } from '../config/dbConnection';
import { Questions } from '../interfaces/entities/Questions';

const getAllQuestions = async (): Promise<Questions[]> => {
  try {
    const query = `
      SELECT id, title, content, category, tips, ai_guidance, is_active
      FROM questions
      WHERE is_active = TRUE
    `;
    const result = await pool.query(query);
    return result.rows as Questions[];
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export default { getAllQuestions };
