import { Router } from 'express';
import { getSharedRecordingParticipants, getPreviouslySharedEmails } from '../controllers/sharedRecordingController';

const router = Router();

router.get('/getSharedRecordingParticipants/:answerId/:ownerId', getSharedRecordingParticipants);
router.get('/sharedEmails/:userId', getPreviouslySharedEmails);

export default router;
