// בס"ד

import { addContentReports } from '../controllers/contentReportsController';
import { Router } from 'express';

const contentReportsRouter = Router();

contentReportsRouter.post('/addContentReports', addContentReports);

export default contentReportsRouter;