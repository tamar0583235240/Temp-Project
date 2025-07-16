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
}

export interface CreatePracticeQuestionRequest {
  content: string;
  difficulty: string;
  type: 'yes_no' | 'free_text' | 'code';
  generated_by_ai?: boolean;
  created_by: string;
  topic: string;
  hints: Hint[];
}

export interface Topic {
  id: string;
  name: string;
  created_at: string;
}

