// export interface SharedRecording {
//   id: string;
//   title: string;
//   audioUrl: string;
//   aiInsights: string;
// }
export interface SharedRecording {
  id: string;
  userName: string;         // שם המשתמש ששיתף
  questionTitle: string;    // כותרת השאלה
  date: string;             // תאריך ההקלטה (פורמט ISO string)
  audioUrl: string;         // קישור להקלטה
  aiSummary: string;        // תובנות AI
  feedbackComment?: string; // פידבק אם קיים
  feedbackRating?: number;  // דירוג אם קיים
}
