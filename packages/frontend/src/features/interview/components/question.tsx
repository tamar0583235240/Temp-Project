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

  //   if (isLoading) return <div className="loading">טוען שאלות...</div>;
  // if (error) return <div className="error">שגיאה בטעינת שאלות</div>;
  if (!questions.length || currentIndex >= questions.length) return <div>אין שאלות להצגה</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="bg-white rounded-xl shadow-md border border-[--color-border] p-6 space-y-4">
      <div className="text-xl font-bold text-text-main mb-2">שאלה {currentIndex + 1}</div>
      <div className="text-base text-text-secondary mb-4">{currentQuestion.content}</div>
      {currentQuestion.question_type === "open" ? (
        <textarea
          className="w-full min-h-[80px] rounded-md border border-[--color-border] p-2 text-sm focus:ring-primary focus:border-primary"
          value={currentQuestion.answer ?? ""}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="הקלד/י את תשובתך כאן..."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {currentQuestion.options?.map((option, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
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
    </div>
  )
};

export default Question;