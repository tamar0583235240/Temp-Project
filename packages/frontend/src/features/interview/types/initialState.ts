
import { interviewType } from "./questionType";

export interface InitialState {
  questions: interviewType[];
  currentIndex: number;
  loading: boolean;
  currentAnswerId: string | null; // חדש: מזהה תשובה נוכחית
}