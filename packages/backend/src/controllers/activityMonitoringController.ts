import { Request, Response } from 'express';

export const getDummyActivityData = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Activity monitoring route is working!' });
};
