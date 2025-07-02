import { Request, Response } from 'express';
import statusRepository from '../reposioty/statusRepository';
import { pool } from '../reposioty/answerRepository';

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

const saveOrUpdateStatus = async (userId: string, answered: boolean[]) => {
  try {
    const query = `
      INSERT INTO status (user_id, answered)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET answered = EXCLUDED.answered
    `;
    await pool.query(query, [userId, JSON.stringify(answered)]);
  } catch (error) {
    console.error("❌ Error saving status:", error);
    throw error;
  }
};

export default { getStatusByUserId , saveOrUpdateStatus };
