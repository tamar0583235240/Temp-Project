import { Request, Response } from 'express';
import { users } from '../config/users';
import { User } from '../interfaces/User';
import { v4 as uuidv4 } from 'uuid';

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
