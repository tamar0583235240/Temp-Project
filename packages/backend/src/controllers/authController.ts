import { Request, Response } from 'express';
import { Users } from '../interfaces/entities/Users';
import userRepository from '../reposioty/userRepository'
import { v4 as uuidv4 } from 'uuid';
import authRepository from '../reposioty/authRepository';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: Users | null = await authRepository.login(email, password);
  if (!user) {
    return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
  }
  // נניח שאת יוצרת טוקן דמי
  const token = `mock-token-${user.id}`;
  res.json({ user, token });
};

export const signup =async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const existing = await(await userRepository.getAllUsers()).find(user => user.email === email);
  if (existing) {
    return res.status(409).json({ message: 'אימייל כבר קיים' });
  }
  const newUser: Users = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phone,
    password,
    role: 'student',
    isActive: true,
    answers: [],
    feedbacks: [],
    passwordResetTokens: [],
    sharedRecordings: []
  };

  authRepository.signup(newUser);

  const token = `mock-token-${newUser.id}`;
  
  res.status(201).json({ user: newUser, token });
};
