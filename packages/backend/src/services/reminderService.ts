
import { pool } from '../config/dbConnection';

const tipFrequencyMap: Record<string, string> = {
  'daily': 'daily',
  'every_2_days': 'every_2_days',
  'every_3_days': 'every_3_days',
  'weekly': 'weekly',
};

const typeMap: Record<string, string> = {
  'tips': 'tip',
  'questions': 'practice',
};

export const saveReminderSettingsForUser = async (
  userId: string,
  settings: Record<string, string>
) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const [type, freq] of Object.entries(settings)) {
      const dbType = typeMap[type];
      const dbFreq = tipFrequencyMap[freq];

      if (!dbType || !dbFreq) continue;

      await client.query(
        `
  INSERT INTO user_reminder_settings (user_id, type, frequency, is_enabled, tip_num)
  VALUES ($1, $2, $3, true, 1)
  ON CONFLICT (user_id, type)
  DO UPDATE SET frequency = EXCLUDED.frequency, is_enabled = true, tip_num = 1
  `,
        [userId, dbType, dbFreq]
      );

    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
