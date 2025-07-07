// import React, { useRef, useState } from "react";
// import { CheckCircle2, XCircle, Trash2 } from "lucide-react";
// import { interviewType } from "../types/questionType";
// import AudioRecorder from "../../recordings/components/AudioRecorder";
// import FileUpload from "../../recordings/components/FileUpload";
// import Notification from "./Notification";
// import TipsComponent from "./tipsComponent";
// import AnswerAI from "./AnswerAI";
// import MagicLoader from "./MagicLoader";
// import { useUploadAnswerMutation } from "../../recordings/services/recordingApi";
// import { useGetQuestionsByCategoryQuery } from "../services/questionsApi";

// interface QuestionProps {
//   onFinishRecording: () => void;
//   onAnswerSaved: (id: string) => void;
// }

// const Question: React.FC<QuestionProps> = ({
//   onFinishRecording,
//   onAnswerSaved,
// }) => {
//   const [uploadAnswer] = useUploadAnswerMutation();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [showFileActions, setShowFileActions] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//     const { data: questions = [], isLoading, isError } = useGetQuestionsByCategoryQuery(categoryId);

//   const [notification, setNotification] = useState<{
//     message: string;
//     type: "success" | "error";
//     icon?: React.ReactNode;
//   } | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

  

//   const userId = "00000000-0000-0000-0000-000000000000"; // לשנות לפי משתמש אמיתי

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setShowFileActions(true);
//     }
//   };

//   const handleApprove = () => {
//     setIsUploading(true);
//   };

//   const handleReupload = () => {
//     setSelectedFile(null);
//     setShowFileActions(false);
//     setIsUploading(false);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//     if (isLoading) return <p className="p-8 text-center">טוען שאלות...</p>;
//   if (isError || !questions.length) return <p className="p-8 text-center">שגיאה בטעינת שאלות</p>;

//   const currentQuestion = questions[currentIndex];

//   return (
//     <div>
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           icon={notification.icon}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="flex justify-center items-center min-h-[60vh] bg-[--color-surface] py-8 px-2 direction-rtl">
//         <div className="bg-white rounded-2xl shadow-md border border-[--color-border] p-8 max-w-xl w-full text-right">
//           <div className="flex justify-between items-center mb-2">
//             <span className="bg-[--color-background] text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
//               שאלה {index + 1} מתוך {total}
//             </span>
//           </div>

//           <div>
//             <span>{question.category}</span>
//           </div>

//           <div className="text-2xl md:text-3xl font-bold text-text-main mb-6 leading-snug">
//             {question.content}
//           </div>

//           <div className="flex gap-4 w-full">
//             {/* העלאת קובץ */}
//             <div className="w-1/2">
//               <button
//                 type="button"
//                 className={`w-full border border-[--color-border] bg-white text-[--color-text] px-6 py-3 rounded-lg font-semibold transition text-lg flex items-center justify-center gap-2 ${selectedFile || isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-[--color-background]"}`}
//                 onClick={() => document.getElementById("file-upload-input")?.click()}
//                 disabled={!!selectedFile || isUploading}
//               >
//                 העלה קובץ
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
//                 </svg>
//               </button>

//               <input
//                 id="file-upload-input"
//                 type="file"
//                 style={{ display: "none" }}
//                 accept="audio/*,video/*"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//               />

//               {selectedFile && showFileActions && !isUploading && (
//                 <div className="flex flex-col items-center gap-2 mt-2 w-full">
//                   <div className="flex items-center gap-2 w-full justify-center">
//                     <button
//                       className="p-1 text-red-500 hover:text-red-700 order-1"
//                       onClick={handleReupload}
//                       title="מחק קובץ"
//                       style={{ marginLeft: 4 }}
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                     <span className="text-sm text-gray-700 order-2">{selectedFile.name}</span>
//                   </div>
//                   <div className="flex gap-2 mt-1">
//                     <button
//                       className="bg-[--color-primary] text-white px-4 py-2 rounded hover:bg-[--color-primary-dark] transition"
//                       onClick={handleApprove}
//                     >
//                       אישור
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {selectedFile && isUploading && (
//                 <FileUpload
//                   userId={userId}
//                   questionId={String(question.id)}
//                   file={selectedFile}
//                   onUploaded={async (fileUrl, fileName) => {
//                     setIsUploading(false);
//                     setSelectedFile(null);
//                     setShowFileActions(false);
//                     if (fileInputRef.current) fileInputRef.current.value = "";

//                     try {
//                       await uploadAnswer({
//                         userId,
//                         questionId: String(question.id),
//                         fileUrl,
//                         amountFeedbacks: 0,
//                         answerFileName: fileName,
//                       }).unwrap();

//                       setNotification({
//                         message: "הקובץ נשמר בהצלחה!",
//                         type: "success",
//                         icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />,
//                       });

//                       setTimeout(() => setNotification(null), 3500);
//                       onAnswerSaved("fake-id-from-server"); // כאן שימי את ה־id האמיתי מהתשובה
//                     } catch (e) {
//                       setNotification({
//                         message: "שגיאה בשמירת התשובה",
//                         type: "error",
//                         icon: <XCircle className="w-6 h-6 text-red-500" />,
//                       });
//                       setTimeout(() => setNotification(null), 3500);
//                     }
//                   }}
//                   onError={() => {
//                     setIsUploading(false);
//                     setSelectedFile(null);
//                     setShowFileActions(false);
//                     if (fileInputRef.current) fileInputRef.current.value = "";

//                     setNotification({
//                       message: "שגיאה בהעלאת קובץ",
//                       type: "error",
//                       icon: <XCircle className="w-6 h-6 text-red-500" />,
//                     });
//                     setTimeout(() => setNotification(null), 3500);
//                   }}
//                 />
//               )}
//             </div>

//             {/* הקלטה */}
//             <div className="w-1/2">
//               <AudioRecorder
//                 questionId={question.id.toString()}
//                 onFinish={onFinishRecording}
//                 onSaveSuccess={onAnswerSaved}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* טיפים / AI */}
//       <div className="w-full flex flex-col items-center mt-4 gap-4">
//         {selectedFile && showFileActions && !isUploading && <TipsComponent />}
//       </div>
//     </div>
//   );
// };

// export default Question;

import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { answerQuestion } from "../store/simulationSlice";
import { CheckCircle2, XCircle, Trash2 } from "lucide-react";
import AudioRecorder from "../../recordings/components/AudioRecorder";
import FileUpload from "../../recordings/components/FileUpload";
import { useUploadAnswerMutation } from "../../recordings/services/recordingApi";
import Notification from "./Notification";
import TipsComponent from "./tipsComponent";
import AnswerAI from "../../interview/components/AnswerAI";
import MagicLoader from "../../interview/components/MagicLoader";

interface QuestionProps {
  onFinishRecording: () => void;
  onAnswerSaved: (answerId: string) => void;
  showTips?: boolean;
  answerIdForAI?: string | null;
  isLoadingAI?: boolean;
}

const Question: React.FC<QuestionProps> = ({
  onFinishRecording,
  onAnswerSaved,
  showTips,
  answerIdForAI,
  isLoadingAI
}) => {
  const dispatch = useDispatch();
  const { questions, currentIndex, currentUserId } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];
  const [uploadAnswer, { isLoading: isSaving }] = useUploadAnswerMutation();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileActions, setShowFileActions] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!questions.length || currentIndex >= questions.length) return <div>אין שאלות להצגה</div>;


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowFileActions(true);
    }
  };

  const handleApprove = () => {
    setIsUploading(true);
  };

  const handleReupload = () => {
    setSelectedFile(null);
    setShowFileActions(false);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            {currentQuestion.title}
          </div>

          <div className="flex gap-4 w-full">
            {/* העלאת קובץ */}
            <div className="w-1/2">
              <button
                type="button"
                className={`w-full border border-[--color-border] bg-white text-[--color-text] px-6 py-3 rounded-lg font-semibold transition text-lg flex items-center justify-center gap-2 ${selectedFile || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[--color-background]'}`}
                onClick={() => document.getElementById('file-upload-input')?.click()}
                disabled={!!selectedFile || isUploading}
              >
                העלה קובץ
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </button>
              <input
                id="file-upload-input"
                type="file"
                style={{ display: "none" }}
                accept="audio/*,video/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {selectedFile && showFileActions && !isUploading && (
                <div className="flex flex-col items-center gap-2 mt-2 w-full">
                  <div className="flex items-center gap-2 w-full justify-center">
                    <button
                      className="p-1 text-red-500 hover:text-red-700 order-1"
                      onClick={handleReupload}
                      title="מחק קובץ"
                      style={{ marginLeft: 4 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-700 order-2">{selectedFile.name}</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button
                      className="bg-[--color-primary] text-white px-4 py-2 rounded hover:bg-[--color-primary-dark] transition"
                      onClick={handleApprove}
                    >
                      אישור
                    </button>
                  </div>
                </div>
              )}
              {selectedFile && isUploading && (
                <FileUpload
                  userId={currentUserId}
                  questionId={String(currentQuestion.id)}
                  file={selectedFile}
                  onUploaded={async (fileUrl, fileName) => {
                    setIsUploading(false);
                    setSelectedFile(null);
                    setShowFileActions(false);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                    dispatch(answerQuestion({ index: currentIndex, answer: 'טוען...' }));
                    try {
                      await uploadAnswer({
                        userId: currentUserId,
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
                    setShowFileActions(false);
                    if (fileInputRef.current) fileInputRef.current.value = "";
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
      {/* כאן יוצג הטיפ וה-AI מתחת לשאלה */}
      <div className="w-full flex flex-col items-center mt-4 gap-4">
        {/* טיפ זמני אחרי בחירת קובץ ולפני אישור */}
        {selectedFile && showFileActions && !isUploading && (
          <TipsComponent />
        )}
        {/* טיפ קבוע אחרי הקלטה/שמירה */}
        {showTips && <TipsComponent />}
        {/* הצגת ניתוח AI */}
        {answerIdForAI && !isLoadingAI && (
          <div className="w-full flex justify-center">
            <AnswerAI />
          </div>
        )}
        {/* חיווי טעינה ל-AI */}
        {isLoadingAI && <MagicLoader />}
      </div>
    </div>
  );
};

export default Question;