// import { Request, Response } from 'express';
// import reminderRepository from '../reposioty/reminderRepository';
// import { isReminderDue } from '../utils/reminderUtils';

// export const reminderController = async (req: Request, res: Response) => {
//   try {
//     const allReminders = await reminderRepository.getDueReminders();


//     const dueReminders = allReminders.filter((reminder) => {
//       const frequency = reminder.user?.user_reminder_settings?.frequency;
//       const lastSentAt = reminder.last_sent_at;
//       const due = frequency && isReminderDue(lastSentAt, frequency);

//       return due;
//     });

//     console.log('after filter: dueReminders:', dueReminders.length);

//     res.status(200).json(dueReminders);
//   } catch (error) {
//     console.error('שגיאה בנתיב /api/tips:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }



import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';
import { isReminderDue } from '../utils/reminderUtils';
import { pool } from '../config/dbConnection';
import { isSentToday, isEarlier } from '../utils/reminderUtils'

// export const reminderController = async (req: Request, res: Response) => {
//   try {
//     const allReminders = await reminderRepository.getDueReminders();

//     const dueReminders = allReminders.filter((reminder) => {
//       const frequency = reminder.user?.user_reminder_settings?.frequency;
//       const lastSentAt = reminder.last_sent_at;
//       if(!frequency) return false;
//       if(isSentToday(lastSentAt)) return true;
//       return frequency && isReminderDue(lastSentAt, frequency);
//     });

//     // עדכון last_sent_at
//     for (const reminder of dueReminders) {
//       await pool.query(
//         `UPDATE user_reminder_settings SET last_sent_at = NOW() WHERE user_id = $1`,
//         [reminder.user_id]
//       );
//     }

//     res.status(200).json(dueReminders);
//   } catch (error) {
//     console.error('שגיאה בנתיב /api/tips:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const reminderController = async (req: Request, res: Response) => {
//   try {
//     const allReminders = await reminderRepository.getDueReminders();

//     // Map לפי user_id כדי לשמור רק טיפ אחד לכל משתמש
//     const selectedPerUser = new Map<string, any>();

//     for (const reminder of allReminders) {
//       const { user_id, tip_id, last_sent_at, user, content } = reminder;
//       const frequency = user?.user_reminder_settings?.frequency;

//       if (!frequency) continue;

//       // אל תשלח אם כבר נשלח היום
//       if (isSentToday(last_sent_at)) continue;

//       // תשלח רק אם הגיע הזמן לפי התדירות
//       if (!isReminderDue(last_sent_at, frequency)) continue;

//       // אם אין כבר טיפ למשתמש – הוסף
//       if (!selectedPerUser.has(user_id)) {
//         selectedPerUser.set(user_id, reminder);
//       }
//     }

//     const remindersToSend = Array.from(selectedPerUser.values());

//     // עדכון last_sent_at רק למה שנשלח בפועל
//     for (const reminder of remindersToSend) {
//       await pool.query(
//         `UPDATE user_reminder_settings SET last_sent_at = NOW() WHERE user_id = $1 AND tip_id = $2`,
//         [reminder.user_id, reminder.tip_id]
//       );
//     }

//     if (remindersToSend.length === 0) {
//       return res.status(200).json({ message: 'אין טיפים לשליחה כרגע 😊' });
//     }

//     res.status(200).json(remindersToSend);
//   } catch (error) {
//     console.error('שגיאה בנתיב /api/tips:', error);
//     res.status(500).json({ error: 'שגיאה בשרת' });
//   }
// };
export const reminderController = async (req: Request, res: Response) => {
  try {
    const allReminders = await reminderRepository.getDueReminders();

    // Map לפי user_id כדי לשמור רק טיפ אחד לכל משתמש (אם זה הכוונה)
    // אם רוצים את כל הטיפים - אפשר גם לוותר על זה ולהציג את כולם
    // כאן אני שומר רק טיפ אחד למשתמש כמו בקוד שלך, אפשר לשנות לפי צורך
    const selectedPerUser = new Map<string, any>();

    for (const reminder of allReminders) {
      const { user_id, tip_id, last_sent_at, user } = reminder;
      const frequency = user?.user_reminder_settings?.frequency;
      if (!frequency) continue;

      // להראות את הטיפ כל היום לאחר שנשלח, או אם לא נשלח מעולם
      if (!last_sent_at || isSentToday(last_sent_at) || isReminderDue(last_sent_at, frequency)) {
        if (!selectedPerUser.has(user_id)) {
          selectedPerUser.set(user_id, reminder);
        }
      }
    }

    const remindersToShow = Array.from(selectedPerUser.values());

    // רק טיפים שטרם נשלחו היום יעדכנו את last_sent_at
    const remindersToUpdate = remindersToShow.filter(r => !isSentToday(r.last_sent_at));

    for (const reminder of remindersToUpdate) {
      await pool.query(
        `UPDATE user_reminder_settings SET last_sent_at = NOW() WHERE user_id = $1 AND tip_id = $2`,
        [reminder.user_id, reminder.tip_id]
      );
    }

    if (remindersToShow.length === 0) {
      return res.status(200).json({ message: 'אין טיפים לשליחה כרגע 😊' });
    }

    res.status(200).json(remindersToShow);
  } catch (error) {
    console.error('שגיאה בנתיב /api/tips:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
