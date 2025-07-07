import React, { useEffect, useState } from 'react';
import { feedbackType } from '../../feedback/types/feedbackType';

interface Props {
  userName: string;
  questionTitle: string;
  date: string;
  audioUrl: string;
  aiSummary: string;
  onSubmitFeedback: (comment: string, rating: number, feedbackId?: string) => void;
  onBack: () => void;
  recordingId: string;
  feedback?: feedbackType | null; // פידבק קיים אם יש
}

export default function SharedRecordingDetails({
  userName,
  questionTitle,
  date,
  audioUrl,
  aiSummary,
  onSubmitFeedback,
  onBack,
  recordingId,
  feedback,
}: Props) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (feedback) {
      setComment(feedback.comment);
      setRating(feedback.rating);
    }
  }, [feedback]);

  const handleSubmit = () => {
    onSubmitFeedback(comment, rating, feedback?.id);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-blue-600 underline hover:text-blue-800"
      >
        ← חזרה לרשימה
      </button>

      <h2 className="text-xl font-bold mb-2">משתף: {userName}</h2>
      <p className="text-sm text-gray-600 mb-1">שאלה: {questionTitle}</p>
      <p className="text-sm text-gray-600 mb-3">תאריך: {new Date(date).toLocaleDateString()}</p>

      <audio controls className="mb-4 w-full">
        <source src={audioUrl} type="audio/mpeg" />
        הדפדפן שלך לא תומך בהשמעת אודיו.
      </audio>

      <div className="mb-3">
        <h3 className="font-medium mb-1">תובנות AI:</h3>
        <p className="text-gray-700">{aiSummary}</p>
      </div>

      <div className="mb-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="כתבי כאן פידבק..."
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex items-center mb-3 gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            className={`cursor-pointer text-2xl ${rating >= num ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRating(num)}
          >
            ★
          </span>
        ))}
        {rating === 0 && <span className="text-sm text-gray-500 ml-2">מחכה לדירוג שלך 😊</span>}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        {feedback ? 'עדכון פידבק' : 'שלחי פידבק'}
      </button>
    </div>
  );
}
