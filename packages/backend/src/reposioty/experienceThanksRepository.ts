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

const addExperienceThanks = async (experienceThanks: ExperienceThanks): Promise<ExperienceThanks | void> => {
   try {
        const { rows } = await pool.query(
            `INSERT INTO "Experience_Thanks" (experience_id, user_id , created_at) VALUES ($1, $2 , $3) RETURNING *`,
            [experienceThanks.experience.id, experienceThanks.user.id ,new Date()]
        );
        return rows[0] as ExperienceThanks;
    } catch (error) {
        console.error('Error adding Experience_Thanks:', error);
        throw error;
    }
};  

export default {
    getAllExperienceThanks , addExperienceThanks
};