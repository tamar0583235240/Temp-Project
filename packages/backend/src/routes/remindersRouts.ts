import { Router } from 'express';
import { exampleController } from '../controllers/exampleController';
import { exampleMiddleware } from '../middlewares/exampleMiddlewares';

const router = Router();
// example for implemantaion
router.get('/exampleURL', exampleMiddleware, exampleController);

export default router;
import { Router } from 'express';
import { reminderController } from '../controllers/reminderController';

const router = Router();
router.get('/', reminderController);

export default router;