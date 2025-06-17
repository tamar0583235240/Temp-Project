import {pool} from '../config/dbConnection';
import { Answer } from "../interfaces/Answer";

const getAllAnswersByIdUser = async (userId:string): Promise<Answer[]> => {
  
  try{
    const query = 'SELECT id, userId, questionId, fileUrl, submittedAt FROM answers WHERE userId = \$1';
    const values = [userId];
    const { rows } = await pool.query(query, values); 
    return rows as Answer[];
   
  }catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}

export default {getAllAnswersByIdUser};