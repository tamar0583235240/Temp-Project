import { error } from 'console';
import { pool } from '../config/dbConnection';
import { Feedback } from '../interfaces/entities/Feedback';
import { Users } from '../interfaces/entities/Users';


const getFeedbackesBysharedRecordingId = async (sharedRecordingId:string): Promise<Feedback[]> => {
    try {
        
        const data = await pool.query(`SELECT * FROM feedback WHERE shared_recording_id = $1` , [sharedRecordingId] );   

        console.log(data.rows.length);
        
        return data.rows as Feedback[];
    }
    catch (error) {
        console.error(`Error fetching feedbackes by sharedRecordingId: ${sharedRecordingId} from Supabase:`, error);
        throw error;
    }

}

export default { getFeedbackesBysharedRecordingId };