// import {supabase} from '../config/dbConnection';
// import { exampleInterface } from "../interfaces/exampleInterface";
// import { pool } from '../config/dbConnection'; 
// // import { exampleInterface } from "../interfaces/exampleInterface";

// <<<<<<< HEAD
// const getAllExamples = async (): Promise<any[]> => {
//   try {
//     const { data, error } = await supabase
//       .from("examples")
//       .select("exampleField1, exampleField2, exampleField3");

//     if (error) {
//       throw error;
//     }

//     return data as exampleInterface[];
//     const query = `
//       SELECT exampleField1, exampleField2, exampleField3
//       FROM examples
//     `;
//     const result = await pool.query(query);
//     return result.rows // as exampleInterface[];
//   }
//   } catch (error) {
//     console.error("Error fetching examples from Supabase:", error);
//     throw error;
//   }
// };

// export default { getAllExamples };
//import {client} from '../config/dbConnection';
// import { log } from "console";
// import { exampleInterface } from "../interfaces/exampleInterface";

// const getAllExamples = async (): Promise<exampleInterface[]> => {
//   try {
    //   const { data, error } = await client
    //     .from("examples")
    //     .select("exampleField1, exampleField2, exampleField3");

    //   if (error) {
    //     throw error;
    //   }

    // return data as exampleInterface[];
//     console.log("Fetching examples from Supabase...");
//     return [];
//   } catch (error) {
//     console.error("Error fetching examples from Supabase:", error);
//     throw error;
//   }
// };

// // export default { getAllExamples };
