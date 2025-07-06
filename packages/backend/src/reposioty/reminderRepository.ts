import { pool } from '../config/dbConnection';

async function getDueReminders() {
  const query = `
    SELECT 
      t.id AS tip_id,
      t.content,
      s.user_id,
      s.frequency,
      s.last_sent_at
    FROM tips t
    JOIN user_reminder_settings s ON s.tip_id = t.id
  `;

  const { rows } = await pool.query(query);

  return rows.map((row) => ({
    tip_id: row.tip_id,
    content: row.content,
    user_id: row.user_id,
    last_sent_at: row.last_sent_at,
    user: {
      user_reminder_settings: {
        tip_frequency: row.frequency,
      },
    },
  }));
}
export default {
  getDueReminders,
};