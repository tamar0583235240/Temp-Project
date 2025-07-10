import { pool } from "../config/dbConnection";
import { EducationEntry } from "../interfaces/entities/EducationEntry";

export const getEducationEntriesByUserId = async (userId: string): Promise<EducationEntry[]> => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM education_entries
      WHERE user_id = $1
      `,
      [userId]
    );
    return result.rows as EducationEntry[];
  } catch (error) {
    console.error("Error fetching education entries:", error);
    throw error;
  }
};

export const createEducationEntry = async (entry: EducationEntry): Promise<EducationEntry> => {
  try {
    const {
      id,
      user,
      institutionName,
      degree,
      courseName,
      fieldOfStudy,
      startDate,
      endDate,
      isPublic,
      createdAt,
      updatedAt,
    } = entry;

    const result = await pool.query(
      `
      INSERT INTO education_entries
        (id, user_id, institution_name, degree, course_name, field_of_study, start_date, end_date, is_public, created_at, updated_at)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
      `,
      [
        id,
        user.id,
        institutionName,
        degree,
        courseName,
        fieldOfStudy,
        startDate,
        endDate,
        isPublic,
        createdAt,
        updatedAt,
      ]
    );

    return result.rows[0] as EducationEntry;
  } catch (error) {
    console.error("Error creating education entry:", error);
    throw error;
  }
};

export const updateEducationEntry = async (
  id: string,
  data: Partial<EducationEntry>
): Promise<EducationEntry | null> => {
  try {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (!fields.length) return null;

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE education_entries
      SET ${setClause}, updated_at = NOW()
      WHERE id = $${fields.length + 1}
      RETURNING *
    `;

    const result = await pool.query(query, [...values, id]);

    return result.rows[0] as EducationEntry;
  } catch (error) {
    console.error("Error updating education entry:", error);
    throw error;
  }
};

export const deleteEducationEntry = async (id: string): Promise<void> => {
  try {
    await pool.query(
      `
      DELETE FROM education_entries
      WHERE id = $1
      `,
      [id]
    );
  } catch (error) {
    console.error("Error deleting education entry:", error);
    throw error;
  }
};
export default {getEducationEntriesByUserId,createEducationEntry,updateEducationEntry,deleteEducationEntry};