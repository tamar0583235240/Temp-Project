import express from 'express';
import { pool } from '../config/dbConnection';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Question"'); // שימי לב לשם טבלה באות גדולה
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;