
import {pool} from '../config/dbConnection'; // נניח שיש לך מודול db שמייצא את pool     
// נניח שיש לך מודול db שמייצא את pool  
   // הקשר למסד הנתונים

// מיפוי: FE שלח תדירויות כמו 'every-three-days' אבל ב־DB צריך ENUM: 'every_3_days'
const frequencyMap: Record<string, string> = {
  'daily': 'daily',
  'every-two-days': 'every_2_days',
  'every-three-days': 'every_3_days',
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
      const dbFreq = frequencyMap[freq];

      if (!dbType || !dbFreq) continue;

      // UPSERT
      await client.query(
        `
        INSERT INTO user_reminder_settings (user_id, type, frequency, is_enabled)
        VALUES ($1, $2, $3, true)
        ON CONFLICT (user_id, type)
        DO UPDATE SET frequency = EXCLUDED.frequency, is_enabled = true
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
