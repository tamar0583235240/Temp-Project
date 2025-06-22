import {pool} from '../config/dbConnection';
import { Answers } from "../interfaces/entities/Answers";

const getAllAnswersByIdUser = async (userId:string): Promise<Answers[]> => {
  
  try{
    const query = 'SELECT id, user_id, question_id, file_url,answer_file_name ,submitted_at FROM answers WHERE user_id = \$1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    //שורה זו - 12 - נכתבה כדי להציג הקלטות שנשמרו מקומית במחשב
    // כאשר שומרים את ההקלטות בענן ניתן לשים בדאטה בייס ניתוב אליהם ולמחוק שורה זו
    rows.map( row => ( row.file_url = `/recordings/${row.file_url}`))
<<<<<<< HEAD

=======
>>>>>>> 292850b63ee68c443c1ad15c0acee5afeab2ab93
    return rows as Answers[];
  }catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}

export default {getAllAnswersByIdUser};