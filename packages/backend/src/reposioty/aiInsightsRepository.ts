import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.HOST,
  port: parseInt(process.env.PGPORT || "5432"),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// יצירת תובנה חדשה
export const createInsight = async (
  answerId: string,
  summary: string,
  rating: string,
  strengths: string,
  improvements: string
) => {
  const ratingInt = parseInt(rating, 10);
  console.log('Repository: Creating ai_insight with:', { answerId, summary, rating: ratingInt, strengths, improvements });
  if (!answerId || !summary || isNaN(ratingInt)) {
    console.error('Missing values in repository function');
    throw new Error('Missing required values in repository');
  }

  try {
    const query = `
      INSERT INTO ai_insights (answer_id, summary, rating, strengths, improvements)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [answerId, summary, ratingInt, strengths, improvements];

    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error: any) {
    console.error('Error inserting ai_insight:', error); // הדפסה של השגיאה המקורית
    throw error; // זרוק את השגיאה המקורית כדי לראות אותה ב-controller
  }
};

// שליפת כל התובנות
export const getAllInsights = async () => {
  const { rows } = await pool.query('SELECT * FROM ai_insights;');
  return rows;
};

// שליפת תובנה לפי מזהה
export const getInsightById = async (id: string) => {
  const query = `SELECT * FROM ai_insights WHERE id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// עדכון תובנה קיימת
export const updateInsight = async (id: string, updates: any) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setString = fields
    .map((field, i) => `"${field}" = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE ai_insights
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [...values, id]);
  return rows[0];
};

// מחיקת תובנה
export const deleteInsight = async (id: string) => {
  await pool.query('DELETE FROM ai_insights WHERE id = $1;', [id]);
};




//--------------------------------------------
// import { Pool } from 'pg';
// import * as dotenv from 'dotenv';
// // import dotenv from 'dotenv';

// dotenv.config();

// export const pool = new Pool({
//   host: process.env.HOST,
//   port: 5432,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// // יצירת תשובה חדשה
// export const createAnswer = async (
//   userId: string,
//   questionId: string,
//   fileUrl: string
// ) => {
//   console.log('Repository: Creating answer with:', { userId, questionId, fileUrl });

//   if (!userId || !questionId || !fileUrl) {
//     console.error('Missing values in repository function');
//     throw new Error('Missing required values in repository');
//   }

//   try {
//     const query = `
//       INSERT INTO answers (user_id, question_id, file_url)
//       VALUES ($1, $2, $3)
//       RETURNING *;
//     `;
//     const values = [userId, questionId, fileUrl];

//     const { rows } = await pool.query(query, values);
//     return rows[0];
//   } catch (error: any) {
//     console.error('Error inserting answer:', error.message || error);
//     throw new Error('Failed to create answer');
//   }
// };



// // שליפת כל התשובות
// export const getAllAnswers = async () => {
//   const { rows } = await pool.query('SELECT * FROM answers;');
//   return rows;
// };

// // שליפת תשובה לפי מזהה
// export const getAnswerById = async (id: string) => {
//   const query = `SELECT * FROM answers WHERE id = $1;`;
//   const { rows } = await pool.query(query, [id]);
//   return rows[0];
// };

// // עדכון תשובה קיימת
// export const updateAnswer = async (id: string, updates: any) => {
//   const fields = Object.keys(updates);
//   const values = Object.values(updates);

//   const setString = fields
//     .map((field, i) => `"${field}" = $${i + 1}`)
//     .join(', ');

//   const query = `
//     UPDATE answers
//     SET ${setString}
//     WHERE id = $${fields.length + 1}
//     RETURNING *;
//   `;

//   const { rows } = await pool.query(query, [...values, id]);
//   return rows[0];
// };


// // מחיקת תשובה
// export const deleteAnswer = async (id: string) => {
//   await pool.query('DELETE FROM answers WHERE id = $1;', [id]);
// };
