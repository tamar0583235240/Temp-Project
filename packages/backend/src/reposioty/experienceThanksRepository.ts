import { pool } from '../config/dbConnection';
import { ExperienceThanks } from "../interfaces/entities/ExperienceThanks";

const getAllExperienceThanks = async (): Promise<ExperienceThanks[] | void> => {
    try {
        const { rows } = await pool.query('SELECT * FROM "Experience_Thanks"');
        return rows as ExperienceThanks[];
    } catch (error) {
        console.error('Error fetching Experience_Thanks:', error);
        throw error;
    }
};

export default {
    getAllExperienceThanks,
};