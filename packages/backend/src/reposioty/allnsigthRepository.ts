import {supabase} from '../config/dbConnection';
import { AIInsight } from '../interfaces/AIInsight';

const getAllallnsight = async (): Promise<AIInsight[]> => {
  try {
    const { data, error } = await supabase
      .from("allnsights")
      .select("*");
    if (error) {
      throw error;
    }

    return data as AIInsight[];
  } catch (error) {
    console.error("Error fetching AIInsight from Supabase:", error);
    throw error;
  }
};

export default { getAllallnsight };