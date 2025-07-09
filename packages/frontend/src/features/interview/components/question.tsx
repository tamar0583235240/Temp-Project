import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { interviewType } from "../types/questionType";
import AudioRecorder from "../../recordings/components/AudioRecorder";
import Notification from "./Notification";
import TipsComponent from "./tipsComponent";
import MagicLoader from "./MagicLoader";
import { useUploadAnswerMutation } from "../../recordings/services/recordingApi";
import FileUpload from "../../recordings/components/FileUpload";

interface QuestionProps {
  question: interviewType;
  index: number;
  total: number;
  onFinishRecording: () => void;
  onAnswerSaved: (id: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  index,
  total,
  onFinishRecording,
  onAnswerSaved,
}) => {
  const [uploadAnswer] = useUploadAnswerMutation();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null>(null);

  const userId = "00000000-0000-0000-0000-000000000000"; // לשנות לפי משתמש אמיתי

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
              שאלה {index + 1} מתוך {total}
            </span>
          </div>

          <div>
            <span>{question.category}</span>
          </div>

          <div className="text-2xl md:text-3xl font-bold text-text-main mb-6 leading-snug">
            {question.content}
          </div>

          <div className="flex gap-4 w-full">
            {/* העלאת קובץ */}
            <div className="w-1/2">
              <FileUpload
                userId={userId}
                onUploaded={async (fileUrl, fileName) => {
                  try {
                    await uploadAnswer({
                      userId,
                      questionId: String(question.id),
                      fileUrl,
                      amountFeedbacks: 0,
                      answerFileName: fileName,
                    }).unwrap();
                    setNotification({
                      message: "הקובץ נשמר בהצלחה!",
                      type: "success",
                      icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />,
                    });
                    setTimeout(() => setNotification(null), 3500);
                    onAnswerSaved("fake-id-from-server");
                  } catch (e) {
                    setNotification({
                      message: "שגיאה בשמירת התשובה",
                      type: "error",
                      icon: <XCircle className="w-6 h-6 text-red-500" />,
                    });
                    setTimeout(() => setNotification(null), 3500);
                  }
                }}
                onError={() => {
                  setNotification({
                    message: "שגיאה בהעלאת קובץ",
                    type: "error",
                    icon: <XCircle className="w-6 h-6 text-red-500" />,
                  });
                  setTimeout(() => setNotification(null), 3500);
                }}
              />
            </div>

            {/* הקלטה */}
            <div className="w-1/2">
              <AudioRecorder
                questionId={question.id.toString()}
                onFinish={onFinishRecording}
                onSaveSuccess={onAnswerSaved}
              />
            </div>
          </div>
        </div>
      </div>

      {/* טיפים / AI */}
      <div className="w-full flex flex-col items-center mt-4 gap-4">
        <TipsComponent />
      </div>
    </div>
  );
};

export default Question;