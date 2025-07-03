import { pool } from '../../src/config/dbConnection';
import { Answers } from "../../src/interfaces/entities/Answers";

const getAllAnswersByIdUser = async (userId: string): Promise<Answers[]> => {

  try {

    const query = 'SELECT id, user_id, question_id, file_url,answer_file_name ,submitted_at,amount_feedbacks FROM answers WHERE user_id = \$1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows as Answers[];
  } catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}

export default { getAllAnswersByIdUser };