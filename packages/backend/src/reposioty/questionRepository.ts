import { pool } from '../config/dbConnection';
import { Questions } from "../interfaces/entities/Questions";

const getAllQuestionById = async (Id: string): Promise<Questions> => {

  try {
    const query = 'SELECT * FROM questions WHERE id = \$1';
    console.log(query)
    const value = [Id];
    const { rows } = await pool.query(query, value);
    return rows[0] as Questions;
  
  } catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}

export default { getAllQuestionById };