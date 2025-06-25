export interface FeedbackResponse {
  feedback: string;// משוב טקסטואלי
  rating: number; // דירוג כולל
    confidence: number; // ביטחון
  flow: number; // זרימה
  hesitation: number; // הססנות
}
