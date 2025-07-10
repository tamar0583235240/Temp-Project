<<<<<<< HEAD
export interface AIInsight {
  id: string;
  answer_id: string;
  summary: string;
  rating: number;
  strengths: string;
  improvements: string;
}

export type aiInsightsType = AIInsight;

export interface ProgressStats {
  totalQuestions: number;
  answeredQuestions: number;
=======
import {AIInsight} from '../../../../../backend/src/interfaces/AIInsight'

export interface aiInsightsType extends AIInsight {
  
>>>>>>> 7671d8f (AI Insights List fronted)
}
