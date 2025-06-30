import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';
import { isReminderDue } from '../utils/reminderUtils';
import { saveReminderSettingsForUser } from '../services/reminderService';


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
}

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
