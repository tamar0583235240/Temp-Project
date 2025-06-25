import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendResetEmail } from '../utils/emailSender';
import { getUserByEmail, updateUserPassword } from '../reposioty/userRepository'; 
import { createToken, getToken, deleteToken } from '../reposioty/passwordResetRepository';
import { users } from '../config/users';
import { User } from '../interfaces/User';
import { v4 as uuidv4 } from 'uuid';

const TOKEN_EXPIRATION_HOURS = 1;

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Missing email' });

  try {
    const user = await getUserByEmail(email);

    // גם אם המשתמש לא קיים - מחזירים תשובה "רגילה" מסיבות אבטחה
    if (!user) {
      return res.status(200).json({ message: 'If email exists, reset link sent' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000);

    await createToken(user.id, token, expiresAt);
    await sendResetEmail(email, token);

    return res.status(200).json({ message: 'If email exists, reset link sent' });
  } catch (error) {
    console.error('Forgot Password error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Missing token or password' });

  try {
    const tokenData = await getToken(token);

    if (!tokenData) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      return res.status(400).json({ message: 'Token expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUserPassword(tokenData.user_id, hashedPassword);
    await deleteToken(token);

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// הדמיה של בסיס נתונים
interface UserWithPassword extends User {
  password: string;
}

const usersWithPasswords: UserWithPassword[] = users.map((u) => ({
  ...u,
  password: '123456', // סיסמה זמנית
}));

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = usersWithPasswords.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
  }

  // נניח שאת יוצרת טוקן דמי
  const token = `mock-token-${user.id}`;

  res.json({ user, token });
};

export const signup = (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const existing = usersWithPasswords.find((u) => u.email === email);
  if (existing) {
    return res.status(409).json({ message: 'אימייל כבר קיים' });
  }

  const newUser: UserWithPassword = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phone,
    password,
    role: 'student',
    createdAt: new Date(),
    isActive: true,
  };

  usersWithPasswords.push(newUser);

  const token = `mock-token-${newUser.id}`;
  res.status(201).json({ user: newUser, token });
};
