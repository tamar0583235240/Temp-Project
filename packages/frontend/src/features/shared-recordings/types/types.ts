// export interface SharedRecording {
//   id: string;
//   userName: string;         // שם המשתמש ששיתף
//   questionTitle: string;    // כותרת השאלה
//   date: string;             // תאריך ההקלטה
//   audioUrl: string;         // קישור להקלטה
//   aiSummary: string;        // תובנות AI
//   feedbackComment?: string ; // פידבק אם קיים
//   feedbackRating?: number;  // דירוג אם קיים
// }

import { feedbackType } from '../../feedback/types/feedbackType';

export interface SharedRecording {
  id: string;
  userName: string;
  questionTitle: string;
  date: string;
  audioUrl: string;
  aiSummary: string;
  feedback?: feedbackType | null; // ✅ נוספה שורה זו
}