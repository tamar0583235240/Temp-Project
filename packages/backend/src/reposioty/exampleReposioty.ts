
import { log } from "console";
import { exampleInterface } from "../interfaces/exampleInterface";

const getAllExamples = async (): Promise<exampleInterface[]> => {
  try {
    console.log("Fetching examples from Supabase...");
    return [];
  } catch (error) {
    console.error("Error fetching examples from Supabase:", error);
    throw error;
  }
};

export default { getAllExamples };