import {pool} from '../config/dbConnection';
import { FeedbackToSystem  } from "../interfaces/entities/FeedbackToSystem";

const getAllFeedbackToSystemByUserId = async (userId: string): Promise<FeedbackToSystem[]> => {
  try {
    const query = 'SELECT * FROM feedback_to_system WHERE user_id = $1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows as FeedbackToSystem[];
  } catch (error) {
    console.error("Error fetching feedback to system:", error);
    throw error;
  }
};


const updateFeedbackToSystemById = async (updates: FeedbackToSystem): Promise<FeedbackToSystem> => {
  const { id, ...fieldsToUpdate } = updates;
  const fields = Object.keys(fieldsToUpdate);
  if (fields.length === 0) {
    throw new Error('No fields provided for update.');
  }
  const values = Object.values(fieldsToUpdate);
  const setString = fields
    .map((field, i) => `"${field}" = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE feedback_to_system
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [...values, id]);
    if (rows.length === 0) {
      throw new Error(`FeedbackToSystem with id ${id} not found`);
    }
    return rows[0];
  } catch (error) {
    console.error('Error updating feedbackToSystem:', error);
    throw new Error('Failed to update feedbackToSystem');
  }
}

const deleteFeedbackToSystemById = async (id: string): Promise<string> => {
  try {
    const query = 'DELETE FROM feedback_to_system WHERE id = $1';
    const values = [id];
    await pool.query(query, values);
    return "FeedbackToSystem deleted successfully";
  } catch (error) {
    console.error("Error deleting FeedbackToSystem from Supabase:", error);
    throw error;
  }
}

export default {getAllFeedbackToSystemByUserId, updateFeedbackToSystemById,deleteFeedbackToSystemById};