import express from 'express';
import { login, signup, refreshToken, logout} from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddlewares';
import { getMe } from '../controllers/userController';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/me', authenticateToken, getMe);

export default router;