import express from 'express';
import { getAllRecordingsController } from '../controllers/resourceController';

const router = express.Router();

router.get('/', getAllRecordingsController);
router.post('/uploadRecord', upload.single('file'), uploadRecording);

export default router;
