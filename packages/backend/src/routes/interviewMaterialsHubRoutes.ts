import { Router } from 'express';
import multer from 'multer'
import { addFile } from '../controllers/interviewMaterialsHub';
import { getInterviewMaterialSubs,searchMterials ,incrementDownloadCount} from '../controllers/interviewMaterialsHub';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadFile', upload.single('file_url'), addFile);
router.get('/search',searchMterials)
router.patch("/:id", incrementDownloadCount);
router.get('/', getInterviewMaterialSubs);

export default router;