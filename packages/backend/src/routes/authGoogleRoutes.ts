import express from 'express';
import { authWithGoogle } from '../controllers/authWithGoogle';

const router = express.Router();
router.post('/google-auth', authWithGoogle);

export default router;