import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { interviewType } from "../types/questionType";
import { goToQuestion, nextQuestion, prevQuestion } from "../store/simulationSlice";
import { ChevronUp, ChevronDown, Home } from "lucide-react";
const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const answeredCount = questions.filter((q) => q.answered).length;
  const percentage = Math.round((answeredCount / questions.length) * 100);
  return (
    <div className="flex flex-col items-center py-6 px-4 h-full bg-white rounded-xl shadow-md border w-64">
      <div className="text-center text-xl font-bold text-primary mb-2">
        {`${currentIndex + 1} מתוך ${questions.length}`}
      </div>
      {/* אחוזי התקדמות */}
      <div className="w-full mt-2 mb-4">
        <div className="text-sm text-text-secondary text-center mb-1">{percentage}% הושלמו</div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-primary-dark rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      {/* חץ למעלה */}
      <button
        onClick={() => dispatch(prevQuestion())}
        className="text-primary hover:bg-primary/10 rounded-full p-2 transition mb-2"
        aria-label="שאלה קודמת"
      >
        <ChevronUp size={20} />
      </button>
      {/* כפתורי מספרים */}
      <div className="flex flex-wrap justify-center gap-2 overflow-y-auto max-h-[300px] mb-2">
        {questions.map((q: interviewType, i: number) => {
          const isCurrent = i === currentIndex;
          const isAnswered = q.answered;
          return (
            <button
              key={q.id}
              onClick={() => dispatch(goToQuestion(i))}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition
                ${isCurrent ? "bg-primary text-white shadow" :
                  isAnswered ? "bg-primary/20 text-primary border border-primary" :
                    "bg-gray-100 text-gray-600 hover:bg-gray-200"}
              `}
              title={`שאלה ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      {/* חץ למטה */}
      <button
        onClick={() => dispatch(nextQuestion())}
        className="text-primary hover:bg-primary/10 rounded-full p-2 transition mt-2"
        aria-label="שאלה הבאה"
      >
        <ChevronDown size={20} />
      </button>
      {/* כפתור חזור לעמוד הבית */}
      <button
        onClick={() => window.location.href = "/"}
        className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition flex items-center gap-2 text-sm"
      >
        <Home size={16} />
        חזור לעמוד הבית
      </button>
    </div>
  );
};
export default Sidebar;