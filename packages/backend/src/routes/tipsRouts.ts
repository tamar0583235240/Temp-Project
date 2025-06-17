import express from 'express';
import { getAllTips } from '../reposioty/tipRepository';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tips = await getAllTips();
    res.json(tips);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
});

export default router;