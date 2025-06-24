import { Request, Response } from 'express';
import * as sharedRepo from '../reposioty/sharedRecordings.repository'

export const getSharedRecordingsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const recordings = await sharedRepo.getSharedRecordingsByUserId(userId);
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRecordingDetails = async (req: Request, res: Response) => {
  try {
    const recordingId = req.params.recordingId;
    const details = await sharedRepo.getRecordingDetailsById(recordingId);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { answerId, comment, rating } = req.body;
    const feedback = await sharedRepo.insertFeedback(answerId, comment, rating);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const feedbackId = req.params.id;
    const { comment, rating } = req.body;
    const updated = await sharedRepo.updateFeedback(feedbackId, comment, rating);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error });
  }
};
// ---------------------------------------------------------------------------------

// import { Request, Response } from 'express';

// // ייבוא של המודלים
// import { SharedRecordings } from '../interfaces/entities/SharedRecordings';
// import { Answers } from '../interfaces/entities/Answers';
// import { Users } from '../interfaces/entities/Users'
// import { Questions } from '../interfaces/entities/Questions';
// import { AiInsights } from '../interfaces/entities/AiInsights'
// import { Feedback } from '../interfaces/entities/Feedback';

// // פונקצייה שמחזירה את ההקלטות ששיתפו עם המשתמש
// // Promise הרעיון של 
// //  הוא מבנה שמייצג פעולה אסינכרונית שיכולה להסתיים בעתיד ב
// //הצלחה/כשלון

// async function fetchSharedRecordingsForUser(userId: string): Promise<SharedRecordings[]> {
   

// if (userId === 'user1') {
//     return [
//       {
//         id: 'rec1',
//         ownerId: 'owner1',
//         answerId: 'answer1',
//         sharedWith: ['user1'],
//       },
//     ];
//   }

//   return []; // לא שותפו איתך הקלטות
// }
// // פונקציית אקספרס שמטפלת בבקשה לקבלת ההקלטות ששיתפו עם המשתמש
// export const getSharedRecordingsForUser = async (req: Request, res: Response) => {
//   const userId = req.params.userId; // קבלת userId מהנתיב (URL)
//    console.log(' קיבלתי בקשה עבור userId:', userId);
//   try {
//     // מביאה את ההקלטות ששיתפו עם המשתמש הזה
//     const sharedRecordings = await fetchSharedRecordingsForUser(userId);
//    console.log('🔎 הקלטות שנמצאו:', sharedRecordings); 
//    console.log("📥 בקשה מהקליינט עבור userId:", req.params.userId);

//     // עוברת על כל הקלטה ומביאה את המידע המלא (משתמש, שאלה, תשובה, תובנות, פידבק)
//     //לאחר שכל ה
//     //PROMISE 
//     //מתקיימים יוחזר מערך חדש עם התוצאות של כולם
//     const detailedRecordings = await Promise.all(
//       sharedRecordings.map(async (rec) => {
//         // תשובה 
//         const answer: Answers = {
//           id: rec.answerId,
//           userId: rec.ownerId,
//           questionId: 'q1',
//           fileUrl: 'https://audio.example.com/file.mp3',
//           submittedAt: new Date(),
//         };

//         //  משתמש שהוא הבעלים של ההקלטה
//         const owner: User = {
//           id: rec.ownerId,
//           firstName: 'שם',
//           lastName: 'משתמש',
//           email: 'user@example.com',
//           phone:'null',
//           role: 'student',
//           createdAt: new Date(),
//           isActive: true,
//         };

//         //  שאלה – לפי התשובה
//         const question: Question = {
//           id: answer.questionId,
//           title: 'כותרת שאלה לדוגמה',
//           content: '',
//           category: '',
//           tips: '',
//           aiGuidance: '',
//           isActive: true,
//         };

//         //  AI – לפי תשובה
//         const aiInsight: AIInsight = {
//           id: 'ai1',
//           answerId: answer.id,
//           summary: 'סיכום תובנות AI',
//           rating: 4,
//           strengths: 'חוזקות',
//           improvements: 'שיפורים',
//         };

//         //  פידבק לפי משתמש ותשובה
//         const feedback= null as Feedback | null;

//         // מחזירה את המידע בצורה מרוכזת למסך הקלטות
//         return {
//           id: rec.id, // מזהה הקלטה
//           userName: `${owner.firstName} ${owner.lastName}`, // שם מלא של הבעלים
//           questionTitle: question.title, // כותרת השאלה
//           date: answer.submittedAt, // מועד ההגשה של ההקלטה
//           audioUrl: answer.fileUrl, // כתובת הקובץ
//           aiSummary: aiInsight.summary, // תקציר AI
//           feedbackComment: feedback?.comment ?? '', // תגובה אם קיימת
//           feedbackRating: feedback?.rating ?? null, // דירוג אם קיים

//         };
//       })
//     );

//     // מחזירה את כל ההקלטות המעובדות
//     res.json(detailedRecordings);
//   } catch (error) {
//     // טיפול בשגיאה כללית
//     console.error(error);
//     res.status(500).json({ message: 'שגיאה בשרת' });
//   }
// };
