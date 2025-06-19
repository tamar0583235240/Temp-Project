import express from 'express';
import { generateAndSendCode, login, signup, validateCode } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
//יצירת הקוד ושליחתו במייל
router.post('/createValidationCode',  generateAndSendCode);
//בדיקה אם הקוד תקין
router.post('/validateCode',  validateCode);

export default router;
