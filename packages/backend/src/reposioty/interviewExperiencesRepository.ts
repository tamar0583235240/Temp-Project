import { pool } from '../config/dbConnection';
import { InterviewExperiences } from "../interfaces/entities/InterviewExperiences";

const getAllInterviewExperiences = async (): Promise<InterviewExperiences[] | void> => {
    try {
        const { rows } = await pool.query('SELECT * FROM "Interview_Experiences"');
        return rows as InterviewExperiences[];
    } catch (error) {
        console.error('Error fetching interview experiences:', error);
        throw error;
    }
};

const deleteInterviewExperienceById = async (id: string): Promise<void> => {
    try{
        await pool.query('DELETE FROM "Interview_Experiences" WHERE id = $1', [id]);
        await pool.query('DELETE FROM "Content_Reports" WHERE user_id = $1', [id]);

    }catch (error) {
        console.error('Error deleting interview experience:', error);
        throw error;
    }
}

export default {
    getAllInterviewExperiences,deleteInterviewExperienceById,
};