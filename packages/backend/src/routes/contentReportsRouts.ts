// בס"ד

import { addContentReports, getAllContentReportsController } from '../controllers/contentReportsController';
import { Router } from 'express';

const contentReportsRouter = Router();
contentReportsRouter.post('/addContentReports', addContentReports);
contentReportsRouter.get('/getAllContentReports',getAllContentReportsController)
export default contentReportsRouter;