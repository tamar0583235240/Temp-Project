import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useGetAllQuestionsQuery } from "../features/interview/services/questionsApi"
import { setQuestions } from "../features/interview/store/simulationSlice"
import { useNavigate } from "react-router-dom"
import AnalysisStepWrapper from "../features/interview/components/AnalysisStepWrapper"
import Buttons from "../features/interview/components/buttons"
import Sidebar from "../features/interview/components/sidebar"
import Question from "../features/interview/components/question"
import AnswerAI from "../features/interview/components/AnswerAI"
import TipsComponent from "../features/interview/components/tipsComponent"

const InterviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useGetAllQuestionsQuery();

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [lastQuestionIndex, setLastQuestionIndex] = useState<number | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [answerIdForAI, setAnswerIdForAI] = useState<string | null>(null);

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
    if (lastQuestionIndex !== null && lastQuestionIndex !== undefined) {
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
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <div className="w-full max-w-2xl space-y-8">
          <Question
            onFinishRecording={() => setShowTips(true)}
            onAnswerSaved={(id) => setAnswerIdForAI(id)}
          />
          {showTips && <TipsComponent />}
          {answerIdForAI && <AnswerAI answerId={answerIdForAI} />}
          <Buttons onShowAnalysis={() => setShowAnalysis(true)} analysisVisible={showAnalysis} />
          {showAnalysis && <AnalysisStepWrapper />}
        </div>
      </main>
      <aside className="w-64 flex-shrink-0 border-l border-[--color-border] bg-white shadow-md z-10">
        <Sidebar />
      </aside>
    </div>
  );
};

export default InterviewPage;
