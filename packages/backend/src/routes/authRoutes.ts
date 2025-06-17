import { Router } from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController';

const router = Router();

router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);

export default router;
