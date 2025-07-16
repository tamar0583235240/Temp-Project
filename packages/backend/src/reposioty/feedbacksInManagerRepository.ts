import { FeedbackToSystem } from '@interfaces/entities/FeedbackToSystem';
import {pool} from '../config/dbConnection';


export const getAllfeedbacksInManager = async (): Promise<FeedbackToSystem[]> => {

  try {
    const query = 'SELECT * FROM feedback_to_system';
    const { rows } = await pool.query(query);
    return rows as FeedbackToSystem[];

  } catch (error) {
    console.error("Error fetching questions from Supabase:", error);
    throw error;
  }
}

export interface FeedbackAverages {
    relevance: number;
    tips: number;
    ai: number;
    usability: number;
  }


export const getFeedbackAveragesRepo = async (): Promise<FeedbackAverages> => {
    const query = `
      SELECT 
        AVG(relevance_rating)::numeric(3,2) AS relevance,
        AVG(tips_quality_rating)::numeric(3,2) AS tips,
        AVG(ai_analysis_usefulness_rating)::numeric(3,2) AS ai,
        AVG(content_usability_rating)::numeric(3,2) AS usability
      FROM feedback_to_system
      WHERE treatment_status = 'Tested'
    `;
    const { rows } = await pool.query(query);
    return rows[0];
  };