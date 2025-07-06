import { pool } from '../config/dbConnection';
import { InterviewExperiences } from "../interfaces/entities/InterviewExperiences";

const getAllInterviewExperiences = async (): Promise<InterviewExperiences[] | void> => {
    try {
        const { rows } = await pool.query('SELECT * FROM Interview_Experiences');
        return rows as InterviewExperiences[];
    } catch (error) {
        console.error('Error fetching interview experiences:', error);
        throw error;
    }
};

export default {
    getAllInterviewExperiences,
};