
//import {client} from '../config/dbConnection';
import { log } from "console";
import { exampleInterface } from "../interfaces/exampleInterface";

const getAllExamples = async (): Promise<exampleInterface[]> => {
  try {
    //   const { data, error } = await client
    //     .from("examples")
    //     .select("exampleField1, exampleField2, exampleField3");

    //   if (error) {
    //     throw error;
    //   }

    // return data as exampleInterface[];
    console.log("Fetching examples from Supabase...");
    return [];
  } catch (error) {
    console.error("Error fetching examples from Supabase:", error);
    throw error;
  }
};

export default { getAllExamples };