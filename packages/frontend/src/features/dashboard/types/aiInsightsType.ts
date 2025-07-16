<<<<<<< HEAD
// הגדרת הממשק של תובנה אחת מה-AI
=======
>>>>>>> Activity-Monitoring
export interface AIInsight {
  id: string;
  answer_id: string;
  summary: string;
  rating: number;
  strengths: string;
  improvements: string;
}

<<<<<<< HEAD
// טיפוס אחד בודד של תובנה – פשוטה (יכול להיות שזה מיותר אם כבר יש את AIInsight)
export type aiInsightsType = AIInsight;

// ממשק לסטטיסטיקות של התקדמות המשתמש
=======
export type aiInsightsType = AIInsight;

>>>>>>> Activity-Monitoring
export interface ProgressStats {
  totalQuestions: number;
  answeredQuestions: number;
}
