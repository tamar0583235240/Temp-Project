import { HintsType } from './HintsType'; // תקן את הנתיב לפי המיקום שלך

export interface CreatePracticeQuestionRequestType {
  content: string;
  difficulty: string;
  type: string;
  generated_by_ai?: boolean;
  created_by: string;
  topic: string;
  hints: HintsType[];
}