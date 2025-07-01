import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import AudioRecorder from "../../recordings/components/AudioRecorder";


type QuestionProps = {
  onFinishRecording: () => void;
  onAnswerSaved: (answerId: string) => void;
};

const Question: React.FC<QuestionProps> = ({
  onFinishRecording,
  onAnswerSaved
}) => {
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];

  if (!questions.length || currentIndex >= questions.length) return <div>אין שאלות להצגה</div>;

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

        <div className="flex gap-4 w-full">
          {/* כפתור העלאת קובץ (עדיין לא פעיל) */}
          <div className="w-1/2">
            <button
              className="w-full border border-[--color-border] bg-white text-[--color-text] px-6 py-3 rounded-lg font-semibold hover:bg-[--color-background] transition text-lg flex items-center justify-center gap-2"
            >
              העלה קובץ
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
          </div>

          {/* קומפוננטת ההקלטה */}
          <div className="w-1/2">
            <AudioRecorder
              questionId={currentQuestion.id.toString()}
              onFinish={onFinishRecording}
              onSaveSuccess={onAnswerSaved}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Question;
