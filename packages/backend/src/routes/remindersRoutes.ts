import { Router } from 'express';
import { exampleMiddleware } from '../middlewares/exampleMiddlewares';
import { saveUserReminderSettings } from '../controllers/reminderController';

const router = Router();
// example for implemantaion
//router.get('/exampleURL', exampleMiddleware, reminderController);
// router.post('/reminders/settings', saveUserReminderSettings);

router.post("/api/reminders/settings", saveUserReminderSettings)


export default router;









