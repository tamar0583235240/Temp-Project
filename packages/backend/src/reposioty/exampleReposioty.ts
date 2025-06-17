import { exampleInterface } from "../interfaces/exampleInterface";
import { pool } from "../config/dbConnection"; // אם יצרת את pool בקובץ נפרד

const getAllExamples = async (): Promise<exampleInterface[]> => {
  try {
    const result = await pool.query(
      'SELECT exampleField1, exampleField2, exampleField3 FROM examples'
    );

    return result.rows as exampleInterface[];
  } catch (error) {
    console.error("Error fetching examples from PostgreSQL:", error);
    throw error;
  }
};

export default { getAllExamples };
