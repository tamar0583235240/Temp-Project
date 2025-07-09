
// // reminderRouts.ts
// import { Router } from 'express';
// // import { sendDueReminders } from '../controllers/reminderController';
// import { getAllSentTips, saveUserReminderSettings } from '../controllers/reminderController';

// const router = Router();

// router.get('/', getAllSentTips); // שורת GET מתוקנת
// // router.post('/send', sendDueReminders);
// router.post('/settings', saveUserReminderSettings); // שורת POST תקינה

// reminderRoutes.ts
import { Router } from 'express';
import { sendDueReminders } from '../controllers/reminderController';
import { getAllSentTips, saveUserReminderSettings } from '../controllers/reminderController';

const router = Router();

router.get('/', getAllSentTips); // שליפה של כל הטיפים שנשלחו
router.post('/send', sendDueReminders); // שליחה של תזכורות
router.post('/settings', saveUserReminderSettings); // שמירת הגדרות משתמש

export default router;









