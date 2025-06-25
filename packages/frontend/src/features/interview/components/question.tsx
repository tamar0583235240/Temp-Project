import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { useDispatch } from "react-redux";
import { answerQuestion } from "../store/simulationSlice";

const Question: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);

  const handleTextChange = (value: string) => {
    dispatch(answerQuestion({ index: currentIndex, answer: value }));
  };

  if (!questions.length || currentIndex >= questions.length) return <div>אין שאלות להצגה</div>;

  const currentQuestion = questions[currentIndex];

  return (
   <div className="flex justify-center items-center min-h-[60vh] bg-[--color-surface] py-8 px-2 direction-rtl">
  <div className="bg-white rounded-2xl shadow-md border border-[--color-border] p-8 max-w-xl w-full text-right">
    <div className="flex justify-between items-center mb-2">
      <span className="bg-[--color-background] text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
        שאלה {currentIndex + 1}
      </span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-text-main mb-6 leading-snug">
          {currentQuestion.content}
        </div>
        {currentQuestion.question_type === "open" ? (
          <textarea
            className="w-full min-h-[80px] rounded-md border border-[--color-border] p-3 text-base focus:ring-[--color-primary] focus:border-[--color-primary] bg-[#f7fafc] mb-6"
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
        )}
        <div className="flex gap-4 mt-2 mb-2 w-full">
          <button
            className="w-1/2 bg-[--color-primary] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[--color-primary-dark] transition text-lg flex items-center justify-center"
            onClick={() => handleTextChange(currentQuestion.answer ?? "")}
          >
            התחל הקלטה
          </button>
          <button
            className="w-1/2 border border-[--color-border] bg-white text-[--color-text] px-6 py-3 rounded-lg font-semibold hover:bg-[--color-background] transition text-lg flex items-center justify-center gap-2"
          >
            העלה קובץ
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;