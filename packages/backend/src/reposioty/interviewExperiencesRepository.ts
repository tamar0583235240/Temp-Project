import { InterviewExperienceWithUser } from 'interfaces/InterviewExperienceWithUser';
import { pool } from '../config/dbConnection';
import { InterviewExperiences } from "../interfaces/entities/InterviewExperiences";
import { v4 as uuid4 } from 'uuid';

const getAllInterviewExperiences = async (): Promise<InterviewExperienceWithUser[] | void> => {
    try {
        const { rows } = await pool.query(`SELECT ie.id AS interview_id, u.id AS id, ie.*, u.* 
                                           FROM "Interview_Experiences" ie JOIN "users" u ON ie.user_id = u.id`);
        return rows as InterviewExperienceWithUser[];
    } catch (error) {
        console.error('Error fetching interview experiences:', error);
        throw error;
    }
};

const deleteInterviewExperienceById = async (id: string): Promise<void> => {
    try {
        await pool.query('DELETE FROM "Interview_Experiences" WHERE id = $1', [id]);
        await pool.query('DELETE FROM "Content_Reports" WHERE experience_id = $1', [id]);
    } catch (error) {
        console.error('Error deleting interview experience:', error);
        throw error;
    }
}

const addInterviewExperiences = async (
  interviewExperiences: InterviewExperiences
): Promise<InterviewExperiences> => {
  try {
    const id = uuid4();

    const query = `
      INSERT INTO "Interview_Experiences" (
        id, company_name, position, interview_date, questions, tips, description,
        hired, rating, anonymous, created_at, user_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      id,
      interviewExperiences.company_name,
      interviewExperiences.position,
      interviewExperiences.interviewDate,
      interviewExperiences.questions, 
      interviewExperiences.tips,
      interviewExperiences.description,
      interviewExperiences.hired,
      interviewExperiences.rating,
      interviewExperiences.anonymous,
      interviewExperiences.created_at ?? new Date(), // ברירת מחדל
      interviewExperiences.user_id
    ];

    const result = await pool.query(query, values);
    return result.rows[0] as InterviewExperiences;
  } catch (error) {
    console.error("Error adding interviewExperiences to PostgreSQL:", error);
    throw error;
  }
};


export default {
    getAllInterviewExperiences, deleteInterviewExperienceById,addInterviewExperiences
};