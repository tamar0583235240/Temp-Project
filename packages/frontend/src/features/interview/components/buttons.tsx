import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';
import { answerQuestion, nextQuestion, resetQuestion } from '../store/simulationSlice';
import { RootState } from '../../../shared/store/store';

interface ButtonsProps {
  onShowAnalysis: () => void;
  analysisVisible: boolean;
}

const Buttons = ({ onShowAnalysis, analysisVisible }: ButtonsProps) => {
  const { questions, currentIndex } = useAppSelector((state: RootState) => state.simulation);
  const dispatch = useAppDispatch();
  const [showEnd, setShowEnd] = useState(false);
  const currentQuestion = questions[currentIndex];
  const navigate = useNavigate();

  const handleTextChange = (value: string) => {
    dispatch(answerQuestion({ index: currentIndex, answer: value }));
  };
  const handleReset = () => {
    dispatch(resetQuestion(currentIndex));
  };
  const handleSubmit = () => {
    handleTextChange(currentQuestion.answer ?? "");
    navigate("/summary");
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className="flex gap-2">
        <button
          className="bg-danger text-white px-6 py-2 rounded-lg font-semibold hover:bg-danger/90 transition"
          onClick={handleReset}
        >
          איפוס תשובה
        </button>
        {currentIndex === questions.length - 1 ? (
          <button
            className="bg-success text-white px-6 py-2 rounded-lg font-semibold hover:bg-success/90 transition"
            onClick={handleSubmit}
          >
            שליחת שאלון
          </button>
        ) : (
          <button
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
            onClick={() => {
              handleTextChange(currentQuestion.answer ?? "");
              onShowAnalysis();
            }}
            disabled={analysisVisible}
          >
            אישור
          </button>
        )}
      </div>
      <button
        className="text-primary-dark underline"
        onClick={() => setShowEnd(true)}
      >
        סיום השאלון
      </button>

      {showEnd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-card w-full max-w-md text-right">
            <button
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEnd(false)}
            >
              X
            </button>
            <p className="text-lg font-bold mb-4">ברכות לרגל סיום השאלון!</p>
            <div className="flex gap-2">
              <button className="bg-primary-dark text-white px-4 py-2 rounded-lg" onClick={() => navigate('/certificate')}>הנפקת תעודה</button>
              <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={() => navigate('/dashboard')}>דשבורד</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buttons;