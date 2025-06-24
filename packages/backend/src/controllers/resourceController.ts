import { Request, Response } from 'express';
import resourceRepository from '../reposioty/resourceRepository';

export const getAllResources = async (req: Request, res: Response) => {
  try {
    const resources = await resourceRepository.selectAllResources();
    res.status(200).json(resources);
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    res.status(500).json({ message: 'אירעה שגיאה בעת שליפת המשאבים' });
  }
}