import { Router } from 'express';
import { reminderController } from '../controllers/reminderController';
import { exampleMiddleware } from '../middlewares/exampleMiddlewares';

const router = Router();
// example for implemantaion
router.get('/exampleURL', exampleMiddleware, reminderController);

export default router;