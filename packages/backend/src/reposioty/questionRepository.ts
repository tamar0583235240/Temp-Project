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




const updateQuestionById = async (updates: Questions) => {
  const { id, ...fieldsToUpdate } = updates;
  console.log(updates)
  console.log("njnjnjn");
  const fields = Object.keys(fieldsToUpdate);
  if (fields.length === 0) {
    throw new Error('No fields provided for update.');
  }
  const values = Object.values(fieldsToUpdate);
  const setString = fields
    .map((field, i) => `"${field}" = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE questions
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [...values, id]);
    if (rows.length === 0) {
      throw new Error(`Question with id ${id} not found`);
    }
    return rows[0];
  } catch (error) {
    console.error('Error updating question:', error);
    throw new Error('Failed to update question');
  }
}



const deleteQuestionById = async (id: string, is_active: boolean): Promise<string> => {
  try {
    const query = 'UPDATE questions SET is_active = $1 WHERE id = $2';
    const values = [is_active, id];
    await pool.query(query, values);
    return "Question deleted successfully";
  } catch (error) {
    console.error("Error deleting question from Supabase:", error);
    throw error;
  }
}
export default { getAllQuestionById, getAllQuestions, deleteQuestionById, updateQuestionById };

