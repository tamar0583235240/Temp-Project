import { pool } from '../config/dbConnection';
import { AIInsight } from '../interfaces/AIInsight';

const getAiInsights = async (): Promise<AIInsight[]> => {
    try {
        const result = await pool.query('SELECT * FROM ai_insights');
        return result.rows as AIInsight[];
    } catch (error) {
        console.error('Error fetching AIInsight from PostgreSQL:', error);
        throw error;
    }
};

export default { getAiInsights };