// import { pool } from "../config/dbConnection";

// export type ExpertiseSkillType = {
//   id?: number;
//   user_id: string;
//   category: string;
//   name: string;
//   level?: string | null;
//   is_public?: boolean;
//   created_at?: Date;
// };

// const getAllByUser = async (userId: string): Promise<ExpertiseSkillType[]> => {
//   try {
//     const query = `
//       SELECT id, user_id, category, name, level, is_public, created_at
//       FROM expertise_skills
//       WHERE user_id = $1
//     `;
//     const result = await pool.query(query, [userId]);
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching expertise skills:", error);
//     throw error;
//   }
// };

// const deleteAllByUser = async (userId: string): Promise<void> => {
//   try {
//     await pool.query(`DELETE FROM expertise_skills WHERE user_id = $1`, [userId]);
//   } catch (error) {
//     console.error("Error deleting expertise skills:", error);
//     throw error;
//   }
// };

// const insertMany = async (skills: ExpertiseSkillType[]): Promise<void> => {
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN");

//     const query = `
//       INSERT INTO expertise_skills (user_id, category, name, level, is_public)
//       VALUES ($1, $2, $3, $4, $5)
//     `;

//     for (const skill of skills) {
//       await client.query(query, [
//         skill.user_id,
//         skill.category,
//         skill.name,
//         skill.level ?? null,
//         skill.is_public ?? true,
//       ]);
//     }

//     await client.query("COMMIT");
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.error("Error inserting expertise skills:", error);
//     throw error;
//   } finally {
//     client.release();
//   }
// };

// export default {
//   getAllByUser,
//   deleteAllByUser,
//   insertMany,
// };
// src/repositories/expertiseSkills.repository.ts
import { pool } from "../config/dbConnection";

export const getUserExpertiseSkills = async (userId: string) => {
  const query = `
    SELECT * FROM expertise_skills
    WHERE user_id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const addExpertiseSkill = async (
  userId: string,
  category: string,
  name: string,
  level?: string,
  isPublic: boolean = true
) => {
  const query = `
    INSERT INTO expertise_skills (user_id, category, name, level, is_public)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await pool.query(query, [userId, category, name, level, isPublic]);
  return result.rows[0];
};

export const toggleSkillVisibility = async (
  skillId: number,
  userId: string,
  isPublic: boolean
) => {
  const query = `
    UPDATE expertise_skills
    SET is_public = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *
  `;
  const result = await pool.query(query, [isPublic, skillId, userId]);
  return result.rows[0];
};
