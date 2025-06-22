export interface interviewType {
  id: number;
  title: string;
  content: string;
  category: string;
  tips: string;
  aiGuidance: string;
  isActive: boolean;
  answer?: string;
  answered: boolean;
  text?: string;
  type: 'open' | 'closed';
  options?: string[];

}