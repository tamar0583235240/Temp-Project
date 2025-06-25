import { useGetAnswersByIdUserQuery } from "../services/answerApi";
import { TitleQuestions } from "./question";
import { RootState } from '../../../shared/store/store';
import './RecordingsList.css';
import { useSelector } from "react-redux";
import ShareDialog from "../../shared-recordings/components/ShareDialog";
import { useState } from "react";
import ShareButton from "../../shared-recordings/components/ShareButton";

const RecordingsList = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id?.toString() ?? '00000000-0000-0000-0000-000000000004';

  const { data, error, isLoading } = useGetAnswersByIdUserQuery(userId);
  console.log("Recordings data:", data);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading recordings</div>;

  return (
    <>
      <div className="recordings-container">
        <h2 className="recordings-title">ההקלטות שלי</h2>
        {data.map((recording) => (
          <div key={recording.id} className="recording-card">
            <div className="card-header buttons-wrapper">
              <div className="answer-title-container">
                <span className="answer-prefix">מענה לשאלה: </span>
                <TitleQuestions data={recording.question_id} />
              </div>

              <a href={recording.file_url} download>
                <button className="download-button">
                  <svg className="download-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z" fill="currentColor" />
                    <path d="M5 20V18H19V20H5Z" fill="currentColor" />
                  </svg>
                  הורדה
                </button>
              </a>

              <ShareButton
                setIsDialogOpen={() => {
                  setSelectedRecordingId(recording.id);
                  console.log("Selected recording ID:", recording.id);
                  
                  setIsDialogOpen(true);
                }}
              />
            </div>

            <div className="recording-header">
              <div className="submission-date">
                <span className="date-label">תאריך הגשה:</span>
                <span className="date-value">
                  {new Date(recording.submitted_at).toLocaleDateString('he-IL')}
                </span>
              </div>
            </div>

            <div className="audio-section">
              <audio className="audio-player" controls>
                <source src={recording.file_url} type="audio/mpeg" />
                הדפדפן שלך לא תומך בנגן האודיו
              </audio>
            </div>
          </div>
        ))}
      </div>

      {selectedRecordingId && (
        <ShareDialog
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedRecordingId(null);
          }}
          userId={userId}
          recordingId={selectedRecordingId}
        />
      )}
    </>
  );
};

export default RecordingsList;
