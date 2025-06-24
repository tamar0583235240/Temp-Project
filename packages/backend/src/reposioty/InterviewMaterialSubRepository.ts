import { pool } from '../config/dbConnection';
import { InterviewMaterialSub } from '../interfaces/InterviewMaterialSub';

const getInterviewMaterialSubs = async (): Promise<InterviewMaterialSub[]> => {
    try {
        const result = await pool.query('SELECT * FROM interview_materials_sub');
        return result.rows as InterviewMaterialSub[];
    } catch (error) {
        console.error('Error fetching AIInsight from PostgreSQL:', error);
        throw error;
    }
};
  const searchFiles= async(queryText: string)=> {
  const tsQuery = queryText.trim().split(/\s+/).join(" & "); 
  const result = await pool.query(
    `SELECT id, title, thumbnail, short_description,
            ts_rank(document_with_weights, to_tsquery('simple', $1)) AS rank
     FROM interview_materials_sub
     WHERE document_with_weights @@ to_tsquery('simple', $1)
     ORDER BY rank DESC
     LIMIT 20`,
    [tsQuery]
  );
  return result.rows;
}


export default { getInterviewMaterialSubs ,searchFiles};