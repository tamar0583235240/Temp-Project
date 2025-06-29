// import { Router } from 'express';
// import { reminderController, saveUserReminderSettingsController } from '../controllers/reminderController';

// const router = Router();

// router.get('/', reminderController);
// router.post('/reminders/settings', saveUserReminderSettingsController); // ✅ השם הנכון מה-controller

// export default router;

import express from 'express';
import { saveUserReminderSettings } from '../controllers/reminderController';

const router = express.Router();

router.post('/reminders/settings', saveUserReminderSettings);

export default router;

