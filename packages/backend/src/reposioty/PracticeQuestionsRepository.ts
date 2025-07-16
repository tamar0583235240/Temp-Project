import { pool } from '../config/dbConnection';
import { PracticeQuestions } from "../interfaces/entities/PracticeQuestions";
import { QueryResult } from 'pg';
import { Topics } from '../interfaces/entities/Topics'; 
import { Hints } from '@interfaces/entities/Hints';


// שליפה של כל השאלות
// const getallPracticeQuestions = async (): Promise<PracticeQuestions[]> => {
//   try {
//     const result = await pool.query('SELECT * FROM practice_questions');
//     return result.rows as PracticeQuestions[];
//   } catch (error) {
//     console.error('Error fetching practice questions from PostgreSQL:', error);
//     throw error;
//   }
// };

export type PracticeQuestionsWithExtras = {
  id: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'yes_no' | 'free_text' | 'code';
  generated_by_ai: boolean;
  created_at: string;
  topics: Topics[];
  hints: Hints[];
};

const getallPracticeQuestions = async (): Promise<PracticeQuestionsWithExtras[]> => {
  try {
    const result = await pool.query(`
      SELECT
        pq.id,
        pq.content,
        pq.difficulty,
        pq.type,
        pq.generated_by_ai,
        pq.created_at,
        -- אוסף נושאים כ-array
        COALESCE(json_agg(DISTINCT jsonb_build_object('id', t.id, 'name', t.name))
                 FILTER (WHERE t.id IS NOT NULL), '[]') AS topics,
        -- אוסף רמזים כ-array
        COALESCE(json_agg(DISTINCT jsonb_build_object('id', h.id, 'content', h.content, 'generated_by_ai', h.generated_by_ai))
                 FILTER (WHERE h.id IS NOT NULL), '[]') AS hints
      FROM practice_questions pq
      LEFT JOIN question_topics qt ON qt.question_id = pq.id
      LEFT JOIN topics t ON t.id = qt.topic_id
      LEFT JOIN hints h ON h.question_id = pq.id
      GROUP BY pq.id
      ORDER BY pq.created_at DESC
    `);
    return result.rows as PracticeQuestionsWithExtras[];
  } catch (error) {
    console.error('Error fetching enriched practice questions:', error);
    throw error;
  }
};

const getPracticeQuestionsByTopic = async (topic_id: string): Promise<PracticeQuestions[]> => {
  try {
    const query = `
      SELECT q.*
      FROM practice_questions q
      JOIN question_topics qt ON qt.question_id = q.id
      WHERE qt.topic_id = $1
    `;
    const result = await pool.query(query, [topic_id]);
    return result.rows as PracticeQuestions[];
  } catch (error) {
    console.error(":x: Error fetching practice_questions by topic:", error);
    throw error;
  }
};

// יצירת שאלה חדשה
const createPracticeQuestion = async (questionData: {
  content: string;
  difficulty: string;
  type: string;
  generated_by_ai: boolean;
  created_by: string;
}) => {
  const { content, difficulty, type, generated_by_ai, created_by } = questionData;
  const result = await pool.query(
    `INSERT INTO practice_questions (content, difficulty, type, generated_by_ai, created_by)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [content, difficulty, type, generated_by_ai, created_by]
  );
  return result.rows[0];
};

// חיפוש או יצירת נושא לפי שם
const findOrCreateTopicByName = async (name: string): Promise<Topics> => {
  const existing: QueryResult<Topics> = await pool.query(
    `SELECT * FROM topics WHERE name = $1`,
    [name]
  );

  if (existing.rowCount! > 0) return existing.rows[0];

  const result: QueryResult<Topics> = await pool.query(
    `INSERT INTO topics (name) VALUES ($1) RETURNING *`,
    [name]
  );

  return result.rows[0];
};

//קישור שאלה לנושא
const createQuestionTopicLink = async (questionId: string, topicId: string) => {
  await pool.query(
    `INSERT INTO question_topics (question_id, topic_id) VALUES ($1, $2)`,
    [questionId, topicId]
  );
};

//יצירת רמז לשאלה
const createHint = async (hintData: {
  question_id: string;
  content: string;
  generated_by_ai: boolean;
}) => {
  const { question_id, content, generated_by_ai } = hintData;
  await pool.query(
    `INSERT INTO hints (question_id, content, generated_by_ai)
     VALUES ($1, $2, $3)`,
    [question_id, content, generated_by_ai]
  );
};

export default {
  getallPracticeQuestions,
  getPracticeQuestionsByTopic,
  createPracticeQuestion,
  findOrCreateTopicByName,
  createQuestionTopicLink,
  createHint,
};
