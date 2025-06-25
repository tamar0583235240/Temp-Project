import { pool } from '../config/dbConnection';
import { Question } from '../interfaces/entities/Question';

const getAllQuestions = async (): Promise<Question[]> => {
  try {
    const query = `
<<<<<<< HEAD
      SELECT id, title, content, category, tips, ai_guidance, is_active, options, question_type
=======
      SELECT id, title, content, category, tips, ai_guidance, is_active
>>>>>>> 1ac4eb045616e7d64374b49703644c65dae00703
      FROM "questions"
      WHERE is_active = TRUE
    `;
    // const query = `
    //   SELECT * FROM "questions"
    // `;
    const result = await pool.query(query);
    return result.rows as Question[];
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    throw error;
  }
};

export default { getAllQuestions };
