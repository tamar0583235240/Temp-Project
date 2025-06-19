export interface aiInsightsType {
    id: string;          // UUID
    summary: string;
    rating: number;
    strengths: string;
    improvements: string;
    // אפשר להוסיף גם את answer אם את משתמשת בו, תלוי איך את מייבאת את הנתונים מהשרת
    // answer?: SomeAnswerType;
  }