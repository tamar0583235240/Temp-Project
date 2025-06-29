import { Request, Response } from 'express';

import statusRepository from '../reposioty/statusRepository';

export const getStatusByUserId = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
console.log("📥 userId from params:", userId);

  try {
    
    const answered = await statusRepository.getStatusByUserId(userId);
    console.log("✅ answered result:", answered);
    console.log('✅ Questions fetched successfully:', answered.length);
    res.json(answered);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch answered' });
  }
};
