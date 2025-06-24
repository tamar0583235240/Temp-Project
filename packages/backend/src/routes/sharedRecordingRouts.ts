import { Router } from 'express';
import {
  getSharedRecordingsByUser,
  getRecordingDetails,
  createFeedback,
  updateFeedback
} from '../controllers/sharedRecordingController'

const router = Router();

router.get('/:userId', getSharedRecordingsByUser);
router.get('/details/:recordingId', getRecordingDetails);
router.post('/feedback', createFeedback);
router.put('/feedback/:id', updateFeedback);

export default router;   
//---------------------------------------------------------------------    //  

// import express from 'express';
// import { getSharedRecordingsForUser } from '../controllers/sharedRecordingController';
// const router = express.Router();

// router.get('/shared-recordings/:userId', getSharedRecordingsForUser);

// // ✅ נתיב חדש לקליטת פידבק מהקליינט
// router.post('/feedback', async (req, res) => {
//   const { userId, recordingId, comment, rating } = req.body;

//   if (!userId || !recordingId || rating == null) {
//     return res.status(400).json({ message: 'חסרים שדות נדרשים' });
//   }

//   try {
//     // כאן אפשר לשמור למסד נתונים / Supabase
//     console.log('📥 פידבק שהתקבל:', { userId, recordingId, comment, rating });

  

//     res.status(200).json({ message: 'Feedback saved' });
//   } catch (error) {
//     console.error('❌ שגיאה בשמירת פידבק:', error);
//     res.status(500).json({ message: 'שגיאה בשרת' });
//   }
// });

// export default router;