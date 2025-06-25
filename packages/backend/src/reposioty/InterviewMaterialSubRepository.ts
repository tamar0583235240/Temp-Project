import { pool } from '../config/dbConnection';
import { InterviewMaterialSub } from '../interfaces/InterviewMaterialSub';
import processHebrewText from '../utils/processHebrewText'
const getInterviewMaterialSubs = async (): Promise<InterviewMaterialSub[]> => {
    try {
        const result = await pool.query('SELECT * FROM interview_materials_sub');
        return result.rows as InterviewMaterialSub[];
    } catch (error) {
        console.error('Error fetching AIInsight from PostgreSQL:', error);
        throw error;
    }
};

const searchFiles = async (queryText: string): Promise<InterviewMaterialSub[]> => {
    if (!queryText.trim()) return [];

    const smartQuery = processHebrewText(queryText);
    if (!smartQuery) return [];

    // שלב 1 – ניסיון חיפוש פשוט כמו שהוא
    let results = await pool.query(
        `SELECT id, title, thumbnail, short_description,
     FROM interview_materials_sub
     WHERE search_text_cleaned ILIKE ANY (string_to_array($1, ' | '))
     ORDER BY rank DESC
     LIMIT 20`,
        [smartQuery]

    );

    if (results.rowCount) return results.rows;


    results = await pool.query(
        `SELECT id, title, thumbnail, short_description,
            ts_rank(document_with_weights, to_tsquery('simple', $1)) AS rank
     FROM interview_materials_sub
     WHERE document_with_weights @@ to_tsquery('simple', $1)
     ORDER BY rank DESC
     LIMIT 20`,
        [smartQuery]
    );

    return results.rows;
};


export default { getInterviewMaterialSubs, searchFiles };