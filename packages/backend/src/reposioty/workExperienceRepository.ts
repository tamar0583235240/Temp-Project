import { pool } from '../config/dbConnection';
import { WorkExperiences } from '../interfaces/entities/WorkExperiences';

export const getWorkExperiencesByUserId = async (userId: string): Promise<WorkExperiences[]> => {
  const res = await pool.query('SELECT * FROM work_experiences WHERE user_id = $1', [userId]);
  return res.rows;
};

export const createWorkExperience = async (data: Partial<WorkExperiences>): Promise<WorkExperiences> => {
  const {
    user,
    companyName,
    position,
    description,
    startDate,
    endDate,
    isPublic,
  } = data;

  const res = await pool.query(
    `INSERT INTO work_experiences 
     (user_id, company_name, position, description, start_date, end_date, is_public, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     RETURNING *`,
    [
      user?.id || user, // אם זה user או סתם userId
      companyName,
      position,
      description,
      startDate,
      endDate,
      isPublic ?? false,
    ]
  );

  return res.rows[0];
};

export const updateWorkExperience = async (
  id: string,
  data: Partial<WorkExperiences>
): Promise<WorkExperiences | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const key in data) {
    if (key === "user") continue; // לא נעדכן קשר ל־user
    fields.push(`${to_snake_case(key)} = $${index}`);
    values.push((data as any)[key]);
    index++;
  }

  // עדכון זמן
  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `UPDATE work_experiences SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`;
  const res = await pool.query(query, values);
  return res.rows[0] || null;
};

export const deleteWorkExperience = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM work_experiences WHERE id = $1', [id]);
};

// פונקציה לעזרה בהמרת camelCase ל-snake_case
function to_snake_case(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
