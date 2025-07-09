import React, { useEffect, useState } from 'react';
import {
  useCreateFeedbackMutation,
  useGetFeedbacksBySharedRecordingIdQuery,
  useUpdateFeedbackMutation,
} from '../../feedback/services/feedbackApi';

interface Props {
  recordingId: string;
  userId: string; // ⬅️ חדש
  onSubmitted: (comment: string, rating: number) => void;
}

export default function FeedbackSection({ recordingId, userId, onSubmitted }: Props) {
  const { data: feedbacks = [] } = useGetFeedbacksBySharedRecordingIdQuery(recordingId);
  const existingFeedback = feedbacks[0]; // נניח שיש רק אחד לכל משתמש
  // const existingFeedback = feedbacks.find(fb => fb.given_by_user_id === userId);
  const [rating, setRating] = useState<number>(existingFeedback?.rating || 0);
  const [comment, setComment] = useState<string>(existingFeedback?.comment || '');

  const [createFeedback, { isLoading: creating }] = useCreateFeedbackMutation();
  const [updateFeedback, { isLoading: updating }] = useUpdateFeedbackMutation();

  useEffect(() => {
    if (existingFeedback) {
      setRating(existingFeedback.rating);
      setComment(existingFeedback.comment);
    }
  }, [existingFeedback]);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('יש לבחור דירוג');
      return;
    }

    try {
      if (existingFeedback) {
        await updateFeedback({ id: existingFeedback.id, rating, comment }).unwrap();
      } else {
        await createFeedback({
          sharedRecordingId: recordingId,
          givenByUserId: userId, // ⬅️ הוסף
          rating,
          comment,
        }).unwrap();
      }

      onSubmitted(comment, rating);
    } catch (err) {
      console.error('שגיאה בשליחת פידבק:', err);
      alert('שגיאה בשליחה');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="text-lg font-semibold">
        {existingFeedback ? 'עדכן פידבק' : 'הוסף פידבק'}
      </h3>

      {/* דירוג בכוכבים */}
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-2xl ${
              rating >= star ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {rating === 0 && (
        <p className="text-sm text-gray-500">😊 מחכה לדירוג שלך</p>
      )}

      <textarea
        className="w-full border p-2 rounded"
        placeholder="כתוב כאן את המשוב שלך..."
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={creating || updating}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        שליחה
      </button>
    </div>
  );
}
