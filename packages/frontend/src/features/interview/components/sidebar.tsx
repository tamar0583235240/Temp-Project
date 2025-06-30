import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { interviewType } from "../types/questionType";
import { goToQuestion, nextQuestion, prevQuestion } from "../store/simulationSlice";
import { ChevronUp, ChevronDown } from "lucide-react";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);

  return (
    <div className="flex flex-col items-center py-6 px-4 h-full bg-white rounded-xl shadow-md border w-64">
      <div className="text-center text-xl font-bold text-primary mb-4">
        {`${currentIndex + 1} מתוך ${questions.length}`}
        <div className="text-sm text-gray-500">התקדמות</div>
      </div>

      <button
        onClick={() => dispatch(prevQuestion())}
        className="text-primary hover:bg-primary/10 rounded-full p-2 transition mb-2"
        aria-label="שאלה קודמת"
      >
        <ChevronUp size={20} />
      </button>

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

      <button
        onClick={() => dispatch(nextQuestion())}
        className="text-primary hover:bg-primary/10 rounded-full p-2 transition mt-2"
        aria-label="שאלה הבאה"
      >
        <ChevronDown size={20} />
      </button>

      <button
        onClick={() => window.location.href = "/"}
        className="mt-4 text-sm text-gray-500 hover:underline flex items-center gap-1"
      >
        <span>חזור לעמוד הבית</span>
      </button>
    </div>
  );
};

export default Sidebar;
