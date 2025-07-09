import { Router } from 'express';
import multer from 'multer';
import {
    getInterviewMaterialSubs,
    addInterviewMaterialSub,
    updateInterviewMaterialSub,
    deleteInterviewMaterial,
} from '../controllers/InterviewMaterialSubController';

const router = Router();

// הגדרת multer להעלאת קבצים מהזיכרון
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get('/', getInterviewMaterialSubs);
router.delete('/:id', deleteInterviewMaterial);
router.post('/',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    addInterviewMaterialSub
)
router.put(
    '/:id',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    updateInterviewMaterialSub
);

export default router;

