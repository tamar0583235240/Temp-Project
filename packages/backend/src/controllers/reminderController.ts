import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';
import { isReminderDue } from '../utils/reminderUtils';
import { saveReminderSettingsForUser } from '../services/reminderService';


export const reminderController = async (req: Request, res: Response) => {
  try {
    const allReminders = await reminderRepository.getDueReminders();


    const dueReminders = allReminders.filter((reminder) => {
      const frequency = reminder.user?.user_reminder_settings?.frequency;
      const lastSentAt = reminder.last_sent_at;
      const due = frequency && isReminderDue(lastSentAt, frequency);
      return due;
    });

    console.log('after filter: dueReminders:', dueReminders.length);

    res.status(200).json(dueReminders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
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
