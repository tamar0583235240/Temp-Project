import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetAllQuestionsQuery } from "../features/interview/services/questionsApi";
import { setQuestions } from "../features/interview/store/simulationSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../features/interview/components/sidebar";
import Question from "../features/interview/components/question";
import AnswerAI from "../features/interview/components/AnswerAI";
import TipsComponent from "../features/interview/components/tipsComponent";
import MagicLoader from "../features/interview/components/MagicLoader";
import EndSurvey from "../features/interview/components/endSurvey";

const InterviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAllQuestionsQuery();

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [lastQuestionIndex, setLastQuestionIndex] = useState<number | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [answerIdForAI, setAnswerIdForAI] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const currentIndex = useSelector((state: any) => state.simulation.currentIndex);

  useEffect(() => {
    if (data) {
      const mappedQuestions = data.map((q: any) => ({
        id: q.id,
        title: q.title || "",
        content: q.content || "",
        category: q.category || "",
        tips: q.tips || "",
        question_type: q.question_type || q.type || "open",
        options: q.options || [],
        answered: false,
        answer: q.answer || "",
        aiGuidance: q.aiGuidance || "",
        isActive: q.isActive ?? false,
      }));
      dispatch(setQuestions(mappedQuestions));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (lastQuestionIndex !== null) {
      setShowAnalysis(false);
      setShowTips(false);
      setAnswerIdForAI(null);
    }
  }, [lastQuestionIndex]);

  useEffect(() => {
    setLastQuestionIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[--color-background]">
      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <div className="w-full max-w-2xl space-y-8">
          <Question
            onFinishRecording={() => setShowTips(true)}
            onAnswerSaved={(id) => {
              setIsLoadingAI(true);
              setAnswerIdForAI(null);
              setTimeout(() => {
                setAnswerIdForAI(id);
                setIsLoadingAI(false);
              }, 2000); // הדמיית טעינה
            }}
          />
          {/* כאן מציגים את הטיפ וה-AI */}
          {showTips && <TipsComponent />}
          {isLoadingAI && <MagicLoader />}
          {/* //////////////////////////// */}
          {answerIdForAI && !isLoadingAI && <AnswerAI/>}

          {/* {answerIdForAI && !isLoadingAI && <AnswerAI answerId={answerIdForAI} />} */}
        </div>

        <div className="mt-8 w-full max-w-2xl">
          <EndSurvey />
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-l border-[--color-border] bg-white shadow-md z-10">
        <Sidebar />
      </aside>
    </div>
  );
};

export default InterviewPage;
