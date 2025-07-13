
import { Request, Response } from 'express';
import reminderService from '../services/reminderService';

export const saveUserReminderSettings = async (req: Request, res: Response) => {
  try {
    const { userId, settings } = req.body;
    await reminderService.saveUserSettings(userId, settings);
    res.status(200).json({ message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
