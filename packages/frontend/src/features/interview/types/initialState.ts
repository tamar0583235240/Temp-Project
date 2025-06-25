import { interviewType } from "./questionType";

export interface InitialState {
  questions: interviewType[];
  currentIndex: number;
  loading: boolean;
}