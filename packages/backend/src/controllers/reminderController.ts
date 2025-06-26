// // import { Request, Response } from 'express';
// // import reminderRepository from '../reposioty/reminderRepository';

// // export const reminderController = async (req: Request, res: Response): Promise<void> => {
// //   console.log('exampleController called');
// //   try {
// //     const items = await reminderRepository.getAllTips();
// //     res.json(items);
// //   } catch (error: any) {
// //     console.error('Error in exampleController:', error);

// //     if (error?.type === 'redirect') {
// //       res.status(300).json({ message: 'Redirect required', location: '/other-page' });
// //     }

// //     else if (error?.type === 'bad_request') {
// //       res.status(400).json({ error: 'Bad Request' });
// //     }

// //     else {
// //       res.status(500).json({ error: 'Internal Server Error' });
// //     }
// //   }
// // };import { Request, Response } from 'express';

// import { Request, Response } from 'express';
// import reminderRepository from '../reposioty/reminderRepository';

// export const = async (req: Request, res: Response): Promise<void> => {
//   console.log('reminderController called');
//   try {
//     const items = await reminderRepository.getDueReminders();
//     res.json(items);
//   } catch (error: any) {
//     console.error('Error in reminderController:', error);

//     if (error?.type === 'redirect') {
//       res.status(300).json({ message: 'Redirect required', location: '/other-page' });
//     } else if (error?.type === 'bad_request') {
//       res.status(400).json({ error: 'Bad Request' });
//     } else {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// };
import { Request, Response } from 'express';
import reminderRepository from '../reposioty/reminderRepository';
import { isReminderDue } from '../utils/reminderUtils';

export const reminderController = async (req: Request, res: Response) => {
  try {
    const allReminders = await reminderRepository.getDueReminders();

    // const dueReminders = allReminders.filter((reminder) => {
    //   const frequency = reminder.user?.user_reminder_settings?.frequency;
    //   return frequency && isReminderDue(reminder.last_sent_at, frequency);
    // });
    const dueReminders = allReminders.filter((reminder) => {
      const frequency = reminder.user?.user_reminder_settings?.frequency;
      const lastSentAt = reminder.last_sent_at;
      const due = frequency && isReminderDue(lastSentAt, frequency);
      return due;
    });
    //
    console.log('after filter: dueReminders:', dueReminders.length);

    res.status(200).json(dueReminders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}