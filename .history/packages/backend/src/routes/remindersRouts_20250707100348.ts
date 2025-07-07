// import { Router } from 'express';
// import { reminderController } from '../controllers/reminderController';
// import { saveUserReminderSettings } from '../controllers/reminderController';
// const router = Router();
// router.get('/', reminderController);
// //router.post('/reminders/settings', saveUserReminderSettings);
// router.post('/settings', saveUserReminderSettings);


// export default router;


import express from "express";
import { saveUserReminderSettings, getRemindersForUser } from "../controllers/reminderController";

const router = express.Router();

router.post("/settings", saveUserReminderSettings);
router.get("/:userId", getRemindersForUser);

export default router;
