import { Request, Response } from 'express';
import * as userRepo from '../reposioty/userRepository';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepo.getUserByEmailAndPassword(email, password);

  if (!user) {
    return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
  }

  const token = `mock-token-${user.id}`;
  res.json({ user, token });
};

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const existing = await userRepo.getUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'אימייל כבר קיים' });
  }

  const newUser = await userRepo.createUser({
    firstName,
    lastName,
    email,
    phone,
    role: 'student',
    isActive: true,
    password,
  });

  const token = `mock-token-${newUser.id}`;
  res.status(201).json({ user: newUser, token });
};
