export interface QuestionType {
  id: number;
  text: string;
  answered: boolean;
  type: "open" | "closed";
  options?: string[];
  answer?: string;
}
