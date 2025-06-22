import { Request, Response } from 'express';
import * as userRepo from '../reposioty/userRepository';
import sendAnEmail from '../utils/sendAnEmail';

import { Users } from '../interfaces/entities/Users';
import userRepository from '../reposioty/userRepository'
import { v4 as uuidv4 } from 'uuid';
import authRepository from '../reposioty/authRepository';


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
    sharedRecordings: [],
    createdAt: new Date(),
    resources: []
  };

  authRepository.signup(newUser);

  const token = `mock-token-${newUser.id}`;
  
  res.status(201).json({ user: newUser, token });
};
