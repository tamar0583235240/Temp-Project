import { Request, Response } from 'express';
import * as userRepo from '../reposioty/userRepository';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret';
// הוספת משתנה לזכור אותי
//const REMEMBER_ME_DURATION = process.env.REMEMBER_ME_DURATION || '1h'; // ברירת מחדל של 1 שעה
export const login = async (req: Request, res: Response) => {
  const { email, password ,rememberMe} = req.body;

  const user = await userRepo.getUserByEmailAndPassword(email, password);

  if (!user) {
    return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // שליחת refreshToken ב-HttpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ימים
  });

  res.json({ user, token });
};

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

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'התנתקת בהצלחה' });
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
