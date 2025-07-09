export const getSharedRecordingsByUserId = async (
  userId: string,
  filters: {
    sharedByUserId?: string;
    questionId?: string;
    date?: string; // בפורמט YYYY-MM-DD
  } = {}
) => {
  const conditions = [`$1 = ANY(sr.sharedwith)`];
  const values = [userId];
  let idx = 2;

  if (filters.sharedByUserId) {
    conditions.push(`a.user_id = $${idx}`);
    values.push(filters.sharedByUserId);
    idx++;
  }

  if (filters.questionId) {
    conditions.push(`sr.question_id = $${idx}`);
    values.push(filters.questionId);
    idx++;
  }

  if (filters.date) {
    conditions.push(`DATE(sr.date) = $${idx}`);
    values.push(filters.date);
    idx++;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT
      sr.id,
      u.first_name || ' ' || u.last_name AS "userName",
      q.title AS "questionTitle",
      sr.date,
      sr.audio_url AS "audioUrl",
      sr.ai_summary AS "aiSummary",
      f.comment AS "feedbackComment",
      f.rating AS "feedbackRating"
    FROM shared_recordings sr
    JOIN answers a ON sr.answer_id = a.id
    JOIN users u ON a.user_id = u.id
    JOIN questions q ON sr.question_id = q.id
    LEFT JOIN feedback f ON f.shared_recordingid = sr.id
    ${whereClause}
    ORDER BY sr.date DESC
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};
