import { pool } from '../config/dbConnection';

// src/reposioty/reminderRepository.ts
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
        frequency: row.frequency,
      },
    },
  }));
}

const saveUserReminderSettings = async (settings: any[]) => {
  const query = `
    INSERT INTO user_reminder_settings (user_id, frequency)
    VALUES ($1, $2)
    ON CONFLICT (user_id) DO UPDATE SET frequency = EXCLUDED.frequency
    RETURNING *;
  `;

  const results = [];
  for (const setting of settings) {
    const { user_id, frequency } = setting;
    const { rows } = await pool.query(query, [user_id, frequency]);
    results.push(rows[0]);
  }
  return results;
}

export default {
  getDueReminders,
  saveUserReminderSettings,
};












 