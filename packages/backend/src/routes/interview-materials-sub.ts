import { getInterviewMaterialSubs,updateInterviewMaterialSub,deleteInterviewMaterial,addInterviewMaterialSub } from '../controllers/InterviewMaterialSubController';
import { Router } from 'express';
import multer from 'multer'

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getInterviewMaterialSubs);
router.post('/', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'file', maxCount: 1 }]), addInterviewMaterialSub);
router.put('/:id', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'file', maxCount: 1 }]), updateInterviewMaterialSub);
router.delete('/:id', deleteInterviewMaterial);
export default router;