import { pool } from '../config/dbConnection';

const enum eFileType {
  pdf = "pdf",
  text = "text",
  link = "link",
}

const selectAllResources = async (): Promise<any[]> => {
  // try {
  //   const query = `SELECT * FROM resources`;
  //   const result = await pool.query(query);
  //   return result.rows;
  // } catch (error) {
    return  await[
    {
      id: 1,
      title: "מדריך שימוש",
      type: eFileType.text,
      description: "הסבר קצר על המערכת",
      fileUrl: "https://example.com/resource.pdf",
      createdAt: new Date(2024, 5, 23, 10, 30, 0),
    },
    {
      id: 2,
      title: "מסמך הוראות",
      type: eFileType.pdf,
      description: "מסמך עם הנחיות נוספות",
      fileUrl: "https://example.com/instructions.pdf",
      createdAt: new Date(2024, 6, 1, 15, 45, 0),
    },
    {
      id: 2,
      title: "מסמך הוראות",
      type: eFileType.pdf,
      description: "מסמך עם הנחיות נוספות",
      fileUrl: "https://example.com/instructions.pdf",
      createdAt: new Date(2024, 6, 1, 15, 45, 0),
    }
  ]
    // console.error("Error fetching resources from PostgreSQL:", error);
    // throw error;
  }
// };




export default {selectAllResources};
