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

