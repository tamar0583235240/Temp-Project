import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { answerQuestion } from "../store/simulationSlice";
import { CheckCircle2, XCircle } from "lucide-react";
import AudioRecorder from "../../recordings/components/AudioRecorder";
import FileUpload from "../../recordings/components/FileUpload";
import { useUploadAnswerMutation } from "../../recordings/services/recordingApi";
import Notification from "./Notification";

type QuestionProps = {
  onFinishRecording: () => void;
  onAnswerSaved: (answerId: string) => void;
};

const Question: React.FC<QuestionProps> = ({
  onFinishRecording,
  onAnswerSaved,
}) => {
  const dispatch = useDispatch();
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];
  const [uploadAnswer, { isLoading: isSaving }] = useUploadAnswerMutation();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!questions.length || currentIndex >= questions.length) return <div>אין שאלות להצגה</div>;

  const userId = "00000000-0000-0000-0000-000000000000"; // שימי את ה־userId הנכון שלך

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsUploading(true);
    }
  };

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          icon={notification.icon}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="flex justify-center items-center min-h-[60vh] bg-[--color-surface] py-8 px-2 direction-rtl">
        <div className="bg-white rounded-2xl shadow-md border border-[--color-border] p-8 max-w-xl w-full text-right">
          <div className="flex justify-between items-center mb-2">
            <span className="bg-[--color-background] text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
              שאלה {currentIndex + 1}
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-text-main mb-6 leading-snug">
            {currentQuestion.content}
          </div>

          <div className="flex gap-4 w-full">
            {/* העלאת קובץ */}
            <div className="w-1/2">
              <button
                type="button"
                className="w-full border border-[--color-border] bg-white text-[--color-text] px-6 py-3 rounded-lg font-semibold hover:bg-[--color-background] transition text-lg flex items-center justify-center gap-2"
                onClick={() => document.getElementById('file-upload-input')?.click()}
                disabled={isUploading}
              >
                {isUploading ? "מעלה קובץ..." : "העלה קובץ"}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </button>
              <input
                id="file-upload-input"
                type="file"
                style={{ display: "none" }}
                accept="audio/*,video/*"
                onChange={handleFileChange}
              />
              {selectedFile && isUploading && (
                <FileUpload
                  userId={userId}
                  questionId={String(currentQuestion.id)}
                  file={selectedFile}
                  onUploaded={async (fileUrl, fileName) => {
                    setIsUploading(false);
                    setSelectedFile(null);
                    dispatch(answerQuestion({ index: currentIndex, answer: 'טוען...' }));
                    try {
                      await uploadAnswer({
                        userId,
                        questionId: String(currentQuestion.id),
                        fileUrl,
                        amountFeedbacks: 0,
                        answerFileName: fileName,
                      }).unwrap();
                      dispatch(answerQuestion({ index: currentIndex, answer: fileUrl }));
                      setNotification({
                        message: "הקובץ נשמר בהצלחה!",
                        type: "success",
                        icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />
                      });
                      setTimeout(() => setNotification(null), 3500);
                      onAnswerSaved?.("id-from-response"); // כאן שימי את ה־id האמיתי אם יש לך
                    } catch (e) {
                      dispatch(answerQuestion({ index: currentIndex, answer: '' }));
                      setNotification({
                        message: "שגיאה בשמירת התשובה",
                        type: "error",
                        icon: <XCircle className="w-6 h-6 text-red-500" />
                      });
                      setTimeout(() => setNotification(null), 3500);
                    }
                  }}
                  onError={() => {
                    setIsUploading(false);
                    setSelectedFile(null);
                    setNotification({
                      message: "שגיאה בהעלאת קובץ",
                      type: "error",
                      icon: <XCircle className="w-6 h-6 text-red-500" />
                    });
                    setTimeout(() => setNotification(null), 3500);
                  }}
                />
              )}
            </div>

            {/* הקלטה */}
            <div className="w-1/2">
              <AudioRecorder
                questionId={currentQuestion.id.toString()}
                onFinish={onFinishRecording}
                onSaveSuccess={onAnswerSaved}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Question;
