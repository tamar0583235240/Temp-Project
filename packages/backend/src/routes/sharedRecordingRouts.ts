import { Router } from 'express';

import { getSharedRecordingParticipants, getPreviouslySharedEmails, deleteEmailFromSharedRecording } from '../controllers/sharedRecordingController';

const router = Router();

router.get('/getSharedRecordingParticipants/:answerId/:ownerId', getSharedRecordingParticipants);
router.get('/sharedEmails/:userId', getPreviouslySharedEmails);
router.delete("/sharedRecordings/:sharedRecordingId/emails/:email", deleteEmailFromSharedRecording);

export default router;
