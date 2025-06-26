import { useDispatch, useSelector } from "react-redux"
import Question from "../features/interview/components/question"
import Sidebar from "../features/interview/components/sidebar"
import { useEffect, useState } from "react"
import { useGetAllQuestionsQuery } from "../features/interview/services/questionsApi"
import { setQuestions } from "../features/interview/store/simulationSlice"
import { useNavigate } from "react-router-dom"
import AnalysisStepWrapper from "../features/interview/components/AnalysisStepWrapper"
import Buttons from "../features/interview/components/buttons"
import AudioRecorder from "../features/recordings/components/AudioRecorder"

const InterviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAllQuestionsQuery();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [lastQuestionIndex, setLastQuestionIndex] = useState<number | null>(null);

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

  // reset analysis when question changes
  useEffect(() => {
    if (lastQuestionIndex !== null && lastQuestionIndex !== undefined) {
      setShowAnalysis(false);
    }
  }, [lastQuestionIndex]);

  // get currentIndex from redux
  const currentIndex = useSelector((state: any) => state.simulation.currentIndex);
  useEffect(() => {
    setLastQuestionIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[--color-background]">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <div className="w-full max-w-2xl space-y-8">
          <Question />
          <AudioRecorder />
          <Buttons onShowAnalysis={() => setShowAnalysis(true)} analysisVisible={showAnalysis} />
          {showAnalysis && <AnalysisStepWrapper />}
        </div>
      </main>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-l border-[--color-border] bg-white shadow-md z-10">
        <Sidebar />
      </aside>
    </div>
  )
}

export default InterviewPage;