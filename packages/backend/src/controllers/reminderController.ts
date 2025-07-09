// רק בסיעתא דשמיא //

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
//       const frequency = user?.user_reminder_settings?.tip_frequency;

//       console.log('frequency:', frequency);
//       console.log('last_sent_at:', last_sent_at);
//       console.log('isReminderDue:', isReminderDue(last_sent_at, frequency));
//       console.log('isSentToday:', isSentToday(last_sent_at));

//       if (frequency && isReminderDue(last_sent_at, frequency) && !isSentToday(last_sent_at)) {
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

// // +++ // 
// import { Request, Response } from 'express';
// import reminderRepository from '../reposioty/reminderRepository';
// import { pool } from '../config/dbConnection';
// import { isReminderDue, isSentToday } from '../utils/reminderUtils';
// import { saveReminderSettingsForUser } from '../services/reminderService';

// const CURRENT_USER_ID = 'a40dc000-b446-409a-aa7b-3e778e8f4467';

// export const getAllSentTips = async (_req: Request, res: Response) => {
//   try {
//     const tips = await reminderRepository.getSentTipsForUser(CURRENT_USER_ID);
//     res.status(200).json(tips);
//   } catch (error) {
//     console.error('שגיאה בשליפת טיפים שנשלחו:', error);
//     res.status(500).json({ error: 'שגיאה בשליפת טיפים שנשלחו' });
//   }
// };

// export const sendDueReminders = async (_req: Request, res: Response) => {
//   try {
//     const reminders = await reminderRepository.getDueReminders(CURRENT_USER_ID);

//     const tipQuery = await pool.query(`SELECT id FROM tips ORDER BY id`);
//     const tipIds = tipQuery.rows.map((r) => r.id);

//     for (const reminder of reminders) {
//       const { tip_id, last_sent_at, frequency, tip_num } = reminder;

//       if (isReminderDue(last_sent_at, frequency) && !isSentToday(last_sent_at)) {
//         const alreadySent = await pool.query(
//           `SELECT 1 FROM sent_tips WHERE user_id = $1 AND tip_id = $2`,
//           [CURRENT_USER_ID, tip_id]
//         );

//         if (alreadySent.rowCount === 0) {
//           await pool.query(
//             `INSERT INTO sent_tips (user_id, tip_id, sent_at) VALUES ($1, $2, NOW())`,
//             [CURRENT_USER_ID, tip_id]
//           );
//         }

//         const nextIndex = tip_num % tipIds.length;
//         const nextTipNum = nextIndex + 1;

//         await pool.query(
//           `UPDATE user_reminder_settings 
//            SET last_sent_at = NOW(), tip_num = $1 
//            WHERE user_id = $2 AND type = 'tip'`,
//           [nextTipNum, CURRENT_USER_ID]
//         );
//       }
//     }

//     const allSent = await reminderRepository.getSentTipsForUser(CURRENT_USER_ID);
//     res.status(200).json(allSent);
//   } catch (error) {
//     console.error('Error sending reminders:', error);
//     res.status(500).json({ error: 'Error sending reminders' });
//   }
// };

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
// // +++ // 

// reminderController.ts
import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';
import { pool } from '../config/dbConnection';
import { saveReminderSettingsForUser } from '../services/reminderService';
import { isReminderDue, isSentToday } from '../utils/reminderUtils';

// // שליפת כל הטיפים שנשלחו
// export const getAllSentTips = async (_req: Request, res: Response) => {
//   try {
//     const allSentTips = await reminderRepository.getAllSentTips();
//     res.status(200).json(allSentTips);
//   } catch (error) {
//     console.error('שגיאה בקבלת כל הטיפים שנשלחו:', error);
//     res.status(500).json({ error: 'שגיאה בקבלת כל הטיפים שנשלחו' });
//   }
// };

// שמירת הגדרות תזכורות למשתמש
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

// שליחת תזכורות שדורשות שליחה
export const sendDueReminders = async (_req: Request, res: Response) => {
  try {
    const reminders = await reminderRepository.getDueReminders(); // שליפת התזכורות שדורשות שליחה

    const tipQuery = await pool.query(`SELECT id FROM tips ORDER BY id`); 
    const tipIds = tipQuery.rows.map((r) => r.id);  // מזהים של כל הטיפים

    let sentCount = 0;  // סופר את מספר הטיפים שנשלחו

    for (const reminder of reminders) {
      const { user_id, tip_id, last_sent_at, frequency, tip_num } = reminder;

      // בדוק אם יש צורך לשלוח את הטיפ (לפי הזמן האחרון שנשלח)
      if (isReminderDue(last_sent_at, frequency) && !isSentToday(last_sent_at)) {

        // בדוק אם הטיפ כבר נשלח למשתמש
        const alreadySent = await pool.query(
          `SELECT 1 FROM sent_tips WHERE user_id = $1 AND tip_id = $2`,
          [user_id, tip_id]
        );

        if (alreadySent.rowCount === 0) {
          // אם לא נשלח, שלח אותו ותחום את השדה sent_at
          await pool.query(
            `INSERT INTO sent_tips (user_id, tip_id, sent_at) VALUES ($1, $2, NOW())`,
            [user_id, tip_id]
          );
          sentCount++;
        }

        // עדכון tip_num למספר הבא (הפונקציה מחזירה את המספר הבא)
        const nextIndex = (tip_num % tipIds.length) + 1;  // סיבוב בין כל הטיפים
        await pool.query(
          `UPDATE user_reminder_settings 
           SET last_sent_at = NOW(), tip_num = $1 
           WHERE user_id = $2 AND type = 'tip'`,
          [nextIndex, user_id]
        );
      }
    }

    // אם כל הטיפים נשלחו, תחזיר את ה- tip_num ל-1
    if (sentCount === tipIds.length) {
      await pool.query(
        `UPDATE user_reminder_settings
         SET tip_num = 1
         WHERE user_id = $1 AND type = 'tip'`,
        [reminders[0].user_id] // נוודא שמשתמש ספציפי נמצא
      );
    }

    // שליפת כל הטיפים שנשלחו
    const allSent = await reminderRepository.getAllSentTips();
    res.status(200).json(allSent);

  } catch (error) {
    console.error('Error sending reminders:', error);
    res.status(500).json({ error: 'Error sending reminders' });
  }
};

export const getAllSentTips = async (_req: Request, res: Response) => {
  try {
    const allSentTips = await reminderRepository.getAllSentTips();
    res.status(200).json(allSentTips);
  } catch (error) {
    console.error('שגיאה בקבלת כל הטיפים שנשלחו:', error);
    res.status(500).json({ error: 'שגיאה בקבלת כל הטיפים שנשלחו' });
  }
};

// // שליחת תזכורות שדורשות שליחה
// export const sendDueReminders = async (_req: Request, res: Response) => {
//   try {
//     const reminders = await reminderRepository.getDueReminders(); // שליפת התזכורות שדורשות שליחה

//     const tipQuery = await pool.query(`SELECT id FROM tips ORDER BY id`);
//     const tipIds = tipQuery.rows.map((r) => r.id);

//     let sentCount = 0;  // סופר את מספר הטיפים שנשלחו

//     for (const reminder of reminders) {
//       const { user_id, tip_id, last_sent_at, frequency, tip_num } = reminder;

//       // בדוק אם יש צורך לשלוח את הטיפ (לפי הזמן האחרון שנשלח)
//       if (isReminderDue(last_sent_at, frequency) && !isSentToday(last_sent_at)) {
        
//         // בדוק אם הטיפ כבר נשלח למשתמש
//         const alreadySent = await pool.query(
//           `SELECT 1 FROM sent_tips WHERE user_id = $1 AND tip_id = $2`,
//           [user_id, tip_id]
//         );

//         if (alreadySent.rowCount === 0) {
//           // אם לא נשלח, שלח אותו ותחום את השדה sent_at
//           await pool.query(
//             `INSERT INTO sent_tips (user_id, tip_id, sent_at) VALUES ($1, $2, NOW())`,
//             [user_id, tip_id]
//           );
//           sentCount++;
//         }

//         // עדכון tip_num למספר הבא
//         const nextIndex = (tip_num % tipIds.length) + 1; // סיבוב בין כל הטיפים
//         await pool.query(
//           `UPDATE user_reminder_settings 
//            SET last_sent_at = NOW(), tip_num = $1 
//            WHERE user_id = $2 AND type = 'tip'`,
//           [nextIndex, user_id]
//         );
//       }
//     }

//     // אם כל הטיפים נשלחו, תחזיר את ה- tip_num ל-1
//     if (sentCount === tipIds.length) {
//       await pool.query(
//         `UPDATE user_reminder_settings
//          SET tip_num = 1
//          WHERE user_id = $1 AND type = 'tip'`,
//         [reminders[0].user_id] // נוודא שמשתמש ספציפי נמצא
//       );
//     }

//     // שליפת כל הטיפים שנשלחו
//     const allSent = await reminderRepository.getAllSentTips();
//     res.status(200).json(allSent);
//   } catch (error) {
//     console.error('Error sending reminders:', error);
//     res.status(500).json({ error: 'Error sending reminders' });
//   }
// };





