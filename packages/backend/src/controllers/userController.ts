import { Request, Response } from 'express';
import { users } from '../config/users';

export const getAllUsers = (req: Request, res: Response) => {
  res.json(users);
};


export const getUserById = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};



