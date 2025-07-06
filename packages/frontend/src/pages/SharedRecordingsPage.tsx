import React, { useState } from 'react';
import { useGetSharedRecordingsQuery } from '../features/shared-recordings/services/sharedRecordingsApi';
import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard';
import SharedRecordingDetails from '../features/shared-recordings/components/SharedRecordingDetails';
import { SharedRecording } from '../features/shared-recordings/types/types';
import { useCreateFeedbackMutation } from '../features/feedback/services/feedbackApi';

export default function SharedRecordingsPage() {
  const userId = 'a3f1b842-1d3e-4b29-9f99-8d1b12a91f77'; // זמני
  const { data, isLoading, error } = useGetSharedRecordingsQuery(userId);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(null);

  const [createFeedback] = useCreateFeedbackMutation();

  const selectedRecording = data?.find((rec: SharedRecording) => rec.id === selectedRecordingId);

  if (isLoading) return <p>טוען...</p>;
  if (error) return <p>שגיאה בטעינת נתונים</p>;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">ההקלטות ששיתפו איתי</h1>

      {selectedRecording ? (
        <SharedRecordingDetails
          userName={selectedRecording.userName}
          questionTitle={selectedRecording.questionTitle}
          date={selectedRecording.date}
          audioUrl={selectedRecording.audioUrl}
          aiSummary={selectedRecording.aiSummary}
          onBack={() => setSelectedRecordingId(null)}
          onSubmitFeedback={async (comment, rating) => {
            if (!selectedRecording) return;

            try {
              await createFeedback({
                shared_recording_id: selectedRecording.id,
                given_by_user_id: userId,
                comment,
                rating,
              });
              alert('הפידבק נשלח בהצלחה!');
            } catch (err) {
              alert('אירעה שגיאה בשליחת הפידבק.');
              console.error(err);
            }

            setSelectedRecordingId(null);
          }}
        />
      ) : (
        <div className="grid gap-4">
          {data?.map((rec: SharedRecording) => (
            <SharedRecordingCard
              key={rec.id}
              id={rec.id}
              sharedBy={rec.userName}
              sharedAt={rec.date}
              feedbackRating={rec.feedbackRating}
              onClick={() => setSelectedRecordingId(rec.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
