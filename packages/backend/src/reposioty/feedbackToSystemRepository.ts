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

export default {getAllFeedbackToSystemByUserId};