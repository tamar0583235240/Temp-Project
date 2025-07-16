import { Request, Response, NextFunction } from 'express';

export const validateRunCode = (req: Request, res: Response, next: NextFunction) => {
  const { language, code } = req.body;
  if (!language) {
    return res.status(400).json({ message: 'חסר שדה language' });
  }
  if (!code) {
    return res.status(400).json({ message: 'חסר שדה code' });
  }
  next();
};
