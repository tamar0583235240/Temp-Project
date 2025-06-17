import express from 'express';
import { loginWithGoogle } from '../controllers/googleLogin';
import { registerWithGoogle } from '../controllers/googleRegister';

const router = express.Router();

// Route for Google login
router.post('/google-login', loginWithGoogle);

// Route for Google registration
router.post('/google-register', registerWithGoogle);

export default router;
