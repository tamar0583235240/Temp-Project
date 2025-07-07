import { useState, useEffect } from "react";
import { useGetAllQuestionsQuery, useGetQuestionsByCategoryQuery } from "../features/interview/services/questionsApi";
import { useNavigate } from "react-router-dom";
import Sidebar from "../features/interview/components/sidebar";
import Question from "../features/interview/components/question";
import AnswerAI from "../features/interview/components/AnswerAI";
import TipsComponent from "../features/interview/components/tipsComponent";
import MagicLoader from "../features/interview/components/MagicLoader";
import EndSurvey from "../features/interview/components/endSurvey";
import ShowCategories from "../features/interview/components/showCategories";

const InterviewPage = () => {
  const categoryId = "77777777-7777-7777-7777-777777777777"
  const navigate = useNavigate();
  const { data: questions = [], isLoading, isError } = useGetQuestionsByCategoryQuery(categoryId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [answerIdForAI, setAnswerIdForAI] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  useEffect(() => {
    setShowTips(false);
    setAnswerIdForAI(null);
  }, [currentIndex]);

  if (isLoading) return <p className="p-8 text-center">טוען שאלות...</p>;
  if (isError || !questions.length) return <p className="p-8 text-center">שגיאה בטעינת שאלות</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[--color-background]">
      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <ShowCategories />
        <div className="w-full max-w-2xl space-y-8">
          <Question
            question={questions[currentIndex]}
            index={currentIndex}
            total={questions.length}
            onFinishRecording={() => setShowTips(true)}
            onAnswerSaved={(id) => {
              setIsLoadingAI(true);
              setTimeout(() => {
                setAnswerIdForAI(id);
                setIsLoadingAI(false);
              }, 2000);
            }}
          />
          {showTips && <TipsComponent />}
          {isLoadingAI && <MagicLoader />}
          {answerIdForAI && !isLoadingAI && <AnswerAI />}
        </div>

        <div className="mt-8 w-full max-w-2xl">
          <EndSurvey />
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-l border-[--color-border] bg-white shadow-md z-10">
        <Sidebar
          questions={questions}
          currentIndex={currentIndex}
          onNavigate={(index) => setCurrentIndex(index)}
        />
      </aside>
    </div>
  );
};

export default InterviewPage;
