<<<<<<< HEAD
// import {supabase} from '../config/dbConnection';
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

=======
// import { pool } from '../config/dbConnection'; 
// import { exampleInterface } from "../interfaces/entities/";

// const getAllExamples = async (): Promise<exampleInterface[]> => {
//   try {
//     const query = `
//       SELECT exampleField1, exampleField2, exampleField3
//       FROM examples
//     `;

//     const result = await pool.query(query);
//     return result.rows as exampleInterface[];

//   } catch (error) {
//     console.error("Error fetching examples from PostgreSQL:", error);
//     throw error;
//   }
// };

// export default { getAllExamples };
>>>>>>> 8d7d8a21a7e51e0e565bee46575e3ba71e17593d
