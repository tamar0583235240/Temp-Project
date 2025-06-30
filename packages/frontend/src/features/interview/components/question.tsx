import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { useDispatch } from "react-redux";
import { answerQuestion, nextQuestion, resetQuestion } from "../store/simulationSlice";
import { Bot, Brain, RotateCcw, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import AnswerAI from "./AnswerAI";
import { Button } from "../../../shared/ui/button";
import FileUpload from "../../recordings/components/FileUpload";
import { useUploadAnswerMutation } from "../../recordings/services/recordingApi";
import Notification from "./Notification";

const Question: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];
  const [uploadAnswer, { isLoading: isSaving }] = useUploadAnswerMutation();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null>(null);

  const handleTextChange = (value: string) => {
    dispatch(answerQuestion({ index: currentIndex, answer: value }));
  };
  const handleReset = () => {
    dispatch(resetQuestion(currentIndex));
  };
  if (!questions.length || currentIndex >= questions.length) return <div>אין שאלות להצגה</div>;
  const userId = "user-id-מהסטייט-או-פרופס"; // כאן שימי את ה-userId האמיתי שלך
  const questionId = currentQuestion.id; // ודאי שלשאלה יש שדה id
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
        <div className="bg-white rounded-2xl shadow-md border border-[--color-border] p-8 max-w-xl w-full text-right relative">
          {/* כפתורי בדיקה לפופאפ */}
          <div className="flex gap-2 mb-4">
            <button
              className="bg-[--color-primary] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[--color-primary-dark] transition"
              onClick={() => {
                setNotification({
                  message: "הקובץ נשמר בהצלחה!",
                  type: "success",
                  icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />
                });
                setTimeout(() => setNotification(null), 3500);
              }}
            >
              בדוק פופאפ הצלחה
            </button>
            <button
              className="bg-danger text-white px-4 py-2 rounded-lg font-semibold hover:bg-danger/90 transition"
              onClick={() => {
                setNotification({
                  message: "שגיאה בשמירת התשובה",
                  type: "error",
                  icon: <XCircle className="w-6 h-6 text-red-500" />
                });
                setTimeout(() => setNotification(null), 3500);
              }}
            >
              בדוק פופאפ שגיאה
            </button>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="bg-[--color-background] text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
              שאלה {currentIndex + 1}
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-text-main mb-6 leading-snug">
            {currentQuestion.content}
          </div>
          {/* אולי נשתמש בהמשך */}
          {/* {currentQuestion.question_type === "open" ? (
            <textarea
              className="w-full min-h-[80px] rounded-md border border-[--color-border] p-3 text-base focus:ring-[--color-primary] focus:border-[--color-primary] bg-[#F7FAFC] mb-6"
              value={currentQuestion.answer ?? ""}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="הקלד/י את תשובתך כאן..."
              dir="rtl"
            />
            ) : (
              <div className="flex flex-col gap-3 mb-6">
                {currentQuestion.options?.map((option, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer text-base">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={currentQuestion.answer === option}
                      onChange={() => handleTextChange(option)}
                      className="accent-primary-dark"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )} */}
          <div className="flex gap-4 mt-2 mb-2 w-full">
            <button
              className="w-1/2 bg-[--color-primary] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[--color-primary-dark] transition text-lg flex items-center justify-center"
              onClick={() => handleTextChange(currentQuestion.answer ?? "")}
            >
              התחל הקלטה
            </button>
            <FileUpload
              userId="00000000-0000-0000-0000-000000000000"
              questionId={String(questionId)}
              onUploaded={async (fileUrl, fileName) => {
                dispatch(answerQuestion({ index: currentIndex, answer: 'טוען...' }));
                try {
                  await uploadAnswer({
                    userId: "00000000-0000-0000-0000-000000000000",
                    questionId: String(questionId),
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
            />
          </div>
          {/* <Button/> */}
          {/* <div className="flex gap-2">
          <button
            className="bg-danger text-white px-6 py-2 rounded-lg font-semibold hover:bg-danger/90 transition"
            onClick={handleReset}
          >
            איפוס תשובה
            <RotateCcw size={20} />
          </button>
          <button
                    className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
                    onClick={() => {
                      handleTextChange(currentQuestion.answer ?? "");
                      setTimeout(() => dispatch(nextQuestion()), 300);
                    }}
                  >
                    ניתוח AI
                    <Sparkles/>
                    <Bot/>
                  </button>
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default Question;
