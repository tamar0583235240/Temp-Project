import { Router } from 'express';
import { getSharedRecordingIdByAnswerId } from '../controllers/sharedRecordingController'; 

const sharedRecrdingRouter = Router();

sharedRecrdingRouter.get('/sharedRecordings/getSharedRecordingIdByAnswerId/:answerId', getSharedRecordingIdByAnswerId);  
export default sharedRecrdingRouter;        