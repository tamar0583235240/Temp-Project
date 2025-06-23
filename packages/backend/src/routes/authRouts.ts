import express from 'express';
import { generateAndSendCode, login, signup, validateCode, refreshToken, logout } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddlewares';
import { getMe } from '../controllers/userController';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
//יצירת הקוד ושליחתו במייל
router.post('/createValidationCode',  generateAndSendCode);
//בדיקה אם הקוד תקין
router.post('/validateCode',  validateCode);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/me', authenticateToken, getMe);

export default router;