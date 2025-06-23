import express from 'express';
import { getAllRecordingsController } from '../controllers/resourceController';

const router = express.Router();

router.get('/', getAllRecordingsController);

export default router;
