// import { Request, Response } from 'express';
// import reminderRepository from '../reposioty/reminderRepository';
// import { isReminderDue, isSentToday } from '../utils/reminderUtils';
// import { pool } from '../config/dbConnection';
// import { saveReminderSettingsForUser } from '../services/reminderService';

// export const saveUserReminderSettings = async (req: Request, res: Response) => {
//   try {
//     const { userId, settings } = req.body;

//     if (!userId || !settings) {
//       return res.status(400).json({ message: 'Missing userId or settings' });
//     }

//     await saveReminderSettingsForUser(userId, settings);
//     res.status(200).json({ message: 'Reminder settings saved successfully' });
//   } catch (error) {
//     console.error('Error saving reminders:', error);
//     res.status(500).json({ error: 'Failed to save reminder settings' });
//   }
// };

// export const reminderController = async (req: Request, res: Response) => {
//   try {
//     const allReminders = await reminderRepository.getDueReminders(); // מחזיר את כולם

//     for (const reminder of allReminders) {
//       const { last_sent_at, user_id, tip_id, user } = reminder;
//       const tip_frequency = user?.user_reminder_settings?.tip_frequency;

//       console.log('frequency:', tip_frequency);
//       console.log('last_sent_at:', last_sent_at);
//       console.log('isReminderDue:', isReminderDue(last_sent_at, tip_frequency));
//       console.log('isSentToday:', isSentToday(last_sent_at));

//       if (tip_frequency && isReminderDue(last_sent_at, tip_frequency) && !isSentToday(last_sent_at)) {
//         // עדכון רק למי שמגיע לו לפי התדירות
//         console.log(`Updating last_sent_at for user ${user_id} and tip ${tip_id}`);

//         await pool.query(
//           `UPDATE user_reminder_settings SET last_sent_at = NOW() WHERE user_id = $1 AND tip_id = $2`,
//           [user_id, tip_id]
//         );
//       }
//     }

//     // מחזירים את כולם – גם כאלה שלא אמורים להישלח היום
//     return res.status(200).json(allReminders);
//   } catch (error) {
//     console.error('שגיאה בנתיב /api/tips:', error);
//     res.status(500).json({ error: 'שגיאה בשרת' });
//   }
// };
import { Request, Response } from "express";
import { pool } from '../config/dbConnection';

export const saveUserReminderSettings = async (req: Request, res: Response) => {
  const { userId, settings } = req.body;

  if (!userId || !Array.isArray(settings)) {
    return res.status(400).json({ error: "Missing userId or settings" });
  }

  try {
    for (const setting of settings) {
      const { type, frequency } = setting;

      if (!type || !frequency) continue;

      await pool.query(
        `
        INSERT INTO user_reminder_settings (id, user_id, type, frequency, is_active, last_sent_at)
        VALUES (gen_random_uuid(), $1, $2, $3, true, NOW())
        ON CONFLICT (user_id, type)
        DO UPDATE SET frequency = EXCLUDED.frequency, is_active = true, last_sent_at = NOW()
        `,
        [userId, type, frequency]
      );
    }

    res.status(200).json({ message: "Settings saved successfully" });
  } catch (err) {
    console.error("Error saving settings", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getRemindersForUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      `
      SELECT tips.id, tips.content, s.frequency
      FROM user_reminder_settings s
      JOIN tips ON s.tip_id = tips.id
      WHERE s.user_id = $1 AND s.is_active = true
      `,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error getting reminders", err);
    res.status(500).json({ error: "Server error" });
  }
};
