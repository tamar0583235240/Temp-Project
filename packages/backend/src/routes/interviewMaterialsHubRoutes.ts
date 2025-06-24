import { Router } from 'express';
import multer from 'multer'
import { addFile } from '../controllers/interviewMaterialsHub';
import { getInterviewMaterialSubs,searchMterials } from '../controllers/interviewMaterialsHub';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadFile', upload.single('thumbnail'), addFile);
router.get('/search',searchMterials)
router.get('/', getInterviewMaterialSubs);

export default router;