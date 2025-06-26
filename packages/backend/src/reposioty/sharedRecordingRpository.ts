import { pool } from '../config/dbConnection';

export const getSharedWithByAnswerAndOwner = async (
  answerId: string,
  ownerId: string
): Promise<{ name: string; email: string }[]> => {
  try {
    const query = `
      SELECT
        u.first_name || ' ' || u.last_name AS name,
        u.email
      FROM shared_recordings sr
      JOIN LATERAL unnest(sr.shared_with) AS shared_email(email) ON true
      JOIN users u ON u.email = shared_email.email
      WHERE sr.answer_id = $1 AND sr.owner_id = $2
    `;
    const values = [answerId, ownerId];
    const { rows } = await pool.query(query, values);
    return rows.map(row => ({
      name: row.name,
      email: row.email
    }));

  } catch (error) {
    console.error("Error fetching shared recordings:", error);
    throw error;
  }
};

export const getAllPreviouslySharedEmails = async (
  userId: string
): Promise<{ name: string; email: string }[]> => {
  const query = `
    SELECT DISTINCT
      u.first_name || ' ' || u.last_name AS name,
      u.email
    FROM shared_recordings sr
    JOIN LATERAL unnest(sr.shared_with) AS shared_email(email) ON true
    JOIN users u ON u.email = shared_email.email
    WHERE sr.owner_id = $1
  `;
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows.map(row => ({
    name: row.name,
    email: row.email
  }));
};

export const getSharedRecordingIdByAnswerId = async (answerId:string): Promise<string | null> => {  
    try {
        
        const data = await pool.query(`SELECT id FROM shared_recordings WHERE answer_id = $1` , [answerId] );   

        console.log(data.rows.length);
        
        return data.rows[0].id as string;
    }
    catch (error) {
        console.error(`Error fetching sharedRecordingId by answerId: ${answerId} from Supabase:`, error);
        throw error;
    }
};