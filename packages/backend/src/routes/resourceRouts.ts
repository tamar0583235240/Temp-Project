// import express from 'express';
// import { getAllRecordingsController } from '../controllers/resourceController';

// const router = express.Router();

// router.get('/', getAllRecordingsController);
// router.post('/uploadRecord', upload.single('file'), uploadRecording);

// export default router;
import express from 'express';
import multer from 'multer';
import {
  getAllRecordingsController,
  uploadRecording
} from '../controllers/resourceController';

const router = express.Router();

// הגדרת Multer לשמירה זמנית של הקבצים בתיקיית uploads
const upload = multer({ dest: 'uploads/' });

// routes
router.get('/', getAllRecordingsController);

router.post('/uploadRecord', upload.single('file'), uploadRecording);

export default router;
