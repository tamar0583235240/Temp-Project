// repository/reminderRepository.ts


import { pool } from '../config/dbConnection';



export async function upsertReminderSetting(userId: string, type: string, is_enabled: boolean, frequency: string | null) {
  await pool.query(
    `INSERT INTO user_reminder_settings (user_id, type, frequency, is_enabled)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, type)
     DO UPDATE SET frequency = $3, is_enabled = $4`,
    [userId, type, frequency, is_enabled]
  );
}

export async function getReminderSettingsByUser(userId: string) {
  const { rows } = await pool.query(
    `SELECT type, frequency, is_enabled FROM user_reminder_settings WHERE user_id = $1`,
    [userId]
  );
  return rows;
}

export default {
  upsertReminderSetting,
  getReminderSettingsByUser,
};