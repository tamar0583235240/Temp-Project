import { pool } from '../config/dbConnection';
import { Questions } from "../interfaces/entities/Questions";

const getAllQuestionById = async (Id: string): Promise<Questions> => {

  try {
    const query = 'SELECT * FROM questions WHERE id = \$1';
    const value = [Id];
    const { rows } = await pool.query(query, value);
    return rows[0] as Questions;

<<<<<<< HEAD
  } catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}
const getStatsQuwestionsByUserId = async (userId: string): Promise<Questions> => {
  try {
    const sql = "SELECT is_active, COUNT(*) AS total FROM public.questions GROUP BY is_active";
    const { rows } = await pool.query(sql);

    // נהפוך לאובייקט נוח: { answered: 11, unanswered: 9 }
    const stats = rows.reduce(
      (acc, row) => {
        if (row.is_active) acc.answered = Number(row.total);
        else acc.unanswered = Number(row.total);
        return acc;
      },
      { answered: 0, unanswered: 0 }
    );
    return stats;
=======
>>>>>>> newTaskG4
  } catch (error) {
    console.error("Error fetching question from Supabase:", error);
    throw error;
  }
}

<<<<<<< HEAD
export default { getAllQuestionById , getStatsQuwestionsByUserId};
=======
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
>>>>>>> newTaskG4
