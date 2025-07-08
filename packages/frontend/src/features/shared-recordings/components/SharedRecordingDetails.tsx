import React from 'react';
import { feedbackType } from '../../feedback/types/feedbackType';
import FeedbackSection from './FeedbackSection';

interface Props {
  userName: string;
  questionTitle: string;
  date: string;
  audioUrl: string;
  aiSummary: string;
  onSubmitFeedback: (comment: string, rating: number, feedbackId?: string) => void;
  onBack: () => void;
  recordingId: string;
  userId: string; 
  feedback?: feedbackType | null; 
  feedbackRating?: number;  
    feedbackComment?: string; // ✅ הוספה
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
  userId, 
  feedback,
  feedbackRating = 0, 
  feedbackComment
}: Props) {
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
      {feedbackComment && (
  <div className="mb-3">
    <h3 className="font-medium mb-1">הפידבק הקודם שלך:</h3>
    <p className="text-gray-700 whitespace-pre-line">{feedbackComment}</p>
    
  </div>
)}

{typeof feedbackRating === 'number' && (
  <div className="mb-3 flex items-center space-x-1 rtl:space-x-reverse text-yellow-400 text-xl">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {feedbackRating >= star ? '★' : '☆'}
      </span>
    ))}
  </div>
)}

      <FeedbackSection
        recordingId={recordingId}
        userId={userId} 
          feedbackRating={feedbackRating} 
        onSubmitted={onSubmitFeedback}
      />
    
    </div>
  );
}
