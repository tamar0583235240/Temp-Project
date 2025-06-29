import { Router } from 'express';
import { reminderController, saveUserReminderSettingsController } from '../controllers/reminderController';

const router = Router();

router.get('/', reminderController);
router.post('/reminders/settings', saveUserReminderSettingsController); // ✅ השם הנכון מה-controller

export default router;
