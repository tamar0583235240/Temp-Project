import React, { useState } from 'react';
import {
  useGetSharedRecordingsQuery,
  useGetRecordingDetailsQuery,
} from '../features/shared-recordings/services/sharedRecordingsApi';
import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard';
import SharedRecordingDetails from '../features/shared-recordings/components/SharedRecordingDetails';
import {
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
} from '../features/feedback/services/feedbackApi';
import { feedbackType } from '../features/feedback/types/feedbackType';

export default function SharedRecordingsPage() {
  const userId = 'a3f1b842-1d3e-4b29-9f99-8d1b12a91f77'; // זמני
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { data: recordingsList, isLoading, error } = useGetSharedRecordingsQuery(userId);
  const {
    data: selectedRecordingDetails,
    isLoading: isDetailsLoading,
    refetch: refetchDetails,
  } = useGetRecordingDetailsQuery(selectedRecordingId!, {
    skip: !selectedRecordingId,
  });

  const [createFeedback] = useCreateFeedbackMutation();
  const [updateFeedback] = useUpdateFeedbackMutation();

  const existingFeedback: feedbackType | null = selectedRecordingDetails?.feedback || null;

  const handleSubmitFeedback = async (
    comment: string,
    rating: number,
    feedbackId?: string
  ) => {
    try {
      if (feedbackId) {
        await updateFeedback({ id: feedbackId, comment, rating }).unwrap();
      } else {
        await createFeedback({
          sharedRecordingId: selectedRecordingDetails!.id,
          givenByUserId: userId,
          comment,
          rating,
        }).unwrap();
      }

      setShowSuccessMessage(true);
      await refetchDetails();
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (err) {
      console.error('שגיאה בשליחת פידבק:', err);
      alert('אירעה שגיאה בשליחת הפידבק.');
    }
  };

  if (isLoading) return <p>טוען...</p>;
  if (error) return <p>שגיאה בטעינת נתונים</p>;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">ההקלטות ששיתפו איתי</h1>

      {selectedRecordingId ? (
        isDetailsLoading ? (
          <p>טוען פרטים...</p>
        ) : selectedRecordingDetails ? (
          <SharedRecordingDetails
            userName={selectedRecordingDetails.userName}
            questionTitle={selectedRecordingDetails.questionTitle}
            date={selectedRecordingDetails.date}
            audioUrl={selectedRecordingDetails.audioUrl}
            aiSummary={selectedRecordingDetails.aiSummary}
            recordingId={selectedRecordingDetails.id}
            feedback={existingFeedback}
            onBack={() => setSelectedRecordingId(null)}
            onSubmitFeedback={handleSubmitFeedback}
          />
        ) : (
          <p>לא נמצאו פרטים להקלטה</p>
        )
      ) : (
        <div className="grid gap-4">
          {recordingsList?.map((rec) => (
            <SharedRecordingCard
              key={rec.id}
              id={rec.id}
              sharedBy={rec.userName}
              sharedAt={rec.date}
              feedbackRating={rec.feedback?.rating}
              onClick={() => setSelectedRecordingId(rec.id)}
            />
          ))}
        </div>
      )}

      {showSuccessMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          🎉 הפידבק נשמר בהצלחה!
        </div>
      )}
    </div>
  );
}
