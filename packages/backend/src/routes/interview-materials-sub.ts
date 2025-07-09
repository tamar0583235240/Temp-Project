// import { getInterviewMaterialSubs,updateInterviewMaterialSub,deleteInterviewMaterial,addInterviewMaterialSub } from '../controllers/InterviewMaterialSubController';
import { Router } from 'express';
import multer from 'multer';
import {
    getAllInterviewMaterials,
    deleteInterviewMaterialController,
    addInterviewMaterial,
    updateInterviewMaterialController,
} from '../controllers/InterviewMaterialSubController';

const router = Router();

// הגדרת multer להעלאת קבצים מהזיכרון
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get('/', getAllInterviewMaterials);
router.delete('/:id', deleteInterviewMaterialController);
router.post('/',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    addInterviewMaterial
)
router.put(
    '/:id',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    updateInterviewMaterialController
);

export default router;