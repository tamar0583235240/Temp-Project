
// // import {supabase} from '../config/dbConnection';
// import { exampleInterface } from "../interfaces/exampleInterface";

// const getAllExamples = async (): Promise<exampleInterface[]> => {
//   try {
//     const { data, error } = await supabase
//       .from("examples")
//       .select("exampleField1, exampleField2, exampleField3");

//     if (error) {
//       throw error;
//     }

//     return data as exampleInterface[];
//   } catch (error) {
//     console.error("Error fetching examples from Supabase:", error);
//     throw error;
//   }
// };

// export default { getAllExamples };