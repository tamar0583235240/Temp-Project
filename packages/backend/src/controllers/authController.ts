import { Request, Response } from 'express';
import * as userRepository from '../reposioty/userRepository';
import jwt from 'jsonwebtoken';
import { Users } from '../interfaces/entities/Users';
import { v4 as uuidv4 } from 'uuid';
import authRepository from '../reposioty/authRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret';

// התחברות
export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;

  const user = await authRepository.login(email, password);
  if (!user) {
    return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: rememberMe ? '7d' : '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ימים
  });

  res.json({ user, token });
};

// רענון טוקן
export const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(407).json({ message: 'לא סופק refresh token' });
  }

  try {
    const userData = jwt.verify(refreshToken, REFRESH_SECRET) as any;
    const newToken = jwt.sign(
      { id: userData.id, email: userData.email, role: userData.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token: newToken });
  } catch (err) {
    return res.status(403).json({ message: 'refresh token לא תקין' });
  }
};

// התנתקות
export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'התנתקת בהצלחה' });
};

// הרשמה
export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const existing = (await userRepository.getAllUsers()).find(user => user.email === email);
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
    sharedRecordings: [],
    createdAt: new Date(),
    resources: []
  };

  await authRepository.signup(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(201).json({ user: newUser, token });
};
