import { Router } from 'express';
import multer from 'multer'
import { addFile } from '../controllers/interviewMaterialsHub';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('thumbnail'), addFile);

export default router;