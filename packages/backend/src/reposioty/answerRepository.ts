import {pool} from '../config/dbConnection';
import { Answers } from "../interfaces/entities/Answers";

const getAllAnswersByIdUser = async (userId:string): Promise<Answers[]> => {
  
  try{
<<<<<<< HEAD
    // const query = 'SELECT id, user_id, question_id, file_url,answer_file_name ,submitted_at FROM answers WHERE user_id = \$1';
    const query = 'SELECT id, user_id, question_id, file_url,answer_file_name ,submitted_at FROM answers WHERE user_id = $1';
=======
    const query = 'SELECT id, user_id, question_id, file_url,answer_file_name ,submitted_at,amount_feedbacks FROM answers WHERE user_id = \$1';
>>>>>>> 8d7d8a21a7e51e0e565bee46575e3ba71e17593d
    const values = [userId];
    const { rows } = await pool.query(query, values);
    //שורה זו - 12 - נכתבה כדי להציג הקלטות שנשמרו מקומית במחשב
    // כאשר שומרים את ההקלטות בענן ניתן לשים בדאטה בייס ניתוב אליהם ולמחוק שורה זו
    rows.map( row => ( row.file_url = `/recordings/${row.file_url}`))
    return rows as Answers[];
  }catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}

export default {getAllAnswersByIdUser};