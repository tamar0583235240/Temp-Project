import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';
import { isReminderDue } from '../utils/reminderUtils';

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