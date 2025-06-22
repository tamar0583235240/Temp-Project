import e from 'express';
import { pool } from '../config/dbConnection';

const getSharedRecordingIdByAnswerId = async (answerId:string): Promise<string | null> => {  
    try {
        
        const data = await pool.query(`SELECT id FROM shared_recordings WHERE answer_id = $1` , [answerId] );   

        console.log(data.rows.length);
        
        return data.rows[0].id as string;
    }
    catch (error) {
        console.error(`Error fetching sharedRecordingId by answerId: ${answerId} from Supabase:`, error);
        throw error;
    }
}

export default {getSharedRecordingIdByAnswerId}   