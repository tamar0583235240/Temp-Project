import {pool} from '../config/dbConnection';
import { Feedback } from "../interfaces/entities/Feedback";

const getFeedbackByAnswerCode= async (answerCode:string): Promise<Feedback[]> => {
  
  try{
    const query = 'SELECT id, shared_recording_id, given_by_user_id, comment,rating, created_at,answer_code FROM feedback WHERE answer_code = \$1';
    const values = [answerCode];
    const { rows } = await pool.query(query,values); 
    return rows as Feedback[];
   
  }catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}

export default {getFeedbackByAnswerCode};