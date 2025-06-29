// import { Request, Response } from 'express';
// import reminderRepository from '../reposioty/reminderRepository';
// import saveUserReminderSettings from '../reposioty/reminderRepository';
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
//     res.status(500).json({ error: 'Internal Server Error' });
//   }

// }
// export const saveUserReminderSettingsController = async (req: Request, res: Response) => {

//   try {
//     const userId = req.body.userId; // Assuming userId is sent in the request body
//     const settings = req.body.settings;

//     if (!userId || !Array.isArray(settings)) {
//       return res.status(400).json({ error: 'Invalid user or settings' });
//     }

//     const settingsWithUser = settings.map((setting: any) => ({
//       ...setting,
//       user_id: userId,
//     }));

//     const result = await reminderRepository.saveUserReminderSettings(settingsWithUser);

//     res.status(200).json({ message: 'Settings saved successfully', result });
//   } catch (error) {
//     console.error('Error saving reminder settings:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// export { saveUserReminderSettings };



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
    console.error('Error fetching due reminders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const saveUserReminderSettingsController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const settings = req.body.settings;

    if (!userId || typeof settings !== 'object') {
      return res.status(400).json({ error: 'Invalid user or settings' });
    }

    // הפיכת אובייקט ההגדרות למערך של { user_id, reminder_type, frequency }
    const settingsWithUser = Object.entries(settings).map(
      ([reminder_type, frequency]) => ({
        user_id: userId,
        reminder_type,
        frequency,
      })
    );

    const result = await reminderRepository.saveUserReminderSettings(settingsWithUser);

    res.status(200).json({ message: 'Settings saved successfully', result });
  } catch (error) {
    console.error('Error saving reminder settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
