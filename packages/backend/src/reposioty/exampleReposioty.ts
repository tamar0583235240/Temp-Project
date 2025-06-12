
// import { exampleInterface } from "../interfaces/exampleInterface";


// const getAllExamples = async (): Promise<exampleInterface[]> => {
//   try {
//     // const result = await pool.query('SELECT id, name, created_at FROM examples');
//     // return result.rows.map((row: exampleInterface) => ({
//     //   exampleField1: row.exampleField1,
//     //   exampleField2: row.exampleField2,
//     //   exampleField3: row.exampleField3,
//    return 
//     }
//   catch (error) {
//     console.error('Error fetching examples from DB:', error);
//     throw error;
//   }
// };

// export default { getAllExamples };
import {supabase} from '../config/dbConnection';
import { exampleInterface } from "../interfaces/exampleInterface";

const getAllExamples = async (): Promise<exampleInterface[]> => {
  try {
    const { data, error } = await supabase
      .from("examples")
      .select("exampleField1, exampleField2, exampleField3");

    if (error) {
      throw error;
    }

    return data as exampleInterface[];
  } catch (error) {
    console.error("Error fetching examples from Supabase:", error);
    throw error;
  }
};

export default { getAllExamples };