import { pool } from '../config/dbConnection';
import { PracticeQuestions } from "../interfaces/entities/PracticeQuestions";
import { QueryResult } from 'pg';
import { Topics } from '../interfaces/entities/Topics'; 


// שליפה של כל השאלות
const getallPracticeQuestions = async (): Promise<PracticeQuestions[]> => {
  try {
    const result = await pool.query('SELECT * FROM practice_questions');
    return result.rows as PracticeQuestions[];
  } catch (error) {
    console.error('Error fetching practice questions from PostgreSQL:', error);
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
  createPracticeQuestion,
  findOrCreateTopicByName,
  createQuestionTopicLink,
  createHint,
};
