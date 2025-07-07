import { pool } from '../config/dbConnection';
import { Question } from '../interfaces/entities/Question';

const getAllQuestions = async (): Promise<Question[]> => {
  try {
    const query = `
      SELECT id, title, content, category, tips, ai_guidance, is_active, options, question_type
      FROM "questions"
      WHERE is_active = TRUE
    `;
    const result = await pool.query(query);
    return result.rows as Question[];
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    throw error;
  }
};

const getQuestionsByCategory = async (category_id: string): Promise<Question[]> => {
  try {
   const query = `
      SELECT id, title, content, category, tips, ai_guidance, is_active, options, question_type
      FROM "questions"
      WHERE category_id = $1
    `;
    const result = await pool.query(query, [category_id]);
    return result.rows as Question[];
  } catch (error) {
    console.error("❌ Error fetching questions by category:", error);
    throw error;
  }
};

export default { getAllQuestions, getQuestionsByCategory };
