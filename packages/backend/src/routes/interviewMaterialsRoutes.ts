import express from 'express';
import { getAllInterviewMaterials } from '../controllers/interviewMaterialsController';
import { deleteInterviewMaterial } from "../controllers/interviewMaterialsController";


const router = express.Router();

router.get('/interview-materials', getAllInterviewMaterials);

router.delete('/interview-materials/:id', deleteInterviewMaterial);

export default router;
