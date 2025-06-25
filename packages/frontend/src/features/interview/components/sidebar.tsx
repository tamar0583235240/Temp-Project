// import RootState from your actual Redux store definition file, e.g.:
import { RootState } from "../../../shared/store/store"; // Adjust the path as needed
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { interviewType } from "../types/questionType";
import { goToQuestion, nextQuestion, prevQuestion } from "../store/simulationSlice";


const Sidebar: React.FC = () => {

    const dispatch = useDispatch();
    const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);



  return (
    <div className="flex flex-col items-center py-8 px-2 h-full">
      <div className="text-lg font-bold mb-4 text-text-main">{`${currentIndex + 1} מתוך ${questions.length}`}</div>
      <button
        onClick={() => dispatch(prevQuestion())}
        className="mb-2 text-primary-dark hover:bg-primary/10 rounded-full p-2 transition"
        aria-label="שאלה קודמת"
      >
        ▲
      </button>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] mb-2">
        {questions.map((q: interviewType, i: number) => (
          <button
            key={q.id}
            onClick={() => dispatch(goToQuestion(i))}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition
              ${q.answered ? "bg-primary/20 border-primary-dark" : "bg-white border-border"}
              ${i === currentIndex ? "ring-2 ring-primary-dark" : ""}
            `}
            title={`שאלה ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => dispatch(nextQuestion())}
        className="mt-2 text-primary-dark hover:bg-primary/10 rounded-full p-2 transition"
        aria-label="שאלה הבאה"
      >
        ▼
      </button>
    </div>
  )
}

export default Sidebar;