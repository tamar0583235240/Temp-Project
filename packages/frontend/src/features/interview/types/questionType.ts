export type QuestionType = {
  id: number;
  text: string;
  type: 'open' | 'closed';
  options?: string[];
  answer?: string;
  answered: boolean;
};
