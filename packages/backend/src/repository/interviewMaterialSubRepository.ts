// import { InterviewMaterialsSub } from '@interfaces/entities/InterviewMaterialsSub';
import { pool } from "../config/dbConnection";
import { InterviewMaterialsSub } from "../interfaces/entities/InterviewMaterialsSub";
import { Console } from "console";

export const getInterviewMaterialsSubs = async (): Promise<InterviewMaterialsSub[]> => {
  try {
    const result = await pool.query("SELECT * FROM interview_materials_sub");
    return result.rows as InterviewMaterialsSub[];
  } catch (error) {
    console.error("Error fetching AIInsight from PostgreSQL:", error);
    throw error;
  }
};

export const getInterviewMaterialSubById = async (
  id: string
): Promise<InterviewMaterialsSub | null> => {
  try {
    const result = await pool.query(
      "SELECT * FROM interview_materials_sub WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching AIInsight from PostgreSQL:", error);
    throw error;
  }
};

export const updateInterviewMaterialSub = async (
  id: string,
  title: string,
  short_description: string,
  thumbnail: string,
  file_url: string,
  original_file_name: string
): Promise<InterviewMaterialsSub> => {
  try {
    const query = `
    UPDATE interview_materials_sub
    SET title = $1,
        short_description = $2,
        thumbnail = $3,
        file_url = $4
        original_file_name = $5
    WHERE id = $6
    RETURNING *;
`;
    const values = [
      title,
      short_description,
      thumbnail,
      file_url,
      original_file_name,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0] as InterviewMaterialsSub;
  } catch (error) {
    console.error("Error updating interview material sub:", error);
    throw error;
  }
};

export const createInterviewMaterialSub = async (
  title: string,
  thumbnail: string,
  short_description: string,
  file_url: string,
  original_file_name: string
): Promise<InterviewMaterialsSub> => {
  try {
    const query = `
      INSERT INTO interview_materials_sub (title, thumbnail, short_description, file_url, original_file_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      title,
      thumbnail,
      short_description,
      file_url,
      original_file_name,
    ];
    const result = await pool.query(query, values);
    return result.rows[0] as InterviewMaterialsSub;
  } catch (error) {
    console.error("Error creating interview material sub:", error);
    throw error;
  }
};
export const deleteInterviewMaterialSub = async (id: string) => {
  try {
    await pool.query("DELETE FROM interview_materials_sub WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting material by ID:", error);
    throw error;
  }
};
// export default{
//   deleteInterviewMaterialSub,
//   getInterviewMaterialsSubs,
//   getInterviewMaterialSubById,
//   updateInterviewMaterialSub,
//   createInterviewMaterialSub,
// };
