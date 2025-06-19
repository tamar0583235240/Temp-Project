// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userRepo from '../reposioty/userRepository';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepo.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'המשתמש לא נמצא' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};
