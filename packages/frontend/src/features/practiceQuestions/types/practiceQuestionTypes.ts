
export interface Hint {
  content: string;
  generated_by_ai: boolean;
}

export interface PracticeQuestion {
  id: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'yes_no' | 'free_text' | 'code';
  generated_by_ai: boolean;
  created_by: string;
  created_at: string;
  topic: Topic;
  hints: Hint[];
}
export interface PracticeQuestionRequestType {
  content: string;
  difficulty: string;
  type: string;
  generated_by_ai?: boolean;
  created_by: string;
  topic: string;
  hints: Hint[];
}
// export interface PracticeQuestionRequest {
//   id?: string;  // אופציונלי: לא חובה ביצירה, חובה בעריכה
//   content: string;
//   difficulty: 'easy' | 'medium' | 'hard';
//   type: 'yes_no' | 'free_text' | 'code';
//   generated_by_ai?: boolean;
//   created_by: string;
//   topic: Topic;
//   hints: Hint[];
// }

export interface Topic {
  id: string;
  name: string;
  created_at: string;
}

