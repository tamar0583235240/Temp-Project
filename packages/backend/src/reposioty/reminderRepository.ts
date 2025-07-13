import { pool } from '../config/dbConnection';

const upsertReminder = async (
  userId: string,
  type: 'practice' | 'tip',
  frequency: string
) => {
  const query = `
    INSERT INTO user_reminder_settings (user_id, type, frequency, is_enabled)
    VALUES ($1, $2, $3, true)
    ON CONFLICT (user_id, type)
    DO UPDATE SET frequency = EXCLUDED.frequency, is_enabled = true
  `;
  await pool.query(query, [userId, type, frequency]);
};

export default { upsertReminder };
