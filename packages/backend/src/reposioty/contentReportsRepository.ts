import { ContentReports } from '../interfaces/entities/ContentReports';
import { pool } from '../config/dbConnection';

const addContentReports = async (contentReports: ContentReports): Promise<ContentReports | void> => {
   try {
        const { rows } = await pool.query(
            `INSERT INTO "Content_Reports" (experience_id, user_id , created_at) VALUES ($1, $2 , $3) RETURNING *`,
            [contentReports.experience_id, contentReports.user_id ,new Date()]
        );
        return rows[0] as ContentReports;
    } catch (error) {
        console.error('Error adding ContentReports:', error);
        throw error;
    }
}; 

const getAllContentReports = async (): Promise<ContentReports[]> => {
    try {
         const { rows } = await pool.query( `SELECT * FROM "Content_Reports"`);
         return rows as ContentReports[];
     } catch (error) {
         console.error('Error adding ContentReports:', error);
         throw error;
     }
 }; 

export default {
    addContentReports,getAllContentReports
};
