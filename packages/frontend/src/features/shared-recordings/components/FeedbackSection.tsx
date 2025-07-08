import React, { useEffect, useState } from 'react';
import {
  useCreateFeedbackMutation,
  useGetFeedbacksBySharedRecordingIdQuery,
  useUpdateFeedbackMutation,
} from '../../feedback/services/feedbackApi';

interface Props {
  recordingId: string;
  userId: string;
  onSubmitted: (comment: string, rating: number) => void;
    feedbackRating?: number; 
}

export default function FeedbackSection({ recordingId, userId, onSubmitted ,feedbackRating }: Props) {
  const { data: feedbacks = [] } = useGetFeedbacksBySharedRecordingIdQuery(recordingId);


  const existingFeedback = feedbacks.find(fb => String(fb.given_by_user_id) === String(userId));


  const existingRating = existingFeedback?.rating ?? feedbackRating ?? 0;


  const existingComment = existingFeedback?.comment ?? '';

  const [rating, setRating] = useState<number>(existingRating);
  const [comment, setComment] = useState<string>(existingComment);
  const [success, setSuccess] = useState(false);

  const [createFeedback, { isLoading: creating }] = useCreateFeedbackMutation();
  const [updateFeedback, { isLoading: updating }] = useUpdateFeedbackMutation();


  useEffect(() => {
    setRating(existingRating);
    setComment(existingComment);
  }, [existingRating, existingComment]);


const handleSubmit = async () => {
  if (rating === 0) {
    alert('יש לבחור דירוג');
    return;
  }

  if (comment.trim() === '') {
    const wantsToFillFeedback = window.confirm('האם ברצונך למלא פידבק? .');

    if (wantsToFillFeedback) {
      return;
    }
  }

  try {
    if (existingFeedback) {
      await updateFeedback({ id: existingFeedback.id, rating, comment }).unwrap();
    } else {
      await createFeedback({
        sharedRecordingId: recordingId,
        givenByUserId: userId,
        rating,
        comment,
      }).unwrap();
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    onSubmitted(comment, rating);
  } catch (err) {
    alert('שגיאה בשליחה: ' + (err as any)?.data?.message || (err as any)?.message || String(err));
  }
};

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="text-lg font-semibold">ערוך דירוג והוסף פידבק</h3>

      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>

      {rating === 0 && <p className="text-sm text-gray-500">😊 מחכה לדירוג שלך</p>}

      <textarea
        className="w-full border p-2 rounded"
        placeholder="כתוב כאן את המשוב שלך..."
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={creating || updating}
      />

      <button
        onClick={handleSubmit}
        disabled={creating || updating}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {creating || updating ? 'שולח...' : 'שליחה'}
      </button>

      {success && (
        <div className="text-green-600 font-semibold">הפידבק נשלח בהצלחה!</div>
      )}
    </div>
  );
}
