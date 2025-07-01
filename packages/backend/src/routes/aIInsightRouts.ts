import express from 'express';
import {
  createInsightController,
  deleteInsightController,
  updateInsightController,
  getInsightByIdController,
  getAllInsightsController,
} from '../controllers/aIInsightController';

const router = express.Router();
router.get('/', getAllInsightsController);
router.post('/', createInsightController);             // יצירה
router.get('/:id', getInsightByIdController);          // שליפה
router.put('/:id', updateInsightController);           // עדכון
router.delete('/:id', deleteInsightController);        // מחיקה


export default router;


