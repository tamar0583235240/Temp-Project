import { pool } from '../config/dbConnection';
import { InterviewMaterialSub } from '../interfaces/InterviewMaterialSub';

const getInterviewMaterialSubs = async (): Promise<InterviewMaterialSub[]> => {
    try {
        const result = await pool.query('SELECT * FROM interview_materials_sub');
        return result.rows as InterviewMaterialSub[];
    } catch (error) {
        console.error('Error fetching AIInsight from PostgreSQL:', error);
        throw error;
    }
};

export default { getInterviewMaterialSubs };