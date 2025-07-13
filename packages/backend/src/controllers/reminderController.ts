// controller/reminderController.ts
import { Request, Response } from "express";
import reminderService from "../services/reminderService";

export async function saveUserReminderSettings(req: Request, res: Response) {
  const { userId, settings } = req.body;
  await reminderService.saveReminderSettings(userId, settings);
  res.json({ message: "Settings saved" });
}

export async function getUserReminderSettings(req: Request, res: Response) {
  const { userId } = req.params;
  const result = await reminderService.getUserReminderSettings(userId);
  res.json(result);
}
