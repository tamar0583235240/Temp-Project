import { pool } from "../config/dbConnection";

export const getAllTopicsFromDB = async () => {
    const result = await pool.query("SELECT * FROM topics ORDER BY created_at DESC");
    return result.rows;
};

export const getAllQuestionsFromDB = async (topicName?: string, level?: string, type?: string | undefined) => {
    try {
        const values: any[] = [];
        let query = `
      SELECT pq.*
      FROM practice_questions pq
    `;

        let whereClauses: string[] = [];

        // אם סונן לפי topic
        if (topicName) {
            query += `
        INNER JOIN question_topics qt ON pq.id = qt.question_id
        INNER JOIN topics t ON qt.topic_id = t.id
      `;
            values.push(topicName);
            whereClauses.push(`t.name = $${values.length}`);
        }

        // אם סונן לפי difficulty
        if (level) {
            values.push(level);
            whereClauses.push(`pq.difficulty = $${values.length}`);
        }

        // אם סונן לפי type
        if (type) {
            values.push(type);
            whereClauses.push(`pq.type = $${values.length}`);
        }

        if (whereClauses.length > 0) {
            query += ` WHERE ` + whereClauses.join(' AND ');
        }

        console.log('Final SQL query:', query);
        console.log('With values:', values);

        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error fetching questions from DB:', error);
        throw error;
    }
};

// הוספה או עדכון לייק
export const upsertQuestionLike = async (
  userId: string,
  questionId: string,
  liked: boolean
) => {
  const query = `
    INSERT INTO question_likes (user_id, question_id, liked)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, question_id)
    DO UPDATE SET liked = EXCLUDED.liked, created_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const result = await pool.query(query, [userId, questionId, liked]);
  return result.rows[0];
};

// ספירת לייקים ודיסלייקים לשאלה ספציפית
export const getLikesDislikesByQuestion = async (questionId: string) => {
  const query = `
    SELECT
      SUM(CASE WHEN liked = true THEN 1 ELSE 0 END) AS likes,
      SUM(CASE WHEN liked = false THEN 1 ELSE 0 END) AS dislikes
    FROM question_likes
    WHERE question_id = $1;
  `;
  const result = await pool.query(query, [questionId]);
  return {
    likes: Number(result.rows[0].likes) || 0,
    dislikes: Number(result.rows[0].dislikes) || 0,
  };
};

// שליפת כל הלייקים לכל השאלות
export const getAllLikes = async () => {
  const query = `
    SELECT question_id,
      SUM(CASE WHEN liked = true THEN 1 ELSE 0 END) AS likes,
      SUM(CASE WHEN liked = false THEN 1 ELSE 0 END) AS dislikes
    FROM question_likes
    GROUP BY question_id;
  `;
  const result = await pool.query(query);
  return result.rows;
};