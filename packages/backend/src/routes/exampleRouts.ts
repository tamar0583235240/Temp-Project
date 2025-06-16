import { Router } from 'express';
import { exampleController } from '../controllers/exampleController';
import { exampleMiddleware } from '../middlewares/exampleMiddlewares';

const router = Router();
router.get('/exampleURL', exampleMiddleware, exampleController);

export default router;