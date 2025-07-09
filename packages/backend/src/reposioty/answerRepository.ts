import { pool } from '../config/dbConnection';
import { Answers } from "../interfaces/entities/Answers";

<<<<<<< HEAD
const getAllAnswersByIdUser = async (userId:string): Promise<Answers[]> => {
  try{
=======
const getAllAnswersByIdUser = async (userId: string): Promise<Answers[]> => {

  try {

>>>>>>> newTaskG4
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