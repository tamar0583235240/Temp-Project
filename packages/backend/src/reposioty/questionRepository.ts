import { pool } from '../config/dbConnection';
import { Questions } from '../interfaces/entities/Questions';
const getAllQuestions = async (): Promise<Questions[]> => {
  try {
    const query = `
      SELECT id, title, content, category, tips, ai_guidance, is_active
      FROM "questions"
      WHERE is_active = TRUE
    `;
    const result = await pool.query(query);
    return result.rows as Questions[];
  } catch (error) {
    console.error(":x: Error fetching questions:", error);
    throw error;
  }
};


const getQuestionsByCategory = async (category_id: string): Promise<Questions[]> => {
  try {
    const query = `
      SELECT q.*
      FROM questions q
      JOIN question_categories qc ON qc.question_id = q.id
      WHERE qc.category_id = $1
    `;
    const result = await pool.query(query, [category_id]);
    return result.rows as Questions[];
  } catch (error) {
    console.error("❌ Error fetching questions by category:", error);
    throw error;
  }
};


export default { getAllQuestions, getQuestionsByCategory };






