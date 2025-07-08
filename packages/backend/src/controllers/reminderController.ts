// // import { Request, Response } from 'express';
// // import reminderRepository from '../reposioty/reminderRepository';
// // import { isReminderDue, isSentToday } from '../utils/reminderUtils';
// // import { pool } from '../config/dbConnection';
// // import { saveReminderSettingsForUser } from '../services/reminderService';

// // export const saveUserReminderSettings = async (req: Request, res: Response) => {
// //   try {
// //     const { userId, settings } = req.body;

// //     if (!userId || !settings) {
// //       return res.status(400).json({ message: 'Missing userId or settings' });
// //     }

// //     await saveReminderSettingsForUser(userId, settings);
// //     res.status(200).json({ message: 'Reminder settings saved successfully' });
// //   } catch (error) {
// //     console.error('Error saving reminders:', error);
// //     res.status(500).json({ error: 'Failed to save reminder settings' });
// //   }
// // };

// // export const reminderController = async (req: Request, res: Response) => {
// //   try {
// //     const allReminders = await reminderRepository.getDueReminders(); // מחזיר את כולם

// //     for (const reminder of allReminders) {
// //       const { last_sent_at, user_id, tip_id, user } = reminder;
// //       const frequency = user?.user_reminder_settings?.tip_frequency;

// //       console.log('frequency:', frequency);
// //       console.log('last_sent_at:', last_sent_at);
// //       console.log('isReminderDue:', isReminderDue(last_sent_at, frequency));
// //       console.log('isSentToday:', isSentToday(last_sent_at));

// //       if (frequency && isReminderDue(last_sent_at, frequency) && !isSentToday(last_sent_at)) {
// //         console.log(`Updating last_sent_at for user ${user_id} and tip ${tip_id}`);
// //         await pool.query(
// //           `UPDATE user_reminder_settings SET last_sent_at = NOW() WHERE user_id = $1 AND tip_id = $2`,
// //           [user_id, tip_id]
// //         );
// //       }

// //     }

// //     // מחזירים את כולם – גם כאלה שלא אמורים להישלח היום
// //     return res.status(200).json(allReminders);
// //   } catch (error) {
// //     console.error('שגיאה בנתיב /api/tips:', error);
// //     res.status(500).json({ error: 'שגיאה בשרת' });
// //   }
// // };

// // reminderController.ts
// import { Request, Response } from 'express';
// import reminderRepository from '../reposioty/reminderRepository';
// import { isReminderDue, isSentToday } from '../utils/reminderUtils';
// import { pool } from '../config/dbConnection';
// import { saveReminderSettingsForUser } from '../services/reminderService';

// // 🔹 פונקציה 1 – שומרת הגדרות למשתמשת
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

// // 🔹 פונקציה 2 – שליפה ועדכון של טיפים לפי תדירות
// export const getReminders = async (_req: Request, res: Response) => {
//   try {
//     const reminders = await reminderRepository.getDueReminders();

//     // שלוף את כל ה־UUID של הטיפים לפי סדר
//     const nextTipRes = await pool.query(`SELECT id FROM tips ORDER BY id`);
//     const tipIds = nextTipRes.rows.map((r) => r.id); // כל הטיפים (UUID)

//     for (const reminder of reminders) {
//       const { user_id, last_sent_at, frequency, tip_num } = reminder;

//       if (isReminderDue(last_sent_at, frequency) && !isSentToday(last_sent_at)) {
//         const currentIndex = (tip_num ?? 0) - 1;
//         const nextIndex = (currentIndex + 1) % tipIds.length;
//         const nextTipNum = nextIndex + 1;

//         await pool.query(
//           `UPDATE user_reminder_settings 
//            SET last_sent_at = NOW(), tip_num = $1 
//            WHERE user_id = $2 AND type = 'tip'`,
//           [nextTipNum, user_id]
//         );
//       }
//     }

//     res.status(200).json(reminders);
//   } catch (error) {
//     console.error('שגיאה בקבלת טיפים:', error);
//     res.status(500).json({ error: 'שגיאה בקבלת טיפים' });
//   }
// };

// reminderController.ts
import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';
import { pool } from '../config/dbConnection';
import { saveReminderSettingsForUser } from '../services/reminderService';
import { isReminderDue, isSentToday } from '../utils/reminderUtils';

export const getAllSentTips = async (_req: Request, res: Response) => {
  try {
    const allSentTips = await reminderRepository.getAllSentTips();
    res.status(200).json(allSentTips);
  } catch (error) {
    console.error('Error fetching sent tips:', error);
    res.status(500).json({ error: 'Error fetching sent tips' });
  }
};

export const saveUserReminderSettings = async (req: Request, res: Response) => {
  try {
    const { userId, settings } = req.body;

    if (!userId || !settings) {
      return res.status(400).json({ message: 'Missing userId or settings' });
    }

    await saveReminderSettingsForUser(userId, settings);
    res.status(200).json({ message: 'Reminder settings saved successfully' });
  } catch (error) {
    console.error('Error saving reminders:', error);
    res.status(500).json({ error: 'Failed to save reminder settings' });
  }
};
