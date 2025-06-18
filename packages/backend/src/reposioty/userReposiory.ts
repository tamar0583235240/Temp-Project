import { User } from '@supabase/supabase-js';
import { pool } from '../config/dbConnection';
import { Users } from '../models/entities/Users';
import { get } from 'http';


const getUserById = async (userId:string): Promise<Users[]> => {
    try {
        
        const data = await pool.query(`SELECT * FROM users WHERE id = $1` , [userId] );   

        console.log(data.rows.length);
        
        return data.rows as Users[];
    }
    catch (error) {
        console.error(`Error fetching user by id: ${userId} from Supabase:`, error);
        throw error;
    }

}

export default { getUserById };