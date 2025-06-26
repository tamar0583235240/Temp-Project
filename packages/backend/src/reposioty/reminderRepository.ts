import { pool } from '../config/dbConnection';

async function getDueReminders() {
  const query = `
    SELECT 
    r.*, 
  u.id AS user_id,
  s.frequency
  FROM 
  tips r
  CROSS JOIN users u
JOIN user_reminder_settings s ON u.id = s.user_id
  `;

  const { rows } = await pool.query(query);

  // מתאימים לפורמט הדרוש
  return rows.map((row) => ({
    id: row.id,
    user_id: row.user_id,
    content: row.content,
    last_sent_at: row.last_sent_at,
    user: {
      user_reminder_settings: {
        frequency: row.frequency
      }
    }
  }));
}

export default {
  getDueReminders,
};

