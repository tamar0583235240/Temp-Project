
import { pool } from '../config/dbConnection';
import { AiInsights } from '../interfaces/entities/AiInsights';
import { Feedback } from '../interfaces/entities/Feedback';



const getAiInsightsByAnswerId = async (answerId:string): Promise<AiInsights[]> => {
    try {
        
        const data = await pool.query(`SELECT * FROM ai_insights WHERE answer_id = $1` , [answerId] );   

        console.log(data.rows.length);
        
        return data.rows as AiInsights[];
    }
    catch (error) {
        console.error(`Error fetching AI insights by answerId: ${answerId} from Supabase:`, error);
        throw error;
    }

}

const getAiInsights = async (): Promise<AiInsights[]> => {
    try {
        const result = await pool.query('SELECT * FROM ai_insights');  
        return result.rows as AiInsights[];
    } catch (error) {
        console.error('Error fetching AIInsight from PostgreSQL:', error);
        throw error;
    }
};

export default { getAiInsightsByAnswerId,getAiInsights };