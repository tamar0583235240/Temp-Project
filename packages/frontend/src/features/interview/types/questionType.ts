export interface interviewType {
  id: number;
  title: string;
  content: string;
  category: string;
  tips: string;
  aiGuidance: string;
  isActive: boolean;
  answered: boolean;
  answer?: string;
  text?: string;
  question_type: 'open' | 'closed';
  options?: string[];
}