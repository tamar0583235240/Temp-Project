import { pool } from '../config/dbConnection';
import { Question } from '../interfaces/entities/Question';

const getUserAnsweredQuestions
  = async (
    userId: string,
    category: string
  ): Promise<Question[]> => {
    try {
      const query = `
      SELECT q.id, q.title, q.content, q.category, q.tips, q.ai_guidance, q.is_active, q.options, q.question_type
      FROM "answers" a
      INNER JOIN "questions" q ON a.question_id = q.id
      WHERE a.user_id = $1 AND q.category = $2
    `;
      const result = await pool.query(query, [userId, category]);
      return result.rows as Question[];
    } catch (error) {
      console.error("❌ Error fetching answered questions by user and category:", error);
      throw error;
    }
  };
export default {
  getUserAnsweredQuestions
};
