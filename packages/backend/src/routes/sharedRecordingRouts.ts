import { Router } from 'express';
import { getSharedRecordingIdByAnswerId } from '../controllers/sharedRecordingController'; 
import { deleteEmailFromSharedRecording } from '../controllers/sharedRecordingController';

const router = Router();

router.get('/sharedRecordings/getSharedRecordingIdByAnswerId/:answerId', getSharedRecordingIdByAnswerId); 
router.delete("/sharedRecordings/:sharedRecordingId/emails/:email", deleteEmailFromSharedRecording);

export default router;        