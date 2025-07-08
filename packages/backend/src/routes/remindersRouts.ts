// import { Router } from 'express';
// import { reminderController } from '../controllers/reminderController';
// import { saveUserReminderSettings } from '../controllers/reminderController';
// const router = Router();
// router.get('/', reminderController);
// //router.post('/reminders/settings', saveUserReminderSettings);
// router.post('/settings', saveUserReminderSettings);


// export default router;

// reminderRouts.ts
import { Router } from 'express';
// import { sendDueReminders } from '../controllers/reminderController';
import { getAllSentTips, saveUserReminderSettings } from '../controllers/reminderController';

const router = Router();

router.get('/', getAllSentTips); // שורת GET מתוקנת
// router.post('/send', sendDueReminders);
router.post('/settings', saveUserReminderSettings); // שורת POST תקינה

export default router;








