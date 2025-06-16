import express from 'express';
import { getAllAiInsights } from '../reposioty/aiInsight';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const insights = await getAllAiInsights();
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});
export default router;