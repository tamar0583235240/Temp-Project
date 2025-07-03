import { pool } from '../config/dbConnection';
import { Questions } from "../interfaces/entities/Questions";

const getAllQuestionById = async (Id: string): Promise<Questions> => {

  try {
    const query = 'SELECT * FROM questions WHERE id = \$1';
    const value = [Id];
    const { rows } = await pool.query(query, value);
    return rows[0] as Questions;

  } catch (error) {
    console.error("Error fetching question from Supabase:", error);
    throw error;
  }
}

const getAllQuestions = async (): Promise<Questions[]> => {

  try {
    const query = 'SELECT * FROM questions';
    const { rows } = await pool.query(query);
    return rows as Questions[];

  } catch (error) {
    console.error("Error fetching questions from Supabase:", error);
    throw error;
  }
}

const deleteQuestionById = async (id: string,is_active:boolean): Promise<string> => {
  try {
    const query = 'UPDATE questions SET is_active = $1 WHERE id = $2';
    const values = [is_active,id];
    await pool.query(query, values);
    return "Question deleted successfully";
  } catch (error) {
    console.error("Error deleting question from Supabase:", error);
    throw error;
  }
}
export default { getAllQuestionById, getAllQuestions, deleteQuestionById };