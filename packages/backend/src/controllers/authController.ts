import { Request, Response } from 'express';
import userRepo from '../reposioty/userRepository';
import jwt from 'jsonwebtoken';
import { Users } from '../interfaces/entities/Users';
import { v4 as uuidv4 } from 'uuid';
import authRepository from '../reposioty/authRepository';
import userRepository from '../reposioty/userRepository';
import sendAnEmail from '../utils/sendAnEmail';


type CodeData = { code: string, expiresAt: number };
const codesPerEmail = new Map<string, CodeData>();//שמירת הקודים לפי המיילים שאליהם נשלחו
// ניקוי המפות שפג תוקפן -כל שעה
const cleanExpiredCodes = () => {
     const now = Date.now();
  for (const [email, data] of codesPerEmail.entries()) {
    if (data.expiresAt < now) {
      codesPerEmail.delete(email);
    }
  }
}
setInterval(cleanExpiredCodes, 60 * 60 * 1000);


export const generateAndSendCode = async (req: Request, res: Response) => {
     const email = req.body.email;
     if (!email) return res.status(400).json({sent:false, message: "Email is required" });
     // יצירת קוד אקראי בן 6 ספרות
     const code = Math.floor(100000 + Math.random() * 900000).toString();
     const expiresAt = Date.now() + 5 * 60 * 1000; // הקוד תקף ל-5 דקות
     codesPerEmail.set(email, { code, expiresAt });
     // בקוד הזה צריך לטפל...
    await sendAnEmail(email, `קוד האימות שלך הוא: ${code}`)
    console.log(`Sending code ${code} to email ${email}`);
    res.status(200).json({sent:true, message: "הקוד נשלח בהצלחה!"});
}

export const validateCode = async (req: Request, res: Response) => {
    const email = req.body.email;
    const  code  = req.body.code;

    if (!email || !code)
         return res.status(400).json({ error: "Email and code are required" });

    const validCode = codesPerEmail.get(email);
    if(!validCode){
        return res.status(200).json({ valid: false, message: "שגיאה. לא נמצא בקשה לקבלת קוד למייל הזה. אנא נסה שנית." });
    }
    if( Date.now() > validCode.expiresAt){
        return res.status(200).json({ valid: false, message: "הקוד פג תוקף. אנא בקש קוד חדש." });
    }
    if (code === validCode.code) {
        return res.status(200).json({ valid: true, message: "הקוד אומת בהצלחה" });
    } else {
        return res.status(200).json({ valid: false, message: "הקוד שגוי. אנא נסה שנית." });
    }
};

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret';

// התחברות
export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;


  const user = await userRepo.getUserByEmailAndPassword(email, password);
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
    { expiresIn: rememberMe ? '7d' : '2h' }
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000
  });


  res.json({ user, token });
};

// רענון טוקן
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(407).json({ message: 'לא סופק refresh token' });
  }

  try {
    const userData = jwt.verify(refreshToken, REFRESH_SECRET) as any;
    const user = await userRepository.getUserById(userData.id); // חשוב!

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token: newToken, user }); // 👈 מחזיר גם user

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

  const existing = (await userRepo.getAllUsers()).find(user => user.email === email);
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
