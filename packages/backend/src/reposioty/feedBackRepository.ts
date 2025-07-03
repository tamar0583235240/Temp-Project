import {pool} from '../config/dbConnection';
import { Feedback } from "../interfaces/entities/Feedback";
import shareRecordingRepository  from '../reposioty/shareRecordingRepository';


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


const getFeedbackesByanswerId = async (answerId:string): Promise<Feedback[]> => {
    
    try {
        const sharedRecordingId =  await shareRecordingRepository.getSharedRecordingIdByAnswerId(answerId);
        const data = await pool.query(`SELECT * FROM feedback WHERE shared_recording_id = $1` , [sharedRecordingId] );   

        console.log(data.rows.length);
        
        return data.rows as Feedback[];
    }
    catch (error) {
        console.error(`Error fetching feedbackes by sharedRecordingId: ${answerId} from Supabase:`, error);
        throw error;
    }

}

export default { getFeedbackesByanswerId ,getFeedbackByAnswerCode};