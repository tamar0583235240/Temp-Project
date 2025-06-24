import { Router } from 'express';
import { getSharedRecordingParticipants } from '../controllers/sharedRecordingController';

const router = Router();

router.get('/getSharedRecordingParticipants/:answerId/:ownerId', getSharedRecordingParticipants);

export default router;
