import { error } from 'console';
import { pool } from '../config/dbConnection';
import { Feedback } from '../interfaces/entities/Feedback';
import { Users } from '../interfaces/entities/Users';
import { get } from 'http';
import { getSharedRecordingIdByAnswerId } from './sharedRecordingRpository';



const getFeedbackesByanswerId = async (answerId:string): Promise<Feedback[]> => {
    
    try {
        const sharedRecordingId =  await getSharedRecordingIdByAnswerId(answerId);
        const data = await pool.query(`SELECT * FROM feedback WHERE shared_recording_id = $1` , [sharedRecordingId] );   

        console.log(data.rows.length);
        
        return data.rows as Feedback[];
    }
    catch (error) {
        console.error(`Error fetching feedbackes by sharedRecordingId: ${answerId} from Supabase:`, error);
        throw error;
    }

}

export default { getFeedbackesByanswerId };