import express from 'express';
import { loginWithGoogle } from '../controllers/googleLogin';
import { registerWithGoogle } from '../controllers/googleRegister';

const router = express.Router();

router.post('/google-login', loginWithGoogle);

router.post('/google-register', registerWithGoogle);

export default router;
