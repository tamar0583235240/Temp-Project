import React, { useState } from 'react';
import { useGetSharedRecordingsQuery } from '../features/shared-recordings/services/sharedRecordingsApi';
import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard';
import SharedRecordingDetails from '../features/shared-recordings/components/SharedRecordingDetails';
import { SharedRecording } from '../features/shared-recordings/types/types';
import { useCreateFeedbackMutation } from '../features/feedback/services/feedbackApi';

export default function SharedRecordingsPage() {
  const userId = 'cdb5a81b-3fbc-4355-8cab-3df28b160533'; // זמני
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
          recordingId={selectedRecording.id} 
           feedbackComment={selectedRecording.feedbackComment} 
            feedbackRating={selectedRecording.feedbackRating} 
          onBack={() => setSelectedRecordingId(null)}
            userId={userId} 
          onSubmitFeedback={async (comment, rating) => {
            try {
              await createFeedback({
                sharedRecordingId: selectedRecording.id, 
                givenByUserId: userId,
                comment,
                rating,
              }).unwrap();
              alert(' נשלח בהצלחה!');
              setSelectedRecordingId(null);
            } catch (err) {
              alert('אירעה שגיאה בשליחת הפידבק.');
              console.error(err);
            }
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
