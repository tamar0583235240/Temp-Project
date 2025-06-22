import { pool } from '../config/dbConnection';
import { Question } from '../interfaces/entities/Question';

const getAllQuestions = async (): Promise<Question[]> => {
  try {
    const query = `
      SELECT id, title, content, category, tips, aiguidance, isactive, options, question_type
      FROM "Question"
      WHERE isactive = TRUE
    `;
    const result = await pool.query(query);
    return result.rows as Question[];
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    throw error;
  }
};

export default { getAllQuestions };
