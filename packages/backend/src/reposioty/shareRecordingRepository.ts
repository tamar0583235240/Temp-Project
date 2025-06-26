
import { pool } from '../config/dbConnection';

const getSharedRecordingIdByAnswerId = async (answerId: string): Promise<string | null> => {
  try {
    const data = await pool.query(`SELECT id, shared_with FROM shared_recordings WHERE answer_id = $1`, [answerId]);
    console.log(data.rows.length);

    return data.rows[0].id as string;
  }
  catch (error) {
    console.error(`Error fetching sharedRecordingId by answerId: ${answerId} from Supabase:`, error);
    throw error;
  }
}
// מחיקת מייל ממערך sharedWith
const deleteEmailFromSharedRecording = async ( sharedRecordingId: string,email: string): Promise<void> => {
  try {
    const result = await pool.query(
      `UPDATE shared_recordings
       SET shared_with = array_remove(shared_with, :email)
       WHERE id = :sharedRecordingId`,
      [ sharedRecordingId, email]
    );

    if (result.rows.length > 0 && result.rows[0].shared_with.length === 0) {
      await pool.query(
        `DELETE FROM shared_recordings WHERE id = $1`,
        [sharedRecordingId]
      );
    }
  } catch (error) {
    console.error("Error removing email from shared_with:", error);
    throw error;
  }
};



export default { getSharedRecordingIdByAnswerId, deleteEmailFromSharedRecording }   