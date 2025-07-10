import { Router, Request, Response } from 'express';
import { pool } from '../config/dbConnection';

const router = Router();

// GET /api/questions/popular?limit=10
router.get('/popular', async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const result = await pool.query(`
      SELECT 
        q.id,
        q.title AS question,
        COALESCE(qac.answers_count, 0) AS popularity
      FROM public.questions q
      LEFT JOIN public.question_answers_count qac ON q.id = qac.question_id
      WHERE q.is_active = TRUE
      ORDER BY popularity DESC
      LIMIT $1
    `, [limit]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching popular questions:', error);
    res.status(500).json({ message: 'שגיאה בקבלת שאלות פופולריות' });
  }
});

export default router;



