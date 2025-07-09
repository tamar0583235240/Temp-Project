// InterviewPage.tsx

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useGetQuestionsByCategoryQuery } from "../features/interview/services/questionsApi";
import {
  setQuestions,
  goToQuestion,
  setCurrentAnswerId,
} from "../features/interview/store/simulationSlice";
import { addAnsweredAnswer } from "../features/interview/store/answeredSlice";
import { RootState } from "../shared/store/store";

import Sidebar from "../features/interview/components/sidebar";
import Question from "../features/interview/components/question";
import AnswerAI from "../features/interview/components/AnswerAI";
import TipsComponent from "../features/interview/components/tipsComponent";
import MagicLoader from "../features/interview/components/MagicLoader";
import EndSurvey from "../features/interview/components/endSurvey";
import CategoryDropdown from "../features/interview/components/showCategories";
import { skipToken } from "@reduxjs/toolkit/query";

const InterviewPage = () => {
  const dispatch = useDispatch();
  const { currentCategoryId, currentIndex } = useSelector(
    (state: RootState) => state.simulation
  );

  const { data: questions = [], isLoading, isError } =
    useGetQuestionsByCategoryQuery(currentCategoryId || skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const answeredAnswers = useSelector(
    (state: RootState) => state.answered.answeredAnswers
  );

  const [showTips, setShowTips] = useState(false);
  const [answerIdForAI, setAnswerIdForAI] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const answeredQuestionIds = useMemo(() => {
    return answeredAnswers.map((a: { question: { id: any; }; }) => a.question.id);
  }, [answeredAnswers]);

  const questionsWithStatus = useMemo(() => {
    return questions.map((q: any) => ({
      ...q,
      answered: answeredQuestionIds.includes(q.id),
    }));
  }, [questions, answeredQuestionIds]);

  const isCurrentQuestionAnswered = questionsWithStatus[currentIndex]?.answered;

  const totalQuestions = questions.length;
  const answeredCount = questionsWithStatus.filter(q => q.answered).length;
  const allAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  // Reset answerIdForAI & isLoadingAI when moving to another question
  useEffect(() => {
    setAnswerIdForAI(null);
    setIsLoadingAI(false);
    setShowTips(false);
  }, [currentIndex]);

  useEffect(() => {
    if (questions.length > 0) {
      dispatch(setQuestions(questions));
      dispatch(goToQuestion(0));
    }
  }, [questions, dispatch]);

  if (isLoading) return <p className="p-8 text-center">טוען שאלות...</p>;

  const handleAnswerSaved = (answerId: string) => {
    const q = questions[currentIndex];
    dispatch(
      addAnsweredAnswer({
        id: answerId,
        question: { id: String(q.id), text: q.title || q.text },
      })
    );
    setAnswerIdForAI(answerId); // ניתוח AI תמיד לפי ה-id האחרון
    setIsLoadingAI(true);
    setTimeout(() => {
      setIsLoadingAI(false);
    }, 800); // אפשר לקצר את זמן ההמתנה
  };

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[--color-background]">
      <CategoryDropdown />
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <div className="w-full max-w-2xl space-y-8">
          <Question
            onFinishRecording={() => setShowTips(true)}
            onAnswerSaved={handleAnswerSaved}
          />
        </div>

        {showTips && <TipsComponent />}
        {isLoadingAI && <MagicLoader />}
        {answerIdForAI && !isLoadingAI && (
          <AnswerAI answerId={"2151d5f9-6266-42e9-b7ee-c47a680d3a63"} />
        )}
      
        <div className="mt-8 w-full max-w-2xl">
          <EndSurvey showEndButton={allAnswered} answeredCount={answeredCount} totalQuestions={totalQuestions} />
        </div>
      </main>

      <aside className="w-64 flex-shrink-0 border-l border-[--color-border] bg-white shadow-md z-10">
        <Sidebar
          questions={questionsWithStatus}
          currentIndex={currentIndex}
          onNavigate={(index) => dispatch(goToQuestion(index))}
        />
      </aside>
    </div>
  );
};

export default InterviewPage;