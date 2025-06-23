import e from 'cors';
import { pool } from '../config/dbConnection'; 
import { Questions } from "../interfaces/entities/Questions";
import { v4 as uuid4 } from 'uuid';

const addQustion = async (question:Questions): Promise<Questions> => {
  try {

    let id: string = "";
    let exists = true;

    while(exists) {
      id = uuid4();
      const query = `SELECT * FROM questions WHERE id = ${id}`;
      const result = await pool.query(query);
      exists = result.rows.length > 0;
    }
    const query = `
      INSERT INTO qquestions (id , title , content , category , tips , ai_guidance , is_active)
      VALUES (${id}, ${question.title}, ${question.content}, ${question.category}, ${question.tips}, ${question.aiGuidance}, ${question.isActive})
    `;

    const result = await pool.query(query);
    return result.rows[0] as Questions;

  } catch (error) {
    console.error("Error adding question to PostgreSQL:", error);
    throw error;
  }
};

export default { addQustion };
